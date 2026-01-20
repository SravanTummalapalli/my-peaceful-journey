import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Heart, Star, Sparkles, MapPin, Gift, Calendar } from "lucide-react";

interface TimelineEvent {
  id: number;
  date: string;
  title: string;
  description: string;
  icon: typeof Heart;
}

const Timeline = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const events: TimelineEvent[] = [
    {
      id: 1,
      date: "The Beginning",
      title: "When We First Met",
      description: "The day my life changed forever. One look at you and I knew something special had begun.",
      icon: Star,
    },
    {
      id: 2,
      date: "Our First Date",
      title: "The First Spark",
      description: "Nervous hearts and endless conversations. Time stopped when I was with you.",
      icon: MapPin,
    },
    {
      id: 3,
      date: "A Special Moment",
      title: "I Knew You Were The One",
      description: "In that quiet moment, I realized you were my forever. My heart chose you completely.",
      icon: Sparkles,
    },
    {
      id: 4,
      date: "Growing Together",
      title: "Building Our Dreams",
      description: "Every challenge made us stronger. Every joy made us closer. Our love grew deeper each day.",
      icon: Gift,
    },
    {
      id: 5,
      date: "Forever",
      title: "My Promise To You",
      description: "I will love you endlessly, cherish every moment, and stand by you through all of life's adventures.",
      icon: Heart,
    },
  ];

  return (
    <section ref={ref} className="py-20 md:py-28 bg-gradient-to-b from-soft-blush/30 via-background to-background relative">
      <div className="container max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <Calendar className="w-10 h-10 mx-auto mb-4 text-primary" />
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-light text-foreground mb-3">
            Our Journey Together
          </h2>
          <p className="font-sans text-muted-foreground text-lg">
            Every chapter of our love story
          </p>
          <div className="w-24 h-px bg-primary mx-auto mt-6" />
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Center line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/60 via-primary/40 to-primary/20 transform -translate-x-1/2 hidden md:block" />
          <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-primary/60 via-primary/40 to-primary/20 md:hidden" />

          <div className="space-y-12 md:space-y-16">
            {events.map((event, index) => {
              const Icon = event.icon;
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  className={`relative flex items-center ${
                    isEven ? "md:flex-row" : "md:flex-row-reverse"
                  } flex-row`}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-6 md:left-1/2 transform -translate-x-1/2 z-10">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={isInView ? { scale: 1 } : {}}
                      transition={{ duration: 0.4, delay: index * 0.15 + 0.2 }}
                      className="w-12 h-12 rounded-full bg-primary flex items-center justify-center shadow-glow"
                    >
                      <Icon className="w-5 h-5 text-primary-foreground" />
                    </motion.div>
                  </div>

                  {/* Content */}
                  <div
                    className={`w-full md:w-1/2 ${
                      isEven ? "md:pr-16 pl-20 md:pl-0 md:text-right" : "md:pl-16 pl-20 md:text-left"
                    }`}
                  >
                    <div className="bg-card border border-border rounded-2xl p-6 shadow-soft hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                      <span className="inline-block font-sans text-xs tracking-[0.2em] uppercase text-primary mb-2">
                        {event.date}
                      </span>
                      <h3 className="font-serif text-xl md:text-2xl text-foreground mb-2 italic">
                        {event.title}
                      </h3>
                      <p className="font-sans text-muted-foreground leading-relaxed">
                        {event.description}
                      </p>
                    </div>
                  </div>

                  {/* Spacer for opposite side */}
                  <div className="hidden md:block w-1/2" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Timeline;
