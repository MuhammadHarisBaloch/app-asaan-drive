import DropzoneImagePreview from "@/components/features/core/dropzone-image-preview";
import { Button, Stack, Text } from "@mantine/core";
import { Dropzone, FileWithPath, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { IconUpload } from "@tabler/icons-react";
import { Dispatch, SetStateAction } from "react";

interface DocInputSectionProps {
  cnicFrontSideState: [
    FileWithPath[],
    Dispatch<SetStateAction<FileWithPath[]>>
  ];
  cnicBackSideState: [FileWithPath[], Dispatch<SetStateAction<FileWithPath[]>>];
  driversLicenseFrontSideState: [
    FileWithPath[],
    Dispatch<SetStateAction<FileWithPath[]>>
  ];
  driversLicenseBackSideState: [
    FileWithPath[],
    Dispatch<SetStateAction<FileWithPath[]>>
  ];
}

export default function DocInputSection({
  cnicFrontSideState,
  cnicBackSideState,
  driversLicenseFrontSideState,
  driversLicenseBackSideState,
}: DocInputSectionProps) {
  return (
    <>
      <Stack gap="xxs">
        <Text fz="lg" c="black" fw={600}>
          Driver's License
        </Text>
        <Text fz="xs">
          Upload both front and back sides of your driver's license
        </Text>
      </Stack>
      <Stack pt="md">
        <Text fz="sm" fw={500} c="black" lh={0.1}>
          Front Side
        </Text>
        <Dropzone
          onDrop={driversLicenseFrontSideState[1]}
          onReject={(files) => console.log("rejected files", files)}
          maxSize={5 * 1024 ** 2}
          accept={IMAGE_MIME_TYPE}
          style={{ borderRadius: "10px", borderColor: "#FF0005" }}
        >
          <Stack
            align="center"
            justify="center"
            gap="xl"
            mih={220}
            style={{ pointerEvents: "none" }}
          >
            <Dropzone.Idle>
              <IconUpload size={40} color="gray" />
            </Dropzone.Idle>
            <div>
              <Stack align="center">
                <Text fz="sm" c="black" fw={500} lh={0.1}>
                  Upload front side of your driver's license
                </Text>
                <Text fz="xs">PNG, JPG, or PDF up to 5MB</Text>
                <Button leftSection={<IconUpload size={20} color="white" />}>
                  Choose File
                </Button>
              </Stack>
            </div>
          </Stack>
        </Dropzone>
        <DropzoneImagePreview images={driversLicenseFrontSideState[0]} />
      </Stack>
      <Stack pt="md">
        <Text fz="sm" fw={500} c="black" lh={0.1}>
          Back Side
        </Text>
        <Dropzone
          onDrop={driversLicenseBackSideState[1]}
          onReject={(files) => console.log("rejected files", files)}
          maxSize={5 * 1024 ** 2}
          accept={IMAGE_MIME_TYPE}
          style={{ borderRadius: "10px", borderColor: "#FF0005" }}
        >
          <Stack
            align="center"
            justify="center"
            gap="xl"
            mih={220}
            style={{ pointerEvents: "none" }}
          >
            <Dropzone.Idle>
              <IconUpload size={40} color="gray" />
            </Dropzone.Idle>
            <div>
              <Stack align="center">
                <Text fz="sm" c="black" fw={500} lh={0.1}>
                  Upload Back side of your driver's license
                </Text>
                <Text fz="xs">PNG, JPG, or PDF up to 5MB</Text>
                <Button leftSection={<IconUpload size={20} color="white" />}>
                  Choose File
                </Button>
              </Stack>
            </div>
          </Stack>
        </Dropzone>
        <DropzoneImagePreview images={driversLicenseBackSideState[0]} />
      </Stack>
      <Stack gap="xxs">
        <Text fz="lg" c="black" fw={600}>
          Government Issued ID (CNIC/Passport)
        </Text>
        <Text fz="xs">
          Upload both front and back sides of your national ID card, passport,
          or other government-issued identification
        </Text>
      </Stack>
      <Stack pt="md">
        <Text fz="sm" fw={500} c="black" lh={0.1}>
          Front Side
        </Text>
        <Dropzone
          onDrop={cnicFrontSideState[1]}
          onReject={(files) => console.log("rejected files", files)}
          maxSize={5 * 1024 ** 2}
          accept={IMAGE_MIME_TYPE}
          style={{ borderRadius: "10px", borderColor: "#FF0005" }}
        >
          <Stack
            align="center"
            justify="center"
            gap="xl"
            mih={220}
            style={{ pointerEvents: "none" }}
          >
            <Dropzone.Idle>
              <IconUpload size={40} color="gray" />
            </Dropzone.Idle>
            <div>
              <Stack align="center">
                <Text fz="sm" c="black" fw={500} lh={0.1}>
                  Upload front side of your CNIC ID
                </Text>
                <Text fz="xs">PNG, JPG, or PDF up to 5MB</Text>
                <Button leftSection={<IconUpload size={20} color="white" />}>
                  Choose File
                </Button>
              </Stack>
            </div>
          </Stack>
        </Dropzone>
        <DropzoneImagePreview images={cnicFrontSideState[0]} />
      </Stack>
      <Stack pt="md">
        <Text fz="sm" fw={500} c="black" lh={0.1}>
          Back Side
        </Text>
        <Dropzone
          onDrop={cnicBackSideState[1]}
          onReject={(files) => console.log("rejected files", files)}
          maxSize={5 * 1024 ** 2}
          accept={IMAGE_MIME_TYPE}
          style={{ borderRadius: "10px", borderColor: "#FF0005" }}
        >
          <Stack
            align="center"
            justify="center"
            gap="xl"
            mih={220}
            style={{ pointerEvents: "none" }}
          >
            <Dropzone.Idle>
              <IconUpload size={40} color="gray" />
            </Dropzone.Idle>
            <div>
              <Stack align="center">
                <Text fz="sm" c="black" fw={500} lh={0.1}>
                  Upload Back side of your CNIC ID
                </Text>
                <Text fz="xs">PNG, JPG, or PDF up to 5MB</Text>
                <Button leftSection={<IconUpload size={20} color="white" />}>
                  Choose File
                </Button>
              </Stack>
            </div>
          </Stack>
        </Dropzone>
        <DropzoneImagePreview images={cnicBackSideState[0]} />
      </Stack>
    </>
  );
}
