"use client";
import ProfileAndSettingSection from "@/components/features/ProfileAndSettingSection";
import SideBar from "@/components/features/SideBar/inde";
import VehicleOwnerDashboardSection from "@/components/features/vehicle-owner/Dashboard";
import BookingManagementSection from "@/components/features/vehicle-owner/Dashboard/BookingManagementSection";
import EarningAndPayoutSection from "@/components/features/vehicle-owner/Dashboard/EarningAndPayoutSection";
import NotificationSection from "@/components/features/vehicle-owner/Dashboard/NotificationSection";
import VehicleManagementSection from "@/components/features/vehicle-owner/Dashboard/VehicleManagementSection";
import { autoUpdateBookingStatus } from "@/utils/updateBookingStatus";
import { Grid, GridCol } from "@mantine/core";
import {
  IconLayoutDashboard,
  IconCalendarEventFilled,
  IconCreditCard,
  IconBell,
  IconUser,
} from "@tabler/icons-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

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
  const searchParams = useSearchParams();

  useEffect(() => {
    // Check if there's a tab query parameter
    const tab = searchParams.get("tab");
    if (tab === "Documents") {
      setActive("Profile & Settings");
    }
  }, [searchParams]);

  useEffect(() => {
    const updateBookingStatus = async () => {
      try {
        console.log("Auto update function triggered...");
        await autoUpdateBookingStatus();
      } catch (error) {
        console.error("Failed to auto-update booking status:", error);
      }
    };

    // Run immediately when component mounts
    updateBookingStatus();

    // Set up interval to run every 5 minutes
    const interval = setInterval(updateBookingStatus, 5 * 60 * 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  // Determine default tab for Profile & Settings
  const getDefaultTab = () => {
    const tab = searchParams.get("tab");
    return tab === "Documents" ? "Documents" : undefined;
  };

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
        {active === "Booking Management" && <BookingManagementSection />}
        {active === "Earning & Payouts" && <EarningAndPayoutSection />}
        {active === "Notifications" && <NotificationSection />}
        {active === "Profile & Settings" && (
          <ProfileAndSettingSection defaultTab={getDefaultTab()} />
        )}
      </GridCol>
    </Grid>
  );
}
