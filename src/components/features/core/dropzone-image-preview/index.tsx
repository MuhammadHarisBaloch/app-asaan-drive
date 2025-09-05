import { Flex, Image } from "@mantine/core";
import { FileWithPath } from "@mantine/dropzone";
import { useEffect, useState } from "react";
import StorageService from "../../../../features/storage";

type DropzoneImagePreviewProps = {
  images: FileWithPath[];
};

function DropzoneImagePreview({ images }: DropzoneImagePreviewProps) {
  // if (images.length === 0) return null;

  const [fileUrls, setFileUrls] = useState<string[]>([]);
  // useEffect(() => {
  //   console.log("Fetching file from storage...");
  //   const getFileUrls = async () => {
  //     const urls = await Promise.all(
  //       [
  //         "68bb51df001fbe3939c7",
  //         "68bb51df001f9ab5b3eb",
  //         "68bb4d9c002f4078bf40",
  //       ].map((image) => StorageService.shared.downloadFile(image))
  //     );
  //     console.log("File URLs:", urls);
  //     return urls;
  //   };

  //   getFileUrls().then(setFileUrls);
  // }, []);

  return (
    <Flex h={100} gap="md" w="100%">
      {/* {fileUrls.map((url, index) => (
        <Image key={index} src={url} alt="" w="auto" h="100%" />
      ))} */}
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
