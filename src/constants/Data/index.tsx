import { JSX } from "react";
import {
  IconMapPin,
  IconPhone,
  IconMail,
  IconCreditCardRefund,
  IconReceiptDollar,
  IconSearch,
  IconUserPlus,
  IconClipboardList,
  IconCircleCheckFilled,
  IconMoneybag,
  IconClock,
  IconShieldCheck,
  IconCoin,
} from "@tabler/icons-react";
interface FooterMenu {
  title: string;
  items: {
    name: string;
    link?: string;
    icon?: JSX.Element;
  }[];
}

const footerMenu: FooterMenu[] = [
  {
    title: "Quick Links",
    items: [
      { name: "Home", link: "/" },
      { name: "How it works ", link: "/how-it-works" },
      { name: "Contact us", link: "/contact" },
    ],
  },
  {
    title: "Support",
    items: [
      { name: "Help Center", link: "/help-center" },
      { name: "Safety Information", link: "/safety-information" },
      { name: "FAQs", link: "/faq" },
    ],
  },
  {
    title: "Contact",
    items: [
      {
        name: "MUET Boys Hostel KhairpurMir’s",
        icon: <IconMapPin size={20} color="red" />,
      },
      {
        name: "+923461392377",
        icon: <IconPhone size={20} color="red" />,
      },
      {
        name: "AsaanDrive786@gmail.com",
        icon: <IconMail size={20} color="red" />,
      },
    ],
  },
];

const renterUsageSteps = [
  {
    icon: <IconUserPlus size={25} color="#E30B5C" />,
    title: "1. Sign up",
    subtitle: "Create your Account and Complete your profile for Verification",
  },
  {
    icon: <IconSearch size={25} color="#E30B5C" />,
    title: "2. Browse & Select",
    subtitle: "Find the perfect vehicle for your needs using our filters.",
  },
  {
    icon: <IconReceiptDollar size={25} color="#E30B5C" />,
    title: "3. Book & Pay",
    subtitle: "Complete the booking and make a secure payment online.",
  },
  {
    icon: <IconCreditCardRefund size={25} color="#E30B5C" />,
    title: "4. Ride & Return",
    subtitle:
      "Pick up your vehicle and return it at the agreed time and location.",
  },
];

const vehicleOwnerUsageSteps = [
  {
    icon: <IconUserPlus size={25} color="#E30B5C" />,
    title: "1. Register",
    subtitle: "Sign up as a vehicle owner and verify your identity.",
  },
  {
    icon: <IconClipboardList size={25} color="#E30B5C" />,
    title: " 2. List Vehicle",
    subtitle:
      "Add your vehicle details, photos, and set your availability and pricing.",
  },
  {
    icon: <IconCircleCheckFilled size={25} color="#E30B5C" />,
    title: "3. Accept Bookings",
    subtitle: "Review and approve rental requests from potential renters.",
  },
  {
    icon: <IconMoneybag size={25} color="#E30B5C" />,
    title: "4. Earn Money",
    subtitle: "Get paid securely for each rental and track your earnings.",
  },
];

const features = [
  {
    icon: <IconClock size={28} color="white" />,
    title: "Flexible Rental Options",
    description:
      "Rent by the hour, day, week, or month based on your needs. No long-term commitments required.",
  },
  {
    icon: <IconMapPin size={28} color="white" />,
    title: "Real-Time Tracking",
    description:
      "Keep track of your rented vehicle with our real-time GPS tracking feature for safety and convenience.",
  },
  {
    icon: <IconShieldCheck size={28} color="white" />,
    title: "Safety First",
    description:
      "All vehicles are thoroughly inspected and maintained. Emergency assistance available 24/7.",
  },
  {
    icon: <IconCoin size={28} color="white" />,
    title: "Earn with Your Vehicle",
    description:
      "Turn your idle vehicle into a source of income by listing it on our platform when you're not using it.",
  },
];

export const data = {
  footer: {
    menu: footerMenu,
  },
  renter: {
    usageSteps: renterUsageSteps,
  },
  vehicleOwner: {
    usageSteps: vehicleOwnerUsageSteps,
  },
  home: {
    features: features,
  },
};
