import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, FileDown, Linkedin, Github, Terminal, MessageSquare, Infinity as InfinityIcon } from 'lucide-react';

interface HeroProps {
  profilePhotos: string[];
  profilePhotoIndex: number;
  setProfilePhotoIndex: (index: number | ((prev: number) => number)) => void;
  typewriterText: string;
  setActiveTab: (tab: string) => void;
  photoIndex: number;
  setPhotoIndex: (index: number | ((prev: number) => number)) => void;
  windowWidth: number;
  customPhotos: string[];
}

export default function Hero({
  profilePhotos,
  profilePhotoIndex,
  setProfilePhotoIndex,
  typewriterText,
  setActiveTab,
  photoIndex,
  setPhotoIndex,
  windowWidth,
  customPhotos
}: HeroProps) {
  return (
    <section className="pt-2 pb-12 md:pt-4 md:pb-20 flex flex-col justify-center relative max-w-[1500px] mx-auto min-h-[60vh] px-6 md:px-10 overflow-hidden">
      {/* Decorative Infinity Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full -z-10 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ 
            rotate: [0, 360],
            scale: [1, 1.1, 1],
            opacity: [0.05, 0.1, 0.05]
          }}
          transition={{ 
            rotate: { duration: 30, repeat: Infinity, ease: "linear" },
            scale: { duration: 10, repeat: Infinity, ease: "easeInOut" },
            opacity: { duration: 5, repeat: Infinity, ease: "easeInOut" }
          }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="relative">
            <InfinityIcon className="w-[600px] h-[600px] md:w-[900px] md:h-[900px] text-accent/10 stroke-[0.3] blur-[2px]" />
            <div className="absolute inset-0 bg-accent/5 blur-[120px] rounded-full" />
          </div>
        </motion.div>
      </div>

      <div className="w-full grid lg:grid-cols-2 gap-12 items-center relative z-10">
        <div>
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-8">
            <motion.div 
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.02 }}
              className="group relative w-40 h-40 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-accent/20 shadow-2xl flex-shrink-0 flex items-center justify-center bg-accent/10 cursor-pointer focus:outline-none focus:ring-4 focus:ring-accent"
              onClick={() => setProfilePhotoIndex((prev) => (prev + 1) % profilePhotos.length)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setProfilePhotoIndex((prev) => (prev + 1) % profilePhotos.length);
                }
              }}
              role="button"
              tabIndex={0}
              aria-label="Switch profile photo"
            >
              <AnimatePresence mode="wait">
                {profilePhotos[profilePhotoIndex] ? (
                  <motion.img 
                    key={profilePhotoIndex}
                    initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    exit={{ opacity: 0, scale: 1.2, rotate: 10 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    src={profilePhotos[profilePhotoIndex]} 
                    alt={`Omkar Kumbhar Profile Photo ${profilePhotoIndex + 1}`} 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <Terminal className="w-16 h-16 text-accent" />
                )}
              </AnimatePresence>
              
              <div className="absolute inset-0 bg-accent/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-white animate-pulse" />
              </div>
            </motion.div>
            <div>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="font-mono text-accent mb-4 tracking-[0.4em] uppercase text-xs md:text-sm text-center md:text-left leading-relaxed flex items-center justify-center md:justify-start gap-2"
              >
                <InfinityIcon className="w-4 h-4 animate-spin-slow" />
                <span>DevOps Engineer <br /> IT Operations</span>
              </motion.p>
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tighter leading-[0.85] text-center md:text-left"
              >
                OMKAR <br /> 
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-purple-400">KUMBHAR</span>
              </motion.h1>
            </div>
          </div>
          <div className="font-mono text-base sm:text-lg md:text-2xl text-slate-400 mb-6 min-h-[2rem] md:min-h-[3rem] text-center md:text-left flex items-center justify-center md:justify-start">
            <span>{typewriterText}</span>
            <span className="animate-pulse text-accent ml-1">|</span>
          </div>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="w-full text-slate-400 leading-relaxed mb-8 text-sm sm:text-base md:text-lg text-center md:text-left max-w-2xl mx-auto md:mx-0"
          >
            Specializing in high-availability systems on <strong>AWS | GCP</strong>. Expert in bridging the gap between manual operations and cloud-native automation.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="grid grid-cols-2 sm:flex sm:flex-wrap gap-3 md:gap-4 justify-center md:justify-start"
          >
            <button 
              onClick={() => setActiveTab("contact")} 
              className="bg-accent text-white px-4 md:px-6 py-3 rounded-xl font-bold hover:scale-105 transition-all shadow-lg shadow-accent/40 cursor-pointer text-xs md:text-sm hover:brightness-110 active:scale-95 flex items-center justify-center gap-2 min-w-[120px] sm:min-w-[140px]"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Let's Talk</span>
            </button>
            
            <a 
              href="https://1drv.ms/b/c/53eabff235c84771/IQCo_G4bh7WKRYjWrOoXcQqSAQfnefpqDFuI0esWtUvcJiE?e=GjNoV4" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="glass-card px-4 md:px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-accent hover:text-white transition-all text-xs md:text-sm hover:shadow-lg hover:shadow-accent/20 relative overflow-hidden group/btn min-w-[120px] sm:min-w-[140px]"
            >
              <div className="absolute inset-0 bg-accent/10 opacity-0 group-hover/btn:opacity-100 blur-md transition-opacity" />
              <FileDown className="w-4 h-4 relative z-10" /> 
              <span className="relative z-10">Resume</span>
            </a>
            
            <a 
              href="https://linkedin.com/in/omkarskumbhar11" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="glass-card px-4 md:px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2 text-xs md:text-sm hover:bg-[#0077b5] hover:text-white transition-all hover:shadow-lg hover:shadow-[#0077b5]/30 relative overflow-hidden group/btn min-w-[120px] sm:min-w-[140px]" 
              aria-label="Visit Omkar's LinkedIn Profile"
            >
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover/btn:opacity-100 blur-md transition-opacity" />
              <Linkedin className="w-4 h-4 relative z-10" /> 
              <span className="relative z-10">LinkedIn</span>
            </a>
            
            <a 
              href="https://github.com/omkarskumbhar11" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="glass-card px-4 md:px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2 text-xs md:text-sm hover:bg-[#24292e] hover:text-white transition-all hover:shadow-lg hover:shadow-black/30 relative overflow-hidden group/btn min-w-[120px] sm:min-w-[140px]" 
              aria-label="Visit Omkar's GitHub Profile"
            >
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover/btn:opacity-100 blur-md transition-opacity" />
              <Github className="w-4 h-4 relative z-10" /> 
              <span className="relative z-10">GitHub</span>
            </a>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
          className="relative block mt-12 lg:mt-0"
        >
          <div 
            className="relative w-full max-w-[280px] sm:max-w-[320px] md:max-w-[400px] lg:max-w-[450px] aspect-[3/4] mx-auto lg:ml-auto lg:mr-0 cursor-pointer focus:outline-none focus:ring-4 focus:ring-accent rounded-[1.5rem] md:rounded-[2rem]" 
            onClick={() => setPhotoIndex((prev) => (prev + 1) % customPhotos.length)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setPhotoIndex((prev) => (prev + 1) % customPhotos.length);
              }
            }}
            role="button"
            tabIndex={0}
            aria-label="Next concept image"
          >
            <AnimatePresence mode="popLayout">
              {[...Array(Math.min(5, customPhotos.length))].map((_, i) => {
                const index = (photoIndex + i) % customPhotos.length;
                const isTop = i === 0;
                return (
                  <motion.div
                    key={index}
                    initial={isTop ? { x: 100, opacity: 0, scale: 0.9, rotate: 10 } : false}
                    animate={{ 
                      x: i * (windowWidth < 768 ? 4 : 8), 
                      y: i * (windowWidth < 768 ? 4 : 8), 
                      z: -i * 10,
                      scale: 1 - (i * 0.04),
                      opacity: 1 - (i * 0.18),
                      rotate: i * 1
                    }}
                    exit={{ x: -200, opacity: 0, scale: 0.8, rotate: -20 }}
                    transition={{ type: "spring", stiffness: 150, damping: 25 }}
                    className="absolute inset-0 z-10"
                    style={{ zIndex: 30 - i }}
                  >
                    <div className="group/card w-full h-full rounded-[1.5rem] md:rounded-[2rem] overflow-hidden glass-card border-2 border-accent/30 shadow-2xl shadow-accent/10 relative">
                      <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover/card:opacity-100 blur-2xl transition-opacity duration-700" />
                      <img 
                        src={customPhotos[index]} 
                        alt={`DevOps and Cloud Computing Concept Illustration ${index + 1}`} 
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-40"></div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>

            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-2 -right-2 md:-bottom-4 md:-right-4 glass-card p-2 md:p-4 rounded-xl md:rounded-2xl z-40 flex items-center gap-2 md:gap-3 shadow-xl"
            >
              <div className="w-8 h-8 md:w-10 md:h-10 bg-accent rounded-lg md:rounded-xl flex items-center justify-center text-white">
                <InfinityIcon className="w-4 h-4 md:w-5 h-5 animate-pulse" />
              </div>
              <div>
                <p className="text-[8px] md:text-[9px] font-mono uppercase tracking-widest text-slate-400">Experience</p>
                <p className="font-bold text-sm md:text-base">3+ Years</p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
