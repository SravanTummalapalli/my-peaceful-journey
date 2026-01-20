import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Heart, Calendar, Clock, Sparkles } from "lucide-react";

interface CounterProps {
  targetDate: Date;
}

const LoveCounter = ({ targetDate }: CounterProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [timeTogether, setTimeTogether] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date();
      const diff = now.getTime() - targetDate.getTime();

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeTogether({ days, hours, minutes, seconds });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  const CounterBox = ({ value, label, icon: Icon }: { value: number; label: string; icon: typeof Calendar }) => (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.6 }}
      className="relative group"
    >
      <div className="bg-card border border-border rounded-2xl p-6 md:p-8 shadow-soft hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
        <Icon className="w-6 h-6 text-primary mx-auto mb-3 opacity-60" />
        <motion.span
          key={value}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="block font-serif text-4xl md:text-5xl lg:text-6xl text-foreground font-light"
        >
          {value.toLocaleString()}
        </motion.span>
        <span className="block font-sans text-sm text-muted-foreground mt-2 tracking-[0.15em] uppercase">
          {label}
        </span>
      </div>
    </motion.div>
  );

  return (
    <section ref={ref} className="py-20 md:py-28 bg-gradient-to-b from-background via-soft-blush/20 to-background relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-10 left-10 opacity-20">
        <Sparkles className="w-8 h-8 text-primary animate-pulse" />
      </div>
      <div className="absolute bottom-10 right-10 opacity-20">
        <Sparkles className="w-6 h-6 text-primary animate-pulse" />
      </div>

      <div className="container max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <Heart className="w-10 h-10 mx-auto mb-4 text-primary animate-pulse" />
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-light text-foreground mb-3">
            Our Love Story
          </h2>
          <p className="font-sans text-muted-foreground text-lg">
            Every second with you is a blessing
          </p>
          <div className="w-24 h-px bg-primary mx-auto mt-6" />
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          <CounterBox value={timeTogether.days} label="Days" icon={Calendar} />
          <CounterBox value={timeTogether.hours} label="Hours" icon={Clock} />
          <CounterBox value={timeTogether.minutes} label="Minutes" icon={Sparkles} />
          <CounterBox value={timeTogether.seconds} label="Seconds" icon={Heart} />
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center mt-10 font-serif text-lg md:text-xl text-muted-foreground italic"
        >
          ...and counting every magical moment together ♡
        </motion.p>
      </div>
    </section>
  );
};

export default LoveCounter;
