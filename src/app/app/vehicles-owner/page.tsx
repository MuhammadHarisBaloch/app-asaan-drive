"use client";
import SideBar from "@/components/features/SideBar/inde";
import VehicleOwnerDashboardSection from "@/components/features/vehicle-owner/Dashboard";
import VehicleManagementSection from "@/components/features/vehicle-owner/Dashboard/VehicleManagementSection";
import { Grid, GridCol } from "@mantine/core";
import {
  IconLayoutDashboard,
  IconCalendarEventFilled,
  IconCreditCard,
  IconBell,
  IconUser,
} from "@tabler/icons-react";
import { useState } from "react";

const data = [
  { label: "Dashboard", icon: IconLayoutDashboard },
  { label: "Vehicle Management", icon: IconCalendarEventFilled },
  { label: "Booking Management", icon: IconCreditCard },
  { label: "Earning & Payouts", icon: IconCreditCard },
  { label: "Notifications", icon: IconBell },
  { label: "Profile & Settings", icon: IconUser },
];

export default function VehiclesOwnerPage() {
  const [active, setActive] = useState("Dashboard");
  return (
    <Grid px="sm">
      <GridCol span={2.5}>
        <SideBar
          title="Vehicles Owner Portal"
          data={data}
          active={active}
          setActive={setActive}
        />
      </GridCol>
      <GridCol span={9.5}>
        {active === "Dashboard" && <VehicleOwnerDashboardSection />}
        {active === "Vehicle Management" && <VehicleManagementSection />}
        {active === "Booking Management" && <h1>Booking Management Content</h1>}
        {active === "Earning & Payouts" && <h1>Earning & Payouts Content</h1>}
        {active === "Notifications" && <h1>Notifications Content</h1>}
        {active === "Profile & Settings" && <h1>Profile & Settings Content</h1>}
      </GridCol>
    </Grid>
  );
}
