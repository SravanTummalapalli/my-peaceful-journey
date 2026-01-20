import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Sparkles, X, Diamond } from "lucide-react";
import { Button } from "@/components/ui/button";

const ProposeAnimation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [accepted, setAccepted] = useState(false);

  const handlePropose = () => {
    setIsOpen(true);
    setShowMessage(false);
    setAccepted(false);
    setTimeout(() => setShowMessage(true), 2000);
  };

  const handleAccept = () => {
    setAccepted(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setShowMessage(false);
    setAccepted(false);
  };

  // Generate floating hearts
  const floatingHearts = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 2,
    duration: 3 + Math.random() * 3,
    size: 16 + Math.random() * 24,
  }));

  // Generate sparkles
  const sparkles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: Math.random() * 100,
    delay: Math.random() * 1.5,
  }));

  return (
    <>
      {/* Propose Button - Fixed at bottom right */}
      <motion.div
        className="fixed bottom-8 right-8 z-40"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 2, type: "spring", stiffness: 200 }}
      >
        <Button
          onClick={handlePropose}
          className="group relative bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white px-6 py-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
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

      {/* Proposal Animation Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-b from-rose-950/95 via-pink-950/95 to-purple-950/95 backdrop-blur-sm"
          >
            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute top-6 right-6 text-white/60 hover:text-white transition-colors z-50"
            >
              <X className="w-8 h-8" />
            </button>

            {/* Floating Hearts Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {floatingHearts.map((heart) => (
                <motion.div
                  key={heart.id}
                  className="absolute"
                  style={{ left: `${heart.left}%` }}
                  initial={{ y: "100vh", opacity: 0 }}
                  animate={{ y: "-100vh", opacity: [0, 1, 1, 0] }}
                  transition={{
                    duration: heart.duration,
                    delay: heart.delay,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  <Heart
                    className="text-pink-400/40 fill-pink-400/20"
                    style={{ width: heart.size, height: heart.size }}
                  />
                </motion.div>
              ))}
            </div>

            {/* Sparkles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {sparkles.map((sparkle) => (
                <motion.div
                  key={sparkle.id}
                  className="absolute"
                  style={{ left: `${sparkle.left}%`, top: `${sparkle.top}%` }}
                  animate={{
                    opacity: [0, 1, 0],
                    scale: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    delay: sparkle.delay,
                    repeat: Infinity,
                  }}
                >
                  <Sparkles className="w-4 h-4 text-yellow-300" />
                </motion.div>
              ))}
            </div>

            {/* Main Content */}
            <div className="relative z-10 text-center px-6">
              {/* Couple Silhouettes */}
              <div className="flex items-end justify-center gap-4 md:gap-8 mb-8">
                {/* Sravan - Left figure (proposing) */}
                <motion.div
                  initial={{ x: -100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 1, delay: 0.3 }}
                  className="relative"
                >
                  <div className="flex flex-col items-center">
                    {/* Name Tag */}
                    <motion.div
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1 }}
                      className="mb-3 px-4 py-1 bg-blue-500/80 rounded-full"
                    >
                      <span className="font-serif text-white text-sm md:text-base">Sravan</span>
                    </motion.div>
                    
                    {/* Silhouette - Kneeling */}
                    <motion.div
                      animate={{ y: [0, -5, 0] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                      className="relative"
                    >
                      <svg viewBox="0 0 100 120" className="w-24 h-32 md:w-32 md:h-40">
                        {/* Head */}
                        <circle cx="50" cy="20" r="18" fill="url(#gradientBlue)" />
                        {/* Body - kneeling pose */}
                        <ellipse cx="50" cy="55" rx="20" ry="25" fill="url(#gradientBlue)" />
                        {/* Kneeling leg */}
                        <ellipse cx="40" cy="95" rx="12" ry="20" fill="url(#gradientBlue)" />
                        {/* Extended leg */}
                        <ellipse cx="65" cy="85" rx="18" ry="10" fill="url(#gradientBlue)" transform="rotate(-20 65 85)" />
                        {/* Arms reaching up */}
                        <ellipse cx="35" cy="50" rx="8" ry="20" fill="url(#gradientBlue)" transform="rotate(30 35 50)" />
                        <ellipse cx="65" cy="45" rx="8" ry="22" fill="url(#gradientBlue)" transform="rotate(-20 65 45)" />
                        
                        <defs>
                          <linearGradient id="gradientBlue" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#3B82F6" />
                            <stop offset="100%" stopColor="#1D4ED8" />
                          </linearGradient>
                        </defs>
                      </svg>
                      
                      {/* Ring in hand */}
                      <motion.div
                        className="absolute -top-2 right-2"
                        animate={{ 
                          rotate: [0, 10, -10, 0],
                          scale: [1, 1.1, 1]
                        }}
                        transition={{ repeat: Infinity, duration: 2 }}
                      >
                        <div className="w-6 h-6 md:w-8 md:h-8 rounded-full border-4 border-yellow-400 bg-yellow-300/50 flex items-center justify-center">
                          <div className="w-2 h-2 md:w-3 md:h-3 bg-white rounded-full shadow-lg" />
                        </div>
                      </motion.div>
                    </motion.div>
                  </div>
                </motion.div>

                {/* Heart between them */}
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 1.5, type: "spring" }}
                  className="absolute left-1/2 top-1/3 transform -translate-x-1/2"
                >
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 1 }}
                  >
                    <Heart className="w-12 h-12 md:w-16 md:h-16 text-red-500 fill-red-500 drop-shadow-lg" />
                  </motion.div>
                </motion.div>

                {/* Divya - Right figure (standing) */}
                <motion.div
                  initial={{ x: 100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="relative"
                >
                  <div className="flex flex-col items-center">
                    {/* Name Tag */}
                    <motion.div
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.2 }}
                      className="mb-3 px-4 py-1 bg-pink-500/80 rounded-full"
                    >
                      <span className="font-serif text-white text-sm md:text-base">Divya</span>
                    </motion.div>
                    
                    {/* Silhouette - Standing with hands on heart */}
                    <motion.div
                      animate={{ y: [0, -3, 0] }}
                      transition={{ repeat: Infinity, duration: 2.5, delay: 0.5 }}
                    >
                      <svg viewBox="0 0 100 140" className="w-24 h-36 md:w-32 md:h-44">
                        {/* Head */}
                        <circle cx="50" cy="20" r="18" fill="url(#gradientPink)" />
                        {/* Hair accent */}
                        <ellipse cx="50" cy="12" rx="20" ry="10" fill="url(#gradientPink)" />
                        {/* Body - dress shape */}
                        <path d="M 30 40 Q 25 80 20 130 L 80 130 Q 75 80 70 40 Q 50 35 30 40" fill="url(#gradientPink)" />
                        {/* Arms on chest */}
                        <ellipse cx="40" cy="55" rx="8" ry="15" fill="url(#gradientPink)" transform="rotate(20 40 55)" />
                        <ellipse cx="60" cy="55" rx="8" ry="15" fill="url(#gradientPink)" transform="rotate(-20 60 55)" />
                        
                        <defs>
                          <linearGradient id="gradientPink" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#EC4899" />
                            <stop offset="100%" stopColor="#DB2777" />
                          </linearGradient>
                        </defs>
                      </svg>
                    </motion.div>
                  </div>
                </motion.div>
              </div>

              {/* Proposal Message */}
              <AnimatePresence>
                {showMessage && !accepted && (
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -30 }}
                    transition={{ duration: 0.8 }}
                    className="mt-8"
                  >
                    <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl text-white mb-4 italic">
                      Will You Marry Me?
                    </h2>
                    <p className="font-sans text-lg md:text-xl text-pink-200 mb-8 max-w-md mx-auto">
                      Divya, you are my everything. Will you make me the happiest person in the world?
                    </p>
                    
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.5, type: "spring" }}
                    >
                      <Button
                        onClick={handleAccept}
                        className="bg-gradient-to-r from-green-400 to-emerald-500 hover:from-green-500 hover:to-emerald-600 text-white px-10 py-6 rounded-full text-xl font-serif shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                      >
                        <Heart className="w-6 h-6 mr-2 fill-white" />
                        Yes, I Do! ♡
                      </Button>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Accepted Celebration */}
              <AnimatePresence>
                {accepted && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mt-8"
                  >
                    <motion.div
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ repeat: Infinity, duration: 0.5 }}
                    >
                      <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl text-white mb-4">
                        🎉 She Said Yes! 🎉
                      </h2>
                    </motion.div>
                    <p className="font-serif text-xl md:text-2xl text-pink-200 italic">
                      Forever & Always - Sravan ♡ Divya
                    </p>
                    
                    {/* Confetti burst */}
                    {Array.from({ length: 50 }).map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute text-2xl"
                        initial={{
                          x: 0,
                          y: 0,
                          opacity: 1,
                        }}
                        animate={{
                          x: (Math.random() - 0.5) * 600,
                          y: (Math.random() - 0.5) * 600,
                          opacity: 0,
                          rotate: Math.random() * 720,
                        }}
                        transition={{ duration: 2, ease: "easeOut" }}
                        style={{
                          left: "50%",
                          top: "50%",
                        }}
                      >
                        {["💕", "💖", "✨", "🎊", "💍", "❤️"][Math.floor(Math.random() * 6)]}
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ProposeAnimation;
