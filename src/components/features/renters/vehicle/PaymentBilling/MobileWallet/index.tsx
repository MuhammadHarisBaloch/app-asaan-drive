import { data } from "@/constants/Data";
import { Button, Center, Flex, Stack, TextInput } from "@mantine/core";
import Image from "next/image";
import { useState } from "react";

export default function MobileWallet({ onConfirm }: { onConfirm: () => void }) {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <Stack py="lg" gap="lg">
      <Flex gap="xl">
        {data.renter.vehicle.paymentMethods.MobileWalletOption.map(
          (option, index) => {
            return (
              <Center
                key={index}
                w="15%"
                bg="white.2"
                py="md"
                onClick={() => {
                  setSelected(option.id);
                }}
                style={{
                  borderRadius: "10px",
                  filter: "drop-shadow(1px 1px 2px #63636333)",
                  border: selected == option.id ? "2px solid red" : "",
                  cursor: "pointer",
                }}
              >
                <Image
                  src={option.src}
                  alt={option.alt}
                  height={100}
                  width={100}
                  sizes="100vw"
                  style={{
                    width: "50%",
                    height: "auto",
                  }}
                />
              </Center>
            );
          }
        )}
      </Flex>
      <TextInput
        w="100%"
        label="Mobile Number"
        placeholder="0000 000 0000"
        radius="md"
        size="md"
        maxLength={11}
        styles={{
          label: {
            fontSize: "16px",
            fontWeight: 400,
          },
          input: {
            fontSize: "16px",
          },
        }}
      />
      <TextInput
        w="100%"
        label="Account Holder Name"
        placeholder="Enter account holder name"
        radius="md"
        size="md"
        styles={{
          label: {
            fontWeight: 400,
            fontSize: "16px",
          },
          input: {
            fontSize: "16px",
          },
        }}
      />
      <Button mt="lg" size="md" onClick={onConfirm}>
        Pay Now - Rs.2650
      </Button>
    </Stack>
  );
}
