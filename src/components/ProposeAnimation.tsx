import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, X, Diamond, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

const ProposeAnimation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [stage, setStage] = useState(0); // 0: sunset, 1: walking, 2: kneeling, 3: message, 4: accepted
  const [accepted, setAccepted] = useState(false);

  const handlePropose = () => {
    setIsOpen(true);
    setStage(0);
    setAccepted(false);
    
    // Progressive reveal sequence
    setTimeout(() => setStage(1), 1500); // Beach appears
    setTimeout(() => setStage(2), 3500); // Couple walks in
    setTimeout(() => setStage(3), 5500); // Proposal moment
  };

  const handleAccept = () => {
    setAccepted(true);
    setStage(4);
  };

  const handleClose = () => {
    setIsOpen(false);
    setStage(0);
    setAccepted(false);
  };

  // Generate wave particles
  const waveParticles = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    delay: i * 0.3,
  }));

  // Generate footprints
  const footprints = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    left: 15 + i * 10,
    delay: 2 + i * 0.2,
    rotate: i % 2 === 0 ? -15 : 15,
  }));

  // Generate birds
  const birds = Array.from({ length: 5 }, (_, i) => ({
    id: i,
    startX: -50 - i * 30,
    y: 10 + i * 5,
    delay: i * 0.5,
  }));

  // Generate sparkles for celebration
  const celebrationSparkles = Array.from({ length: 40 }, (_, i) => ({
    id: i,
    x: (Math.random() - 0.5) * 800,
    y: (Math.random() - 0.5) * 800,
    delay: Math.random() * 0.5,
  }));

  return (
    <>
      {/* Propose Button */}
      <motion.div
        className="fixed bottom-8 right-8 z-40"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 2, type: "spring", stiffness: 200 }}
      >
        <Button
          onClick={handlePropose}
          className="group relative bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-6 py-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
        >
          <Diamond className="w-5 h-5 mr-2 group-hover:animate-bounce" />
          <span className="font-serif text-lg">Propose</span>
          <motion.div
            className="absolute -top-1 -right-1"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <Heart className="w-4 h-4 text-red-300 fill-red-300" />
          </motion.div>
        </Button>
      </motion.div>

      {/* Beach Sunset Proposal Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 overflow-hidden"
          >
            {/* Gradient Sky Background */}
            <motion.div
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{
                background: "linear-gradient(180deg, #1a1a2e 0%, #16213e 15%, #e94560 40%, #ff6b6b 55%, #ffd93d 75%, #ff8c00 100%)",
              }}
            />

            {/* Animated Sun */}
            <motion.div
              className="absolute left-1/2 transform -translate-x-1/2"
              initial={{ top: "30%", scale: 1.5 }}
              animate={{ top: "45%", scale: 1 }}
              transition={{ duration: 3, ease: "easeOut" }}
            >
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ repeat: Infinity, duration: 3 }}
                className="relative"
              >
                <div className="w-32 h-32 md:w-48 md:h-48 rounded-full bg-gradient-to-b from-yellow-200 via-orange-300 to-orange-500 shadow-[0_0_100px_50px_rgba(255,200,100,0.4)]" />
                {/* Sun reflection rays */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <Sun className="w-20 h-20 md:w-28 md:h-28 text-yellow-100 opacity-60" />
                </div>
              </motion.div>
            </motion.div>

            {/* Flying Birds */}
            {birds.map((bird) => (
              <motion.div
                key={bird.id}
                className="absolute text-gray-800 text-2xl"
                style={{ top: `${bird.y}%` }}
                initial={{ x: bird.startX, opacity: 0 }}
                animate={{ x: "100vw", opacity: [0, 1, 1, 0] }}
                transition={{
                  duration: 8,
                  delay: bird.delay,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                🐦
              </motion.div>
            ))}

            {/* Ocean */}
            <motion.div
              className="absolute bottom-0 left-0 right-0 h-[35%]"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ delay: 0.5, duration: 1.5, ease: "easeOut" }}
            >
              {/* Water gradient */}
              <div
                className="absolute inset-0"
                style={{
                  background: "linear-gradient(180deg, rgba(255,140,0,0.6) 0%, #1e3a5f 30%, #0d1b2a 100%)",
                }}
              />
              
              {/* Sun reflection on water */}
              <motion.div
                className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-full"
                style={{
                  background: "linear-gradient(180deg, rgba(255,215,0,0.6) 0%, rgba(255,140,0,0.3) 50%, transparent 100%)",
                }}
                animate={{ scaleX: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
              />

              {/* Animated Waves */}
              {waveParticles.map((wave) => (
                <motion.div
                  key={wave.id}
                  className="absolute w-full h-4 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  style={{ top: `${5 + wave.id * 6}%` }}
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{
                    duration: 4,
                    delay: wave.delay,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
              ))}
            </motion.div>

            {/* Beach/Sand */}
            <motion.div
              className="absolute bottom-0 left-0 right-0 h-[18%]"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ delay: 1, duration: 1, ease: "easeOut" }}
              style={{
                background: "linear-gradient(180deg, #c2956e 0%, #a67c52 50%, #8b6b45 100%)",
              }}
            >
              {/* Sand texture */}
              <div className="absolute inset-0 opacity-30" 
                style={{
                  backgroundImage: "radial-gradient(circle at 20% 50%, #d4a76a 1px, transparent 1px), radial-gradient(circle at 80% 30%, #d4a76a 1px, transparent 1px)",
                  backgroundSize: "20px 20px",
                }}
              />
            </motion.div>

            {/* Footprints in sand */}
            <AnimatePresence>
              {stage >= 2 && footprints.map((fp) => (
                <motion.div
                  key={fp.id}
                  className="absolute bottom-[12%] text-2xl opacity-40"
                  style={{ 
                    left: `${fp.left}%`,
                    transform: `rotate(${fp.rotate}deg)`,
                  }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 0.4, scale: 1 }}
                  transition={{ delay: fp.delay - 2, duration: 0.3 }}
                >
                  👣
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Couple Silhouettes on Beach */}
            <AnimatePresence>
              {stage >= 2 && (
                <motion.div
                  className="absolute bottom-[15%] left-1/2 transform -translate-x-1/2 flex items-end gap-6"
                  initial={{ x: "-50%", scale: 0.3, opacity: 0 }}
                  animate={{ x: "-50%", scale: 1, opacity: 1 }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                >
                  {/* Sravan - Kneeling */}
                  <motion.div
                    className="relative flex flex-col items-center"
                    initial={{ x: -50 }}
                    animate={{ x: 0 }}
                    transition={{ delay: 0.5, duration: 1 }}
                  >
                    <motion.div
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.5 }}
                      className="mb-2 px-3 py-1 bg-blue-600/90 rounded-full shadow-lg"
                    >
                      <span className="font-serif text-white text-sm">Sravan</span>
                    </motion.div>
                    
                    <motion.div
                      animate={stage >= 3 ? { y: [0, -3, 0] } : {}}
                      transition={{ repeat: Infinity, duration: 2 }}
                    >
                      {/* Silhouette figure kneeling */}
                      <svg viewBox="0 0 80 100" className="w-20 h-28 md:w-28 md:h-36 drop-shadow-2xl">
                        <defs>
                          <linearGradient id="sravanGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#1a1a2e" />
                            <stop offset="100%" stopColor="#0f0f23" />
                          </linearGradient>
                        </defs>
                        <circle cx="40" cy="18" r="14" fill="url(#sravanGrad)" />
                        <ellipse cx="40" cy="48" rx="16" ry="22" fill="url(#sravanGrad)" />
                        <ellipse cx="32" cy="82" rx="10" ry="16" fill="url(#sravanGrad)" />
                        <ellipse cx="55" cy="75" rx="14" ry="8" fill="url(#sravanGrad)" transform="rotate(-15 55 75)" />
                        <ellipse cx="28" cy="45" rx="6" ry="16" fill="url(#sravanGrad)" transform="rotate(35 28 45)" />
                        <ellipse cx="52" cy="38" rx="6" ry="18" fill="url(#sravanGrad)" transform="rotate(-25 52 38)" />
                      </svg>
                      
                      {/* Ring box */}
                      <motion.div
                        className="absolute -top-2 right-0"
                        animate={{ 
                          rotate: stage >= 3 ? [0, 5, -5, 0] : 0,
                          scale: stage >= 3 ? [1, 1.1, 1] : 1,
                        }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                      >
                        <div className="w-8 h-8 bg-gradient-to-br from-red-800 to-red-950 rounded-sm shadow-lg flex items-center justify-center border border-red-700">
                          <div className="w-4 h-4 rounded-full border-2 border-yellow-400 bg-gradient-to-br from-yellow-200 to-yellow-400 flex items-center justify-center">
                            <div className="w-1.5 h-1.5 bg-white rounded-full shadow-lg" />
                          </div>
                        </div>
                      </motion.div>
                    </motion.div>
                  </motion.div>

                  {/* Heart between */}
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 2, type: "spring" }}
                    className="absolute left-1/2 -top-8 transform -translate-x-1/2"
                  >
                    <motion.div
                      animate={{ scale: [1, 1.3, 1], y: [0, -5, 0] }}
                      transition={{ repeat: Infinity, duration: 1.2 }}
                    >
                      <Heart className="w-10 h-10 text-red-500 fill-red-500 drop-shadow-lg" />
                    </motion.div>
                  </motion.div>

                  {/* Divya - Standing */}
                  <motion.div
                    className="relative flex flex-col items-center"
                    initial={{ x: 50 }}
                    animate={{ x: 0 }}
                    transition={{ delay: 0.5, duration: 1 }}
                  >
                    <motion.div
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.7 }}
                      className="mb-2 px-3 py-1 bg-pink-600/90 rounded-full shadow-lg"
                    >
                      <span className="font-serif text-white text-sm">Divya</span>
                    </motion.div>
                    
                    <motion.div
                      animate={stage >= 3 ? { y: [0, -2, 0] } : {}}
                      transition={{ repeat: Infinity, duration: 2.5, delay: 0.3 }}
                    >
                      <svg viewBox="0 0 70 120" className="w-18 h-32 md:w-24 md:h-40 drop-shadow-2xl">
                        <defs>
                          <linearGradient id="divyaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#1a1a2e" />
                            <stop offset="100%" stopColor="#0f0f23" />
                          </linearGradient>
                        </defs>
                        <circle cx="35" cy="16" r="12" fill="url(#divyaGrad)" />
                        <ellipse cx="35" cy="10" rx="14" ry="8" fill="url(#divyaGrad)" />
                        <path d="M 18 32 Q 12 70 10 110 L 60 110 Q 58 70 52 32 Q 35 28 18 32" fill="url(#divyaGrad)" />
                        <ellipse cx="26" cy="48" rx="6" ry="14" fill="url(#divyaGrad)" transform="rotate(25 26 48)" />
                        <ellipse cx="44" cy="48" rx="6" ry="14" fill="url(#divyaGrad)" transform="rotate(-25 44 48)" />
                      </svg>
                    </motion.div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Proposal Message */}
            <AnimatePresence>
              {stage >= 3 && !accepted && (
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 1 }}
                  className="absolute top-[10%] left-0 right-0 text-center px-6 z-20"
                >
                  <motion.h2
                    className="font-serif text-4xl md:text-6xl lg:text-7xl text-white mb-4 drop-shadow-lg"
                    style={{ textShadow: "2px 2px 20px rgba(0,0,0,0.5)" }}
                    animate={{ scale: [1, 1.02, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                  >
                    Will You Marry Me?
                  </motion.h2>
                  <motion.p 
                    className="font-sans text-lg md:text-xl text-orange-100 mb-8 max-w-lg mx-auto drop-shadow-lg"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    Divya, as the sun sets on this beautiful moment, my love for you only grows brighter. Will you be my forever?
                  </motion.p>
                  
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 1, type: "spring", stiffness: 200 }}
                  >
                    <Button
                      onClick={handleAccept}
                      className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white px-12 py-7 rounded-full text-xl font-serif shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 border-2 border-white/30"
                    >
                      <Heart className="w-6 h-6 mr-3 fill-white animate-pulse" />
                      Yes, Forever! 💍
                    </Button>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Celebration on Accept */}
            <AnimatePresence>
              {accepted && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute inset-0 flex items-center justify-center z-30"
                >
                  {/* Fireworks/Sparkles */}
                  {celebrationSparkles.map((sparkle) => (
                    <motion.div
                      key={sparkle.id}
                      className="absolute text-3xl"
                      initial={{ x: 0, y: 0, opacity: 1, scale: 0 }}
                      animate={{
                        x: sparkle.x,
                        y: sparkle.y,
                        opacity: [1, 1, 0],
                        scale: [0, 1.5, 0],
                        rotate: Math.random() * 720,
                      }}
                      transition={{ duration: 2.5, delay: sparkle.delay, ease: "easeOut" }}
                      style={{ left: "50%", top: "40%" }}
                    >
                      {["💕", "💖", "✨", "🎆", "💍", "❤️", "🌟", "💫"][Math.floor(Math.random() * 8)]}
                    </motion.div>
                  ))}

                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 100 }}
                    className="text-center z-40 bg-black/30 backdrop-blur-sm px-12 py-8 rounded-3xl"
                  >
                    <motion.h2
                      className="font-serif text-5xl md:text-7xl text-white mb-6"
                      animate={{ 
                        scale: [1, 1.05, 1],
                        textShadow: [
                          "0 0 20px rgba(255,255,255,0.5)",
                          "0 0 40px rgba(255,200,100,0.8)",
                          "0 0 20px rgba(255,255,255,0.5)",
                        ]
                      }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                    >
                      She Said Yes! 💍
                    </motion.h2>
                    <motion.p
                      className="font-serif text-2xl md:text-3xl text-orange-200"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      Sravan ♡ Divya
                    </motion.p>
                    <motion.p
                      className="font-sans text-lg text-white/80 mt-4"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1 }}
                    >
                      Forever begins now... 🌅
                    </motion.p>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors z-50 bg-black/20 rounded-full p-2"
            >
              <X className="w-8 h-8" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ProposeAnimation;
