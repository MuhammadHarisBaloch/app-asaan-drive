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
  IconCalendarEventFilled,
  IconCar,
  IconWallet,
  IconTrendingUp,
  IconDeviceMobile,
  IconAlertTriangle,
  IconBell,
  IconCircleX,
  IconCreditCard,
  IconArrowDownLeft,
  IconArrowUpRight,
} from "@tabler/icons-react";
import Images from "../Images";
import MobileWallet from "@/components/features/renters/vehicle/PaymentBilling/MobileWallet";
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
      { name: "Terms and Privacy", link: "/terms-privacy" },
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

const listedVehicles = [
  {
    image: Images.listedVehicles.cd125,
    name: "Honda 125",
    transmission: "Bike",
    price: "500/Day",
    rating: 4.8,
    reviews: 125,
    location: "Khairpur ,Sindh",
  },
  {
    image: Images.listedVehicles.cycle,
    name: "Mountain Bike",
    transmission: "Cycle",
    price: "200/Day",
    rating: 4.6,
    reviews: 24,
    location: "Islamabad ,Panjab",
  },
  {
    image: Images.listedVehicles.rakshaw,
    name: "CNG Auto Rickshaw",
    transmission: "Rikshaw",
    price: "1000/Day",
    rating: 4.9,
    reviews: 224,
    location: "Karachi ,Sindh",
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

const vehicleTypes = ["Bike", "Cycle", "Rakshaw"];

const BookingTimeDetails = [
  {
    icon: <IconCalendarEventFilled size={30} color="gray" />,
    title: "Start Date",
    subTitle: "Monday, August 25, 2025",
  },
  {
    icon: <IconClock size={30} color="gray" />,
    title: "Start Time",
    subTitle: "09:00",
  },
  {
    icon: <IconCalendarEventFilled size={30} color="gray" />,
    title: "End Date",
    subTitle: "Thursday, August 28, 2025",
  },
  {
    icon: <IconClock size={30} color="gray" />,
    title: "End Time",
    subTitle: "09:00",
  },
];

const PaymentSummary = [
  {
    title: "Daily Rate",
    subTitle: "Rs. 1200/day",
  },
  {
    title: "Duration",
    subTitle: "3 days",
  },
  {
    title: "Subtotal",
    subTitle: "Rs. 3600",
  },
  {
    title: "Security deposit (refundable)",
    subTitle: "Rs. 1,000",
  },
];

const options = [
  {
    id: "jazzcash",
    src: Images.paymentMethods.jazzcash,
    alt: "jazzcash-logo",
  },
  {
    id: "easypaisa",
    src: Images.paymentMethods.easypaisa,
    alt: "easypaisa-logo",
  },
];
const NearestVehicles = [
  {
    image: Images.listedVehicles.cd70,
    name: "Honda CD 70",
    type: "Bike",
    rent: "Rs. 500/Day",
    avaibility: "Available",
    tagColor: "cyan.0",
    tagTextColor: "green",
  },
  {
    image: Images.listedVehicles.cd125,
    name: "Honda 125",
    type: "Bike",
    rent: "Rs. 1200/Day",
    avaibility: "Not available",
    tagColor: "pink.1",
    tagTextColor: "red.4",
  },
  {
    image: Images.listedVehicles.old125,
    name: "Honda 125",
    type: "Bike",
    rent: "Rs. 800/Day",
    avaibility: "Available",
    tagColor: "cyan.0",
    tagTextColor: "green",
  },

  {
    image: Images.listedVehicles.rakshaw,
    name: "Auto Rikshaw",
    type: "Rikshaw",
    rent: "Rs. 1500/Day",
    avaibility: "Not available",
    tagColor: "pink.1",
    tagTextColor: "red.4",
  },
];

const DashFeatures = [
  {
    icon: <IconCar size={15} color="blue" />,
    IconBackgroundColor: "blue.1",
    title: "Active Rentals",
    subTitle: "2",
  },
  {
    icon: <IconCalendarEventFilled size={15} color="green" />,
    IconBackgroundColor: "green.1",
    title: "Upcoming Bookings",
    subTitle: "4",
  },
  {
    icon: <IconClock size={15} color="red" />,
    IconBackgroundColor: "pink.1",
    title: "Pending Requests",
    subTitle: "1",
  },
  {
    icon: <IconCurrencyDollar size={15} color="purple" />,
    IconBackgroundColor: "purple.0",
    title: "Total Spent This Month",
    subTitle: "Pkr 19,500",
  },
];

const RecentBookings = [
  {
    vehicleImage: Images.listedVehicles.cd70,
    vehicleName: "Honda CD 70",
    rentingDuration: "Oct 12, 2024 - Oct 15, 2024",
    status: "Active",
    statusColor: "green",
    statusBgColor: "green.1",
    price: "3,000",
  },
  {
    vehicleImage: Images.listedVehicles.cd125,
    vehicleName: "Honda CD 125",
    rentingDuration: "Oct 10, 2024 - Oct 11, 2024",
    status: "Confirmed",
    statusColor: "blue",
    statusBgColor: "blue.1",
    price: "1,500",
  },
  {
    vehicleImage: Images.listedVehicles.rakshaw,
    vehicleName: "Rakshaw",
    rentingDuration: "Oct 1, 2024 - Oct 15, 2024",
    status: "Pending",
    statusColor: "red",
    statusBgColor: "red.1",
    price: "15,000",
  },
];

const headerColumns = [
  { label: "Vehicle", flex: 2, align: "left" as const },
  { label: "Pickup Date", flex: 1, align: "center" as const },
  { label: "Return Date", flex: 1, align: "center" as const },
  { label: "Status", flex: 1, align: "center" as const },
  { label: "Price", flex: 1, align: "right" as const },
];

const BookingFeaturesData = [
  {
    vehicleImage: Images.listedVehicles.cd70,
    vehicleName: "Honda CD 70",
    vehicleType: "bike",
    pickupDate: "2024-10-02",
    returnDate: "2024-10-03",
    status: "Active",
    price: "1000",
  },
  {
    vehicleImage: Images.listedVehicles.cd70,
    vehicleName: "Honda CD 70",
    vehicleType: "bike",
    pickupDate: "2024-10-02",
    returnDate: "2024-10-03",
    status: "Confirmed",
    price: "1000",
  },
  {
    vehicleImage: Images.listedVehicles.cd125,
    vehicleName: "Honda CD 125",
    vehicleType: "bike",
    pickupDate: "2024-12-05",
    returnDate: "2024-10-07",
    status: "Pending",
    price: "2600",
  },
  {
    vehicleImage: Images.listedVehicles.cycle,
    vehicleName: "Mountain Cycle",
    vehicleType: "cycle",
    pickupDate: "2024-08-25",
    returnDate: "2024-10-30",
    status: "Pending",
    price: "2500",
  },
  {
    vehicleImage: Images.listedVehicles.rakshaw,
    vehicleName: "CNG Rakshaw",
    vehicleType: "Rakshaw",
    pickupDate: "2024-08-01",
    returnDate: "2024-10-10",
    status: "Completed",
    price: "8000",
  },
];

const ownerFeatures = [
  {
    icon: <IconCar size={30} color="blue" />,
    iconBgColor: "blue.1",
    title: "12",
    subTitle: "Total Vehicles",
    description: "+2 this month",
  },
  {
    icon: <IconCalendarEventFilled size={30} color="green" />,
    iconBgColor: "green.1",
    title: "8",
    subTitle: "Active Bookings",
    description: "3 pending approval",
  },
  {
    icon: <IconCurrencyDollar size={30} color="orange" />,
    iconBgColor: "orange.0",
    title: "pkr 45,250",
    subTitle: "Total Earnings",
    description: "+12% from last month",
  },
  {
    icon: <IconWallet size={30} color="purple" />,
    iconBgColor: "purple.0",
    title: "pkr 12,800",
    subTitle: "Wallet Balance",
    description: "Available for withdrawal",
  },
];

const recentActivites = [
  {
    icon: <IconCalendarEventFilled size={25} color="orange" />,
    iconBgColor: "orange.0",
    title: "New booking request for Honda Civic",
    subTitle: "5 min ago",
    status: "pending",
  },
  {
    icon: <IconCurrencyDollar size={25} color="green" />,
    iconBgColor: "green.1",
    title: "Payment received - PKR 3,500",
    subTitle: "1 hour ago",
    status: "success",
  },
  {
    icon: <IconCar size={25} color="red" />,
    iconBgColor: "red.0",
    title: "Toyota Corolla - Maintenance reminder",
    subTitle: "2 hours ago",
    status: "warning",
  },
  {
    icon: <IconCalendarEventFilled size={25} color="blue" />,
    iconBgColor: "blue.1",
    title: "Booking completed - Suzuki Alto",
    subTitle: "3 hours ago",
    status: "completed",
  },
];

const ownerListedVehicles = [
  {
    image: Images.listedVehicles.cd125,
    name: "Honda CD 125",
    license: "KHI-123",
    location: "Karachi",
    price: "1200",
    totalBookings: "12",
    status: "Available",
    statusBgColor: "green.1",
    statusColor: "green",
  },
  {
    image: Images.listedVehicles.cycle,
    name: "Mountain Cycle",
    license: "HAT-123",
    location: "Hyderabad",
    price: "500",
    totalBookings: "3",
    status: "Booked",
    statusBgColor: "blue.1",
    statusColor: "blue",
  },
  {
    image: Images.listedVehicles.rakshaw,
    name: "CNG Rakshaw",
    license: "LAC-765",
    location: "Larkana",
    price: "1500",
    totalBookings: "19",
    status: "Available",
    statusBgColor: "green.1",
    statusColor: "green",
  },
  {
    image: Images.listedVehicles.cd70,
    name: "Honda CD 70",
    license: "KHI-223",
    location: "Karachi",
    price: "800",
    totalBookings: "32",
    status: "Booked",
    statusBgColor: "blue.1",
    statusColor: "blue",
  },
];
const monthlySalesChart = [
  { month: "January", Sales: 1200 },
  { month: "February", Sales: 1900 },
  { month: "March", Sales: 400 },
  { month: "April", Sales: 1000 },
  { month: "May", Sales: 400 },
  { month: "June", Sales: 750 },
  { month: "July", Sales: 750 },
  { month: "August", Sales: 750 },
  { month: "September", Sales: 1500 },
  { month: "October", Sales: 2000 },
  { month: "November", Sales: 1000 },
  { month: "December", Sales: 1800 },
];

const paymentCard = [
  {
    icon: <IconTrendingUp size={25} color="green" />,
    iconBg: "green.0",
    title: "This Month",
    subTitle: "18,750",
    description: "+23% from last month",
    descriptionColor: "green.6",
  },
  {
    icon: <IconClock size={25} color="orange" />,
    iconBg: "orange.1",
    title: "Pending Payouts",
    subTitle: "5,200",
    description: "2 transactions pending",
    descriptionColor: "orange.3",
  },
];

const recentTransactionHistory = [
  {
    title: "Honda Civic booking - Ali Hassan",
    subTitle: "Jan 14, 2025",
    paymentAmount: 3500,
    status: "completed",
  },
  {
    title: "Withdrawal to JazzCash",
    subTitle: "Jan 12, 2025",
    paymentAmount: -1500,
    status: "completed",
  },
  {
    title: "Toyota Corolla booking - Sarah Ahmed",
    subTitle: "Jan 10, 2025",
    paymentAmount: 2800,
    status: "completed",
  },
  {
    title: "Honda City booking - Muhammad Usman",
    subTitle: "Jan 8, 2025",
    paymentAmount: 4200,
    status: "pending",
  },
];
const cashWithdrawPaymentMethods = [
  {
    icon: <IconDeviceMobile size={20} color="orange" />,
    iconBg: "orange.0",
    method: "JazzCash",
  },
  {
    icon: <IconDeviceMobile size={20} color="green" />,
    iconBg: "green.1",
    method: "Easypaisa",
  },
  {
    icon: <IconDeviceMobile size={20} color="blue" />,
    iconBg: "blue.0",
    method: "Bank Transfer",
  },
];

const recentNotifications = [
  {
    icon: <IconBell size={20} color="blue" />,
    iconBg: "blue.0",
    title: "New Booking Request",
    subTitle: "Ali Hassan wants to book your Honda Civic for Jan 15-18",
    time: "5 minutes ago",
    priority: "high",
    recentBookingRequest: true,
  },
  {
    icon: <IconCurrencyDollar size={20} color="green" />,
    iconBg: "green.0",
    title: "Payment Received",
    subTitle: "PKR 3,500 received from Sarah Ahmed for Toyota Corolla booking",
    time: "1 hour ago",
    priority: "medium",
    recentBookingRequest: false,
  },
  {
    icon: <IconAlertTriangle size={20} color="orange" />,
    iconBg: "orange.0",
    title: "Maintenance Alert",
    subTitle: "Suzuki Alto requires scheduled maintenance check",
    time: "2 hours ago",
    priority: "low",
    recentBookingRequest: false,
  },
  {
    icon: <IconRosetteDiscountCheck size={20} color="blue" />,
    iconBg: "blue.0",
    title: "Booking Approved",
    subTitle: "Your approval for Muhammad Usman's booking has been confirmed",
    time: "6 hour ago",
    priority: "medium",
    recentBookingRequest: false,
  },
];

const DocCards = [
  {
    documentType: "CNIC",
    status: "verified",
    statusIcon: <IconCircleCheck size={20} color="green" />,
    uploadedDate: "Dec 15, 2024",
    expiresDate: "Dec 15, 2029",
  },
  {
    documentType: "Driving License",
    status: "pending",
    statusIcon: <IconClock size={20} color="orange" />,
    uploadedDate: "Dec 10, 2024",
    expiresDate: "Aug 22, 2027",
  },
  {
    documentType: "Vehicle Insurance",
    status: "decline",
    statusIcon: <IconCircleX size={20} color="red" />,
    uploadedDate: "Dec 15, 2014",
    expiresDate: " Dec 15, 2024",
  },
];
const tabList = [
  {
    value: "Upcoming",
    icon: <IconClock size={20} />,
    notificationValue: 2,
  },
  {
    value: "Ongoing",
    icon: <IconCalendarEventFilled size={20} />,
    notificationValue: 1,
  },
  {
    value: "Completed",
    icon: <IconCircleCheck size={20} />,
    notificationValue: 2,
  },
  {
    value: "Cancelled",
    icon: <IconCircleX size={20} />,
    notificationValue: 1,
  },
];

const availableNotifications = [
  {
    icon: <IconCircleCheck color="green" size={20} />,
    iconBg: "green.1",
    title: "Booking Confirmed",
    subTitle: "Your Tesla Model 3 booking for Oct 20-22 has been confirmed",
    time: "2 hours ago",
  },
  {
    icon: <IconCreditCard color="green" size={20} />,
    iconBg: "green.1",
    title: "Payment Successful",
    subTitle: "Payment of $89.00 processed successfully for Honda CD 70",
    time: "1 day ago",
  },
  {
    icon: <IconAlertTriangle color="orange" size={20} />,
    iconBg: "orange.0",
    title: "Return Reminder",
    subTitle: "Please return your Honda CD 70 by 6:00 PM today",
    time: "3 hours ago",
  },
  {
    icon: <IconClock color="blue" size={20} />,
    iconBg: "blue.1",
    title: "Booking Pending",
    subTitle: "Your Mountain Bike booking is waiting for confirmation",
    time: "5 hours ago",
  },
];

const PaymentCards = [
  {
    icon: <IconCreditCard size="30" color="purple" />,
    iconBg: "purple.0",
    title: "Total Spent",
    price: "1270.00",
    subTitle: "This month",
  },
  {
    icon: <IconArrowDownLeft size="30" color="blue" />,
    iconBg: "blue.1",
    title: "Pending Refunds",
    price: "50.00",
  },
];

const transactionsCard = [
  {
    icon: <IconArrowUpRight size={20} color="red" />,
    iconBg: "red.0",
    transactionType: "Payment",
    bookingId: "BK001 ",
    walletType: "Credit Card",
    price: "89.00",
    date: "2024-10-12",
    time: "2:15 PM",
    status: "completed",
  },
  {
    icon: <IconArrowDownLeft size={20} color="blue" />,
    iconBg: "blue.1",
    transactionType: "Refund",
    bookingId: "BK004 ",
    walletType: "Jazzcash",
    price: "50.00",
    date: "2024-10-05",
    time: "1:45 PM",
    status: "Processing",
  },
  {
    icon: <IconArrowUpRight size={20} color="red" />,
    iconBg: "red.0",
    transactionType: "Payment",
    bookingId: "BK003  ",
    walletType: "Easypaisa",
    price: "45.00",
    date: "2024-10-08 ",
    time: "4:20 PM",
    status: "completed",
  },
];
const availableCities = ["Sukkur", "Larkana", "Khairpur Mir's", "Rohri"];
export const data = {
  footer: {
    menu: footerMenu,
  },
  renter: {
    usageSteps: renterUsageSteps,
    inlistVehicles: listedVehicles,
    dashboard: {
      overView: {
        RecentBookings: RecentBookings,
        DashFeatures: DashFeatures,
      },
      myBookings: {
        BookingFeaturesData: BookingFeaturesData,
        headerColumns: headerColumns,
      },
      notifications: {
        availableNotifications: availableNotifications,
      },
      payments: {
        transactionsCard: transactionsCard,
        PaymentCards: PaymentCards,
      },
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
      paymentMethods: {
        MobileWalletOption: options,
      },
      bookingConfirmation: {
        paymentSummary: PaymentSummary,
        bookingTimeDetails: BookingTimeDetails,
      },
    },
    findNearMe: {
      nearestVehicle: NearestVehicles,
    },
  },
  availableCities: availableCities,
  vehicleOwner: {
    vehicleRegistration: {
      vehicleTypes: vehicleTypes,
    },
    usageSteps: vehicleOwnerUsageSteps,
    dashboard: {
      overviewSection: {
        recentActivites: recentActivites,
        ownerFeatures: ownerFeatures,
      },
      BookingManagement: {
        tabList: tabList,
      },
      VehicleManagement: {
        ownerListedVehicles: ownerListedVehicles,
      },
      EarningAndPayout: {
        recentTransactionHistory: recentTransactionHistory,
        paymentCard: paymentCard,
        monthlySalesChart: monthlySalesChart,
        cashWithdrawPaymentMethods: cashWithdrawPaymentMethods,
      },
      notificationSection: {
        recentNotifications: recentNotifications,
      },
      ProfileAndSettingSection: {
        Documents: {
          DocCards: DocCards,
        },
      },
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
