"use client";
import ProfileAndSettingSection from "@/components/features/ProfileAndSettingSection";
import DashboardSection from "@/components/features/renters/dashboard";
import BookingsSection from "@/components/features/renters/dashboard/Bookings";
import Notifications from "@/components/features/renters/dashboard/Notifications";
import Payments from "@/components/features/renters/dashboard/Payments";
import TrackingSection from "@/components/features/renters/dashboard/Trackings";
import SideBar from "@/components/features/SideBar/inde";
import { autoUpdateBookingStatus } from "@/utils/updateBookingStatus";
import { Grid, GridCol } from "@mantine/core";
import {
  IconLayoutDashboard,
  IconCalendarEventFilled,
  IconCreditCard,
  IconBell,
  IconUser,
  IconMapPin,
} from "@tabler/icons-react";
import { useEffect, useState } from "react";

const data = [
  { label: "Dashboard", icon: IconLayoutDashboard },
  { label: "My Bookings", icon: IconCalendarEventFilled },
  { label: "Track My Ride", icon: IconMapPin },
  { label: "Payments", icon: IconCreditCard },
  { label: "Notifications", icon: IconBell },
  { label: "Profile", icon: IconUser },
];

export default function RenterPage() {
  const [active, setActive] = useState("Dashboard");

  useEffect(() => {
    console.log("Auto update function triggered...");
    autoUpdateBookingStatus();
  }, []);

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
        {active === "Profile" && <ProfileAndSettingSection />}
      </GridCol>
    </Grid>
  );
}
