// UserTableHeader.tsx
import { USER_TABLE_GRID } from "@/constants/Layout";
import { Flex, Text } from "@mantine/core";

export default function UserTableHeader() {
  const headers = [
    "User",
    "Role",
    "City",
    "Status",
    "Joined Date",
    "Activity",
    "Action",
  ];

  return (
    <Flex
      py="md"
      px="lg"
      bg="gray.0"
      style={{
        display: "grid",
        gridTemplateColumns: USER_TABLE_GRID,
        alignItems: "center",
      }}
    >
      {headers.map((h, i) => (
        <Text
          key={i}
          fz="xs"
          fw={600}
          style={{
            justifySelf: h === "User" ? "start" : "center",
            textAlign: h === "User" ? "left" : "center",
            paddingLeft: h === "User" ? "8px" : 0,
          }}
        >
          {h}
        </Text>
      ))}
    </Flex>
  );
}
