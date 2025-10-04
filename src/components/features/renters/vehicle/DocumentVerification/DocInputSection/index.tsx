import { Stack, Text, Button } from "@mantine/core";
import { IconUpload } from "@tabler/icons-react";
import { Dropzone, IMAGE_MIME_TYPE, FileWithPath } from "@mantine/dropzone";
import { useEffect, useState } from "react";

interface DocPhotos {
  cnicFrontSide: FileWithPath[];
  cnicBackSide: FileWithPath[];
  driversLicenseFrontSide: FileWithPath[];
  driversLicenseBackSide: FileWithPath[];
}
interface DocInputSectionpProps {
  onFormSubmit: (docs: DocPhotos) => void;
}

export default function DocInputSection({
  onFormSubmit,
}: DocInputSectionpProps) {
  const [cnicFrontSide, setCnicFrontSide] = useState<FileWithPath[]>([]);
  const [cnicBackSide, setCnicBackSide] = useState<FileWithPath[]>([]);
  const [driversLicenseFrontSide, setDriversLicenseFrontSide] = useState<
    FileWithPath[]
  >([]);
  const [driversLicenseBackSide, setDriversLicenseBackSide] = useState<
    FileWithPath[]
  >([]);

  useEffect(() => {
    if (
      cnicFrontSide.length > 0 &&
      cnicBackSide.length > 0 &&
      driversLicenseFrontSide.length > 0 &&
      driversLicenseBackSide.length > 0
    ) {
      onFormSubmit({
        cnicFrontSide,
        cnicBackSide,
        driversLicenseFrontSide,
        driversLicenseBackSide,
      });
    }
  }, [
    cnicFrontSide,
    cnicBackSide,
    driversLicenseFrontSide,
    driversLicenseBackSide,
  ]);
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
          onDrop={setDriversLicenseFrontSide}
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
      </Stack>
      <Stack pt="md">
        <Text fz="sm" fw={500} c="black" lh={0.1}>
          Back Side
        </Text>
        <Dropzone
          onDrop={setDriversLicenseBackSide}
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
          onDrop={setCnicFrontSide}
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
      </Stack>
      <Stack pt="md">
        <Text fz="sm" fw={500} c="black" lh={0.1}>
          Back Side
        </Text>
        <Dropzone
          onDrop={setCnicBackSide}
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
      </Stack>
    </>
  );
}
