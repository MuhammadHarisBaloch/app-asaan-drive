"use client";

import { useState } from "react";
import {
  Container,
  Title,
  Text,
  Stack,
  Group,
  Card,
  List,
  ThemeIcon,
  Divider,
  Button,
  Flex,
} from "@mantine/core";
import { IconCheck, IconShield, IconFileText } from "@tabler/icons-react";

export default function TermsPrivacyPage() {
  const [activeTab, setActiveTab] = useState<"terms" | "privacy">("terms");

  return (
    <Container size="lg" py="xl" px="md">
      {/* Header Section */}
      <Stack gap="lg" mb="xl">
        <Title order={3} c="black" ta="center">
          Legal Information
        </Title>
        <Text ta="center" fz={{ base: "md", sm: "lg" }}>
          Please read our Terms & Conditions and Privacy Policy carefully to
          understand how AsaanDrive operates and protects your information.
        </Text>

        {/* Tab Buttons */}
        <Group justify="center" mb="md" wrap="wrap">
          <Button
            variant={activeTab === "terms" ? "filled" : "light"}
            color="red.4"
            size="md"
            leftSection={<IconFileText size={20} />}
            onClick={() => setActiveTab("terms")}
            maw={{ base: "100%", sm: "auto" }}
          >
            Terms & Conditions
          </Button>
          <Button
            variant={activeTab === "privacy" ? "filled" : "light"}
            color="red.4"
            size="md"
            leftSection={<IconShield size={20} />}
            onClick={() => setActiveTab("privacy")}
            maw={{ base: "100%", sm: "auto" }}
          >
            Privacy Policy
          </Button>
        </Group>

        <Divider />
      </Stack>

      {/* Content Section */}
      {activeTab === "terms" ? (
        <Stack gap="lg">
          {/* Terms & Conditions Header */}
          <Stack gap="xs">
            <Title order={3} ta={{ base: "center", sm: "left" }}>
              Terms & Conditions
            </Title>
            <Text ta={{ base: "center", sm: "left" }}>
              Last updated: December 2024
            </Text>
          </Stack>

          {/* Section 1 */}
          <Card withBorder p={{ base: "md", sm: "lg" }} radius="md">
            <Title order={4} mb="md" c="black">
              1. Acceptance of Terms
            </Title>
            <Text mb="sm">
              By accessing and using AsaanDrive's platform, you accept and agree
              to be bound by the terms and provision of this agreement. If you
              do not agree to abide by these terms, please do not use this
              service.
            </Text>
            <Text>
              These terms apply to all users of the platform, including renters,
              vehicle owners, and visitors.
            </Text>
          </Card>

          {/* Section 2 */}
          <Card withBorder p={{ base: "md", sm: "lg" }} radius="md">
            <Title order={4} mb="md" c="black">
              2. User Responsibilities
            </Title>

            <Text fw={600} mb="sm">
              For Renters:
            </Text>
            <List
              spacing="xs"
              size="sm"
              center
              icon={
                <ThemeIcon color="red.4" size={20} radius="xl">
                  <IconCheck size={12} />
                </ThemeIcon>
              }
            >
              <List.Item>
                Provide valid driver's license and identification documents
              </List.Item>
              <List.Item>
                Use vehicles responsibly and follow all traffic laws
              </List.Item>
              <List.Item>
                Return vehicles in the same condition as received
              </List.Item>
              <List.Item>Report any incidents or damages immediately</List.Item>
              <List.Item>Pay all fees and charges on time</List.Item>
            </List>

            <Text fw={600} mb="sm" mt="md">
              For Vehicle Owners:
            </Text>
            <List
              spacing="xs"
              size="sm"
              center
              icon={
                <ThemeIcon color="red.4" size={20} radius="xl">
                  <IconCheck size={12} />
                </ThemeIcon>
              }
            >
              <List.Item>
                Ensure vehicles are roadworthy and properly maintained
              </List.Item>
              <List.Item>
                Provide accurate vehicle descriptions and photos
              </List.Item>
              <List.Item>Maintain valid insurance and registration</List.Item>
              <List.Item>Respond promptly to booking requests</List.Item>
              <List.Item>
                Be available for vehicle handover as scheduled
              </List.Item>
            </List>
          </Card>

          {/* Section 3 */}
          <Card withBorder p={{ base: "md", sm: "lg" }} radius="md">
            <Title order={4} mb="md" c="black">
              3. Booking and Cancellation Policy
            </Title>
            <List
              spacing="xs"
              size="sm"
              center
              icon={
                <ThemeIcon color="red.4" size={20} radius="xl">
                  <IconCheck size={12} />
                </ThemeIcon>
              }
            >
              <List.Item>
                Bookings are confirmed upon payment completion
              </List.Item>
              <List.Item>
                Cancellations made 24+ hours before pickup: Full refund minus
                processing fee
              </List.Item>
              <List.Item>
                Cancellations made 6-24 hours before pickup: 50% refund
              </List.Item>
              <List.Item>
                Cancellations made less than 6 hours before pickup: No refund
              </List.Item>
              <List.Item>
                Owner cancellations may result in full refund and compensation
              </List.Item>
            </List>
          </Card>

          {/* Section 4 */}
          <Card withBorder p={{ base: "md", sm: "lg" }} radius="md">
            <Title order={4} mb="md" c="black">
              4. Payment Terms
            </Title>
            <Text mb="sm">
              All payments must be made through AsaanDrive's secure payment
              system. We accept major credit cards, mobile wallets (JazzCash,
              EasyPaisa), and cash payments where applicable.
            </Text>
            <List
              spacing="xs"
              size="sm"
              center
              icon={
                <ThemeIcon color="red.4" size={20} radius="xl">
                  <IconCheck size={12} />
                </ThemeIcon>
              }
            >
              <List.Item>
                Security deposits are required for all rentals
              </List.Item>
              <List.Item>
                Additional charges may apply for damages, late returns, or
                cleaning
              </List.Item>
              <List.Item>
                AsaanDrive charges a service fee on each transaction
              </List.Item>
              <List.Item>
                Refunds are processed within 5-7 business days
              </List.Item>
            </List>
          </Card>

          {/* Section 5 */}
          <Card withBorder p={{ base: "md", sm: "lg" }} radius="md">
            <Title order={4} mb="md" c="black">
              5. Dispute Resolution
            </Title>
            <Text mb="sm">
              Any disputes arising from the use of AsaanDrive must first be
              addressed through our customer support team. We encourage users to
              resolve conflicts amicably.
            </Text>
            <Text>
              If disputes cannot be resolved through support, they will be
              subject to arbitration under the laws of Pakistan.
            </Text>
          </Card>

          {/* Section 6 */}
          <Card withBorder p={{ base: "md", sm: "lg" }} radius="md">
            <Title order={4} mb="md" c="black">
              6. Platform Rights and Restrictions
            </Title>
            <Text fw={600} mb="sm">
              AsaanDrive reserves the right to:
            </Text>
            <List
              spacing="xs"
              size="sm"
              center
              icon={
                <ThemeIcon color="red.4" size={20} radius="xl">
                  <IconCheck size={12} />
                </ThemeIcon>
              }
            >
              <List.Item>
                Suspend or terminate accounts for violations of these terms
              </List.Item>
              <List.Item>
                Remove listings that don't meet our standards
              </List.Item>
              <List.Item>Modify or discontinue services with notice</List.Item>
              <List.Item>
                Investigate and take action against fraudulent activities
              </List.Item>
            </List>
          </Card>

          {/* Section 7 */}
          <Card withBorder p={{ base: "md", sm: "lg" }} radius="md">
            <Title order={4} mb="md" c="black">
              7. Limitation of Liability
            </Title>
            <Text mb="sm">
              AsaanDrive acts as a platform connecting vehicle owners and
              renters. We are not liable for damages, accidents, or disputes
              that occur during rentals.
            </Text>
            <Text>
              Users participate in rentals at their own risk and are encouraged
              to maintain appropriate insurance coverage.
            </Text>
          </Card>
        </Stack>
      ) : (
        <Stack gap="lg">
          {/* Privacy Policy Header */}
          <Stack gap="xs">
            <Title order={3} ta={{ base: "center", sm: "left" }}>
              Privacy Policy
            </Title>
            <Text ta={{ base: "center", sm: "left" }}>
              Last updated: December 2024
            </Text>
          </Stack>

          {/* Section 1 */}
          <Card withBorder p={{ base: "md", sm: "lg" }} radius="md">
            <Title order={4} mb="md" c="black">
              1. Information We Collect
            </Title>

            <Text fw={600} mb="sm">
              Personal Information:
            </Text>
            <List
              spacing="xs"
              size="sm"
              center
              icon={
                <ThemeIcon color="red.4" size={20} radius="xl">
                  <IconCheck size={12} />
                </ThemeIcon>
              }
            >
              <List.Item>Name, email address, and phone number</List.Item>
              <List.Item>
                Driver's license and national ID (CNIC) details
              </List.Item>
              <List.Item>
                Payment information (credit/debit card details)
              </List.Item>
              <List.Item>
                Vehicle registration and insurance documents
              </List.Item>
              <List.Item>Profile photos and vehicle images</List.Item>
            </List>

            <Text fw={600} mb="sm" mt="md">
              Usage Information:
            </Text>
            <List
              spacing="xs"
              size="sm"
              center
              icon={
                <ThemeIcon color="red.4" size={20} radius="xl">
                  <IconCheck size={12} />
                </ThemeIcon>
              }
            >
              <List.Item>Rental history and booking preferences</List.Item>
              <List.Item>Location data when using our services</List.Item>
              <List.Item>Device information and IP addresses</List.Item>
              <List.Item>Communication records with support</List.Item>
            </List>
          </Card>

          {/* Section 2 */}
          <Card withBorder p={{ base: "md", sm: "lg" }} radius="md">
            <Title order={4} mb="md" c="black">
              2. How We Use Your Information
            </Title>
            <Text mb="sm">
              We use your information to provide, maintain, and improve our
              services:
            </Text>
            <List
              spacing="xs"
              size="sm"
              center
              icon={
                <ThemeIcon color="red.4" size={20} radius="xl">
                  <IconCheck size={12} />
                </ThemeIcon>
              }
            >
              <List.Item>Process bookings and payments</List.Item>
              <List.Item>Verify user identity and vehicle ownership</List.Item>
              <List.Item>Facilitate communication between users</List.Item>
              <List.Item>Provide customer support</List.Item>
              <List.Item>
                Send important service updates and notifications
              </List.Item>
              <List.Item>Improve platform safety and security</List.Item>
              <List.Item>
                Analyze usage patterns to enhance user experience
              </List.Item>
            </List>
          </Card>

          {/* Section 3 */}
          <Card withBorder p={{ base: "md", sm: "lg" }} radius="md">
            <Title order={4} mb="md" c="black">
              3. Data Sharing and Disclosure
            </Title>
            <Text mb="sm">
              We do not sell your personal information. We may share information
              in these circumstances:
            </Text>
            <List
              spacing="xs"
              size="sm"
              center
              icon={
                <ThemeIcon color="red.4" size={20} radius="xl">
                  <IconCheck size={12} />
                </ThemeIcon>
              }
            >
              <List.Item>
                With other users as necessary for rentals (e.g., contact
                details)
              </List.Item>
              <List.Item>
                With payment processors for transaction processing
              </List.Item>
              <List.Item>With law enforcement when legally required</List.Item>
              <List.Item>
                With service providers who assist our operations
              </List.Item>
              <List.Item>In case of business transfers or mergers</List.Item>
            </List>
          </Card>

          {/* Section 4 */}
          <Card withBorder p={{ base: "md", sm: "lg" }} radius="md">
            <Title order={4} mb="md" c="black">
              4. Cookies and Tracking Technologies
            </Title>
            <Text mb="sm">
              We use cookies and similar technologies to enhance your
              experience:
            </Text>
            <List
              spacing="xs"
              size="sm"
              center
              icon={
                <ThemeIcon color="red.4" size={20} radius="xl">
                  <IconCheck size={12} />
                </ThemeIcon>
              }
            >
              <List.Item>Remember your preferences and login status</List.Item>
              <List.Item>Analyze website traffic and usage patterns</List.Item>
              <List.Item>
                Provide personalized content and recommendations
              </List.Item>
              <List.Item>Ensure platform security and prevent fraud</List.Item>
            </List>
            <Text mt="sm">
              You can control cookie settings through your browser preferences.
            </Text>
          </Card>

          {/* Section 5 */}
          <Card withBorder p={{ base: "md", sm: "lg" }} radius="md">
            <Title order={4} mb="md" c="black">
              5. Your Rights
            </Title>
            <Text mb="sm">
              You have the following rights regarding your personal information:
            </Text>
            <List
              spacing="xs"
              size="sm"
              center
              icon={
                <ThemeIcon color="red.4" size={20} radius="xl">
                  <IconCheck size={12} />
                </ThemeIcon>
              }
            >
              <List.Item>Access and review your personal data</List.Item>
              <List.Item>Update or correct inaccurate information</List.Item>
              <List.Item>Delete your account and associated data</List.Item>
              <List.Item>Opt-out of marketing communications</List.Item>
              <List.Item>Request data portability</List.Item>
              <List.Item>
                Object to certain data processing activities
              </List.Item>
            </List>
            <Text mt="sm">
              To exercise these rights, contact us at privacy@asaandrive.com
            </Text>
          </Card>

          {/* Section 6 */}
          <Card withBorder p={{ base: "md", sm: "lg" }} radius="md">
            <Title order={4} mb="md" c="black">
              6. Data Security Measures
            </Title>
            <Text mb="sm">
              We implement industry-standard security measures to protect your
              information:
            </Text>
            <List
              spacing="xs"
              size="sm"
              center
              icon={
                <ThemeIcon color="red.4" size={20} radius="xl">
                  <IconCheck size={12} />
                </ThemeIcon>
              }
            >
              <List.Item>SSL encryption for data transmission</List.Item>
              <List.Item>Secure data storage with access controls</List.Item>
              <List.Item>Regular security audits and monitoring</List.Item>
              <List.Item>Employee training on data protection</List.Item>
              <List.Item>Incident response procedures</List.Item>
            </List>
            <Text mt="sm">
              While we strive to protect your information, no system is
              completely secure. Please report any security concerns
              immediately.
            </Text>
          </Card>

          {/* Section 7 */}
          <Card withBorder p={{ base: "md", sm: "lg" }} radius="md">
            <Title order={4} mb="md" c="black">
              7. Contact Information
            </Title>
            <Text mb="sm">
              For privacy-related questions or concerns, please contact us:
            </Text>
            <Stack gap="xs">
              <Text>
                <strong>Email:</strong> privacy@asaandrive.com
              </Text>
              <Text>
                <strong>Phone:</strong> +92 300 1234567
              </Text>
              <Text>
                <strong>Address:</strong> AsaanDrive Privacy Office
                <br />
                123 Tech Street, Karachi, Pakistan
              </Text>
            </Stack>
          </Card>
        </Stack>
      )}

      {/* Contact Section */}
      <Card
        withBorder
        mt="xl"
        p={{ base: "md", sm: "lg" }}
        radius="md"
        bg="gray.0"
      >
        <Title order={4} mb="md" ta="center">
          Have Questions?
        </Title>
        <Text ta="center" mb="lg" fz={{ base: "sm", sm: "md" }}>
          Our legal and support teams are here to help clarify any concerns
        </Text>
        <Group justify="center" wrap="wrap">
          <Button color="red.4" size="md">
            Contact Legal Team
          </Button>
          <Button variant="outline" color="red.4" size="md">
            General Support
          </Button>
        </Group>
      </Card>
    </Container>
  );
}
