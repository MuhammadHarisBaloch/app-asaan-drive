import { data } from "@/constants/Data";
import { Card, Grid, GridCol, Stack, Flex, Text } from "@mantine/core";
import { IconUsers, IconPointFilled, IconShield } from "@tabler/icons-react";

export default function EmergencyContactCard() {
  return (
    <Card
      p="xl"
      w="100%"
      radius="md"
      style={{
        filter: "drop-shadow(1px 1px 4px rgba(122, 122, 122, 0.21))",
      }}
    >
      <Grid align="center">
        <GridCol span={6}>
          <Stack gap="xl">
            <Text fz="xl" c="black" fw={600}>
              Your Emergency Contacts
            </Text>
            <Flex gap="md">
              <IconUsers size={25} color="red" />
              <Text fz="md" fw={500} c="black">
                Automatic Notifications
              </Text>
            </Flex>
            <Text fz="sm">
              When you press the emergency button, we also notify:
            </Text>
            <Stack>
              {data.emergencyDetails.contactDetails.map((data, index) => {
                return (
                  <Flex key={index} align="center" gap="sm">
                    <IconPointFilled size={20} color="red" />
                    <Text fz="sm">{data}</Text>
                  </Flex>
                );
              })}
            </Stack>
          </Stack>
        </GridCol>
        <GridCol span={6}>
          <Card
            p="xl"
            w="100%"
            bg="orange.1"
            radius="md"
            style={{ border: "1px solid #fef08a" }}
          >
            <Stack mb="xxl">
              <Flex align="center" gap="md">
                <IconShield size={20} color="brown" />
                <Text fz="md" fw={500} c="brown.6">
                  Privacy Note
                </Text>
              </Flex>
              <Text fz="xs" c="brown.5">
                Your location and emergency details are only shared with
                authorized personnel during active emergencies. All data is
                handled according to our privacy policy.
              </Text>
            </Stack>
          </Card>
        </GridCol>
      </Grid>
    </Card>
  );
}
