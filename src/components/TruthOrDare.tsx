import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, X, MessageCircleHeart, Flame, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

const truths = [
  "What's your favorite memory of us together? 💭",
  "What did you first notice about me? 👀",
  "What's something I do that always makes you smile? 😊",
  "What's your favorite thing about our relationship? 💕",
  "What's a dream you have for our future together? ✨",
  "What song reminds you of me? 🎵",
  "What's the most romantic thing I've ever done for you? 🌹",
  "What do you love most about the way I show affection? 💗",
  "What's something you've always wanted to tell me? 💌",
  "What was your first impression of me? 🤔",
  "What's the best trip or date we've had together? 🌟",
  "What makes you feel most loved by me? 💝",
  "What's a silly habit of mine that you secretly love? 🥰",
  "What do you think makes us a great team? 🤝",
  "What's your favorite way to spend time with me? ⏰",
];

const dares = [
  "Give me a 30-second forehead kiss 😘",
  "Write me a love note right now 💌",
  "Do your best impression of me! 🎭",
  "Serenade me with a love song 🎤",
  "Give me a tight hug for 1 minute 🤗",
  "Tell me 5 things you love about me ❤️",
  "Dance with me to an imaginary song 💃",
  "Recreate our first meeting pose 📸",
  "Whisper something sweet in my ear 👂",
  "Make up a poem about us on the spot 📝",
  "Kiss my hand like a prince/princess 👑",
  "Give me a piggyback ride! 🐷",
  "Feed me a snack lovingly 🍫",
  "Take a silly selfie with me 🤳",
  "Plan our next date right now 📅",
];

const TruthOrDare = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentChallenge, setCurrentChallenge] = useState<{ type: 'truth' | 'dare' | null; text: string }>({ type: null, text: '' });
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);

  const spinWheel = (choice: 'truth' | 'dare') => {
    if (isSpinning) return;
    
    setIsSpinning(true);
    setCurrentChallenge({ type: null, text: '' });
    
    // Spin animation
    const newRotation = rotation + 720 + Math.random() * 360;
    setRotation(newRotation);
    
    setTimeout(() => {
      const items = choice === 'truth' ? truths : dares;
      const randomIndex = Math.floor(Math.random() * items.length);
      setCurrentChallenge({ type: choice, text: items[randomIndex] });
      setIsSpinning(false);
    }, 1500);
  };

  const resetGame = () => {
    setCurrentChallenge({ type: null, text: '' });
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-24 right-4 z-40 bg-gradient-to-r from-rose-500 to-amber-500 text-white p-4 rounded-full shadow-lg"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={{ 
          rotate: [0, 5, -5, 0],
          scale: [1, 1.05, 1]
        }}
        transition={{ repeat: Infinity, duration: 3 }}
      >
        <Flame size={24} />
      </motion.button>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0, rotateY: -30 }}
              animate={{ scale: 1, opacity: 1, rotateY: 0 }}
              exit={{ scale: 0.5, opacity: 0, rotateY: 30 }}
              transition={{ type: "spring", damping: 20 }}
              className="relative bg-gradient-to-br from-rose-50 via-amber-50 to-pink-50 p-6 rounded-3xl max-w-sm w-full shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-3 right-3 text-rose-400 hover:text-rose-600 transition-colors"
              >
                <X size={24} />
              </button>

              {/* Title */}
              <div className="text-center mb-6">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Sparkles className="text-amber-500" size={20} />
                  <h3 className="text-2xl font-serif text-rose-700">
                    Truth or Dare
                  </h3>
                  <Sparkles className="text-amber-500" size={20} />
                </div>
                <p className="text-sm text-muted-foreground">
                  Couples Edition 💕
                </p>
              </div>

              {/* Spinning Heart Indicator */}
              <div className="relative w-32 h-32 mx-auto mb-6">
                <motion.div
                  className="w-full h-full flex items-center justify-center"
                  animate={{ rotate: rotation }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                >
                  <div className="relative">
                    <Heart 
                      size={80} 
                      className={`transition-colors duration-300 ${
                        currentChallenge.type === 'truth' 
                          ? 'text-blue-400 fill-blue-400' 
                          : currentChallenge.type === 'dare'
                          ? 'text-rose-500 fill-rose-500'
                          : 'text-rose-300 fill-rose-200'
                      }`}
                    />
                    <motion.div
                      className="absolute inset-0 flex items-center justify-center"
                      animate={isSpinning ? { scale: [1, 1.2, 1] } : {}}
                      transition={{ repeat: Infinity, duration: 0.5 }}
                    >
                      {isSpinning && (
                        <span className="text-white text-2xl">?</span>
                      )}
                    </motion.div>
                  </div>
                </motion.div>
              </div>

              {/* Choice Buttons */}
              <div className="flex gap-3 mb-6">
                <Button
                  onClick={() => spinWheel('truth')}
                  disabled={isSpinning}
                  className="flex-1 bg-gradient-to-r from-blue-400 to-cyan-400 hover:from-blue-500 hover:to-cyan-500 text-white rounded-full py-6 shadow-lg"
                >
                  <MessageCircleHeart className="mr-2" size={20} />
                  Truth
                </Button>
                <Button
                  onClick={() => spinWheel('dare')}
                  disabled={isSpinning}
                  className="flex-1 bg-gradient-to-r from-rose-500 to-orange-400 hover:from-rose-600 hover:to-orange-500 text-white rounded-full py-6 shadow-lg"
                >
                  <Flame className="mr-2" size={20} />
                  Dare
                </Button>
              </div>

              {/* Challenge Display */}
              <AnimatePresence mode="wait">
                {currentChallenge.text && (
                  <motion.div
                    initial={{ opacity: 0, y: 20, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.9 }}
                    className={`p-5 rounded-2xl shadow-inner ${
                      currentChallenge.type === 'truth'
                        ? 'bg-gradient-to-br from-blue-100 to-cyan-100'
                        : 'bg-gradient-to-br from-rose-100 to-orange-100'
                    }`}
                  >
                    <div className="flex items-center justify-center gap-2 mb-3">
                      {currentChallenge.type === 'truth' ? (
                        <MessageCircleHeart className="text-blue-500" size={20} />
                      ) : (
                        <Flame className="text-rose-500" size={20} />
                      )}
                      <span className={`font-semibold uppercase tracking-wide text-sm ${
                        currentChallenge.type === 'truth' ? 'text-blue-600' : 'text-rose-600'
                      }`}>
                        {currentChallenge.type}
                      </span>
                    </div>
                    <p className={`text-center font-serif text-lg leading-relaxed ${
                      currentChallenge.type === 'truth' ? 'text-blue-700' : 'text-rose-700'
                    }`}>
                      {currentChallenge.text}
                    </p>
                    
                    {/* Reset Button */}
                    <motion.button
                      onClick={resetGame}
                      className="mt-4 mx-auto flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <RefreshCw size={14} />
                      Play Again
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Decorative Hearts */}
              <div className="absolute -top-2 -left-2">
                <Heart size={16} className="text-rose-300 fill-rose-300" />
              </div>
              <div className="absolute -bottom-2 -right-2">
                <Heart size={16} className="text-rose-300 fill-rose-300" />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default TruthOrDare;
