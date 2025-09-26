import { Card, Divider, Flex, Stack, Tabs, Text } from "@mantine/core";
import { IconFile, IconLock, IconUser } from "@tabler/icons-react";
import { useState } from "react";
import PersonalContent from "./ProfileContent";
import DocumentContent from "./DocumentContent";
import SecurityContent from "./SecurityContent";

export default function Profile() {
  const [value, setValue] = useState<string | null>("Personal Info");

  return (
    <Stack p="lg" gap="xl">
      <Stack gap={0}>
        <Text fz="xl" c="black" fw={600}>
          Profile
        </Text>
        <Text fz="12px">Manage your account information and preferences</Text>
      </Stack>
      <Card
        radius="md"
        p="xl"
        style={{ filter: "drop-shadow(1px 1px 2px #8e8e8e77)" }}
      >
        <Tabs variant="none" value={value} onChange={setValue}>
          <Tabs.List grow className="list">
            <Tabs.Tab value="Personal Info" className="tab">
              <Flex align="center" justify="center" gap="sm">
                <IconUser size={20} />
                Personal Info
              </Flex>
            </Tabs.Tab>
            <Tabs.Tab value="Documents" className="tab">
              <Flex align="center" justify="center" gap="sm">
                <IconFile size={20} />
                Documents
              </Flex>
            </Tabs.Tab>
            <Tabs.Tab value="Security" className="tab">
              <Flex align="center" justify="center" gap="sm">
                <IconLock size={20} />
                Security
              </Flex>
            </Tabs.Tab>
          </Tabs.List>
          <Divider w="100%" />
          <Tabs.Panel value="Personal Info">
            <PersonalContent />
          </Tabs.Panel>
          <Tabs.Panel value="Documents">
            <DocumentContent />
          </Tabs.Panel>
          <Tabs.Panel value="Security">
            <SecurityContent />
          </Tabs.Panel>
        </Tabs>
      </Card>
    </Stack>
  );
}
