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
  IconRosetteDiscountCheck,
  IconUsers,
  IconTruck,
  IconBrandLine,
  IconExclamationCircle,
  IconMessageCircle,
  IconQuestionMark,
  IconClockHour5,
  IconShield,
  IconCurrencyDollar,
  IconStar,
  IconAddressBook,
  IconShieldCheckFilled,
  IconClockFilled,
  IconCreditCardFilled,
  IconRosetteDiscountCheckFilled,
  IconCalendarWeek,
  IconCircleCheck,
  IconMotorbikeFilled,
} from "@tabler/icons-react";
import Images from "../Images";
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
      { name: "Safety Information", link: "/safety" },
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

const SupportFeatureList = [
  {
    icon: <IconPhone color="red" />,
    title: "Helpline",
    subTitle: "Contact our support team anytime at 0800-ASAAN-123",
  },
  {
    icon: <IconTruck color="red" />,
    title: "Roadside Assistance",
    subTitle:
      "Get help with flat tires, battery issues, or other problems on the road.",
  },
  {
    icon: <IconBrandLine color="red" />,
    title: "Live Chat Support",
    subTitle:
      "Chat with our support team directly through the app for immediate assistance.",
  },
];

const SafetyFeatureList = [
  {
    icon: <IconExclamationCircle color="red" />,
    title: "Regular Maintenance",
    subTitle:
      "All vehicles undergo thorough maintenance checks before each rental.",
  },
  {
    icon: <IconRosetteDiscountCheck color="red" />,
    title: "Basic Repair Kit",
    subTitle:
      "Every vehicle comes equipped with basic tools for emergency repairs.",
  },
  {
    icon: <IconUsers color="red" />,
    title: "Safety Equipment",
    subTitle:
      "Helmets and other safety gear are provided with each rental as needed.",
  },
];

const helpCenterFaqs = [
  {
    faqList: [
      {
        question: "How do I sign up for AsaanDrive?",
        answer:
          "Signing up is easy! Click the 'Sign Up' button on our homepage, provide your basic information including your name, email, and phone number. You'll need to verify your email address and upload a valid driver's license. Once verified, you can start browsing and booking vehicles immediately.",
      },
      {
        question: "How do I find a vehicle near me?",
        answer:
          "Use our 'Browse Vehicles' page to see all available vehicles in your area. You can filter by vehicle type (bike, car, rickshaw), location, price range, and availability. Our map view shows vehicles near your current location, and you can see real-time availability and pricing.",
      },
      {
        question: "What documents do I need to get started?",
        answer:
          "You'll need a valid driver's license, national ID card (CNIC), and a credit/debit card for payment. For premium vehicles, additional documents like proof of income may be required. All documents must be original and valid, and we verify them during the registration process.",
      },
    ],
    title: "Getting Started",
    icon: <IconQuestionMark color="blue" size={25} />,
    iconBackgroundColor: "blue.0",
    cardBorderColor: "#DBEAFE",
  },
  {
    faqList: [
      {
        question: "How do I book a vehicle?",
        answer:
          "Select your desired vehicle from the browse page, choose your rental duration (hourly, daily, weekly, or monthly), select pickup and return dates/times, review the total cost, and proceed to payment. Once payment is confirmed, you'll receive booking details and the owner's contact information.",
      },
      {
        question: "What is the cancellation policy?",
        answer:
          "You can cancel your booking up to 24 hours before the start time for a full refund. Cancellations within 24 hours incur a 50% charge, and cancellations within 2 hours of pickup time are non-refundable. Emergency cancellations due to vehicle breakdown are fully refundable.",
      },
      {
        question: "Can I modify my booking after confirmation?",
        answer:
          "Yes, you can modify your booking through your dashboard or by contacting customer support. Changes to pickup time, duration, or dates are subject to vehicle availability. Additional charges may apply for extensions, and refunds for shortened rentals are calculated based on our cancellation policy.",
      },
    ],
    title: "Booking and Rentals",
    icon: <IconMessageCircle color="green" size={25} />,
    iconBackgroundColor: "green.0",
    cardBorderColor: "#DCFCE7",
  },
  {
    faqList: [
      {
        question: "What payment methods do you accept?",
        answer:
          "We accept all major credit and debit cards (Visa, MasterCard, American Express), mobile wallet payments (EasyPaisa, JazzCash), and bank transfers. For security, we require card verification and may ask for additional authentication for high-value bookings.",
      },
      {
        question: "How does the refund process work?",
        answer:
          "Refunds are processed automatically based on our cancellation policy. Full refunds take 3-5 business days to appear in your account, while partial refunds are processed within 2-3 business days. Security deposits are refunded within 24-48 hours after vehicle return and inspection.",
      },
      {
        question: "When is the security deposit charged?",
        answer:
          "The security deposit is charged at the time of booking confirmation. The amount varies by vehicle type: bikes (PKR 5,000-15,000), cars (PKR 20,000-50,000), rickshaws (PKR 10,000-25,000). It's fully refunded after successful vehicle return in the same condition.",
      },
    ],
    title: "Payments",
    icon: <IconPhone color="orange" size={25} />,
    iconBackgroundColor: "orange.0",
    cardBorderColor: "#FEF9C3",
  },
  {
    faqList: [
      {
        question: "How do I report an issue during my rental?",
        answer:
          "For immediate issues, call our 24/7 emergency hotline at +92 300 1234567. For non-urgent matters, use the 'Report Issue' feature in your dashboard or contact support via chat. Include photos and detailed descriptions to help us resolve issues quickly.",
      },
      {
        question: "What should I do in case of an emergency?",
        answer:
          "In case of accidents or emergencies, first ensure your safety and call emergency services if needed. Then immediately contact our emergency hotline. We provide 24/7 roadside assistance and will arrange for vehicle replacement or towing as needed. Never leave the scene without reporting.",
      },
      {
        question: "How do I contact customer support?",
        answer:
          "Our customer support is available 24/7. Call +92 300 1234567 for immediate assistance, email support@asaandrive.com, use live chat in the app, or visit our Contact Us page. For fastest response during business hours, use live chat or phone support.",
      },
    ],
    title: "Safety and Support",
    icon: <IconQuestionMark color="red" size={25} />,
    iconBackgroundColor: "pink.1",
    cardBorderColor: "#FEE2E2",
  },
];

const quichHelpList = [
  {
    icon: <IconQuestionMark size={25} color="blue" />,
    iconBackground: "blue.0",
    title: "Browse FAQ",
    description: "Check our comprehensive FAQ section for detailed answers",
    subTitle: "Visit FAQ",
    subTitleColor: "blue.4",
    subIconColor: "blue",
  },
  {
    icon: <IconMessageCircle size={25} color="green" />,
    iconBackground: "green.0",
    title: "Live Chat",
    description: "Get instant help from our support team",
    subTitle: "Start Chat",
    subTitleColor: "green.6",
    subIconColor: "green",
  },
  {
    icon: <IconPhone size={25} color="red" />,
    iconBackground: "red.0",
    title: "Call Support",
    description: "Speak directly with our support team",
    subTitle: "+92 300 1234567",
    subTitleColor: "red.5",
    subIconColor: "red",
  },
];
const resourcesList = [
  {
    title: "How It Works",
    subTitle: "Learn how to use AsaanDrive",
    link: "/how-it-works",
  },
  {
    title: "Safety Guidelines",
    subTitle: "Stay safe while renting",
    link: "/safety",
  },
  {
    title: "Browse Vehicles",
    subTitle: "Find your perfect ride",
    link: "/app/renters",
  },
];
const emergencySteps = [
  "Instantly connects you with emergency responders",
  "Shares your real-time location automatically",
  "Notifies your emergency contacts",
];

const renterfeatureCard = [
  {
    icon: <IconShield size={25} color="blue" />,
    title: "Verified & Safe",
    subTitle:
      "All vehicles and owners are thoroughly verified for your safety and peace of mind.",
    iconBackgroundColor: "blue.0",
  },
  {
    icon: <IconClockHour5 size={25} color="green" />,
    title: "Instant Booking",
    subTitle:
      "Book any vehicle instantly and start your journey within minutes of confirmation.",
    iconBackgroundColor: "green.0",
  },
  {
    icon: <IconMapPin size={25} color="purple" />,
    title: "Wide Coverage",
    subTitle:
      "Available in major cities across Pakistan with thousands of vehicles to choose from.",
    iconBackgroundColor: "purple.0",
  },
];

const quickTips = [
  "Complete your profile with accurate information for better matches",
  "Upload clear photos of your documents for quick verification",
  "Use filters to find vehicles that match your exact needs",
  "Read vehicle reviews and owner ratings before booking",
];

const quickLinks = [
  {
    name: "Visit Help Center",
    link: "/help-center",
  },
  {
    name: "Contact Support",
    link: "/contact",
  },
  {
    name: "How it Works",
    link: "/how-it-works",
  },
];

const listedVehicles = [
  {
    image: Images.listedVehicles.cd125,
    name: "Honda 125",
    transmission: "Bike . Manual",
    price: "500/Day",
    rating: 4.8,
    reviews: 125,
    location: "Khairpur ,Sindh",
  },
  {
    image: Images.listedVehicles.cycle,
    name: "Mountain Bike",
    transmission: "Cycle . Manual",
    price: "200/Day",
    rating: 4.6,
    reviews: 24,
    location: "Islamabad ,Panjab",
  },
  {
    image: Images.listedVehicles.rakshaw,
    name: "CNG Auto Rickshaw",
    transmission: "Rakshaw . Manual/Automatic",
    price: "1000/Day",
    rating: 4.9,
    reviews: 224,
    location: "Karachi ,Sindh",
  },
];
const featureCardList = [
  {
    icon: <IconCurrencyDollar size={25} color="green" />,
    title: "Rs. 15,000+",
    subTitle: "Average monthly earnings",
    iconBackgroundColor: "green.0",
  },
  {
    icon: <IconUsers size={25} color="blue" />,
    title: "50,000+",
    subTitle: "Active renters",
    iconBackgroundColor: "blue.0",
  },
  {
    icon: <IconStar size={25} color="orange" />,
    title: "4.8/5",
    subTitle: "Average owner rating",
    iconBackgroundColor: "orange.0",
  },
];
const contactInfoList = [
  {
    icon: <IconMail size={25} color="red" />,
    title: "Email",
    subTitle: "support@asaandrive.com",
    description: "We typically respond within 24 hours",
  },
  {
    icon: <IconPhone size={25} color="red" />,
    title: "Phone",
    subTitle: "+92 3461392377",
    description: "Available 24/7 for urgent support",
  },
  {
    icon: <IconAddressBook size={25} color="red" />,
    title: "Address",
    subTitle: "Khairpur, Sindh",
    description: "Serving all major Cities in Pakistan",
  },
];

const faqQuestions = [
  {
    question: "How can I rent a vehicle on AsaanDrive?",
    answer:
      "Renting on AsaanDrive is simple! Browse available vehicles in your area, select your preferred vehicle, choose your rental duration, complete the booking process with required documents, and make payment. You'll receive booking confirmation and vehicle pickup details via email and SMS.",
  },
  {
    question: "What documents are required for renting?",
    answer:
      "You'll need a valid driver's license, national ID card (CNIC), and a credit/debit card for payment. For some premium vehicles, additional documents like proof of income or employment may be required. All documents must be original and valid.",
  },
  {
    question: "Is there any security deposite needed?",
    answer:
      "Yes, a refundable security deposit is required for all rentals. The amount varies based on the vehicle type and rental duration. For bikes and cycles, it's typically PKR 5,000-15,000, while cars and rickshaws may require PKR 20,000-50,000. The deposit is fully refunded after successful return of the vehicle.",
  },
  {
    question: "How do I list my vehicle on the platform?",
    answer:
      "Vehicle owners can easily list their vehicles by creating an account, clicking 'List Vehicle', providing vehicle details including photos, documents, and pricing. Our team will verify your vehicle and documents within 24-48 hours. Once approved, your vehicle will be live on the platform for bookings.",
  },
  {
    question: "How can I contact customer support?",
    answer:
      "Our customer support team is available 24/7 to assist you. You can reach us via phone at +92 300 1234567, email at support@asaandrive.com, or use the live chat feature in the app. We also have a comprehensive help center with guides and tutorials.",
  },
  {
    question: "Is AsaanDrive available in my city?",
    answer:
      "AsaanDrive is currently available in major cities across Pakistan including Karachi, Lahore, Islamabad, Rawalpindi, Faisalabad, and Multan. We're rapidly expanding to more cities. Check our website or app to see if we're available in your area, or sign up for notifications when we launch in your city.",
  },
  {
    question: "What happens if the vehicle breaks down during rental?",
    answer:
      "Don't worry! AsaanDrive provides 24/7 roadside assistance. Contact our emergency helpline immediately, and we'll arrange for repairs or a replacement vehicle. Basic mechanical issues are covered at no extra cost, though damages due to misuse may incur charges.",
  },
  {
    question: "Can I extend my rental period?",
    answer:
      "Yes, you can extend your rental period subject to vehicle availability. Contact customer support or use the app to request an extension. Additional charges will apply based on the extended duration, and payment must be completed before the original rental period ends.",
  },
];

const aboutEmergencyButton = [
  {
    title: "Main Dashboard",
    subTitle:
      "The emergency button is prominently displayed on your main dashboard, always visible during active rentals.",
  },
  {
    title: "Trip Screen",
    subTitle:
      "During your trip, the button remains accessible in the top-right corner of your screen.",
  },
  {
    title: "Quick Access Menu",
    subTitle:
      "Pull down the quick access menu from any screen to find the emergency button.",
  },
];
const contactDetail = [
  "Your designated emergency contacts (if set up)",
  "Vehicle owner (for coordination)",
  "Local authorities (when appropriate)",
];

const emergencyFeatures = [
  {
    icon: <IconClock size={30} color="blue" />,
    iconBackground: "blue.0",
    title: "Instant Response",
    subTitle:
      "Emergency alert is triggered immediately - no confirmation needed in crisis situations.",
  },
  {
    icon: <IconMapPin size={30} color="green" />,
    iconBackground: "green.0",
    title: "Location Shared",
    subTitle:
      "Your exact GPS coordinates are automatically shared with our emergency response team.",
  },
  {
    icon: <IconPhone size={30} color="purple" />,
    iconBackground: "purple.0",
    title: "Support Contacted",
    subTitle:
      "Our 24/7 emergency team receives your alert and begins immediate assistance protocols.",
  },
];
const emergencyInformation = [
  {
    title: "Use only for real emergencies:",
    subTitle: "False alarms can delay response to actual emergencies.",
  },
  {
    title: "Stay calm:",
    subTitle: "Our team is trained to handle emergency situations efficiently.",
  },
  {
    title: "Keep your phone accessible:",
    subTitle: "We may need to contact you for additional information.",
  },
];

const emergencyResponseSteps = [
  {
    title: "Alert Received (0-30 seconds)",
    subTitle:
      "Our emergency team receives your alert with your location, trip details, and profile information.",
  },
  {
    title: "Immediate Contact (30 seconds - 2 minutes)",
    subTitle:
      "We attempt to call you directly to assess the situation and determine the level of response needed.",
  },
  {
    title: "Emergency Services (2-5 minutes)",
    subTitle:
      "If needed, we contact local emergency services and provide them with your exact location and situation details.",
  },
  {
    title: "Follow-up Support",
    subTitle:
      "We stay in contact until the situation is resolved and provide additional support as needed.",
  },
];

const vehiclesImages = [
  {
    src: Images.listedVehicles.cd125,
    alt: "cd-125",
  },
  {
    src: Images.listedVehicles.cycle,
    alt: "cycle",
  },
  {
    src: Images.listedVehicles.rakshaw,
    alt: "rakshaw",
  },
];
const priceOptions = [
  {
    option: "Daily",
    price: "Rs: 1000",
  },
  {
    option: "Weekly",
    price: "Rs: 7500",
  },
  {
    option: "Monthly",
    price: "Rs: 25000",
  },
];
const services = [
  {
    icon: <IconShieldCheckFilled size={30} color="red" />,
    title: "Safe & Secure",
    subTitle:
      "All vehicles are regularly inspected and maintained for your safety.",
  },
  {
    icon: <IconRosetteDiscountCheckFilled size={30} color="red" />,
    title: "Verified Owners",
    subTitle:
      "All vehicle owners are verified and trusted members of our community.",
  },
  {
    icon: <IconClockFilled size={30} color="red" />,
    title: "Flexible Timing",
    subTitle:
      "Choose hourly, daily, weekly, or monthly rental options to match your needs.",
  },
  {
    icon: <IconCreditCardFilled size={30} color="red" />,
    title: "Easy Payments",
    subTitle:
      "Multiple payment options including credit/debit cards, mobile wallets and cash.",
  },
];
interface vehicleFeatures {
  icon: JSX.Element;
  title: string;
  subTitle: string;
  textColor?: string;
}
[];
const vehicleFeatures: vehicleFeatures[] = [
  {
    icon: <IconMotorbikeFilled color="red" size={60} />,
    title: "Type",
    subTitle: "Bike",
  },
  {
    icon: <IconCalendarWeek color="red" size={60} />,
    title: "Year",
    subTitle: "2025",
  },
  {
    icon: <IconMapPin color="red" size={60} />,
    title: "Location",
    subTitle: "Khairpur Mir's",
  },
  {
    icon: <IconCircleCheck color="green" size={60} />,
    title: "Status",
    subTitle: "Available",
    textColor: "green",
  },
];
const vehicleBookingDetails = [
  {
    title: "Rental Type:",
    subTitle: "Daily",
  },
  {
    title: "Duration:",
    subTitle: "1 Days",
  },
  {
    title: "Pickup Date:",
    subTitle: "Jul 27, 2025",
  },
  {
    title: "Return Date (Est.):",
    subTitle: "July 28, 2025",
  },
];

interface bookingPaymentDetails {
  title: string;
  subTitle: string;
  titleColor?: string;
  subTitleColor?: string;
}
[];
const bookingPaymentDetails: bookingPaymentDetails[] = [
  {
    title: "Base Rate:",
    subTitle: "Rs. 1000/day",
    subTitleColor: "black",
  },
  {
    title: "Rental Cost:",
    subTitle: "Rs. 1000.00",
    subTitleColor: "black",
  },
  {
    title: "Tax (15%):",
    subTitle: "Rs. 150.00",
    subTitleColor: "black",
  },
  {
    title: "Total:",
    subTitle: "Rs. 1150.00",
    titleColor: "black",
    subTitleColor: "red.4",
  },
];
const importantNoticeForDocument = [
  "Ensure documents are clear and all text is readable",
  "Documents must be valid and not expired",
  "Names on all documents should match",
  "Upload clear images of both front and back sides of your ID",
  "Verification typically takes 5-10 minutes",
];
export const data = {
  footer: {
    menu: footerMenu,
  },
  renter: {
    usageSteps: renterUsageSteps,
    inlistVehicles: listedVehicles,
    dashboard: {
      featureCard: renterfeatureCard,
      quickTips: quickTips,
      quickLinks: quickLinks,
    },
    vehicle: {
      vehicleDetails: {
        vehicleImages: vehiclesImages,
        vehiclePrices: priceOptions,
        ourServices: services,
        vehicleFeatures: vehicleFeatures,
      },
      bookingDetails: {
        paymentDetails: bookingPaymentDetails,
        vehicleDetails: vehicleBookingDetails,
      },
      documentVerification: {
        notices: importantNoticeForDocument,
      },
    },
  },
  vehicleOwner: {
    usageSteps: vehicleOwnerUsageSteps,
    dashboard: {
      featureCard: featureCardList,
    },
  },
  home: {
    features: features,
  },
  safety: {
    vehicleFeatures: SafetyFeatureList,
    supportFeatures: SupportFeatureList,
    emergencySteps: emergencySteps,
  },
  emergencyDetails: {
    aboutEmergencyFeature: aboutEmergencyButton,
    contactDetails: contactDetail,
    emergencyFeaturesList: emergencyFeatures,
    emergencyInfo: emergencyInformation,
    emergencyResponse: emergencyResponseSteps,
  },
  helpCenter: {
    faq: helpCenterFaqs,
    quickHelpCardList: quichHelpList,
    resourceCardList: resourcesList,
  },
  contact: {
    contactInfo: contactInfoList,
  },
  faq: {
    questions: faqQuestions,
  },
};
