import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Heart } from "lucide-react";

const LoveNote = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 md:py-32 bg-card">
      <div className="container max-w-3xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="text-center"
        >
          <div className="relative inline-block mb-12">
            <div className="absolute -inset-4 bg-primary/10 rounded-full blur-2xl" />
            <Heart className="relative w-16 h-16 text-primary fill-primary/30" />
          </div>

          <blockquote className="font-serif text-2xl md:text-3xl lg:text-4xl font-light text-foreground leading-relaxed italic mb-8">
            "In your eyes, I found my home.
            <br />
            In your arms, I found my peace.
            <br />
            In your heart, I found my forever."
          </blockquote>

          <div className="w-16 h-px bg-primary mx-auto mb-8" />

          <p className="font-sans text-lg text-muted-foreground font-light">
            Thank you for being my everything.
          </p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay: 0.5 }}
            className="mt-12 font-serif text-xl italic text-primary"
          >
            Forever yours ♡
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default LoveNote;
