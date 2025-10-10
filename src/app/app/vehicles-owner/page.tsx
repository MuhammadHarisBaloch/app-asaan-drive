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

  useEffect(() => {
    autoUpdateBookingStatus();
  }, []);

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
        {active === "Profile & Settings" && <ProfileAndSettingSection />}
      </GridCol>
    </Grid>
  );
}
