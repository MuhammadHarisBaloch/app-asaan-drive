"use client";

import NotificationsList from "@/components/features/Notification";
import { getAuth } from "firebase/auth";
import { useEffect, useState } from "react";

export default function RenterNotifications() {
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const user = getAuth().currentUser;
    if (user) setUserId(user.uid);
  }, []);

  if (!userId) return <p>Loading...</p>;

  return <NotificationsList userId={userId} />;
}
