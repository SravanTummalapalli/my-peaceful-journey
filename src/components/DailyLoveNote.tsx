import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, Calendar, RefreshCw, Sparkles } from 'lucide-react';

const dailyNotes = [
  { note: "You're the first thought in my morning and the last prayer at night. 🌅", theme: "sunrise" },
  { note: "If I had to choose between breathing and loving you, I'd use my last breath to say I love you. 💕", theme: "romantic" },
  { note: "You're not just my love story, you're my favorite story. 📖", theme: "classic" },
  { note: "In a sea of people, my eyes will always search for you. 👀💖", theme: "devotion" },
  { note: "You're the reason I look forward to every tomorrow. 🌟", theme: "hope" },
  { note: "My heart knew something my mind didn't - it knew you were the one. 💝", theme: "destiny" },
  { note: "Loving you is like breathing - I just can't stop. 🌬️❤️", theme: "passion" },
  { note: "You're my favorite notification, my favorite hello, and my hardest goodbye. 📱💕", theme: "modern" },
  { note: "Every love song makes sense when I think of you. 🎵", theme: "musical" },
  { note: "You're my 11:11 wish, my shooting star, my everything. ✨", theme: "magical" },
  { note: "I didn't know what love was until I found you. Now I can't imagine life without it. 💗", theme: "discovery" },
  { note: "You're the missing piece I never knew I needed. 🧩💕", theme: "complete" },
  { note: "With you, every moment is a memory I want to keep forever. 📸", theme: "memories" },
  { note: "You make my heart smile even when my face forgets to. 😊❤️", theme: "joy" },
  { note: "I love you more than yesterday, less than tomorrow. 🌙", theme: "growing" },
  { note: "You're my favorite place to go when my mind searches for peace. 🕊️", theme: "peace" },
  { note: "Being with you is my favorite part of every day. ☀️", theme: "daily" },
  { note: "You're the answer to every prayer I never knew I made. 🙏💖", theme: "blessed" },
  { note: "I fall in love with you all over again every single day. 🔄❤️", theme: "endless" },
  { note: "You're not just special to me, you're everything. 🌍💕", theme: "universe" },
  { note: "Thank you for being the most beautiful part of my life. 🌸", theme: "gratitude" },
  { note: "You're my safe place in a world of chaos. 🏠💗", theme: "comfort" },
  { note: "Loving you is the best decision I never had to make - it just happened. 💘", theme: "natural" },
  { note: "You're the dream I never want to wake up from. 💭✨", theme: "dreamy" },
  { note: "Every heartbeat of mine whispers your name. 💓", theme: "heartbeat" },
  { note: "You're my today, my tomorrow, and my forever. ♾️💕", theme: "eternity" },
  { note: "In you, I found my home, my happiness, and my heart. 🏡❤️", theme: "home" },
  { note: "You're the magic that makes my ordinary life extraordinary. ✨🌈", theme: "magic" },
  { note: "I love the way you love me - it's the most beautiful thing I've ever known. 💝", theme: "reciprocal" },
  { note: "You're my reason to smile, my reason to believe in love. 😊💕", theme: "reason" },
  { note: "Forever wouldn't be long enough with you. 💍", theme: "forever" },
];

const DailyLoveNote = () => {
  const [todayNote, setTodayNote] = useState(dailyNotes[0]);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Get note based on day of year
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = now.getTime() - start.getTime();
    const oneDay = 1000 * 60 * 60 * 24;
    const dayOfYear = Math.floor(diff / oneDay);
    const noteIndex = dayOfYear % dailyNotes.length;
    setTodayNote(dailyNotes[noteIndex]);
  }, []);

  const getRandomNote = () => {
    setIsAnimating(true);
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * dailyNotes.length);
      setTodayNote(dailyNotes[randomIndex]);
      setIsAnimating(false);
    }, 500);
  };

  const today = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <section className="py-16 bg-gradient-to-b from-background to-rose-50/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-lg mx-auto"
        >
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 text-rose-400 mb-2">
              <Calendar size={18} />
              <span className="text-sm">{today}</span>
            </div>
            <h2 className="text-3xl font-serif text-rose-700 flex items-center justify-center gap-3">
              <Sparkles className="text-amber-400" size={24} />
              Today's Love Note
              <Sparkles className="text-amber-400" size={24} />
            </h2>
          </div>

          <motion.div
            animate={isAnimating ? { rotateY: 180, opacity: 0 } : { rotateY: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="bg-gradient-to-br from-rose-100 via-pink-50 to-amber-50 rounded-3xl p-8 shadow-lg border border-rose-100">
              {/* Decorative corner hearts */}
              <Heart 
                className="absolute top-4 left-4 text-rose-200" 
                size={20} 
                fill="currentColor"
              />
              <Heart 
                className="absolute top-4 right-4 text-rose-200" 
                size={20} 
                fill="currentColor"
              />
              <Heart 
                className="absolute bottom-4 left-4 text-rose-200" 
                size={20} 
                fill="currentColor"
              />
              <Heart 
                className="absolute bottom-4 right-4 text-rose-200" 
                size={20} 
                fill="currentColor"
              />

              <div className="text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  className="inline-block mb-4"
                >
                  <Heart 
                    className="text-rose-500 mx-auto" 
                    size={40} 
                    fill="currentColor"
                  />
                </motion.div>
                
                <p className="text-xl md:text-2xl font-serif text-rose-700 leading-relaxed mb-6">
                  "{todayNote.note}"
                </p>

                <p className="text-rose-400 text-sm italic">
                  — For my dearest Divya 💕
                </p>
              </div>
            </div>
          </motion.div>

          <motion.button
            onClick={getRandomNote}
            disabled={isAnimating}
            className="flex items-center gap-2 mx-auto mt-6 px-6 py-3 bg-gradient-to-r from-rose-400 to-pink-400 text-white rounded-full font-medium shadow-md disabled:opacity-50"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <RefreshCw size={18} className={isAnimating ? 'animate-spin' : ''} />
            Get Another Note
          </motion.button>

          <p className="text-center text-rose-300 text-xs mt-4">
            A new note appears every day ✨
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default DailyLoveNote;
