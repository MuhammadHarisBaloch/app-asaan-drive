import { Badge, Card, Divider, Flex, Stack, Tabs, Text } from "@mantine/core";
import { useState } from "react";
import BookingRequestCard from "./BookingRequestCard";
import { data } from "@/constants/Data";

export default function BookingManagementSection() {
  const [value, setValue] = useState<string | null>("Upcoming");
  return (
    <Stack p="lg" gap="xl">
      <Stack gap={0}>
        <Text fz="xl" c="black" fw={600}>
          Booking Management
        </Text>
        <Text fz="12px">Track and manage all your vehicle bookings</Text>
      </Stack>
      <Card
        p="xl"
        radius="md"
        style={{ filter: "drop-shadow(1px 1px 2px #9f9f9fcf)" }}
      >
        <Tabs variant="none" value={value} onChange={setValue}>
          <Tabs.List grow className="list">
            {data.vehicleOwner.dashboard.BookingManagement.tabList.map(
              (data, index) => {
                return (
                  <Tabs.Tab key={index} value={data.value} className="tab">
                    <Flex align="center" justify="center" gap="sm">
                      {data.icon}
                      {data.value}
                      <Badge size="lg" fw={500} color="gray.1" c="gray" circle>
                        {data.notificationValue}
                      </Badge>
                    </Flex>
                  </Tabs.Tab>
                );
              }
            )}
          </Tabs.List>
          <Divider w="100%" />
          <Tabs.Panel value="Upcoming">
            <BookingRequestCard
              profileName={"MH"}
              userName={"Muhammad Haris"}
              vehicleName={"Honda CD 125"}
              startDate="Jan 20, 2025"
              endDate="Jan 22, 2025"
              location={"Tando Adam"}
              number={923093185997}
              price={1200}
              bookingRequestValue={true}
              vehicleStatus="pending"
            />
            <BookingRequestCard
              profileName={"AA"}
              userName={"Aamir Ali"}
              vehicleName={"Honda CD 70"}
              startDate="Jan 10, 2025"
              endDate="Jan 12, 2025"
              location={"Kotri"}
              number={923480804346}
              price={900}
              bookingRequestValue={false}
              vehicleStatus="confirmed"
            />
          </Tabs.Panel>
          <Tabs.Panel value="Ongoing">
            <BookingRequestCard
              profileName={"SK"}
              userName={"Sanjay Kumar"}
              vehicleName={"Honda CD 125"}
              startDate="fab 15, 2025"
              endDate="fab 16, 2025"
              location={"Umerkot"}
              number={923480804346}
              price={1200}
              bookingRequestValue={false}
              vehicleStatus="ongoing"
            />
          </Tabs.Panel>
          <Tabs.Panel value="Completed">
            <BookingRequestCard
              profileName={"SA"}
              userName={"Sagar Ali"}
              vehicleName={"Mountain Cycle"}
              startDate="mar 01, 2025"
              endDate="mar 16, 2025"
              location={"Karachi"}
              number={923133768188}
              price={500}
              bookingRequestValue={false}
              vehicleStatus="completed"
            />
            <BookingRequestCard
              profileName={"AS"}
              userName={"Abdul Samie"}
              vehicleName={"Honda CD 125"}
              startDate="fab 15, 2025"
              endDate="fab 16, 2025"
              location={"Tando Adam"}
              number={923463899732}
              price={1300}
              bookingRequestValue={false}
              vehicleStatus="completed"
            />
          </Tabs.Panel>
          <Tabs.Panel value="Cancelled">
            <BookingRequestCard
              profileName={"RK"}
              userName={"Rajesh Kumar"}
              vehicleName={"Honda CD 70"}
              startDate="fab 15, 2025"
              endDate="fab 16, 2025"
              location={"Hyderabad"}
              number={923463899732}
              price={900}
              bookingRequestValue={false}
              vehicleStatus="cancelled"
            />
          </Tabs.Panel>
        </Tabs>
      </Card>
    </Stack>
  );
}
