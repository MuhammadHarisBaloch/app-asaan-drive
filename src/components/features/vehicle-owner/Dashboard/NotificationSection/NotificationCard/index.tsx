import {
  Card,
  Flex,
  Center,
  Stack,
  Button,
  Badge,
  Text,
  Box,
} from "@mantine/core";
import { IconPointFilled } from "@tabler/icons-react";
import { JSX, useEffect, useState } from "react";
interface NotificationCardProps {
  icon: JSX.Element;
  iconBg: string;
  title: string;
  subTitle: string;
  time: string;
  priority: string;
  recentBookingRequest: boolean;
  markReadAllNotification: boolean;
}
export default function NotificationCard({
  icon,
  iconBg,
  title,
  subTitle,
  time,
  priority,
  recentBookingRequest,
  markReadAllNotification,
}: NotificationCardProps) {
  const [bookingRequest, setBookingReques] = useState(recentBookingRequest);
  const [readNotification, setReadNotification] = useState(false);
  const [readAllNotification, setReadAllNotification] = useState(false);

  useEffect(() => {
    setReadAllNotification(markReadAllNotification);
  }, [markReadAllNotification]);

  let color: string;
  let bg: string;

  switch (priority) {
    case "high":
      color = "red";
      bg = "red.0";
      break;
    case "medium":
      color = "orange";
      bg = "orange.0";
      break;
    case "low":
      color = "green";
      bg = "green.1";
      break;
    default:
      color = "transparent";
      bg = "transparent";
  }
  return (
    <Card
      className="hover-pointer"
      radius="md"
      bg={readNotification || readAllNotification ? "white.2" : "blue.0"}
      style={{ borderLeft: `4px solid ${color}` }}
      onClick={() => {
        setReadNotification(true);
      }}
    >
      <Flex
        h="100%"
        w="100%"
        justify="space-between"
        align="flex-start gap='md'"
      >
        <Flex align="flex-start" gap="md">
          <Center bg={iconBg} h={40} w={40} style={{ borderRadius: "10px" }}>
            {icon}
          </Center>
          <Stack gap="sm" mt="xs">
            <Flex align="center" gap="sm">
              <Text fz="sm" c="black" fw={500}>
                {title}
              </Text>
              {readNotification || readAllNotification ? (
                ""
              ) : (
                <IconPointFilled size={20} color="blue" />
              )}
            </Flex>
            <Text fz="xs">{subTitle}</Text>
            <Text fz="12px">{time}</Text>
          </Stack>
        </Flex>
        <Stack align="flex-end" justify="space-between" gap="xxl">
          {bookingRequest && (
            <Flex gap="md">
              <Button
                bg="blue"
                size="xs"
                onClick={() => {
                  setBookingReques(false);
                  setReadNotification(true);
                }}
              >
                Approve
              </Button>
              <Button
                size="xs"
                onClick={() => {
                  setBookingReques(false);
                  setReadNotification(true);
                }}
              >
                Decline
              </Button>
            </Flex>
          )}
          {!bookingRequest && <Box />}
          <Badge
            c={color}
            bg={bg}
            fw={500}
            styles={{
              root: {
                textTransform: "lowercase",
                textAlign: "center",
              },
            }}
          >
            {priority}
          </Badge>
        </Stack>
      </Flex>
    </Card>
  );
}
