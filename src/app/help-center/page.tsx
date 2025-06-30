import FaqCard from "@/components/features/help-center/FaqCard";
import { data } from "@/constants/Data";
import { Stack, Title, Text, SimpleGrid } from "@mantine/core";

export default function HelpCenterPage() {
  return (
    <Stack py="xxl" px="lg" align="center" gap="xxl" w="100%">
      <Stack align="center" gap="xs">
        <Title order={3}>Help Center</Title>
        <Text fz="md" ta="center" w="70%">
          Find answers to common questions about AsaanDrive. Browse through our
          help topics below or contact our support team for personalized
          assistance.
        </Text>
      </Stack>
      <SimpleGrid cols={2} px="3xl" spacing="xxl">
        {data.helpCenter.faq.map((data, index) => {
          return <FaqCard faqs={data.faqList} key={index} {...data} />;
        })}
      </SimpleGrid>
    </Stack>
  );
}
