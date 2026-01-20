import HeroSection from "@/components/HeroSection";
import StorySection from "@/components/StorySection";
import PhotoGallery from "@/components/PhotoGallery";
import LoveNote from "@/components/LoveNote";
import FloatingHearts from "@/components/FloatingHearts";
import LoveCounter from "@/components/LoveCounter";
import Timeline from "@/components/Timeline";
import ProposeAnimation from "@/components/ProposeAnimation";

const Index = () => {
  // Set your relationship start date here
  const relationshipStartDate = new Date("2023-01-01");

  return (
    <main className="min-h-screen relative">
      <FloatingHearts />
      <ProposeAnimation />
      <HeroSection />
      <LoveCounter targetDate={relationshipStartDate} />
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
