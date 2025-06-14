import HomeFooterSection from "@/components/features/home/FooterSection/Index";
import HomeHeroSection from "../components/features/home/HeroSection";
import HomeFeatureSection from "@/components/features/home/FeatureSection";

export default function Home() {
  return (
    <>
      <HomeHeroSection />
      <HomeFeatureSection />
      <HomeFooterSection />
    </>
  );
}
