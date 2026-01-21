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
                  className="absolute bottom-[15%] left-1/2 transform -translate-x-1/2 flex items-end gap-4 md:gap-8"
                  initial={{ x: "-50%", scale: 0.3, opacity: 0 }}
                  animate={{ x: "-50%", scale: 1, opacity: 1 }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                >
                  {/* Sravan - Kneeling with ring */}
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
                      className="relative"
                    >
                      {/* Man kneeling - realistic silhouette */}
                      <svg viewBox="0 0 120 140" className="w-24 h-32 md:w-32 md:h-44 drop-shadow-2xl">
                        <defs>
                          <linearGradient id="personGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#0a0a0a" />
                            <stop offset="100%" stopColor="#1a1a1a" />
                          </linearGradient>
                        </defs>
                        {/* Head */}
                        <ellipse cx="55" cy="22" rx="14" ry="16" fill="url(#personGrad)" />
                        {/* Neck */}
                        <rect x="50" y="36" width="10" height="8" fill="url(#personGrad)" />
                        {/* Torso - leaning forward */}
                        <path d="M 35 44 Q 40 50, 45 75 L 70 75 Q 75 50, 75 44 Q 55 38, 35 44" fill="url(#personGrad)" />
                        {/* Back arm reaching up with ring */}
                        <path d="M 72 50 Q 95 35, 100 25 Q 102 22, 100 20 Q 98 18, 95 20 Q 88 28, 70 45" fill="url(#personGrad)" />
                        {/* Front arm */}
                        <path d="M 38 52 Q 25 60, 20 70 Q 18 75, 22 75 Q 30 72, 40 62" fill="url(#personGrad)" />
                        {/* Kneeling leg (front) */}
                        <path d="M 45 75 Q 35 90, 30 105 Q 28 115, 35 118 L 55 118 Q 55 105, 50 90 Q 48 80, 50 75" fill="url(#personGrad)" />
                        {/* Back leg extended */}
                        <path d="M 65 75 Q 85 85, 105 95 Q 115 100, 118 105 Q 120 110, 115 112 L 100 105 Q 80 95, 65 80" fill="url(#personGrad)" />
                        {/* Ring */}
                        <circle cx="98" cy="20" r="6" fill="none" stroke="#ffd700" strokeWidth="2" />
                        <circle cx="98" cy="17" r="2" fill="#ffffff" />
                      </svg>
                    </motion.div>
                  </motion.div>

                  {/* Heart between */}
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 2, type: "spring" }}
                    className="absolute left-1/2 -top-12 transform -translate-x-1/2"
                  >
                    <motion.div
                      animate={{ scale: [1, 1.3, 1], y: [0, -8, 0] }}
                      transition={{ repeat: Infinity, duration: 1.2 }}
                    >
                      <Heart className="w-12 h-12 text-red-500 fill-red-500 drop-shadow-lg" />
                    </motion.div>
                  </motion.div>

                  {/* Divya - Standing elegantly */}
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
                      {/* Woman standing - elegant dress silhouette */}
                      <svg viewBox="0 0 100 160" className="w-20 h-36 md:w-28 md:h-48 drop-shadow-2xl">
                        <defs>
                          <linearGradient id="womanGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#0a0a0a" />
                            <stop offset="100%" stopColor="#1a1a1a" />
                          </linearGradient>
                        </defs>
                        {/* Hair */}
                        <ellipse cx="50" cy="18" rx="18" ry="10" fill="url(#womanGrad)" />
                        <path d="M 32 18 Q 28 35, 30 50 Q 32 55, 38 50 Q 36 35, 38 22" fill="url(#womanGrad)" />
                        <path d="M 68 18 Q 72 35, 70 50 Q 68 55, 62 50 Q 64 35, 62 22" fill="url(#womanGrad)" />
                        {/* Head */}
                        <ellipse cx="50" cy="24" rx="12" ry="14" fill="url(#womanGrad)" />
                        {/* Neck */}
                        <rect x="45" y="36" width="10" height="8" fill="url(#womanGrad)" />
                        {/* Shoulders & upper body */}
                        <path d="M 32 44 Q 35 42, 50 42 Q 65 42, 68 44 L 65 65 Q 50 68, 35 65 Z" fill="url(#womanGrad)" />
                        {/* Arms - hands together at chest (surprised/emotional pose) */}
                        <path d="M 32 46 Q 22 50, 18 58 Q 16 62, 20 65 Q 28 62, 35 55" fill="url(#womanGrad)" />
                        <path d="M 68 46 Q 78 50, 82 58 Q 84 62, 80 65 Q 72 62, 65 55" fill="url(#womanGrad)" />
                        {/* Hands clasped at chest */}
                        <ellipse cx="50" cy="62" rx="8" ry="6" fill="url(#womanGrad)" />
                        {/* Elegant flowing dress */}
                        <path d="M 35 65 Q 20 100, 15 150 L 85 150 Q 80 100, 65 65 Q 50 70, 35 65" fill="url(#womanGrad)" />
                        {/* Dress details - subtle curves */}
                        <path d="M 30 90 Q 50 95, 70 90" fill="none" stroke="#1f1f1f" strokeWidth="1" opacity="0.3" />
                        <path d="M 22 120 Q 50 128, 78 120" fill="none" stroke="#1f1f1f" strokeWidth="1" opacity="0.3" />
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
