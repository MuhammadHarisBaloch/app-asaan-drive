"use client";
import { useEffect, useState } from "react";
import {
  SimpleGrid,
  Card,
  Stack,
  Flex,
  Center,
  Badge,
  Text,
  Button,
  Select,
} from "@mantine/core";
import { IconClipboardData } from "@tabler/icons-react";
import { getAllUsers } from "@/features/document";
import ViewDetailsModal from "./ViewDetailsModal";
import { UserModel } from "@/features/user/models/user.model";
import { getAuth } from "firebase/auth";

interface OwnerDocCardProps {
  role: "renter" | "vehicles-owner";
}

export default function OwnerDocCard({ role }: OwnerDocCardProps) {
  const [users, setUsers] = useState<(UserModel & { id: string })[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    let mounted = true;
    (async () => {
      setLoading(true);
      const allUsers = await getAllUsers();
      if (!mounted) return;

      const currentAdminId = getAuth().currentUser?.uid;

      // ✅ Filter by role and valid docs
      const filtered = allUsers.filter((u) => {
        // skip admin
        if (u.id === currentAdminId) return false;

        // filter by role
        if (u.userType !== role) return false;

        // must have uploaded docs
        if (!u.documents || Object.keys(u.documents).length === 0) return false;

        return true;
      });

      // ✅ Sort by status
      const order: Record<string, number> = {
        Pending: 1,
        Verified: 2,
        Rejected: 3,
      };
      const sorted = filtered.sort((a, b) => {
        const aStatus = (a.documentStatus ?? "Pending") as keyof typeof order;
        const bStatus = (b.documentStatus ?? "Pending") as keyof typeof order;
        return order[aStatus] - order[bStatus];
      });

      setUsers(sorted);
      setLoading(false);
    })();

    return () => {
      mounted = false;
    };
  }, [role]);

  if (loading) return <div>Loading...</div>;

  // ✅ Apply filter dropdown logic
  const filteredUsers =
    filter === "All" ? users : users.filter((u) => u.documentStatus === filter);

  return (
    <Stack pb="lg">
      <Select
        label="Filter by Status"
        data={["All", "Pending", "Verified", "Rejected"]}
        value={filter}
        onChange={(val) => setFilter(val ?? "All")}
        w={250}
      />

      <SimpleGrid cols={3} py="lg" spacing="xl">
        {filteredUsers.map((user) => {
          const status = user.documentStatus ?? "Pending";
          return (
            <Card
              key={user.id}
              p="xl"
              radius="md"
              style={{
                borderLeft: `4px solid ${
                  status === "Pending"
                    ? "orange"
                    : status === "Verified"
                    ? "green"
                    : "red"
                }`,
                filter: "drop-shadow(1px 1px 2px #3d3d3d5e)",
              }}
            >
              <Stack gap="md">
                <Flex gap="md" align="center">
                  <Center
                    h={50}
                    w={50}
                    bg="pink.1"
                    style={{ borderRadius: 10 }}
                  >
                    <IconClipboardData color="red" size={30} />
                  </Center>
                  <Stack gap={0}>
                    <Text c="black" fz="md" fw={500} lh={1.2}>
                      {user.fullName} <br />
                      Documents
                    </Text>
                    <Badge
                      bg={
                        status === "Pending"
                          ? "orange.0"
                          : status === "Verified"
                          ? "green.1"
                          : "pink.1"
                      }
                      c={
                        status === "Pending"
                          ? "orange.4"
                          : status === "Verified"
                          ? "green"
                          : "pink"
                      }
                      fw={500}
                      styles={{
                        root: {
                          textAlign: "center",
                          textTransform: "lowercase",
                        },
                      }}
                    >
                      {status}
                    </Badge>
                  </Stack>
                </Flex>

                <Text fz="xs">
                  Uploaded:{" "}
                  {user.joined ? new Date(user.joined).toLocaleString() : "—"}
                </Text>

                <Button
                  onClick={() => {
                    ViewDetailsModal(user);
                  }}
                >
                  View Details
                </Button>
              </Stack>
            </Card>
          );
        })}
      </SimpleGrid>
    </Stack>
  );
}
