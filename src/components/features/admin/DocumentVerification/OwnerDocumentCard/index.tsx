import { data } from "@/constants/Data";
import Images from "@/constants/Images";
import {
  Badge,
  Button,
  Card,
  Center,
  Flex,
  SimpleGrid,
  Stack,
  Text,
} from "@mantine/core";
import { IconClipboardData } from "@tabler/icons-react";
import ViewDetailsModal from "./ViewDetailsModal";

const DocsCardInfo = [
  {
    vehicleName: "Honda CD 70",
    status: "pending",
    documents: [Images.dummyDocs.doc1, Images.dummyDocs.doc2],
  },
  {
    vehicleName: "Mountain Cycle",
    status: "approve",
    documents: [Images.dummyDocs.doc3, Images.dummyDocs.doc4],
  },
  {
    vehicleName: "CNG Rakshaw",
    status: "decline",
    documents: [Images.dummyDocs.doc5, Images.dummyDocs.doc6],
  },
  {
    vehicleName: "Haris Baloch",
    status: "pending",
    documents: [Images.dummyDocs.doc2, Images.dummyDocs.doc5],
  },
];

export default function OwnerDocCard() {
  return (
    <SimpleGrid cols={3} py="lg" spacing="xl">
      {DocsCardInfo.map((data, i) => {
        return (
          <Card
            key={i}
            p="xl"
            radius="md"
            style={{
              borderLeft: `4px solid ${
                data.status === "pending"
                  ? "orange"
                  : data.status === "approve"
                  ? "green"
                  : data.status === "decline"
                  ? "red"
                  : ""
              }`,
              filter: "drop-shadow(1px 1px 2px #3d3d3d5e)",
            }}
          >
            <Stack gap="md">
              <Flex gap="md">
                <Center
                  h={50}
                  w={50}
                  bg="pink.1"
                  style={{ borderRadius: "10px" }}
                >
                  <IconClipboardData color="red" size={30} />
                </Center>
                <Stack>
                  <Text c="black" fz="md" fw={500} lh={1.2}>
                    {data.vehicleName} <br />
                    Documents
                  </Text>
                  <Badge
                    bg={
                      data.status === "pending"
                        ? "orange.0"
                        : data.status === "approve"
                        ? "green.1"
                        : data.status === "decline"
                        ? "pink.1"
                        : ""
                    }
                    c={
                      data.status === "pending"
                        ? "orange.4"
                        : data.status === "approve"
                        ? "green"
                        : data.status === "decline"
                        ? "pink"
                        : ""
                    }
                    fw={500}
                    styles={{
                      root: {
                        textAlign: "center",
                        textTransform: "lowercase",
                      },
                    }}
                  >
                    {data.status}
                  </Badge>
                </Stack>
              </Flex>
              <Text fz="xs">Uploaded: 20-12-2025</Text>
              <Button
                onClick={() => {
                  ViewDetailsModal(data.documents, data.status);
                }}
              >
                View Details
              </Button>
            </Stack>
          </Card>
        );
      })}
    </SimpleGrid>
  );
}
