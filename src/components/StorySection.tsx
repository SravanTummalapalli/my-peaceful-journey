import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const StorySection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const stories = [
    {
      title: "Before You",
      content: "My world was chaos. Days blurred together in an endless search for something I couldn't name. I was lost in the noise, looking for peace I didn't believe existed.",
    },
    {
      title: "The Day We Met",
      content: "And then there was you. A moment that felt like coming home to a place I'd never been. Your smile was the first thing that made time slow down for me.",
    },
    {
      title: "Finding Peace",
      content: "With you, I learned that peace isn't the absence of storms—it's having someone to weather them with. You became my calm, my sanctuary, my safe place.",
    },
  ];

  return (
    <section ref={ref} className="py-24 md:py-32 bg-romantic-gradient">
      <div className="container max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 md:mb-24"
        >
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light text-foreground mb-4">
            How You Changed My Life
          </h2>
          <div className="w-24 h-px bg-primary mx-auto" />
        </motion.div>

        <div className="space-y-16 md:space-y-24">
          {stories.map((story, index) => (
            <motion.div
              key={story.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="text-center"
            >
              <span className="inline-block font-serif text-sm tracking-[0.3em] uppercase text-primary mb-4">
                Chapter {index + 1}
              </span>
              <h3 className="font-serif text-3xl md:text-4xl font-light text-foreground mb-6 italic">
                {story.title}
              </h3>
              <p className="font-sans text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto font-light">
                {story.content}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StorySection;
