import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Lock, Unlock, X, Sparkles } from 'lucide-react';

const SecretMessage = () => {
  const [clickPattern, setClickPattern] = useState<number[]>([]);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [showHint, setShowHint] = useState(false);
  
  // Secret pattern: tap positions 1, 4, 2, 3 (like drawing a heart shape)
  const secretPattern = [1, 4, 2, 3];
  const secretMessage = `My Dearest Divya,

From the moment you walked into my life, everything changed. You brought colors to my grey days, music to my silent nights, and love to my lonely heart.

Every day with you feels like a beautiful dream I never want to wake up from. You're not just my love, you're my best friend, my confidant, and my everything.

I promise to love you endlessly, to cherish every moment with you, and to stand by your side through every storm.

You are my today and all of my tomorrows.

Forever Yours,
Sravan 💕`;

  useEffect(() => {
    if (clickPattern.length === secretPattern.length) {
      const isCorrect = clickPattern.every((val, idx) => val === secretPattern[idx]);
      if (isCorrect) {
        setIsUnlocked(true);
      } else {
        setClickPattern([]);
      }
    }
  }, [clickPattern]);

  const handleHeartClick = (position: number) => {
    if (isUnlocked) return;
    setClickPattern(prev => [...prev, position]);
  };

  const resetPuzzle = () => {
    setClickPattern([]);
    setIsUnlocked(false);
  };

  const heartPositions = [
    { id: 1, top: '10%', left: '50%', delay: 0 },
    { id: 2, top: '35%', left: '25%', delay: 0.1 },
    { id: 3, top: '35%', left: '75%', delay: 0.2 },
    { id: 4, top: '70%', left: '50%', delay: 0.3 },
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-rose-50/50 to-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-md mx-auto"
        >
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 text-rose-500 mb-2">
              {isUnlocked ? <Unlock size={24} /> : <Lock size={24} />}
            </div>
            <h2 className="text-3xl font-serif text-rose-700 mb-2">
              Secret Love Letter
            </h2>
            <p className="text-muted-foreground text-sm">
              {isUnlocked 
                ? "You unlocked my heart! 💖" 
                : "Tap the hearts in the right order to unlock..."}
            </p>
          </div>

          <div className="relative h-64 mb-4">
            <AnimatePresence mode="wait">
              {!isUnlocked ? (
                <motion.div
                  key="puzzle"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="absolute inset-0"
                >
                  {heartPositions.map((pos) => (
                    <motion.button
                      key={pos.id}
                      onClick={() => handleHeartClick(pos.id)}
                      className="absolute -translate-x-1/2 -translate-y-1/2"
                      style={{ top: pos.top, left: pos.left }}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: pos.delay }}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Heart 
                        size={40} 
                        className={`transition-colors ${
                          clickPattern.includes(pos.id) 
                            ? 'text-rose-500 fill-rose-500' 
                            : 'text-rose-300'
                        }`}
                      />
                    </motion.button>
                  ))}
                  
                  {/* Progress indicator */}
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex gap-2">
                    {secretPattern.map((_, idx) => (
                      <div 
                        key={idx}
                        className={`w-3 h-3 rounded-full transition-colors ${
                          clickPattern[idx] !== undefined 
                            ? 'bg-rose-500' 
                            : 'bg-rose-200'
                        }`}
                      />
                    ))}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="message"
                  initial={{ opacity: 0, rotateY: -90 }}
                  animate={{ opacity: 1, rotateY: 0 }}
                  className="absolute inset-0 bg-gradient-to-br from-rose-100 to-pink-100 rounded-2xl p-6 overflow-y-auto shadow-xl"
                >
                  <button
                    onClick={resetPuzzle}
                    className="absolute top-2 right-2 text-rose-400 hover:text-rose-600"
                  >
                    <X size={20} />
                  </button>
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <Sparkles className="text-amber-500" size={16} />
                    <Heart className="text-rose-500" fill="currentColor" size={20} />
                    <Sparkles className="text-amber-500" size={16} />
                  </div>
                  <p className="text-rose-700 font-serif text-sm whitespace-pre-line leading-relaxed">
                    {secretMessage}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {!isUnlocked && (
            <motion.button
              onClick={() => setShowHint(!showHint)}
              className="block mx-auto text-rose-400 text-sm hover:text-rose-600 underline"
            >
              {showHint ? "Hide hint" : "Need a hint?"}
            </motion.button>
          )}

          <AnimatePresence>
            {showHint && !isUnlocked && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-center text-amber-600 text-xs mt-2"
              >
                💡 Draw a heart shape with your taps (top → bottom → left → right)
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default SecretMessage;
