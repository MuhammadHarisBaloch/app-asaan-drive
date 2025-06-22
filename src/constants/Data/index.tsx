import { JSX } from "react";
import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandTwitter,
  IconBrandLinkedin,
  IconMapPin,
  IconPhone,
  IconMail,
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
      { name: "Subscription plans", link: "/subscription-plans" },
    ],
  },
  {
    title: "Support",
    items: [
      { name: "Help Center", link: "/help-center" },
      { name: "Safety Information", link: "/safety-information" },
      { name: "Contact us", link: "/contact-us" },
      { name: "FAQs", link: "/faqs" },
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

import {
  IconCreditCardRefund,
  IconReceiptDollar,
  IconSearch,
  IconUserPlus,
  IconClipboardList,
  IconCircleCheckFilled,
  IconMoneybag,
} from "@tabler/icons-react";
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
};
