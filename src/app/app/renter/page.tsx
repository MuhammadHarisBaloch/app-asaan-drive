"use client";
import DashboardSection from "@/components/features/renters/dashboard";
import BookingsSection from "@/components/features/renters/dashboard/Bookings";
import SideBar from "@/components/features/renters/dashboard/SideBar/inde";
import { Grid, GridCol } from "@mantine/core";
import { useState } from "react";

export default function RenterPage() {
  const [active, setActive] = useState("Dashboard");
  return (
    <Grid px="sm">
      <GridCol span={2.5}>
        <SideBar active={active} setActive={setActive} />
      </GridCol>
      <GridCol span={9.5}>
        {active === "Dashboard" && <DashboardSection />}
        {active === "My Bookings" && <BookingsSection />}
        {active === "Payments" && <h1>Payments Content</h1>}
        {active === "Notifications" && <h1>Notifications Content</h1>}
        {active === "Profile" && <h1>Profile Content</h1>}
      </GridCol>
    </Grid>
  );
}
