"use client";
import AdminDashboard from "@/components/features/admin/Dashboard";
import AdminDocumentVerification from "@/components/features/admin/DocumentVerification";
import ManageBookings from "@/components/features/admin/ManageBookings";
import ManageUsersSection from "@/components/features/admin/ManageUsers";
import ManageVehiclesSection from "@/components/features/admin/ManageVehicles";
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
  IconFileCheck,
} from "@tabler/icons-react";
import { useState } from "react";

const data = [
  { label: "Dashboard", icon: IconLayoutDashboard },
  { label: "Manage Users", icon: IconUsers },
  { label: "Manage Vehicles", icon: IconCar },
  { label: "Manage Bookings", icon: IconCalendarMonth },
  { label: "Documents Verification", icon: IconFileCheck },
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
        {active === "Manage Vehicles" && <ManageVehiclesSection />}
        {active === "Manage Bookings" && <ManageBookings />}
        {active === "Documents Verification" && <AdminDocumentVerification />}
        {active === "Payment & Earnings" && <p>Payment & Earnings</p>}
        {active === "City Management" && <p>City Management</p>}
        {active === "Report & Analysis" && <p>Report & Analysis</p>}
        {active === "Settings" && <p>Settings</p>}
      </GridCol>
    </Grid>
  );
}
