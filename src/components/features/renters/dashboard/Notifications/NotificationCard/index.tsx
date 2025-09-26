import { Card, Flex, Center, Stack, Text } from "@mantine/core";
import { IconCircleCheck, IconPointFilled } from "@tabler/icons-react";
import { JSX, useEffect, useState } from "react";

interface NotificationCardProps {
  icon: JSX.Element;
  iconBg: string;
  title: string;
  subTitle: string;
  time: string;
  markReadAllNotification: boolean;
}
export default function NotificationCard({
  icon,
  iconBg,
  title,
  subTitle,
  time,
  markReadAllNotification,
}: NotificationCardProps) {
  const [readNotification, setReadNotification] = useState(false);
  const [readAllNotification, setReadAllNotification] = useState(false);

  useEffect(() => {
    setReadAllNotification(markReadAllNotification);
  }, [markReadAllNotification]);

  return (
    <Card
      className="hover-pointer"
      radius="md"
      p="lg"
      bg={readNotification || readAllNotification ? "white" : "pink.0"}
      onClick={() => {
        setReadNotification(true);
      }}
      style={{
        border: `1px solid ${
          readNotification || readAllNotification ? "#6b6b6b42" : "red"
        }`,
      }}
    >
      <Flex
        h="100%"
        w="100%"
        justify="space-between"
        align="flex-start"
        gap="md"
      >
        <Flex align="flex-start" gap="md">
          <Center bg={iconBg} h={40} w={40} style={{ borderRadius: "10px" }}>
            {icon}
          </Center>
          <Stack gap="xxs">
            <Flex align="center" gap="sm">
              <Text fz="sm" c="black" fw={500}>
                {title}
              </Text>
              {readNotification || readAllNotification ? null : (
                <IconPointFilled size={20} color="red" />
              )}
            </Flex>
            <Text fz="xs">{subTitle}</Text>
          </Stack>
        </Flex>
        <Text fz="12px">{time}</Text>
      </Flex>
    </Card>
  );
}
