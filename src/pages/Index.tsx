import HeroSection from "@/components/HeroSection";
import StorySection from "@/components/StorySection";
import PhotoGallery from "@/components/PhotoGallery";
import LoveNote from "@/components/LoveNote";
import FloatingHearts from "@/components/FloatingHearts";
import LoveCounter from "@/components/LoveCounter";
import Timeline from "@/components/Timeline";
import ProposeAnimation from "@/components/ProposeAnimation";
import FlirtButton from "@/components/FlirtButton";
import SpinWheel from "@/components/SpinWheel";
import ScratchCard from "@/components/ScratchCard";
import SecretMessage from "@/components/SecretMessage";
import DailyLoveNote from "@/components/DailyLoveNote";
import AnniversaryCountdown from "@/components/AnniversaryCountdown";
import TruthOrDare from "@/components/TruthOrDare";

const Index = () => {
  // Set your relationship start date here
  const relationshipStartDate = new Date("2025-10-06");

  return (
    <main className="min-h-screen relative">
      <FloatingHearts />
      <ProposeAnimation />
      <FlirtButton />
      <SpinWheel />
      <ScratchCard />
      <TruthOrDare />
      <HeroSection />
      <LoveCounter targetDate={relationshipStartDate} />
      <AnniversaryCountdown />
      <DailyLoveNote />
      <SecretMessage />
      <Timeline />
      <StorySection />
      <PhotoGallery />
      <LoveNote />
      
      {/* Footer */}
      <footer className="py-8 bg-background border-t border-border">
        <p className="text-center font-serif text-sm text-muted-foreground italic">
          Made with love ♡
        </p>
      </footer>
    </main>
  );
};

export default Index;
