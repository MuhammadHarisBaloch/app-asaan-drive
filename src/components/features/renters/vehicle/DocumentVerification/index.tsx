import {
  Box,
  Button,
  Card,
  Flex,
  Grid,
  GridCol,
  List,
  Stack,
  Text,
} from "@mantine/core";
import { IconExclamationCircle, IconShield } from "@tabler/icons-react";
import BookingSummary from "./BookingSummary";
import DocInputSection from "./DocInputSection";
import { data } from "@/constants/Data";

interface DocumentVerificationProps {
  onClick: () => void;
}
export default function DocumentVerification({
  onClick,
}: DocumentVerificationProps) {
  return (
    <Stack w="100%" align="center" py="3xl" gap="xxl">
      <Stack align="center" gap="xxs">
        <Text fz="30px" fw={600} c="black">
          Document Verification
        </Text>
        <Text fz="md">Complete the details below to finalize your booking</Text>
      </Stack>
      <Grid w="100%" gutter="xxl">
        <GridCol span={8}>
          <Card w="100%" p="lg" withBorder radius="lg">
            <Stack gap="lg">
              <Flex
                bg="blue.0"
                px="lg"
                py="md"
                gap="md"
                style={{ border: "1px solid #95b8ea", borderRadius: "10px" }}
              >
                <IconShield size={25} color="blue" />
                <Stack gap="xs">
                  <Text c="blue.6" fz="sm" fw={500}>
                    Secure Document Upload
                  </Text>
                  <Text fz="12px" c="blue.6">
                    Your documents are encrypted and securely stored. We only
                    use them for identity verification and comply with data
                    protection regulations.
                  </Text>
                </Stack>
              </Flex>
              <DocInputSection />
              <Box
                bg="orange.1"
                p="lg"
                style={{ border: "1px solid #fff69f", borderRadius: "10px" }}
              >
                <Flex align="flex-start" gap="sm">
                  <IconExclamationCircle size={20} color="#6D3503" />
                  <Stack>
                    <Text c="brown" fz="xs" fw={500}>
                      Important Information
                    </Text>
                    <List size="xs" withPadding>
                      {data.renter.vehicle.documentVerification.notices.map(
                        (data, index) => {
                          return (
                            <List.Item key={index} c="brown.6">
                              {data}
                            </List.Item>
                          );
                        }
                      )}
                    </List>
                  </Stack>
                </Flex>
              </Box>
              <Button size="md" onClick={onClick}>
                Continue to Payment
              </Button>
            </Stack>
          </Card>
        </GridCol>
        <GridCol
          span={4}
          style={{ position: "sticky", top: 80, alignSelf: "flex-start" }}
        >
          <BookingSummary />
        </GridCol>
      </Grid>
    </Stack>
  );
}
