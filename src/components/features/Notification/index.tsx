"use client";

import { useEffect, useState } from "react";
import { Card, Text, Group, Stack, Button, Box, Badge } from "@mantine/core";
import { IconBell } from "@tabler/icons-react";
import {
  getUserNotifications,
  markAllNotificationsAsRead,
  markNotificationAsRead,
} from "@/features/notification";
import { NotificationModel } from "@/features/notification/models";
import { getAuth } from "firebase/auth";
import { firebaseConstants } from "@/constants/Firestore";
import { db } from "@/networking/firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore";

interface NotificationsListProps {
  userId: string;
}

export default function NotificationsList({ userId }: NotificationsListProps) {
  const [notifications, setNotifications] = useState<
    (NotificationModel & { id: string })[]
  >([]);
  const [loading, setLoading] = useState(true);

 useEffect(() => {
   if (!userId) return;

   setLoading(true);
   const notificationsRef = collection(
     db,
     firebaseConstants.collections.notifications
   );
   const q = query(notificationsRef, where("userId", "==", userId));

   // Real-time listener
   const unsubscribe = onSnapshot(q, (snapshot) => {
     const data = snapshot.docs.map((doc) => ({
       id: doc.id,
       ...(doc.data() as NotificationModel),
     }));

     // ✅ Fix: convert Date to timestamp (milliseconds)
     const sortedData = data.sort((a, b) => {
       if (a.isRead === b.isRead) {
         const dateA = a.createdAt?.toDate?.()?.getTime?.() || 0;
         const dateB = b.createdAt?.toDate?.()?.getTime?.() || 0;
         return dateB - dateA; // latest first
       }
       return a.isRead ? 1 : -1; // unread first
     });

     setNotifications(sortedData);
     setLoading(false);
   });

   return () => unsubscribe();
 }, [userId]);


  // Mark single notification as read
  const handleMarkAsRead = async (id: string) => {
    await markNotificationAsRead(id);
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  // Mark all notifications as read
  const handleMarkAllRead = async () => {
    const user = getAuth().currentUser;
    if (!user) return;

    await markAllNotificationsAsRead(user.uid);

    // local state update for instant feedback
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  if (loading) return <Text>Loading notifications...</Text>;

  return (
    <Stack p="lg" gap="md">
      {notifications.length === 0 && (
        <Card radius="lg" p="xl" ta="center" bg="gray.0">
          <IconBell size={40} color="gray" />
          <Text size="lg" fw={500} mt="md" c="gray.7">
            No notifications yet
          </Text>
          <Text size="sm" c="gray.6" mt="xs">
            You're all caught up! 🎉
          </Text>
        </Card>
      )}

      {/* Mark All as Read Button */}
      {notifications.length > 0 && (
        <Group justify="flex-end" align="center" pb="lg">
          <Button
            c="red.4"
            bg="transparent"
            style={{ border: "1px solid red" }}
            onClick={handleMarkAllRead}
          >
            Mark All as Read
          </Button>
        </Group>
      )}

      {/* Notification Items */}
      {notifications.map((n) => (
        <Card
          key={n.id}
          radius="lg"
          p="lg"
          bg={n.isRead ? "white" : "pink.0"}
          style={{
            border: `1px solid ${n.isRead ? "#e9ecef" : "red"}`,
            boxShadow: n.isRead
              ? "0 1px 3px rgba(0,0,0,0.1)"
              : "0 2px 8px rgba(34, 139, 230, 0.15)",
            transition: "all 0.2s ease",
          }}
          onClick={() => handleMarkAsRead(n.id!)}
        >
          <Group justify="space-between" align="flex-start">
            <Group align="flex-start" gap="md">
              <Box mt="xs">
                <IconBell size={20} color={n.isRead ? "gray" : "red"} />
              </Box>
              <Stack gap={4} style={{ flex: 1 }}>
                <Group gap="xs">
                  <Text fw={600} size="md" c="dark.8">
                    {n.title}
                  </Text>
                  {!n.isRead && (
                    <Badge size="sm" c="red.4" bg="gray.1" radius="sm">
                      New
                    </Badge>
                  )}
                </Group>

                <Text size="sm" c="dark.6" lineClamp={2}>
                  {n.message}
                </Text>

                <Text size="xs" c="gray.6" mt={4}>
                  {n.createdAt?.toDate().toLocaleString()}
                </Text>
              </Stack>
            </Group>
            {!n.isRead && (
              <Box
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  backgroundColor: "red",
                  flexShrink: 0,
                  marginTop: 8,
                }}
              />
            )}
          </Group>
        </Card>
      ))}
    </Stack>
  );
}
