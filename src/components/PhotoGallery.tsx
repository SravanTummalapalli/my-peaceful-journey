import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

interface PhotoMemory {
  id: number;
  caption: string;
  date: string;
  placeholder: boolean;
}

const PhotoGallery = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  // Placeholder photos - user can replace with their own
  const memories: PhotoMemory[] = [
    { id: 1, caption: "Our first adventure together", date: "The Beginning", placeholder: true },
    { id: 2, caption: "That sunset we'll never forget", date: "A Perfect Day", placeholder: true },
    { id: 3, caption: "Dancing in the rain", date: "Pure Joy", placeholder: true },
    { id: 4, caption: "Where you said yes", date: "Forever", placeholder: true },
    { id: 5, caption: "Building our dreams", date: "Together", placeholder: true },
    { id: 6, caption: "Every moment with you", date: "Always", placeholder: true },
  ];

  return (
    <section ref={ref} className="py-24 md:py-32 bg-background">
      <div className="container max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 md:mb-20"
        >
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light text-foreground mb-4">
            Our Journey
          </h2>
          <p className="font-sans text-lg text-muted-foreground font-light">
            Moments frozen in time, memories we'll cherish forever
          </p>
          <div className="w-24 h-px bg-primary mx-auto mt-6" />
        </motion.div>

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
                {/* Placeholder for user photos */}
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

                {/* Hover overlay */}
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

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-12 font-sans text-sm text-muted-foreground"
        >
          ✨ Replace these placeholders with your own cherished memories
        </motion.p>
      </div>
    </section>
  );
};

export default PhotoGallery;
