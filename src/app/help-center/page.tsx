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
  Container,
} from "@mantine/core";
import { IconMail, IconPhone } from "@tabler/icons-react";

export default function HelpCenterPage() {
  return (
    <Container size="lg" py="xl" px="md">
      <Stack align="center" gap="xl" w="100%">
        <Stack align="center" gap="xs">
          <Title order={3} ta="center">
            Help Center
          </Title>
          <Text fz={{ base: "sm", sm: "md" }} ta="center" maw="800px">
            Find answers to common questions about AsaanDrive. Browse through
            our help topics below or contact our support team for personalized
            assistance.
          </Text>
        </Stack>

        {/* FAQ Section */}
        <SimpleGrid w="100%" cols={{ base: 1, md: 2 }} spacing="xl">
          {data.helpCenter.faq.map((data, index) => {
            return <FaqCard faqs={data.faqList} key={index} {...data} />;
          })}
        </SimpleGrid>

        {/* Quick Help Section */}
        <Card
          radius="md"
          w="100%"
          style={{ filter: "drop-shadow(1px 1px 2px rgba(0, 0, 0, 0.24))" }}
        >
          <Stack align="center" py="lg" px={{ base: "md", sm: "lg" }}>
            <Text fz={{ base: "lg", sm: "xl" }} c="black" fw={500}>
              Quick Help
            </Text>
            <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="xl" w="100%">
              {data.helpCenter.quickHelpCardList.map((data, index) => {
                return <QuickHelpCard key={index} {...data} />;
              })}
            </SimpleGrid>
          </Stack>
        </Card>

        {/* Contact Section */}
        <Card bg="red.4" radius="md" w="100%">
          <Stack align="center" gap="lg" px={{ base: "md", sm: "xl" }} py="lg">
            <Title order={4} c="white" ta="center">
              Need more help?
            </Title>
            <Text fz="sm" ta="center" c="pink.1" maw="600px">
              Can't find the answer you're looking for? Our friendly support
              team is here to help you with any questions or concerns you may
              have about AsaanDrive.
            </Text>
            <Flex
              gap="md"
              direction={{ base: "column", sm: "row" }}
              justify="center"
              w="100%"
            >
              <Button
                leftSection={<IconMail size={18} color="red" />}
                size="md"
                fz="sm"
                bg="white"
                c="red.4"
                maw={{ base: "100%", sm: "200px" }}
              >
                Contact Support
              </Button>
              <Button
                leftSection={<IconPhone size={18} color="white" />}
                size="md"
                fz="sm"
                bg="red.3"
                c="white"
                style={{ border: "1px solid #f87171" }}
                maw={{ base: "100%", sm: "200px" }}
              >
                Call Now
              </Button>
            </Flex>
          </Stack>
        </Card>

        {/* Resources Section */}
        <Card
          w="100%"
          radius="md"
          style={{ filter: "drop-shadow(1px 1px 2px rgba(0, 0, 0, 0.24))" }}
        >
          <Stack align="center" p={{ base: "md", sm: "xl" }} gap="lg">
            <Text c="black" fz={{ base: "md", sm: "lg" }} fw={500}>
              Popular Resources
            </Text>
            <SimpleGrid cols={{ base: 1, sm: 3 }} w="100%" spacing="xl">
              {data.helpCenter.resourceCardList.map((data, index) => {
                return <ResourcesCard key={index} {...data} />;
              })}
            </SimpleGrid>
          </Stack>
        </Card>
      </Stack>
    </Container>
  );
}
