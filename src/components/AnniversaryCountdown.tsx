import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, Calendar, Gift, Sparkles, PartyPopper } from 'lucide-react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const AnniversaryCountdown = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isAnniversary, setIsAnniversary] = useState(false);

  // Calculate next anniversary (October 6th)
  const getNextAnniversary = () => {
    const now = new Date();
    const currentYear = now.getFullYear();
    let anniversary = new Date(currentYear, 9, 6); // October is month 9 (0-indexed)
    
    // If anniversary has passed this year, get next year's
    if (now > anniversary) {
      anniversary = new Date(currentYear + 1, 9, 6);
    }
    
    return anniversary;
  };

  const [nextAnniversary] = useState(getNextAnniversary());
  
  // Calculate which anniversary it will be
  const startDate = new Date(2025, 9, 6); // October 6th, 2025
  const anniversaryNumber = nextAnniversary.getFullYear() - startDate.getFullYear();

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const difference = nextAnniversary.getTime() - now.getTime();

      if (difference <= 0) {
        setIsAnniversary(true);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [nextAnniversary]);

  const TimeBox = ({ value, label }: { value: number; label: string }) => (
    <motion.div
      initial={{ scale: 0 }}
      whileInView={{ scale: 1 }}
      viewport={{ once: true }}
      className="bg-gradient-to-br from-rose-500 to-pink-500 rounded-2xl p-4 text-center shadow-lg min-w-[80px]"
    >
      <motion.span
        key={value}
        initial={{ scale: 1.2, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="block text-3xl md:text-4xl font-bold text-white"
      >
        {value.toString().padStart(2, '0')}
      </motion.span>
      <span className="text-rose-100 text-xs uppercase tracking-wider">{label}</span>
    </motion.div>
  );

  return (
    <section className="py-16 bg-gradient-to-b from-rose-50/50 to-background overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto text-center"
        >
          <div className="inline-flex items-center gap-2 text-amber-500 mb-4">
            <Gift size={24} />
            <Calendar size={24} />
          </div>

          <h2 className="text-3xl md:text-4xl font-serif text-rose-700 mb-2">
            {isAnniversary ? (
              <span className="flex items-center justify-center gap-3">
                <PartyPopper className="text-amber-500" />
                Happy Anniversary!
                <PartyPopper className="text-amber-500" />
              </span>
            ) : (
              <>Countdown to Our {anniversaryNumber === 1 ? '1st' : `${anniversaryNumber}th`} Anniversary</>
            )}
          </h2>

          <p className="text-rose-400 mb-8">
            {isAnniversary 
              ? "Today marks another beautiful year of our love story! 💕"
              : `October 6th, ${nextAnniversary.getFullYear()} • Our Special Day 💕`
            }
          </p>

          {isAnniversary ? (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="relative py-12"
            >
              {/* Celebration animation */}
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute"
                  initial={{ 
                    x: '50%', 
                    y: '50%',
                    scale: 0 
                  }}
                  animate={{ 
                    x: `${Math.random() * 100}%`,
                    y: `${Math.random() * 100}%`,
                    scale: [0, 1, 0],
                    rotate: Math.random() * 360
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    delay: Math.random() * 2
                  }}
                >
                  {i % 3 === 0 ? (
                    <Heart className="text-rose-500" fill="currentColor" size={20} />
                  ) : i % 3 === 1 ? (
                    <Sparkles className="text-amber-400" size={20} />
                  ) : (
                    <span className="text-2xl">🎉</span>
                  )}
                </motion.div>
              ))}
              
              <Heart 
                className="text-rose-500 mx-auto" 
                fill="currentColor" 
                size={80}
              />
              <p className="text-2xl font-serif text-rose-600 mt-4">
                {anniversaryNumber} Year{anniversaryNumber > 1 ? 's' : ''} of Love! 💖
              </p>
            </motion.div>
          ) : (
            <>
              <div className="flex justify-center gap-3 md:gap-4 mb-8">
                <TimeBox value={timeLeft.days} label="Days" />
                <TimeBox value={timeLeft.hours} label="Hours" />
                <TimeBox value={timeLeft.minutes} label="Minutes" />
                <TimeBox value={timeLeft.seconds} label="Seconds" />
              </div>

              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="inline-flex items-center gap-2 text-rose-400"
              >
                <Heart className="text-rose-500" fill="currentColor" size={20} />
                <span className="text-sm">Can't wait to celebrate with you!</span>
                <Heart className="text-rose-500" fill="currentColor" size={20} />
              </motion.div>
            </>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default AnniversaryCountdown;
