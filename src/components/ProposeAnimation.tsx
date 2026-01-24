import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, X, Diamond, Sun, Frown, Sparkles, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProposalMusic from "./ProposalMusic";

const ProposeAnimation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [stage, setStage] = useState(0); // 0: sunset, 1: beach, 2: sravan walking, 3: sravan kneeling, 4: message, 5: accepted, 6: rejected
  const [accepted, setAccepted] = useState(false);
  const [rejected, setRejected] = useState(false);

  const handlePropose = () => {
    setIsOpen(true);
    setStage(0);
    setAccepted(false);
    setRejected(false);
    
    // Progressive reveal sequence
    setTimeout(() => setStage(1), 1000); // Beach appears
    setTimeout(() => setStage(2), 2500); // Sravan starts walking
    setTimeout(() => setStage(3), 5000); // Sravan kneels
    setTimeout(() => setStage(4), 6500); // Proposal message
  };

  const handleAccept = () => {
    setAccepted(true);
    setStage(5);
  };

  const handleReject = () => {
    setRejected(true);
    setStage(6);
  };

  const handleClose = () => {
    setIsOpen(false);
    setStage(0);
    setAccepted(false);
    setRejected(false);
  };

  // Generate wave particles
  const waveParticles = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    delay: i * 0.3,
  }));

  // Generate footprints that appear as Sravan walks
  const footprints = Array.from({ length: 6 }, (_, i) => ({
    id: i,
    left: 20 + i * 8,
    delay: 2.5 + i * 0.4,
    rotate: i % 2 === 0 ? -10 : 10,
  }));

  // Generate birds
  const birds = Array.from({ length: 5 }, (_, i) => ({
    id: i,
    startX: -50 - i * 30,
    y: 10 + i * 5,
    delay: i * 0.5,
  }));

  // Generate sparkles for celebration
  const celebrationSparkles = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    x: (Math.random() - 0.5) * 800,
    y: (Math.random() - 0.5) * 800,
    delay: Math.random() * 0.5,
  }));

  // Generate floating lanterns for celebration
  const lanterns = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    x: (Math.random() - 0.5) * 600,
    delay: Math.random() * 2,
  }));

  // Generate shooting stars
  const shootingStars = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    startX: Math.random() * 100,
    startY: Math.random() * 30,
    delay: i * 0.8,
  }));

  // Generate rain for rejection
  const rainDrops = Array.from({ length: 60 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: Math.random() * 2,
    duration: 0.5 + Math.random() * 0.5,
  }));

  // Generate tears for rejection
  const tears = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    delay: i * 0.3,
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
            {/* Proposal Music */}
            <ProposalMusic isPlaying={isOpen} />
            {/* Gradient Sky Background - changes based on state */}
            <motion.div
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{
                background: rejected 
                  ? "linear-gradient(180deg, #1a1a2e 0%, #16213e 30%, #1a1a2e 60%, #0d1b2a 100%)"
                  : "linear-gradient(180deg, #1a1a2e 0%, #16213e 15%, #e94560 40%, #ff6b6b 55%, #ffd93d 75%, #ff8c00 100%)",
              }}
            />

            {/* Animated Sun - hides during rejection */}
            {!rejected && (
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
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Sun className="w-20 h-20 md:w-28 md:h-28 text-yellow-100 opacity-60" />
                  </div>
                </motion.div>
              </motion.div>
            )}

            {/* Shooting stars during celebration */}
            {accepted && shootingStars.map((star) => (
              <motion.div
                key={star.id}
                className="absolute"
                style={{ left: `${star.startX}%`, top: `${star.startY}%` }}
                initial={{ opacity: 0 }}
                animate={{
                  x: [0, 200],
                  y: [0, 100],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 1,
                  delay: star.delay,
                  repeat: Infinity,
                  repeatDelay: 3,
                }}
              >
                <Star className="w-4 h-4 text-yellow-300 fill-yellow-300" />
              </motion.div>
            ))}

            {/* Rain during rejection */}
            {rejected && rainDrops.map((drop) => (
              <motion.div
                key={drop.id}
                className="absolute w-0.5 h-4 bg-blue-300/60 rounded-full"
                style={{ left: `${drop.x}%` }}
                initial={{ top: "-5%", opacity: 0 }}
                animate={{ top: "110%", opacity: [0, 1, 1, 0] }}
                transition={{
                  duration: drop.duration,
                  delay: drop.delay,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            ))}

            {/* Flying Birds - only when not rejected */}
            {!rejected && birds.map((bird) => (
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
              <div
                className="absolute inset-0"
                style={{
                  background: rejected 
                    ? "linear-gradient(180deg, rgba(30,58,95,0.8) 0%, #0d1b2a 30%, #0a1628 100%)"
                    : "linear-gradient(180deg, rgba(255,140,0,0.6) 0%, #1e3a5f 30%, #0d1b2a 100%)",
                }}
              />
              
              {!rejected && (
                <motion.div
                  className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-full"
                  style={{
                    background: "linear-gradient(180deg, rgba(255,215,0,0.6) 0%, rgba(255,140,0,0.3) 50%, transparent 100%)",
                  }}
                  animate={{ scaleX: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                />
              )}

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
                background: rejected
                  ? "linear-gradient(180deg, #5a4a3a 0%, #4a3a2a 50%, #3a2a1a 100%)"
                  : "linear-gradient(180deg, #c2956e 0%, #a67c52 50%, #8b6b45 100%)",
              }}
            >
              <div className="absolute inset-0 opacity-30" 
                style={{
                  backgroundImage: "radial-gradient(circle at 20% 50%, #d4a76a 1px, transparent 1px), radial-gradient(circle at 80% 30%, #d4a76a 1px, transparent 1px)",
                  backgroundSize: "20px 20px",
                }}
              />
            </motion.div>

            {/* Footprints appearing as Sravan walks */}
            <AnimatePresence>
              {stage >= 2 && !rejected && footprints.map((fp) => (
                <motion.div
                  key={fp.id}
                  className="absolute bottom-[12%] text-2xl opacity-40"
                  style={{ 
                    left: `${fp.left}%`,
                    transform: `rotate(${fp.rotate}deg)`,
                  }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 0.4, scale: 1 }}
                  transition={{ delay: fp.delay - 2.5, duration: 0.3 }}
                >
                  👣
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Divya - Standing elegantly, waiting */}
            <AnimatePresence>
              {stage >= 1 && (
                <motion.div
                  className="absolute bottom-[16%] right-[15%] md:right-[25%] flex flex-col items-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 1 }}
                >
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.5 }}
                    className="mb-2 px-3 py-1 bg-pink-600/90 rounded-full shadow-lg"
                  >
                    <span className="font-serif text-white text-sm">Divya</span>
                  </motion.div>
                  
                  <motion.div
                    animate={rejected ? { y: [0, 3, 0] } : stage >= 3 ? { y: [0, -3, 0] } : {}}
                    transition={{ repeat: Infinity, duration: 2.5, delay: 0.3 }}
                  >
                    {/* Divya - Elegant woman in flowing dress */}
                    <svg viewBox="0 0 100 180" className="w-20 h-40 md:w-28 md:h-52 drop-shadow-2xl">
                      <defs>
                        <linearGradient id="divyaGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="#1a1a2e" />
                          <stop offset="100%" stopColor="#2d2d44" />
                        </linearGradient>
                        <linearGradient id="dressGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor={rejected ? "#6b7280" : "#c44569"} />
                          <stop offset="50%" stopColor={rejected ? "#4b5563" : "#a13d5e"} />
                          <stop offset="100%" stopColor={rejected ? "#374151" : "#7d3051"} />
                        </linearGradient>
                        <linearGradient id="hairGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="#1a1a1a" />
                          <stop offset="100%" stopColor="#2d2d2d" />
                        </linearGradient>
                      </defs>
                      
                      {/* Long flowing hair */}
                      <ellipse cx="50" cy="20" rx="18" ry="12" fill="url(#hairGrad)" />
                      <path d="M 32 18 Q 25 40, 28 70 Q 30 75, 35 70 Q 33 45, 38 22" fill="url(#hairGrad)" />
                      <path d="M 68 18 Q 75 40, 72 70 Q 70 75, 65 70 Q 67 45, 62 22" fill="url(#hairGrad)" />
                      
                      {/* Head with face features */}
                      <ellipse cx="50" cy="26" rx="14" ry="16" fill="#f5d0c5" />
                      {/* Eyes - sad if rejected */}
                      {rejected ? (
                        <>
                          <path d="M 42 26 Q 44 24, 46 26" fill="none" stroke="#1a1a1a" strokeWidth="1.5" />
                          <path d="M 54 26 Q 56 24, 58 26" fill="none" stroke="#1a1a1a" strokeWidth="1.5" />
                          {/* Tears */}
                          {tears.slice(0, 4).map((tear) => (
                            <motion.ellipse
                              key={tear.id}
                              cx={tear.id < 2 ? 44 : 56}
                              cy="28"
                              rx="1"
                              ry="2"
                              fill="#60a5fa"
                              initial={{ y: 0, opacity: 1 }}
                              animate={{ y: 20, opacity: 0 }}
                              transition={{ duration: 1, delay: tear.delay, repeat: Infinity }}
                            />
                          ))}
                        </>
                      ) : (
                        <>
                          <ellipse cx="44" cy="24" rx="2" ry="1.5" fill="#1a1a1a" />
                          <ellipse cx="56" cy="24" rx="2" ry="1.5" fill="#1a1a1a" />
                        </>
                      )}
                      {/* Smile or frown */}
                      <path 
                        d={rejected ? "M 45 34 Q 50 30, 55 34" : "M 45 32 Q 50 36, 55 32"} 
                        fill="none" 
                        stroke={rejected ? "#6b7280" : "#c44569"} 
                        strokeWidth="1.5" 
                        strokeLinecap="round" 
                      />
                      {/* Earrings */}
                      <circle cx="36" cy="28" r="2" fill="#ffd700" />
                      <circle cx="64" cy="28" r="2" fill="#ffd700" />
                      
                      {/* Neck */}
                      <rect x="45" y="40" width="10" height="8" fill="#f5d0c5" />
                      {/* Necklace */}
                      <path d="M 40 48 Q 50 54, 60 48" fill="none" stroke="#ffd700" strokeWidth="2" />
                      
                      {/* Shoulders & upper body with elegant dress */}
                      <path d="M 30 50 Q 35 48, 50 48 Q 65 48, 70 50 L 68 75 Q 50 78, 32 75 Z" fill="url(#dressGrad)" />
                      
                      {/* Arms - hands clasped to chest in emotional pose */}
                      <path d="M 30 52 Q 20 58, 22 70 Q 25 72, 35 65 L 38 58" fill="#f5d0c5" />
                      <path d="M 70 52 Q 80 58, 78 70 Q 75 72, 65 65 L 62 58" fill="#f5d0c5" />
                      {/* Hands together at chest */}
                      <ellipse cx="50" cy="68" rx="10" ry="6" fill="#f5d0c5" />
                      
                      {/* Elegant flowing dress with folds */}
                      <path d="M 32 75 Q 15 120, 10 175 L 90 175 Q 85 120, 68 75 Q 50 82, 32 75" fill="url(#dressGrad)" />
                      {/* Dress details */}
                      <path d="M 25 100 Q 50 108, 75 100" fill="none" stroke={rejected ? "#4b5563" : "#8b3557"} strokeWidth="1" opacity="0.5" />
                      <path d="M 18 130 Q 50 142, 82 130" fill="none" stroke={rejected ? "#4b5563" : "#8b3557"} strokeWidth="1" opacity="0.5" />
                      <path d="M 12 160 Q 50 175, 88 160" fill="none" stroke={rejected ? "#4b5563" : "#8b3557"} strokeWidth="1" opacity="0.5" />
                      
                      {/* Flower in hand after accepting - conditionally shown */}
                      {accepted && (
                        <>
                          <circle cx="50" cy="62" r="8" fill="#ff6b6b" />
                          <circle cx="46" cy="58" r="4" fill="#ff8888" />
                          <circle cx="54" cy="58" r="4" fill="#ff8888" />
                          <circle cx="46" cy="66" r="4" fill="#ff8888" />
                          <circle cx="54" cy="66" r="4" fill="#ff8888" />
                          <circle cx="50" cy="62" r="3" fill="#ffd700" />
                        </>
                      )}
                    </svg>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Sravan - Walking animation then kneeling with flower */}
            <AnimatePresence>
              {stage >= 2 && (
                <motion.div
                  className="absolute bottom-[16%] flex flex-col items-center"
                  initial={{ left: "5%", opacity: 0 }}
                  animate={{ 
                    left: stage >= 3 ? "35%" : stage >= 2 ? "35%" : "5%",
                    opacity: 1,
                  }}
                  transition={{ 
                    left: { duration: 2.5, ease: "easeInOut" },
                    opacity: { duration: 0.5 }
                  }}
                >
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 2 }}
                    className="mb-2 px-3 py-1 bg-blue-600/90 rounded-full shadow-lg"
                  >
                    <span className="font-serif text-white text-sm">Sravan</span>
                  </motion.div>
                  
                  {/* Walking Sravan (stage 2) */}
                  {stage === 2 && (
                    <motion.div
                      animate={{ y: [0, -5, 0] }}
                      transition={{ repeat: Infinity, duration: 0.5 }}
                    >
                      <svg viewBox="0 0 100 180" className="w-20 h-40 md:w-28 md:h-52 drop-shadow-2xl">
                        <defs>
                          <linearGradient id="sravanWalkGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#1a365d" />
                            <stop offset="100%" stopColor="#2d4a6f" />
                          </linearGradient>
                        </defs>
                        
                        {/* Hair */}
                        <ellipse cx="50" cy="18" rx="16" ry="10" fill="#1a1a1a" />
                        
                        {/* Head */}
                        <ellipse cx="50" cy="24" rx="14" ry="15" fill="#d4a574" />
                        {/* Eyes */}
                        <ellipse cx="44" cy="22" rx="2" ry="1.5" fill="#1a1a1a" />
                        <ellipse cx="56" cy="22" rx="2" ry="1.5" fill="#1a1a1a" />
                        {/* Smile */}
                        <path d="M 45 30 Q 50 33, 55 30" fill="none" stroke="#8b6b45" strokeWidth="1.5" strokeLinecap="round" />
                        
                        {/* Neck */}
                        <rect x="45" y="38" width="10" height="8" fill="#d4a574" />
                        
                        {/* Torso - shirt */}
                        <path d="M 30 48 Q 40 44, 50 44 Q 60 44, 70 48 L 68 95 Q 50 98, 32 95 Z" fill="url(#sravanWalkGrad)" />
                        
                        {/* Walking arms - one forward, one back */}
                        <motion.path 
                          d="M 30 50 Q 15 65, 20 85 L 25 83 Q 22 65, 32 55" 
                          fill="#d4a574"
                          animate={{ d: ["M 30 50 Q 15 65, 20 85 L 25 83 Q 22 65, 32 55", "M 30 50 Q 35 65, 40 85 L 45 83 Q 38 65, 32 55"] }}
                          transition={{ repeat: Infinity, duration: 0.5 }}
                        />
                        <motion.path 
                          d="M 70 50 Q 85 65, 80 85 L 75 83 Q 78 65, 68 55" 
                          fill="#d4a574"
                          animate={{ d: ["M 70 50 Q 85 65, 80 85 L 75 83 Q 78 65, 68 55", "M 70 50 Q 65 65, 60 85 L 55 83 Q 62 65, 68 55"] }}
                          transition={{ repeat: Infinity, duration: 0.5 }}
                        />
                        
                        {/* Pants */}
                        <path d="M 35 95 L 30 130 L 25 175 L 40 175 L 45 130 L 50 100" fill="#2d3748" />
                        <path d="M 50 100 L 55 130 L 60 175 L 75 175 L 70 130 L 65 95" fill="#2d3748" />
                        
                        {/* Walking legs animation */}
                        <motion.g
                          animate={{ rotate: [-10, 10] }}
                          transition={{ repeat: Infinity, duration: 0.5 }}
                          style={{ transformOrigin: "50px 95px" }}
                        >
                        </motion.g>
                        
                        {/* Flower in hand */}
                        <g transform="translate(15, 80)">
                          <line x1="0" y1="0" x2="0" y2="15" stroke="#228b22" strokeWidth="2" />
                          <circle cx="0" cy="-2" r="6" fill="#ff6b6b" />
                          <circle cx="-4" cy="-5" r="3" fill="#ff8888" />
                          <circle cx="4" cy="-5" r="3" fill="#ff8888" />
                          <circle cx="-4" cy="1" r="3" fill="#ff8888" />
                          <circle cx="4" cy="1" r="3" fill="#ff8888" />
                          <circle cx="0" cy="-2" r="2" fill="#ffd700" />
                        </g>
                      </svg>
                    </motion.div>
                  )}
                  
                  {/* Kneeling Sravan with flower (stage 3+) */}
                  {stage >= 3 && !accepted && !rejected && (
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1, y: [0, -3, 0] }}
                      transition={{ 
                        scale: { duration: 0.5 },
                        y: { repeat: Infinity, duration: 2 }
                      }}
                    >
                      <svg viewBox="0 0 140 140" className="w-28 h-28 md:w-40 md:h-40 drop-shadow-2xl">
                        <defs>
                          <linearGradient id="sravanKneelGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#1a365d" />
                            <stop offset="100%" stopColor="#2d4a6f" />
                          </linearGradient>
                        </defs>
                        
                        {/* Hair */}
                        <ellipse cx="50" cy="18" rx="14" ry="9" fill="#1a1a1a" />
                        
                        {/* Head - slightly looking up */}
                        <ellipse cx="50" cy="25" rx="13" ry="14" fill="#d4a574" />
                        {/* Eyes looking up */}
                        <ellipse cx="44" cy="22" rx="2" ry="2" fill="#1a1a1a" />
                        <ellipse cx="56" cy="22" rx="2" ry="2" fill="#1a1a1a" />
                        {/* Hopeful smile */}
                        <path d="M 44 30 Q 50 35, 56 30" fill="none" stroke="#8b6b45" strokeWidth="1.5" strokeLinecap="round" />
                        
                        {/* Neck */}
                        <rect x="45" y="38" width="10" height="6" fill="#d4a574" />
                        
                        {/* Torso - leaning forward */}
                        <path d="M 35 44 Q 42 42, 50 42 Q 58 42, 65 44 L 68 80 Q 50 85, 32 80 Z" fill="url(#sravanKneelGrad)" />
                        
                        {/* Arms reaching forward with flower */}
                        <path d="M 65 50 Q 85 45, 105 35" fill="none" stroke="#d4a574" strokeWidth="8" strokeLinecap="round" />
                        <circle cx="105" cy="35" r="5" fill="#d4a574" /> {/* Hand */}
                        
                        {/* Other arm on chest */}
                        <path d="M 35 50 Q 30 60, 38 70" fill="none" stroke="#d4a574" strokeWidth="8" strokeLinecap="round" />
                        
                        {/* Kneeling leg (front) */}
                        <path d="M 40 80 L 35 100 L 30 105 L 25 130 L 45 130 L 50 105 L 48 85" fill="#2d3748" />
                        
                        {/* Back leg extended */}
                        <path d="M 55 80 Q 80 95, 120 105 L 125 115 L 115 120 L 75 108 Q 60 100, 52 85" fill="#2d3748" />
                        
                        {/* Flower being offered */}
                        <motion.g 
                          transform="translate(100, 20)"
                          animate={{ rotate: [-5, 5, -5], y: [0, -3, 0] }}
                          transition={{ repeat: Infinity, duration: 1.5 }}
                        >
                          <line x1="0" y1="10" x2="0" y2="25" stroke="#228b22" strokeWidth="3" />
                          <circle cx="0" cy="5" r="10" fill="#ff6b6b" />
                          <circle cx="-6" cy="0" r="5" fill="#ff8888" />
                          <circle cx="6" cy="0" r="5" fill="#ff8888" />
                          <circle cx="-6" cy="8" r="5" fill="#ff8888" />
                          <circle cx="6" cy="8" r="5" fill="#ff8888" />
                          <circle cx="0" cy="5" r="4" fill="#ffd700" />
                          {/* Leaf */}
                          <ellipse cx="-8" cy="18" rx="5" ry="3" fill="#228b22" transform="rotate(-30 -8 18)" />
                        </motion.g>
                      </svg>
                    </motion.div>
                  )}

                  {/* Sravan standing happily after acceptance */}
                  {accepted && (
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1, y: [0, -5, 0] }}
                      transition={{ 
                        scale: { duration: 0.5 },
                        y: { repeat: Infinity, duration: 1.5 }
                      }}
                    >
                      <svg viewBox="0 0 100 180" className="w-20 h-40 md:w-28 md:h-52 drop-shadow-2xl">
                        <defs>
                          <linearGradient id="sravanHappyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#1a365d" />
                            <stop offset="100%" stopColor="#2d4a6f" />
                          </linearGradient>
                        </defs>
                        
                        {/* Hair */}
                        <ellipse cx="50" cy="18" rx="16" ry="10" fill="#1a1a1a" />
                        
                        {/* Head */}
                        <ellipse cx="50" cy="24" rx="14" ry="15" fill="#d4a574" />
                        {/* Happy eyes */}
                        <path d="M 42 22 Q 44 20, 46 22" fill="none" stroke="#1a1a1a" strokeWidth="2" strokeLinecap="round" />
                        <path d="M 54 22 Q 56 20, 58 22" fill="none" stroke="#1a1a1a" strokeWidth="2" strokeLinecap="round" />
                        {/* Big smile */}
                        <path d="M 42 30 Q 50 38, 58 30" fill="none" stroke="#8b6b45" strokeWidth="2" strokeLinecap="round" />
                        
                        {/* Neck */}
                        <rect x="45" y="38" width="10" height="8" fill="#d4a574" />
                        
                        {/* Torso */}
                        <path d="M 30 48 Q 40 44, 50 44 Q 60 44, 70 48 L 68 95 Q 50 98, 32 95 Z" fill="url(#sravanHappyGrad)" />
                        
                        {/* Arms raised in joy */}
                        <path d="M 30 50 Q 15 40, 10 25" fill="none" stroke="#d4a574" strokeWidth="8" strokeLinecap="round" />
                        <path d="M 70 50 Q 85 40, 90 25" fill="none" stroke="#d4a574" strokeWidth="8" strokeLinecap="round" />
                        <circle cx="10" cy="25" r="5" fill="#d4a574" />
                        <circle cx="90" cy="25" r="5" fill="#d4a574" />
                        
                        {/* Pants */}
                        <path d="M 35 95 L 32 130 L 28 175 L 45 175 L 48 130 L 50 100" fill="#2d3748" />
                        <path d="M 50 100 L 52 130 L 55 175 L 72 175 L 68 130 L 65 95" fill="#2d3748" />
                      </svg>
                    </motion.div>
                  )}

                  {/* Sravan sad after rejection */}
                  {rejected && (
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <svg viewBox="0 0 100 180" className="w-20 h-40 md:w-28 md:h-52 drop-shadow-2xl">
                        <defs>
                          <linearGradient id="sravanSadGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#374151" />
                            <stop offset="100%" stopColor="#4b5563" />
                          </linearGradient>
                        </defs>
                        
                        {/* Hair */}
                        <ellipse cx="50" cy="18" rx="16" ry="10" fill="#1a1a1a" />
                        
                        {/* Head - looking down */}
                        <ellipse cx="50" cy="26" rx="14" ry="15" fill="#d4a574" />
                        {/* Sad eyes */}
                        <path d="M 42 24 Q 44 22, 46 24" fill="none" stroke="#1a1a1a" strokeWidth="1.5" />
                        <path d="M 54 24 Q 56 22, 58 24" fill="none" stroke="#1a1a1a" strokeWidth="1.5" />
                        {/* Tears */}
                        {tears.slice(4).map((tear) => (
                          <motion.ellipse
                            key={tear.id}
                            cx={tear.id < 6 ? 44 : 56}
                            cy="28"
                            rx="1"
                            ry="2"
                            fill="#60a5fa"
                            initial={{ y: 0, opacity: 1 }}
                            animate={{ y: 20, opacity: 0 }}
                            transition={{ duration: 1, delay: tear.delay, repeat: Infinity }}
                          />
                        ))}
                        {/* Frown */}
                        <path d="M 42 34 Q 50 28, 58 34" fill="none" stroke="#8b6b45" strokeWidth="2" strokeLinecap="round" />
                        
                        {/* Neck */}
                        <rect x="45" y="40" width="10" height="8" fill="#d4a574" />
                        
                        {/* Torso - slumped */}
                        <path d="M 30 50 Q 40 46, 50 46 Q 60 46, 70 50 L 68 95 Q 50 98, 32 95 Z" fill="url(#sravanSadGrad)" />
                        
                        {/* Arms hanging down sadly */}
                        <path d="M 30 52 Q 20 70, 22 100" fill="none" stroke="#d4a574" strokeWidth="8" strokeLinecap="round" />
                        <path d="M 70 52 Q 80 70, 78 100" fill="none" stroke="#d4a574" strokeWidth="8" strokeLinecap="round" />
                        <circle cx="22" cy="100" r="5" fill="#d4a574" />
                        <circle cx="78" cy="100" r="5" fill="#d4a574" />
                        
                        {/* Dropped flower on ground */}
                        <g transform="translate(50, 165)">
                          <line x1="0" y1="0" x2="10" y2="5" stroke="#228b22" strokeWidth="2" />
                          <circle cx="12" cy="8" r="5" fill="#ff6b6b" opacity="0.6" />
                          <circle cx="10" cy="5" r="2.5" fill="#ff8888" opacity="0.6" />
                          <circle cx="14" cy="5" r="2.5" fill="#ff8888" opacity="0.6" />
                        </g>
                        
                        {/* Pants */}
                        <path d="M 35 95 L 32 130 L 28 175 L 45 175 L 48 130 L 50 100" fill="#2d3748" />
                        <path d="M 50 100 L 52 130 L 55 175 L 72 175 L 68 130 L 65 95" fill="#2d3748" />
                      </svg>
                    </motion.div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Heart between them when proposing */}
            <AnimatePresence>
              {stage >= 3 && !rejected && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ delay: 0.5, type: "spring" }}
                  className="absolute bottom-[45%] left-1/2 transform -translate-x-1/2"
                >
                  <motion.div
                    animate={{ scale: [1, 1.3, 1], y: [0, -10, 0] }}
                    transition={{ repeat: Infinity, duration: 1.2 }}
                  >
                    <Heart className="w-16 h-16 text-red-500 fill-red-500 drop-shadow-lg" />
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Broken heart for rejection */}
            <AnimatePresence>
              {rejected && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="absolute bottom-[45%] left-1/2 transform -translate-x-1/2"
                >
                  <motion.div
                    animate={{ y: [0, 5, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="text-6xl"
                  >
                    💔
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Proposal Message with Yes & Reject buttons */}
            <AnimatePresence>
              {stage >= 4 && !accepted && !rejected && (
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 1 }}
                  className="absolute top-[8%] left-0 right-0 text-center px-6 z-20"
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
                    Divya, as the sun sets on this beautiful moment, my love for you only grows brighter. Will you accept this flower and be my forever?
                  </motion.p>
                  
                  <motion.div
                    className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 1, type: "spring", stiffness: 200 }}
                  >
                    <Button
                      onClick={handleAccept}
                      className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white px-12 py-7 rounded-full text-xl font-serif shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 border-2 border-white/30"
                    >
                      <Heart className="w-6 h-6 mr-3 fill-white animate-pulse" />
                      Yes, Forever! 🌹
                    </Button>
                    
                    <Button
                      onClick={handleReject}
                      variant="outline"
                      className="bg-gray-800/50 hover:bg-gray-700/60 text-white/80 hover:text-white px-8 py-6 rounded-full text-lg font-serif shadow-xl transition-all duration-300 hover:scale-105 border-2 border-white/20"
                    >
                      <Frown className="w-5 h-5 mr-2 opacity-70" />
                      Not Yet...
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
                  {/* Floating Lanterns */}
                  {lanterns.map((lantern) => (
                    <motion.div
                      key={lantern.id}
                      className="absolute text-4xl"
                      initial={{ y: "100vh", x: lantern.x, opacity: 0 }}
                      animate={{ y: "-100vh", opacity: [0, 1, 1, 0] }}
                      transition={{ duration: 8, delay: lantern.delay, ease: "easeOut" }}
                      style={{ left: "50%" }}
                    >
                      🏮
                    </motion.div>
                  ))}

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
                      {["💕", "💖", "✨", "🎆", "🌹", "❤️", "🌟", "💫", "🎊", "💍"][Math.floor(Math.random() * 10)]}
                    </motion.div>
                  ))}

                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 100 }}
                    className="text-center z-40 bg-black/30 backdrop-blur-sm px-12 py-8 rounded-3xl"
                  >
                    <motion.div
                      className="mb-4"
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                    >
                      <Sparkles className="w-12 h-12 text-yellow-400 mx-auto" />
                    </motion.div>
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

            {/* Rejection Message */}
            <AnimatePresence>
              {rejected && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute inset-0 flex items-center justify-center z-30"
                >
                  <motion.div
                    initial={{ scale: 0, y: 50 }}
                    animate={{ scale: 1, y: 0 }}
                    transition={{ type: "spring", stiffness: 100 }}
                    className="text-center z-40 bg-gray-900/60 backdrop-blur-sm px-12 py-8 rounded-3xl border border-gray-600/30"
                  >
                    <motion.div
                      className="mb-4"
                      animate={{ y: [0, -5, 0] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                    >
                      <Frown className="w-12 h-12 text-gray-400 mx-auto" />
                    </motion.div>
                    <motion.h2
                      className="font-serif text-4xl md:text-5xl text-gray-200 mb-6"
                    >
                      Maybe Someday... 💔
                    </motion.h2>
                    <motion.p
                      className="font-serif text-xl md:text-2xl text-gray-400"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      True love waits forever
                    </motion.p>
                    <motion.p
                      className="font-sans text-md text-gray-500 mt-4"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1 }}
                    >
                      The best things in life are worth waiting for... 🌙
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
