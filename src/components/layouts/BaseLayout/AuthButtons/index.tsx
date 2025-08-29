"use client";
import { Button, Flex } from "@mantine/core";
import { onAuthStateChanged, User } from "firebase/auth";
import Link from "next/link";
import { useEffect, useState } from "react";
import { auth } from "../../../../networking/firebase";

import { signoutUser } from "@/features/auth";
import { notifications } from "@mantine/notifications";
import { useRouter } from "next/navigation";

function AuthButtons() {
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

  if (authUser)
    return (
      <Button
        className="hover-expand-item"
        variant="outline"
        onClick={async () => {
          await signoutUser();
          notifications.show({
            title: "Sign out successfully",
            message: "",
          });
          router.push("/");
        }}
      >
        Logout
      </Button>
    );

  return (
    <Flex gap="lg">
      <Button
        className="hover-expand-item"
        component={Link}
        href="/signin"
        variant="outline"
      >
        Sign in
      </Button>
      <Button className="hover-expand-item" component={Link} href="/signup">
        Sign up
      </Button>
    </Flex>
  );
}

export default AuthButtons;
