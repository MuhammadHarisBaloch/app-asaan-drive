"use client";

import { modals } from "@mantine/modals";
import { UserModel } from "@/features/user/models/user.model";
import ViewDetailsModalContent from "./ViewDetailsModalContent";

export default function ViewDetailsModal(user: UserModel & { id: string }) {
  modals.open({
    title: `Documents — ${user.fullName}`,
    size: "lg",
    children: (
      <div style={{ position: "relative", zIndex: 2000 }}>
        <ViewDetailsModalContent user={user} />
      </div>
    ),
  });
}
