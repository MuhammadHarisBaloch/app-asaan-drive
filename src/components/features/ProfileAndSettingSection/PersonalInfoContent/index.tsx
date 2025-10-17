import { getUserDocument } from "@/features/user";
import { UserModel } from "@/features/user/models/user.model";
import {
  Avatar,
  Button,
  Flex,
  Stack,
  Text,
  Textarea,
  TextInput,
} from "@mantine/core";
import {
  IconCircleCheck,
  IconCircleX,
  IconRosetteDiscountCheck,
} from "@tabler/icons-react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";

export default function PersonalInfoContent() {
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

  // Determine verification status and color (based on your actual types)
  const status = user?.documentStatus;
  const isVerified = status === "Verified";

  const verificationText =
    status === "Pending"
      ? "Unverified (Pending Verification)"
      : status === "Rejected"
      ? "Unverified (Rejected)"
      : status === "Not Uploaded"
      ? "Unverified (No Documents)"
      : isVerified
      ? "Verified Account"
      : "Unverified Account";

  return (
    <Stack py="xl" gap="xl">
      <Flex gap="md" align="center">
        <Avatar
          size="lg"
          h="5rem"
          w="5rem"
          key={user?.fullName}
          name={user?.fullName}
          color="#ff0000ff"
        />
        <Stack gap={0}>
          <Text fz="xl" c="black" fw={600}>
            {user?.fullName}
          </Text>
          <Text fz="xs">{user?.userType}</Text>
          <Flex gap="xs" align="center">
            <Text fz="xs" c={isVerified ? "green" : "red.4"} fw={500}>
              {verificationText}
            </Text>
            {isVerified ? (
              <IconRosetteDiscountCheck color="green" size={18} />
            ) : (
              <IconCircleX color="red" size={18} />
            )}
          </Flex>
        </Stack>
      </Flex>
      <Flex gap="xl">
        <TextInput
          w="100%"
          size="md"
          label="Full Name"
          radius="md"
          defaultValue={user?.fullName}
          styles={{ label: { fontSize: "14px" }, input: { fontSize: "16px" } }}
        />
        <TextInput
          w="100%"
          size="md"
          label="Email Address"
          radius="md"
          defaultValue={user?.email}
          disabled
          styles={{
            label: { fontSize: "14px" },
            input: {
              fontSize: "16px",
              backgroundColor: "white",
              color: "black",
              opacity: 1,
            },
          }}
        />
      </Flex>

      <Flex gap="xl">
        <TextInput
          w="100%"
          size="md"
          label="Phone Number"
          radius="md"
          defaultValue={user?.phoneNumber}
          styles={{ label: { fontSize: "14px" }, input: { fontSize: "16px" } }}
        />
        <TextInput
          w="100%"
          size="md"
          label="City"
          radius="md"
          defaultValue={user?.city}
          disabled
          styles={{
            label: { fontSize: "14px" },
            input: {
              fontSize: "16px",
              backgroundColor: "white",
              color: "black",
              opacity: 1,
            },
          }}
        />
      </Flex>

      <Textarea
        w="100%"
        rows={4}
        size="md"
        label="Address"
        radius="md"
        styles={{ label: { fontSize: "14px" }, input: { fontSize: "16px" } }}
      />

      <Button w="20%" fz="xs" size="md">
        Save Changes
      </Button>
    </Stack>
  );
}
