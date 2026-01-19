import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heart, Camera } from "lucide-react";

interface PhotoMemory {
  id: number;
  caption: string;
  date: string;
}

interface Feeling {
  id: number;
  title: string;
  content: string;
}

const PhotoGallery = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const memories: PhotoMemory[] = [
    { id: 1, caption: "Our first adventure together", date: "The Beginning" },
    { id: 2, caption: "That sunset we'll never forget", date: "A Perfect Day" },
    { id: 3, caption: "Dancing in the rain", date: "Pure Joy" },
    { id: 4, caption: "Where you said yes", date: "Forever" },
    { id: 5, caption: "Building our dreams", date: "Together" },
    { id: 6, caption: "Every moment with you", date: "Always" },
  ];

  const feelings: Feeling[] = [
    {
      id: 1,
      title: "When I See You Smile",
      content: "My heart skips a beat every single time. Your smile is the sunrise I never knew I was waiting for.",
    },
    {
      id: 2,
      title: "Your Voice",
      content: "It's the melody that calms every storm inside me. I could listen to you forever.",
    },
    {
      id: 3,
      title: "Your Presence",
      content: "Just being near you feels like home. You are my peace, my sanctuary, my everything.",
    },
    {
      id: 4,
      title: "Your Love",
      content: "It healed parts of me I didn't even know were broken. You showed me what real love feels like.",
    },
    {
      id: 5,
      title: "Our Future",
      content: "I see forever in your eyes. Every dream I have now includes you by my side.",
    },
    {
      id: 6,
      title: "My Promise",
      content: "I will love you endlessly, protect your heart, and cherish every moment we share together.",
    },
  ];

  return (
    <section ref={ref} className="py-24 md:py-32 bg-background">
      <div className="container max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light text-foreground mb-4">
            Sravan & Divya
          </h2>
          <div className="w-24 h-px bg-primary mx-auto mt-6" />
        </motion.div>

        <Tabs defaultValue="journey" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-12 bg-soft-blush/50">
            <TabsTrigger value="journey" className="font-serif text-base data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Camera className="w-4 h-4 mr-2" />
              Our Journey
            </TabsTrigger>
            <TabsTrigger value="feelings" className="font-serif text-base data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Heart className="w-4 h-4 mr-2" />
              My Feelings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="journey">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-center font-sans text-lg text-muted-foreground font-light mb-8">
                Moments frozen in time, memories we'll cherish forever
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {memories.map((memory, index) => (
                  <motion.div
                    key={memory.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="group relative"
                  >
                    <div className="relative aspect-[4/5] overflow-hidden rounded-lg shadow-soft bg-card">
                      <div className="absolute inset-0 bg-gradient-to-br from-soft-blush via-warm-cream to-accent flex items-center justify-center">
                        <div className="text-center p-6">
                          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/20 flex items-center justify-center">
                            <span className="text-2xl">📷</span>
                          </div>
                          <p className="font-serif text-sm text-muted-foreground italic">
                            Add your photo here
                          </p>
                        </div>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end">
                        <div className="p-6 text-primary-foreground">
                          <span className="block font-sans text-xs tracking-[0.2em] uppercase text-primary-foreground/70 mb-1">
                            {memory.date}
                          </span>
                          <p className="font-serif text-lg italic">
                            {memory.caption}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              <p className="text-center mt-12 font-sans text-sm text-muted-foreground">
                ✨ Replace these placeholders with your own cherished memories
              </p>
            </motion.div>
          </TabsContent>

          <TabsContent value="feelings">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-center font-sans text-lg text-muted-foreground font-light mb-8">
                What my heart feels for you, Divya
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {feelings.map((feeling, index) => (
                  <motion.div
                    key={feeling.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="bg-card rounded-lg p-8 shadow-soft border border-border hover:shadow-lg transition-shadow duration-300"
                  >
                    <Heart className="w-8 h-8 text-primary mb-4" />
                    <h3 className="font-serif text-xl font-medium text-foreground mb-3 italic">
                      {feeling.title}
                    </h3>
                    <p className="font-sans text-muted-foreground leading-relaxed">
                      {feeling.content}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default PhotoGallery;
