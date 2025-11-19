"use client";
import AdminDashboard from "@/components/features/admin/Dashboard";
import AdminDocumentVerification from "@/components/features/admin/DocumentVerification";
import ManageBookings from "@/components/features/admin/ManageBookings";
import ManageUsersSection from "@/components/features/admin/ManageUsers";
import ManageVehiclesSection from "@/components/features/admin/ManageVehicles";
import PaymentsEarningsSection from "@/components/features/admin/PaymentsEarningsSection";
import ReportsDashboardSection from "@/components/features/admin/ReportsDashboardSection";
import AdminSettingsSection from "@/components/features/admin/SettingSection";
import SideBar from "@/components/features/SideBar/inde";
import { autoUpdateBookingStatus } from "@/utils/updateBookingStatus";
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
import { useEffect, useState } from "react";

const data = [
  { label: "Dashboard", icon: IconLayoutDashboard },
  { label: "Manage Users", icon: IconUsers },
  { label: "Manage Vehicles", icon: IconCar },
  { label: "Manage Bookings", icon: IconCalendarMonth },
  { label: "Documents Verification", icon: IconFileCheck },
  { label: "Payment & Earnings", icon: IconBrandCashapp },
  { label: "Report & Analysis", icon: IconChartBar },
  { label: "Settings", icon: IconSettings },
];

export default function Admin() {
  const [active, setActive] = useState("Dashboard");

  useEffect(() => {
    // Only run on client side, not during build
    if (typeof window === "undefined") return;

    const updateBookingStatus = async () => {
      try {
        console.log("🔄 Auto update function triggered...");
        await autoUpdateBookingStatus();
      } catch (error) {
        console.error("❌ Failed to auto-update booking status:", error);
      }
    };

    // Run immediately when component mounts
    updateBookingStatus();

    // Set up interval to run every 5 minutes
    const interval = setInterval(updateBookingStatus, 5 * 60 * 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

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
        {active === "Payment & Earnings" && <PaymentsEarningsSection />}
        {active === "Report & Analysis" && <ReportsDashboardSection />}
        {active === "Settings" && <AdminSettingsSection />}
      </GridCol>
    </Grid>
  );
}

