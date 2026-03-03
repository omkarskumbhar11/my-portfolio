import { motion, AnimatePresence } from 'motion/react';
import { Moon, Sun, Menu, X, Sparkles, Leaf, Zap, Palette, Coffee } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  theme: string;
  setTheme: (theme: string) => void;
}

export default function Navbar({ activeTab, setActiveTab, theme, setTheme }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [showInfinity, setShowInfinity] = useState(false);
  const [showThemeMenu, setShowThemeMenu] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const themeMenuRef = useRef<HTMLDivElement>(null);

  const themes = [
    { id: 'dark', icon: <Moon className="w-4 h-4" />, label: 'Dark', color: '#1e293b' },
    { id: 'light', icon: <Sun className="w-4 h-4" />, label: 'Light', color: '#f59e0b' },
    { id: 'warm', icon: <Coffee className="w-4 h-4" />, label: 'Warm', color: '#d97706' },
    { id: 'midnight', icon: <Sparkles className="w-4 h-4" />, label: 'Midnight', color: '#8b5cf6' },
    { id: 'forest', icon: <Leaf className="w-4 h-4" />, label: 'Forest', color: '#10b981' },
    { id: 'cyber', icon: <Zap className="w-4 h-4" />, label: 'Cyber', color: '#ff00ff' },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (themeMenuRef.current && !themeMenuRef.current.contains(event.target as Node)) {
        setShowThemeMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowInfinity(prev => !prev);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      
      // Update visibility
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setVisible(false);
      } else {
        setVisible(true);
      }
      
      // Update scrolled state
      setScrolled(currentScrollY > 20);
      
      // Update scroll progress
      if (totalHeight > 0) {
        setScrollProgress((currentScrollY / totalHeight) * 100);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const tabs = ["profile", "tools", "experience", "education", "lab", "contact"];

  return (
    <motion.nav 
      initial={{ y: 0 }}
      animate={{ y: visible ? 0 : -100 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={`fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none transition-all duration-300 ${
        scrolled ? "pt-0" : "pt-4 px-4"
      }`}
    >
      {/* Scroll Progress Bar */}
      <motion.div 
        className="absolute top-0 left-0 h-1 bg-nav-accent z-[60] origin-left"
        style={{ width: `${scrollProgress}%` }}
      />
      <motion.div 
        layout
        initial={false}
        transition={{
          type: "spring",
          stiffness: 250,
          damping: 30,
          mass: 1
        }}
        className={`pointer-events-auto flex justify-between items-center px-6 md:px-10 liquid-glass relative ${
          scrolled 
            ? "w-full py-2 border-b shadow-2xl" 
            : "w-full max-w-[1500px] py-3.5 rounded-full shadow-2xl shadow-accent/5"
        }`}
      >
        {/* Desktop Menu - Left Side */}
        <div className="hidden md:flex items-center gap-0.5 lg:gap-1">
          {tabs.map((tab) => (
            <motion.button 
              key={tab}
              onClick={() => setActiveTab(tab)} 
              whileHover={{ scale: 1.05, y: -1 }}
              whileTap={{ scale: 0.95 }}
              className={`relative px-3 lg:px-5 py-2 rounded-full text-[11px] lg:text-[13px] font-bold uppercase tracking-widest transition-colors duration-300 cursor-pointer ${
                activeTab === tab 
                  ? "text-white" 
                  : "text-nav-text hover:text-nav-text-hover"
              }`}
            >
              {activeTab === tab && (
                <motion.div 
                  layoutId="activeTabPill"
                  className="absolute inset-0 bg-nav-accent rounded-full -z-10 shadow-lg shadow-nav-accent/30"
                  transition={{ type: "spring", bounce: 0.25, duration: 0.6 }}
                />
              )}
              {tab === "contact" ? "Connect" : tab === "tools" ? "TechTools" : tab === "lab" ? "AI LAB" : tab.charAt(0).toUpperCase() + tab.slice(1)}
            </motion.button>
          ))}
          <div className="w-[1px] h-4 bg-accent/20 mx-2 hidden lg:block"></div>
          
          <div className="relative hidden lg:block" ref={themeMenuRef}>
            <button 
              onClick={() => setShowThemeMenu(!showThemeMenu)} 
              className="p-2.5 text-nav-accent hover:bg-nav-text/10 rounded-full transition-all cursor-pointer flex items-center gap-2"
              title="Change Theme"
            >
              <Palette className="w-5 h-5" />
            </button>

            <AnimatePresence>
              {showThemeMenu && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute top-full right-0 mt-2 p-2 liquid-glass rounded-2xl min-w-[160px] shadow-2xl border border-nav-border"
                >
                  {themes.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => {
                        setTheme(t.id);
                        setShowThemeMenu(false);
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${
                        theme === t.id 
                          ? "bg-nav-accent text-white" 
                          : "text-nav-text hover:bg-nav-text/5"
                      }`}
                    >
                      <span style={{ color: theme === t.id ? 'white' : t.color }}>{t.icon}</span>
                      {t.label}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Brand Name - Right Side */}
        <button 
          onClick={() => setActiveTab("profile")} 
          className="font-mono font-bold text-nav-text-hover text-lg sm:text-xl md:text-2xl tracking-tighter hover:opacity-80 transition-opacity cursor-pointer group flex items-center gap-2 sm:gap-3"
        >
          <motion.div 
            animate={{ 
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: 4, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            className="w-10 h-10 sm:w-12 sm:h-12 bg-nav-accent rounded-lg sm:rounded-xl flex items-center justify-center text-white font-bold group-hover:rotate-45 transition-transform shadow-lg shadow-nav-accent/20 overflow-hidden"
          >
            <AnimatePresence mode="wait">
              {showInfinity ? (
                <motion.span
                  key="infinity"
                  initial={{ opacity: 0, scale: 0.5, rotate: -90 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, scale: 0.5, rotate: 90 }}
                  transition={{ duration: 0.5, ease: "backOut" }}
                  className="text-3xl"
                >
                  ∞
                </motion.span>
              ) : (
                <motion.span
                  key="om"
                  initial={{ opacity: 0, scale: 0.5, rotate: -90 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, scale: 0.5, rotate: 90 }}
                  transition={{ duration: 0.5, ease: "backOut" }}
                  className="text-xl"
                >
                  OM
                </motion.span>
              )}
            </AnimatePresence>
          </motion.div>
          <span className="hidden sm:inline">
            DevOpsWithOmkar
          </span>
        </button>

        {/* Mobile Menu Toggles */}
        <div className="md:hidden flex gap-4 items-center">
          <div className="relative" ref={themeMenuRef}>
            <button 
              onClick={() => setShowThemeMenu(!showThemeMenu)} 
              className="text-nav-accent p-2.5"
            >
              <Palette className="w-6 h-6" />
            </button>
            <AnimatePresence>
              {showThemeMenu && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute top-full right-0 mt-2 p-2 liquid-glass rounded-2xl min-w-[140px] shadow-2xl border border-nav-border"
                >
                  {themes.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => {
                        setTheme(t.id);
                        setShowThemeMenu(false);
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                        theme === t.id 
                          ? "bg-nav-accent text-white" 
                          : "text-nav-text hover:bg-nav-text/5"
                      }`}
                    >
                      <span style={{ color: theme === t.id ? 'white' : t.color }}>{t.icon}</span>
                      {t.label}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <button onClick={() => setMobileMenu(!mobileMenu)} className="p-2.5 text-nav-accent hover:bg-nav-text/10 rounded-xl transition-all">
            {mobileMenu ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>
      </motion.div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenu && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenu(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ type: "spring", damping: 25, stiffness: 400, mass: 0.5 }}
              className="absolute top-full left-4 right-4 mt-2 liquid-glass rounded-2xl p-6 flex flex-col gap-2 text-center md:hidden shadow-2xl z-50 pointer-events-auto overflow-hidden"
            >
              <div className="flex justify-between items-center mb-4 border-b border-nav-border pb-4">
                <span className="text-[10px] font-mono uppercase tracking-widest opacity-40">Navigation</span>
                <button onClick={() => setMobileMenu(false)} className="p-2 bg-nav-accent/10 rounded-lg text-nav-accent">
                  <X className="w-5 h-5" />
                </button>
              </div>
              {tabs.map((tab, index) => (
                <motion.button 
                  key={tab}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => { setActiveTab(tab); setMobileMenu(false); }} 
                  className={`nav-link py-4 text-lg rounded-xl transition-all ${
                    activeTab === tab 
                      ? "text-nav-accent font-bold bg-nav-accent/10" 
                      : "text-nav-text hover:text-nav-text-hover hover:bg-nav-text/5"
                  }`}
                >
                  {tab === "contact" ? "Connect" : tab === "tools" ? "TechTools" : tab === "lab" ? "AI LAB" : tab.charAt(0).toUpperCase() + tab.slice(1)}
                </motion.button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
