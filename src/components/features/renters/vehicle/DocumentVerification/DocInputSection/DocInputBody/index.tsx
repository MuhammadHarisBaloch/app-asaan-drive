import { Stack, Card, FileInput, Text, FileInputProps } from "@mantine/core";
import { IconUpload } from "@tabler/icons-react";
import { JSX, useState } from "react";

interface DocInputBodyProps {
  title: string;
  subTitle: string;
  inputField: JSX.Element;
}
export default function DocInputBody({
  title,
  subTitle,
  inputField,
}: DocInputBodyProps) {
  return (
    <Stack>
      <Text fz="sm" c="black" fw={500}>
        {title}
      </Text>
      <Card
        radius="md"
        style={{ borderStyle: "dashed", borderColor: "#FF0005" }}
      >
        <Stack w="100%" gap="lg" align="center" py="lg">
          <IconUpload size={40} color="gray" />
          <Text fz="sm" c="black" lh={0.1}>
            {subTitle}
          </Text>
          <Text fz="xs">PNG, JPG, or PDF up to 5MB</Text>
          {inputField}
        </Stack>
      </Card>
    </Stack>
  );
}
