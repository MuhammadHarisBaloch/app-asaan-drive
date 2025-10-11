import { Flex, Skeleton } from "@mantine/core";

export default function UserRowSkeleton() {
  return (
    <Flex
      py="md"
      px="lg"
      style={{
        display: "grid",
        gridTemplateColumns: "1.5fr 1fr 1fr 1fr 1fr 1fr 0.5fr",
        alignItems: "center",
        borderTop: "1px solid #f1f1f1",
      }}
    >
      <Skeleton height={30} width="60%" />
      <Skeleton height={22} width={80} />
      <Skeleton height={22} width={60} />
      <Skeleton height={22} width={80} />
      <Skeleton height={22} width={100} />
      <Skeleton height={22} width={80} />
      <Skeleton height={22} width={24} />
    </Flex>
  );
}
