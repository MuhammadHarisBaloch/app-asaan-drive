import { Divider, Flex, Stack, Tabs, Text } from "@mantine/core";
import { IconFileAnalytics } from "@tabler/icons-react";
import { useState } from "react";
import OwnerDocCard from "./OwnerDocumentCard";

export default function AdminDocumentVerification() {
  const [value, setValue] = useState<string | null>("Renter Documents");

  return (
    <Stack p="lg" gap="xl">
      <Stack gap={0}>
        <Text fz="xl" fw={600} c="black">
          Document Verification
        </Text>
        <Text fz="md">Review and approve pending documents.</Text>
      </Stack>
      <Tabs variant="none" value={value} onChange={setValue}>
        <Tabs.List grow className="list">
          <Tabs.Tab value="Renter Documents" className="tab">
            <Flex align="center" justify="center" gap="sm">
              <IconFileAnalytics size={20} />
              Renter Documents
            </Flex>
          </Tabs.Tab>
          <Tabs.Tab value="Owner Documents" className="tab">
            <Flex align="center" justify="center" gap="sm">
              <IconFileAnalytics size={20} />
              Owner Documents
            </Flex>
          </Tabs.Tab>
        </Tabs.List>

        <Divider w="100%" />
        <Tabs.Panel value="Renter Documents">
          <OwnerDocCard role="renter" />
        </Tabs.Panel>
        <Tabs.Panel value="Owner Documents">
          <OwnerDocCard role="vehicles-owner" />
        </Tabs.Panel>
      </Tabs>
    </Stack>
  );
}
