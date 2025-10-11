"use client";
import AdminDashboard from "@/components/features/admin/Dashboard";
import ManageUsersSection from "@/components/features/admin/ManageUsers";
import ProfileAndSettingSection from "@/components/features/ProfileAndSettingSection";
import DashboardSection from "@/components/features/renters/dashboard";
import BookingsSection from "@/components/features/renters/dashboard/Bookings";
import Notifications from "@/components/features/renters/dashboard/Notifications";
import Payments from "@/components/features/renters/dashboard/Payments";
import TrackingSection from "@/components/features/renters/dashboard/Trackings";
import SideBar from "@/components/features/SideBar/inde";
import { Grid, GridCol } from "@mantine/core";
import {
  IconLayoutDashboard,
  IconMapPin,
  IconBrandCashapp,
  IconCalendarMonth,
  IconCar,
  IconChartBar,
  IconSettings,
  IconUsers,
} from "@tabler/icons-react";
import { useState } from "react";

const data = [
  { label: "Dashboard", icon: IconLayoutDashboard },
  { label: "Manage Users", icon: IconUsers },
  { label: "Manage Vehicles", icon: IconCar },
  { label: "Manage Bookings", icon: IconCalendarMonth },
  { label: "Payment & Earnings", icon: IconBrandCashapp },
  { label: "City Management", icon: IconMapPin },
  { label: "Report & Analysis", icon: IconChartBar },
  { label: "Settings", icon: IconSettings },
];

export default function Admin() {
  const [active, setActive] = useState("Dashboard");

  return (
    <Grid px="sm">
      <GridCol span={2.5}>
        <SideBar
          title="Admin Portal"
          data={data}
          active={active}
          setActive={setActive}
        />
      </GridCol>
      <GridCol span={9.5}>
        {active === "Dashboard" && <AdminDashboard />}
        {active === "Manage Users" && <ManageUsersSection />}
        {active === "Manage Vehicles" && <p>Manage Vehicles</p>}
        {active === "Manage Bookings" && <p>Manage Bookings</p>}
        {active === "Payment & Earnings" && <p>Payment & Earnings</p>}
        {active === "City Management" && <p>City Management</p>}
        {active === "Report & Analysis" && <p>Report & Analysis</p>}
        {active === "Settings" && <p>Settings</p>}
      </GridCol>
    </Grid>
  );
}
