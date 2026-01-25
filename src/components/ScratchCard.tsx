import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, X, Sparkles } from 'lucide-react';

const loveMessages = [
  "You're the reason I believe in love 💕",
  "Every moment with you is magical ✨",
  "You make my heart skip a beat 💓",
  "I fall for you more every day 🌹",
  "You're my forever and always 💖",
  "Your smile lights up my world 🌟",
  "I'm so lucky to have you 🍀",
  "You're my dream come true 💫",
  "My heart belongs to you 💝",
  "You complete me in every way 🦋",
];

const ScratchCard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);
  const [message, setMessage] = useState("");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  const resetCard = () => {
    setIsRevealed(false);
    setMessage(loveMessages[Math.floor(Math.random() * loveMessages.length)]);
    
    setTimeout(() => {
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          // Create gradient scratch layer
          const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
          gradient.addColorStop(0, '#f43f5e');
          gradient.addColorStop(0.5, '#ec4899');
          gradient.addColorStop(1, '#a855f7');
          ctx.fillStyle = gradient;
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          
          // Add shimmer pattern
          ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
          for (let i = 0; i < 50; i++) {
            ctx.beginPath();
            ctx.arc(Math.random() * canvas.width, Math.random() * canvas.height, Math.random() * 3, 0, Math.PI * 2);
            ctx.fill();
          }
          
          // Add text
          ctx.fillStyle = 'white';
          ctx.font = 'bold 18px serif';
          ctx.textAlign = 'center';
          ctx.fillText('Scratch Me! 💕', canvas.width / 2, canvas.height / 2);
        }
      }
    }, 100);
  };

  useEffect(() => {
    if (isOpen) {
      resetCard();
    }
  }, [isOpen]);

  const handleScratch = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const rect = canvas.getBoundingClientRect();
    let x, y;
    
    if ('touches' in e) {
      x = e.touches[0].clientX - rect.left;
      y = e.touches[0].clientY - rect.top;
    } else {
      x = e.clientX - rect.left;
      y = e.clientY - rect.top;
    }
    
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 25, 0, Math.PI * 2);
    ctx.fill();
    
    // Check if mostly scratched
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let transparentPixels = 0;
    for (let i = 3; i < imageData.data.length; i += 4) {
      if (imageData.data[i] === 0) transparentPixels++;
    }
    const percentRevealed = transparentPixels / (imageData.data.length / 4);
    if (percentRevealed > 0.5) {
      setIsRevealed(true);
    }
  };

  return (
    <>
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-44 left-4 z-40 bg-gradient-to-r from-amber-500 to-orange-500 text-white p-4 rounded-full shadow-lg"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={{ y: [0, -5, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
      >
        <Sparkles size={24} />
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
              initial={{ scale: 0.5, rotateY: 180 }}
              animate={{ scale: 1, rotateY: 0 }}
              exit={{ scale: 0.5, rotateY: 180 }}
              className="relative bg-gradient-to-br from-amber-50 to-orange-50 p-6 rounded-3xl max-w-sm w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-3 right-3 text-amber-600 hover:text-amber-800"
              >
                <X size={24} />
              </button>

              <h3 className="text-2xl font-serif text-amber-700 text-center mb-4 flex items-center justify-center gap-2">
                <Heart className="text-rose-500" fill="currentColor" size={20} />
                Love Scratch Card
                <Heart className="text-rose-500" fill="currentColor" size={20} />
              </h3>

              <div className="relative w-full h-40 mx-auto mb-4 rounded-xl overflow-hidden shadow-lg">
                {/* Hidden message */}
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-rose-100 to-pink-100 p-4">
                  <motion.p
                    initial={{ scale: 0.8 }}
                    animate={isRevealed ? { scale: 1 } : { scale: 0.8 }}
                    className="text-xl font-serif text-rose-600 text-center"
                  >
                    {message}
                  </motion.p>
                </div>
                
                {/* Scratch layer */}
                <canvas
                  ref={canvasRef}
                  width={320}
                  height={160}
                  className="absolute inset-0 w-full h-full cursor-pointer touch-none"
                  onMouseDown={() => setIsDrawing(true)}
                  onMouseUp={() => setIsDrawing(false)}
                  onMouseLeave={() => setIsDrawing(false)}
                  onMouseMove={handleScratch}
                  onTouchStart={() => setIsDrawing(true)}
                  onTouchEnd={() => setIsDrawing(false)}
                  onTouchMove={handleScratch}
                />
              </div>

              {isRevealed && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center"
                >
                  <motion.button
                    onClick={resetCard}
                    className="px-6 py-2 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-full font-semibold"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Get Another Card! 💕
                  </motion.button>
                </motion.div>
              )}

              <p className="text-center text-amber-600/70 text-sm mt-3">
                {isRevealed ? "A message just for you! 💖" : "Scratch with your finger to reveal! ✨"}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ScratchCard;
