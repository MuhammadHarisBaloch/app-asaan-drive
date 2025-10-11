import { Input } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";

interface UserSearchInputProps {
  value: string;
  onChange: (val: string) => void;
}

export default function UserSearchInput({
  value,
  onChange,
}: UserSearchInputProps) {
  return (
    <Input
      w="100%"
      size="md"
      radius="md"
      placeholder="Search users by email or name..."
      leftSection={<IconSearch color="gray" size={20} />}
      value={value}
      onChange={(event) => onChange(event.currentTarget.value)}
    />
  );
}
