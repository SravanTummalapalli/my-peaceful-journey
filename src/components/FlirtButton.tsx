import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Sparkles, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const flirtyQuotes = [
  "If beauty were time, you'd be an eternity. 💕",
  "Are you a magician? Because whenever I look at you, everyone else disappears. ✨",
  "I must be a snowflake, because I've fallen for you. ❄️💗",
  "Do you have a map? I keep getting lost in your eyes. 🗺️💫",
  "Is your name Google? Because you have everything I've been searching for. 🔍❤️",
  "If kisses were snowflakes, I'd send you a blizzard. 💋❄️",
  "You're the reason I look down at my phone and smile, then walk into a pole. 📱😊",
  "I was wondering if you have an extra heart, because mine was just stolen. 💖",
  "Are you a camera? Because every time I look at you, I smile. 📸😍",
  "If you were a vegetable, you'd be a cute-cumber. 🥒💚",
  "Do you believe in love at first sight, or should I walk by again? 👀💕",
  "Is it hot in here, or is it just you? 🔥",
  "You must be tired because you've been running through my mind all day. 🏃‍♀️💭",
  "If I had a star for every time you brightened my day, I'd have a galaxy. ⭐🌌",
  "Are you a parking ticket? Because you've got 'fine' written all over you. 🎫😏",
  "I'm not a photographer, but I can picture us together. 📷❤️",
  "Your hand looks heavy, can I hold it for you? 🤝💗",
  "Do you have a Band-Aid? Because I just scraped my knee falling for you. 🩹💘",
  "Is your dad a boxer? Because you're a knockout! 🥊💫",
  "If loving you is wrong, I don't want to be right. 💞",
  "You're like a dictionary, you add meaning to my life. 📖✨",
  "I think there's something wrong with my eyes. I can't take them off you. 👁️💕",
  "Are you a light switch? Because you really turn me on. 💡😉",
  "You must be a broom, because you just swept me off my feet. 🧹💗",
  "If you were words on a page, you'd be fine print. 📝❤️",
  "Is your name Chapstick? Because you're da balm! 💋✨",
  "I must be a diamond, because you just gave me a heart. 💎💖",
  "Are you an alien? Because you just abducted my heart. 👽💕",
  "You're so sweet, you're giving me a toothache. 🍬😊",
  "Did it hurt when you fell from heaven? 😇💫",
  "I'd say God bless you, but it looks like He already did. 🙏✨",
  "You're the missing piece to my puzzle. 🧩❤️",
  "If I were to rate you from 1-10, I'd give you a 9 because I'm the 1 you need. 💯💗",
  "Can I follow you home? Because my parents always told me to follow my dreams. 🏠💭",
  "Life without you is like a broken pencil... pointless. ✏️💔",
];

const FlirtButton = () => {
  const [showQuote, setShowQuote] = useState(false);
  const [currentQuote, setCurrentQuote] = useState("");

  const handleFlirt = () => {
    const randomIndex = Math.floor(Math.random() * flirtyQuotes.length);
    setCurrentQuote(flirtyQuotes[randomIndex]);
    setShowQuote(true);
  };

  const closeQuote = () => {
    setShowQuote(false);
  };

  return (
    <>
      {/* Flirt Button */}
      <motion.div
        className="fixed bottom-8 left-8 z-40"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 2.5, type: "spring", stiffness: 200 }}
      >
        <Button
          onClick={handleFlirt}
          className="group relative bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white px-6 py-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
        >
          <Sparkles className="w-5 h-5 mr-2 group-hover:animate-spin" />
          <span className="font-serif text-lg">Flirt My Baby</span>
          <motion.div
            className="absolute -top-1 -right-1"
            animate={{ scale: [1, 1.3, 1], rotate: [0, 10, -10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <Heart className="w-4 h-4 text-red-200 fill-red-200" />
          </motion.div>
        </Button>
      </motion.div>

      {/* Quote Modal */}
      <AnimatePresence>
        {showQuote && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={closeQuote}
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            {/* Quote Card */}
            <motion.div
              initial={{ scale: 0, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 10 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="relative bg-gradient-to-br from-pink-100 via-rose-50 to-red-100 rounded-3xl p-8 max-w-md w-full shadow-2xl border-2 border-pink-200"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={closeQuote}
                className="absolute top-4 right-4 p-2 rounded-full bg-pink-200/50 hover:bg-pink-300/50 transition-colors"
              >
                <X className="w-5 h-5 text-pink-700" />
              </button>

              {/* Decorative hearts */}
              <motion.div
                className="absolute -top-4 -left-4"
                animate={{ y: [0, -5, 0], rotate: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                <Heart className="w-8 h-8 text-pink-400 fill-pink-400" />
              </motion.div>
              <motion.div
                className="absolute -bottom-3 -right-3"
                animate={{ y: [0, 5, 0], rotate: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 2, delay: 0.5 }}
              >
                <Heart className="w-6 h-6 text-rose-400 fill-rose-400" />
              </motion.div>
              <motion.div
                className="absolute top-1/2 -left-3"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                <Sparkles className="w-5 h-5 text-pink-300" />
              </motion.div>

              {/* Quote content */}
              <div className="text-center pt-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <p className="text-2xl md:text-3xl font-serif text-pink-800 leading-relaxed">
                    {currentQuote}
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="mt-6 flex justify-center gap-2"
                >
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ repeat: Infinity, duration: 1, delay: i * 0.1 }}
                    >
                      <Heart className="w-4 h-4 text-pink-400 fill-pink-400" />
                    </motion.div>
                  ))}
                </motion.div>

                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  onClick={handleFlirt}
                  className="mt-6 px-6 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-full font-medium hover:from-pink-600 hover:to-rose-600 transition-all hover:scale-105 shadow-lg"
                >
                  Another One! 💕
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default FlirtButton;
