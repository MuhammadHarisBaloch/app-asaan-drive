"use client";
import React, { Dispatch, JSX, SetStateAction } from "react";
import {
  IconBell,
  IconCalendarEventFilled,
  IconCreditCard,
  IconLayoutDashboard,
  IconUser,
} from "@tabler/icons-react";
import { Group, Text } from "@mantine/core";
import classes from "./SideBar.module.css";

interface SideBarProps {
  title: string;
  data: {
    label: string;
    icon: React.ElementType;
  }[];
  active: string;
  setActive: Dispatch<SetStateAction<string>>;
}

export default function SideBar({
  title,
  data,
  active,
  setActive,
}: SideBarProps) {
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
            {title}
          </Text>
        </Group>
        {links}
      </div>
    </nav>
  );
}
