"use client";
import { data } from "@/constants/Data";
import Images from "@/constants/Images";
import {
  Button,
  Center,
  Divider,
  Flex,
  Grid,
  GridCol,
  Group,
  Input,
  Stack,
  Text,
  Loader,
} from "@mantine/core";
import { IconCurrentLocationFilled, IconSearch } from "@tabler/icons-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/networking/firebase";
import { useUserStatus } from "@/utils/useUserStatus";
import VerificationOverlay from "@/components/features/VerificationOverlay";

export default function FindNearMePage() {
  const [currentUser, userLoading] = useAuthState(auth);
  const { userData, loading } = useUserStatus(currentUser);
  const [showVerificationOverlay, setShowVerificationOverlay] = useState(false);

  // Check user verification status
  useEffect(() => {
    if (!userLoading && !loading && userData) {
      // Show overlay if documents are not verified OR user is blocked
      const shouldShowOverlay =
        userData.documentStatus !== "Verified" || userData.status === "Blocked";

      if (shouldShowOverlay) {
        setShowVerificationOverlay(true);
      }
    }
  }, [userData, loading, userLoading]);

  // Show loading while checking authentication and user status
  if (userLoading || loading) {
    return (
      <Center h="100vh">
        <Loader size="lg" color="red.4" />
      </Center>
    );
  }

  return (
    <>
      <Stack px="lg" py="3xl" gap="xl">
        <Group justify="space-between">
          <Text fz="xl" c="black" fw={500}>
            Find Vehicles Near You
          </Text>
          <Flex gap="lg">
            <Input
              h="100%"
              rightSection={<IconSearch size={20} color="gray" />}
              placeholder="Search Vehicles..."
              radius="md"
            />
            <Button
              leftSection={
                <IconCurrentLocationFilled size={20} color="white" />
              }
            >
              Locate me
            </Button>
          </Flex>
        </Group>
        <Grid gutter={0}>
          <GridCol span={7} h="100%">
            <Image
              src={Images.Map.findNearMeMap}
              alt="map"
              height={100}
              width={100}
              sizes="100vw"
              style={{ height: "auto", width: "100%" }}
            />
          </GridCol>
          <GridCol span={5}>
            <Divider w="100%" />
            <Stack p="md" gap="xs">
              <Text fz="md" fw={500} c="black">
                4 vehicles Found
              </Text>
              <Text fz="sm">Click 'Locate me' to find vehicles Near you</Text>
            </Stack>
            <Divider w="100%" />
            {data.renter.findNearMe.nearestVehicle.map((data, index) => {
              return (
                <Stack key={index}>
                  <Flex p="md" justify="space-between">
                    <Flex gap="md">
                      <Image
                        src={data.image}
                        alt="map"
                        height={100}
                        width={100}
                        sizes="100vw"
                        style={{ height: "auto", width: "8rem" }}
                      />
                      <Stack gap="xs">
                        <Text fz="md" fw={500} c="black">
                          {data.name}
                        </Text>
                        <Text fz="sm">{data.type}</Text>
                      </Stack>
                    </Flex>
                    <Stack justify="space-between">
                      <Text fz="md" c="red.4" fw={500}>
                        {data.rent}
                      </Text>
                      <Center
                        px="md"
                        bg={data.tagColor}
                        style={{ borderRadius: "10px" }}
                      >
                        <Text fz="12px" c={data.tagTextColor}>
                          {data.avaibility}
                        </Text>
                      </Center>
                    </Stack>
                  </Flex>
                  <Divider w="100%" />
                </Stack>
              );
            })}
          </GridCol>
        </Grid>
      </Stack>

      {/* Verification Overlay */}
      {showVerificationOverlay && userData && (
        <VerificationOverlay
          isOpen={showVerificationOverlay}
          userData={userData}
        />
      )}
    </>
  );
}
