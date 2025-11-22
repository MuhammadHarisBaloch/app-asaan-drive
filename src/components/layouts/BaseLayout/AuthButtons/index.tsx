"use client";
import { Button, Flex, Stack } from "@mantine/core";
import { onAuthStateChanged, User } from "firebase/auth";
import Link from "next/link";
import { useEffect, useState } from "react";
import { auth } from "../../../../networking/firebase";

import { signoutUser } from "@/features/auth";
import { notifications } from "@mantine/notifications";
import { useRouter } from "next/navigation";

interface AuthButtonsProps {
  mobile?: boolean;
  onButtonClick?: () => void;
}

function AuthButtons({ mobile, onButtonClick }: AuthButtonsProps) {
  const router = useRouter();
  const [authUser, setAuthUser] = useState<User | undefined>(undefined);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
      } else {
        setAuthUser(undefined);
      }
    });
  }, []);

  // ✅ Logout Handler - Common for both mobile and desktop
  const handleLogout = async () => {
    await signoutUser();
    notifications.show({
      title: "Sign out successfully",
      message: "",
    });
    onButtonClick?.(); // Close mobile drawer if open
    router.push("/");
  };

  // ✅ MOBILE VERSION - For drawer menu
  if (mobile) {
    if (authUser) {
      return (
        <Button variant="outline" onClick={handleLogout} fullWidth size="md">
          Logout
        </Button>
      );
    }

    return (
      <Stack gap="md" w="100%">
        <Button
          component={Link}
          href="/signin"
          variant="outline"
          onClick={onButtonClick}
          fullWidth
          size="md"
        >
          Sign in
        </Button>
        <Button
          component={Link}
          href="/signup"
          onClick={onButtonClick}
          fullWidth
          size="md"
        >
          Sign up
        </Button>
      </Stack>
    );
  }

  // ✅ DESKTOP VERSION - For header
  if (authUser) {
    return (
      <Button
        className="hover-expand-item"
        variant="outline"
        onClick={handleLogout}
        size="sm"
      >
        Logout
      </Button>
    );
  }

  return (
    <Flex gap="md" direction={{ base: "column", sm: "row" }}>
      <Button
        className="hover-expand-item"
        component={Link}
        href="/signin"
        variant="outline"
        size="sm"
        w={{ base: "100%", sm: "auto" }}
      >
        Sign in
      </Button>
      <Button
        className="hover-expand-item"
        component={Link}
        href="/signup"
        size="sm"
        w={{ base: "100%", sm: "auto" }}
      >
        Sign up
      </Button>
    </Flex>
  );
}

export default AuthButtons;
