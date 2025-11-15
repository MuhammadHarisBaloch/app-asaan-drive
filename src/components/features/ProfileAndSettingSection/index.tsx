import { Card, Divider, Flex, Stack, Tabs, Text } from "@mantine/core";
import { IconFile, IconLock, IconUser } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import PersonalInfoContent from "./PersonalInfoContent";
import SettingContent from "./SettingContent";
import DocumentContent from "./DocumentContent";

interface ProfileAndSettingSectionProps {
  defaultTab?: string;
}
export default function ProfileAndSettingSection({
  defaultTab,
}: ProfileAndSettingSectionProps) {
  const [value, setValue] = useState<string | null>("Personal Info");

  useEffect(() => {
    if (defaultTab) {
      setValue(defaultTab);
    }
  }, [defaultTab]);

  return (
    <Stack p="lg" gap="xl">
      <Stack gap={0}>
        <Text fz="xl" c="black" fw={600}>
          Profile & Settings
        </Text>
        <Text fz="12px">
          Manage your account information and security settings
        </Text>
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
            <PersonalInfoContent />
          </Tabs.Panel>
          <Tabs.Panel value="Documents">
            <DocumentContent />
          </Tabs.Panel>
          <Tabs.Panel value="Security">
            <SettingContent />
          </Tabs.Panel>
        </Tabs>
      </Card>
    </Stack>
  );
}
