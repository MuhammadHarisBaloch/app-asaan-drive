"use client";
import { Dispatch, SetStateAction } from "react";
import {
  IconBell,
  IconCalendarEventFilled,
  IconCreditCard,
  IconLayoutDashboard,
  IconUser,
} from "@tabler/icons-react";
import { Group, Text } from "@mantine/core";
import classes from "./SideBar.module.css";

const data = [
  { label: "Dashboard", icon: IconLayoutDashboard },
  { label: "My Bookings", icon: IconCalendarEventFilled },
  { label: "Payments", icon: IconCreditCard },
  { label: "Notifications", icon: IconBell },
  { label: "Profile", icon: IconUser },
];
interface SideBarProps {
  active: string;
  setActive: Dispatch<SetStateAction<string>>;
}

export default function SideBar({ active, setActive }: SideBarProps) {
  const links = data.map((item) => (
    <a
      className={classes.link}
      data-active={item.label === active || undefined}
      key={item.label}
      onClick={(event) => {
        event.preventDefault();
        setActive(item.label);
      }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </a>
  ));

  return (
    <nav className={classes.navbar}>
      <div className={classes.navbarMain}>
        <Group className={classes.header} justify="space-between">
          <Text fz="lg" c="black" fw={500}>
            Renter Portal
          </Text>
        </Group>
        {links}
      </div>
    </nav>
  );
}
