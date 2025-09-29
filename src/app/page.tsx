import CTA from "@/components/CTA";
import HeroSection from "@/components/HeroSection";
import HowToWork from "@/components/HowToWork";
import Services from "@/components/Services";
import Storage from "@/components/Storage";

export default function Home() {
  return (
    <div className="bg-white text-gray-900 font-sans leading-relaxed antialiased">
      <HeroSection />
      {/* <Services />
      <Storage />
      <HowToWork />
      <CTA /> */}
    </div>
  );
}
