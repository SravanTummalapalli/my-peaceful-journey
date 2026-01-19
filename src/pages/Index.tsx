import HeroSection from "@/components/HeroSection";
import StorySection from "@/components/StorySection";
import PhotoGallery from "@/components/PhotoGallery";
import LoveNote from "@/components/LoveNote";

const Index = () => {
  return (
    <main className="min-h-screen">
      <HeroSection />
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
