import { getUserDocument } from "@/features/user";
import { UserModel } from "@/features/user/models/user.model";
import { Stack, Text } from "@mantine/core";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";

export default function VehicleOwnerDashboardSection() {
  const [user, setUser] = useState<UserModel | null>(null);
  const auth = getAuth();

  useEffect(() => {
    const fetchUserId = async (id: string) => {
      const userData = await getUserDocument(id);
      setUser(userData);
    };

    onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchUserId(user.uid);
      }
    });
  }, []);

  return (
    <Stack p="lg" gap="xl">
      <Stack gap={0}>
        <Text fz="xl" c="black" fw={600}>
          Welcome {user?.fullName ?? ""} !
        </Text>
        <Text fz="12px">Here's what's happening with your vehicles</Text>
      </Stack>
    </Stack>
  );
}
