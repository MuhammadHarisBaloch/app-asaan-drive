import { Button, Card, Stack, Text, PasswordInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";

export default function SettingContent() {
  const form = useForm({
    initialValues: {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
    validate: {
      currentPassword: (value) =>
        value === "" ? "please insert the current password" : null,
      newPassword: (value) =>
        value === "" ? "please insert the new password" : null,
      confirmNewPassword: (value, values) =>
        value !== values.newPassword ? "Passwords did not match" : null,
    },
  });
  return (
    <Card withBorder radius="md" my="xl">
      <form
        onSubmit={form.onSubmit((values) => {
          try {
            notifications.show({
              title: "Password Change Successfully",
              message: "",
              color: "green",
            });
            console.log(values);
          } catch (error) {
            notifications.show({
              title: "Something Wrong",
              message: `${error}`,
              color: "red",
            });
          }
        })}
      >
        <Stack gap="xl" p="lg">
          <Text fz="md" fw={500} c="black">
            Change Password
          </Text>
          <PasswordInput
            w="100%"
            size="md"
            label="Current Password"
            radius="md"
            key={form.key("currentPassword")}
            {...form.getInputProps("currentPassword")}
            styles={{
              label: { fontSize: "14px" },
              input: { fontSize: "16px" },
            }}
          />
          <PasswordInput
            w="100%"
            size="md"
            label="New Password"
            radius="md"
            key={form.key("newPassword")}
            {...form.getInputProps("newPassword")}
            styles={{
              label: { fontSize: "14px" },
              input: { fontSize: "16px" },
            }}
          />
          <PasswordInput
            w="100%"
            size="md"
            label="Confirm New Password"
            radius="md"
            key={form.key("confirmNewPassword")}
            {...form.getInputProps("confirmNewPassword")}
            styles={{
              label: { fontSize: "14px" },
              input: { fontSize: "16px" },
            }}
          />
          <Button w="20%" fz="xs" size="md" type="submit">
            Update Password
          </Button>
        </Stack>
      </form>
    </Card>
  );
}
