import { Button, Flex } from "@mantine/core";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import Link from "next/link";
import { useEffect, useState } from "react";
import { auth } from "../../../../networking/firebase";
import { notifications } from "@mantine/notifications";

function AuthButtons() {
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
        onClick={() => {
          signOut(auth).then(() => {
            notifications.show({
              title: "Sign out successfully",
              message: "",
            });
          });
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
