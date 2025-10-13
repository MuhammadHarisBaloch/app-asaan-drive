import { data } from "@/constants/Data";
import Images from "@/constants/Images";
import { Button, Flex, Stack } from "@mantine/core";
import { modals } from "@mantine/modals";
import Image from "next/image";

export default function ViewDetailsModal(documents: string[], status: string) {
  return modals.open({
    title: "Documents Details",
    children: (
      <>
        <Stack w="100%" align="center">
          {documents.map((d, i) => {
            return (
              <div
                key={i}
                style={{
                  position: "relative",
                  width: "80%",
                  height: "300px",
                  borderRadius: "10px",
                  overflow: "hidden",
                }}
              >
                <Image
                  key={i}
                  src={d}
                  alt={`document-${i}`}
                  fill
                  style={{
                    objectFit: "contain",
                  }}
                  sizes="(max-width: 768px) 100vw, 600px"
                />
              </div>
            );
          })}
          {status === "pending" ? (
            <Flex w="100%" px="xl" gap="lg">
              <Button
                fullWidth
                bg="blue.1"
                c="blue"
                style={{ border: "1px solid blue" }}
              >
                Approve
              </Button>
              <Button
                fullWidth
                bg="pink.1"
                c="red.4"
                style={{ border: "1px solid red" }}
              >
                Decline
              </Button>
            </Flex>
          ) : null}
        </Stack>
      </>
    ),
  });
}
