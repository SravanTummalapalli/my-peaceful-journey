import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, X, Gift, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const valentineMessages = [
  "Sravan loves Divya more than words can say 💕",
  "Every moment with you is a gift, Divya 🎁",
  "Sravan's heart beats only for Divya 💓",
  "You are my forever Valentine, Divya 🌹",
  "Divya, you make Sravan's world complete ✨",
  "To my beautiful Divya — Happy Valentine's Day! 💝",
  "Sravan + Divya = Forever ♾️💗",
  "You're the love of my life, Divya 🥰",
];

const FloatingHeart = ({ delay, x }: { delay: number; x: number }) => (
  <motion.div
    className="absolute text-primary"
    initial={{ y: 0, x, opacity: 1, scale: 0.5 }}
    animate={{ y: -200, opacity: 0, scale: 1.5 }}
    transition={{ duration: 2, delay, ease: "easeOut" }}
  >
    <Heart className="w-5 h-5 fill-current" />
  </motion.div>
);

const ValentineButton = () => {
  const [showCelebration, setShowCelebration] = useState(false);
  const [message, setMessage] = useState("");
  const [hearts, setHearts] = useState<{ id: number; delay: number; x: number }[]>([]);

  const handleClick = () => {
    const randomMsg = valentineMessages[Math.floor(Math.random() * valentineMessages.length)];
    setMessage(randomMsg);
    setShowCelebration(true);
    setHearts(
      Array.from({ length: 20 }, (_, i) => ({
        id: Date.now() + i,
        delay: Math.random() * 1.5,
        x: Math.random() * 300 - 150,
      }))
    );
  };

  return (
    <>
      <motion.div
        className="fixed bottom-8 right-24 z-40"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 3, type: "spring", stiffness: 200 }}
      >
        <Button
          onClick={handleClick}
          className="group relative bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white px-6 py-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
        >
          <Gift className="w-5 h-5 mr-2 group-hover:animate-bounce" />
          <span className="font-serif text-lg">Valentine 💝</span>
          <motion.div
            className="absolute -top-1 -right-1"
            animate={{ scale: [1, 1.4, 1] }}
            transition={{ repeat: Infinity, duration: 1.2 }}
          >
            <Sparkles className="w-4 h-4 text-yellow-200" />
          </motion.div>
        </Button>
      </motion.div>

      <AnimatePresence>
        {showCelebration && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={() => setShowCelebration(false)}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            <motion.div
              initial={{ scale: 0, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 10 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="relative bg-gradient-to-br from-red-100 via-pink-50 to-rose-100 rounded-3xl p-8 max-w-lg w-full shadow-2xl border-2 border-red-200 overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowCelebration(false)}
                className="absolute top-4 right-4 p-2 rounded-full bg-red-200/50 hover:bg-red-300/50 transition-colors z-10"
              >
                <X className="w-5 h-5 text-red-700" />
              </button>

              {/* Floating hearts burst */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                {hearts.map((h) => (
                  <FloatingHeart key={h.id} delay={h.delay} x={h.x} />
                ))}
              </div>

              {/* Couple illustration */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-center"
              >
                <div className="text-6xl mb-4">👩‍❤️‍👨</div>

                <motion.h2
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="font-serif text-3xl md:text-4xl text-red-700 mb-2"
                >
                  Happy Valentine's Day!
                </motion.h2>

                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 }}
                  className="flex items-center justify-center gap-3 mb-6"
                >
                  <span className="font-serif text-2xl text-pink-700 italic">Sravan</span>
                  <motion.div
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ repeat: Infinity, duration: 0.8 }}
                  >
                    <Heart className="w-6 h-6 text-red-500 fill-red-500" />
                  </motion.div>
                  <span className="font-serif text-2xl text-pink-700 italic">Divya</span>
                </motion.div>

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="text-xl font-serif text-red-800 leading-relaxed px-4"
                >
                  {message}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  className="mt-6 flex justify-center gap-1"
                >
                  {[...Array(7)].map((_, i) => (
                    <motion.div
                      key={i}
                      animate={{ y: [0, -8, 0] }}
                      transition={{ repeat: Infinity, duration: 1.2, delay: i * 0.1 }}
                    >
                      <Heart className="w-4 h-4 text-red-400 fill-red-400" />
                    </motion.div>
                  ))}
                </motion.div>

                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  onClick={handleClick}
                  className="mt-6 px-6 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-full font-medium hover:from-red-600 hover:to-pink-600 transition-all hover:scale-105 shadow-lg"
                >
                  More Love! 🌹
                </motion.button>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ValentineButton;
