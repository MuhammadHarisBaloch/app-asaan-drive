import FaqCard from "@/components/features/help-center/FaqCard";
import QuickHelpCard from "@/components/features/help-center/QuickHelpCard";
import ResourcesCard from "@/components/features/help-center/ResourcesCard";
import { data } from "@/constants/Data";
import {
  Stack,
  Title,
  Text,
  SimpleGrid,
  Card,
  Flex,
  Button,
} from "@mantine/core";
import { IconMail, IconPhone } from "@tabler/icons-react";

export default function HelpCenterPage() {
  return (
    <Stack py="xxl" px="3xl" align="center" gap="xxl" w="100%">
      <Stack align="center" gap="xs">
        <Title order={3}>Help Center</Title>
        <Text fz="md" ta="center" w="70%">
          Find answers to common questions about AsaanDrive. Browse through our
          help topics below or contact our support team for personalized
          assistance.
        </Text>
      </Stack>
      <SimpleGrid cols={2} spacing="xxl">
        {data.helpCenter.faq.map((data, index) => {
          return <FaqCard faqs={data.faqList} key={index} {...data} />;
        })}
      </SimpleGrid>
      <Card
        radius="md"
        style={{ filter: "drop-shadow(1px 1px 2px rgba(0, 0, 0, 0.24))" }}
      >
        <Stack align="center" py="lg" px="lg">
          <Text fz="xl" c="black" fw={500}>
            Quick Help
          </Text>
          <SimpleGrid cols={3} spacing="xxl">
            {data.helpCenter.quickHelpCardList.map((data, index) => {
              return <QuickHelpCard key={index} {...data} />;
            })}
          </SimpleGrid>
        </Stack>
      </Card>
      <Card bg="red.4" radius="md">
        <Stack align="center" gap="xl" px="10rem " py="lg">
          <Title order={4} c="white">
            Need more help?
          </Title>
          <Text fz="sm" ta="center" c="pink.1">
            Can't find the answer you're looking for? Our friendly support team
            is here to help you with any questions or concerns you may have
            about AsaanDrive.
          </Text>
          <Flex gap="xl">
            <Button
              leftSection={<IconMail size={20} color="red" />}
              size="lg"
              fz="sm"
              bg="white"
              c="red.4"
            >
              Contact Support
            </Button>
            <Button
              leftSection={<IconPhone size={20} color="white" />}
              size="lg"
              fz="sm"
              bg="red.3"
              c="white"
              style={{ border: "1px solid #f87171" }}
            >
              call now
            </Button>
          </Flex>
        </Stack>
      </Card>
      <Card
        w="100%"
        radius="md"
        style={{ filter: "drop-shadow(1px 1px 2px rgba(0, 0, 0, 0.24))" }}
      >
        <Stack align="center" p="xl" gap="xl">
          <Text c="black" fz="lg" fw={500}>
            Popular Resources
          </Text>
          <SimpleGrid cols={3} w="100%" spacing="xxl">
            {data.helpCenter.resourceCardList.map((data, index) => {
              return <ResourcesCard key={index} {...data} />;
            })}
          </SimpleGrid>
        </Stack>
      </Card>
    </Stack>
  );
}
