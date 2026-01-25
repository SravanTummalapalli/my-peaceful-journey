import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, X, Gift } from 'lucide-react';

const dateIdeas = [
  { text: "Movie Night 🎬", color: "hsl(var(--primary))" },
  { text: "Candlelit Dinner 🕯️", color: "hsl(350, 80%, 60%)" },
  { text: "Stargazing 🌟", color: "hsl(280, 70%, 50%)" },
  { text: "Picnic Date 🧺", color: "hsl(120, 60%, 45%)" },
  { text: "Dance Together 💃", color: "hsl(320, 75%, 55%)" },
  { text: "Cook Together 👩‍🍳", color: "hsl(30, 80%, 55%)" },
  { text: "Beach Walk 🏖️", color: "hsl(200, 75%, 50%)" },
  { text: "Spa Day 🧖‍♀️", color: "hsl(170, 60%, 45%)" },
];

const SpinWheel = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const spinWheel = () => {
    if (isSpinning) return;
    
    setIsSpinning(true);
    setResult(null);
    
    const spins = 5 + Math.random() * 5;
    const newRotation = rotation + (spins * 360) + Math.random() * 360;
    setRotation(newRotation);
    
    setTimeout(() => {
      const normalizedRotation = newRotation % 360;
      const segmentAngle = 360 / dateIdeas.length;
      const selectedIndex = Math.floor((360 - normalizedRotation + segmentAngle / 2) / segmentAngle) % dateIdeas.length;
      setResult(dateIdeas[selectedIndex].text);
      setIsSpinning(false);
    }, 4000);
  };

  return (
    <>
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-24 left-4 z-40 bg-gradient-to-r from-purple-500 to-pink-500 text-white p-4 rounded-full shadow-lg"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={{ rotate: [0, 10, -10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <Gift size={24} />
      </motion.button>

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
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              className="relative bg-gradient-to-br from-rose-100 to-pink-100 p-6 rounded-3xl max-w-sm w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-3 right-3 text-rose-600 hover:text-rose-800"
              >
                <X size={24} />
              </button>

              <h3 className="text-2xl font-serif text-rose-700 text-center mb-4 flex items-center justify-center gap-2">
                <Sparkles className="text-amber-500" size={20} />
                Date Night Spinner
                <Sparkles className="text-amber-500" size={20} />
              </h3>

              <div className="relative w-64 h-64 mx-auto mb-4">
                {/* Pointer */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 z-10">
                  <div className="w-0 h-0 border-l-[12px] border-r-[12px] border-t-[20px] border-l-transparent border-r-transparent border-t-rose-600" />
                </div>
                
                {/* Wheel */}
                <motion.div
                  className="w-full h-full rounded-full relative overflow-hidden shadow-xl"
                  animate={{ rotate: rotation }}
                  transition={{ duration: 4, ease: "easeOut" }}
                  style={{
                    background: `conic-gradient(${dateIdeas.map((idea, i) => 
                      `${idea.color} ${i * (360/dateIdeas.length)}deg ${(i+1) * (360/dateIdeas.length)}deg`
                    ).join(', ')})`
                  }}
                >
                  {dateIdeas.map((idea, i) => {
                    const angle = (i * (360 / dateIdeas.length)) + (180 / dateIdeas.length);
                    return (
                      <div
                        key={i}
                        className="absolute w-full h-full flex items-center justify-center"
                        style={{
                          transform: `rotate(${angle}deg)`,
                        }}
                      >
                        <span 
                          className="absolute text-xs font-bold text-white drop-shadow-lg"
                          style={{ 
                            transform: `translateY(-80px) rotate(0deg)`,
                            textShadow: '1px 1px 2px rgba(0,0,0,0.5)'
                          }}
                        >
                          {idea.text.split(' ')[0]}
                        </span>
                      </div>
                    );
                  })}
                </motion.div>

                {/* Center */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center">
                  <Heart className="text-rose-500" fill="currentColor" size={20} />
                </div>
              </div>

              <motion.button
                onClick={spinWheel}
                disabled={isSpinning}
                className="w-full py-3 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-full font-semibold disabled:opacity-50"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isSpinning ? "Spinning..." : "Spin for a Date! 💕"}
              </motion.button>

              <AnimatePresence>
                {result && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mt-4 p-4 bg-white/80 rounded-xl text-center"
                  >
                    <p className="text-rose-600 font-serif text-lg">
                      Your next date: <br />
                      <span className="text-2xl font-bold">{result}</span>
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SpinWheel;
