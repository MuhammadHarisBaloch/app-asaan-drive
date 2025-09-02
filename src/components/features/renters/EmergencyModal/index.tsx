import { Button, Center, Stack, Text } from "@mantine/core";
import { modals } from "@mantine/modals";
import { notifications } from "@mantine/notifications";
import { IconAlertTriangle, IconPhone } from "@tabler/icons-react";

export default function EmergencyModal() {
  return modals.open({
    title: "",
    children: (
      <>
        <Stack align="center" px="xl">
          <Center h={60} w={60} bg="red.0" style={{ borderRadius: "50%" }}>
            <IconAlertTriangle size={30} color="red" />
          </Center>
          <Text fz="lg" fw={600} c="black">
            Emergency Alert
          </Text>
          <Text fz="sm" ta="center">
            This will immediately notify our emergency response team and share
            your location. Use only for real emergencies.
          </Text>
          <Button
            leftSection={<IconPhone size={20} color="white" />}
            w="100%"
            size="md"
            fz="sm"
            fw={400}
            onClick={() => {
              modals.closeAll();
              notifications.show({
                title: "Emergency alert sent!",
                message:
                  "Our support team has been notified and will contact you shortly.",
                color: "red",
              });
            }}
          >
            Send Emergency Alert
          </Button>
          <Button
            w="100%"
            size="md"
            fz="sm"
            fw={400}
            variant="outline"
            color="gray"
            onClick={() => modals.closeAll()}
          >
            Cancel
          </Button>
          <Text fz="xs" ta="center">
            For non-emergencies, contact support at <br />
            <span style={{ fontWeight: 500 }}> 0800-ASAAN-123 </span>
          </Text>
        </Stack>
      </>
    ),
  });
}
