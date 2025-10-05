import { Flex, Image } from "@mantine/core";
import { FileWithPath } from "@mantine/dropzone";
import { useState } from "react";

type DropzoneImagePreviewProps = {
  images: FileWithPath[];
};

function DropzoneImagePreview({ images }: DropzoneImagePreviewProps) {
  const [fileUrls, setFileUrls] = useState<string[]>([]);
  return (
    <Flex h={100} gap="md" w="100%">
      {images.map((file, index) => (
        <Image
          key={index}
          src={URL.createObjectURL(file)}
          alt=""
          w="auto"
          h="100%"
        />
      ))}
    </Flex>
  );
}
export default DropzoneImagePreview;
