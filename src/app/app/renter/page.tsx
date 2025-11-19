"use client";
import { useEffect, useState, Suspense } from "react";
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
  IconCalendarEventFilled,
  IconCreditCard,
  IconBell,
  IconUser,
  IconMapPin,
} from "@tabler/icons-react";
import { useSearchParams } from "next/navigation";
import { autoUpdateBookingStatus } from "@/utils/updateBookingStatus";

const data = [
  { label: "Dashboard", icon: IconLayoutDashboard },
  { label: "My Bookings", icon: IconCalendarEventFilled },
  { label: "Track My Ride", icon: IconMapPin },
  { label: "Payments", icon: IconCreditCard },
  { label: "Notifications", icon: IconBell },
  { label: "Profile", icon: IconUser },
];

// Create a wrapper component that uses useSearchParams
function RenterPageContent() {
  const [active, setActive] = useState("Dashboard");
  const searchParams = useSearchParams();

  useEffect(() => {
    // Check if there's a tab query parameter
    const tab = searchParams.get("tab");
    if (tab === "Documents") {
      setActive("Profile");
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
          title="Renter Portal"
          data={data}
          active={active}
          setActive={setActive}
        />
      </GridCol>
      <GridCol span={9.5}>
        {active === "Dashboard" && <DashboardSection />}
        {active === "My Bookings" && <BookingsSection />}
        {active === "Track My Ride" && <TrackingSection />}
        {active === "Payments" && <Payments />}
        {active === "Notifications" && <Notifications />}
        {active === "Profile" && (
          <ProfileAndSettingSection defaultTab={getDefaultTab()} />
        )}
      </GridCol>
    </Grid>
  );
}

// Main component with Suspense boundary
export default function RenterPage() {
  return (
    <Suspense
      fallback={
        <Grid px="sm">
          <GridCol span={2.5}>
            <div>Loading sidebar...</div>
          </GridCol>
          <GridCol span={9.5}>
            <div>Loading content...</div>
          </GridCol>
        </Grid>
      }
    >
      <RenterPageContent />
    </Suspense>
  );
}
