import { motion } from 'motion/react';
import { Linkedin, Github, Phone, Mail, ChevronRight } from 'lucide-react';

interface ContactProps {
  setActiveTab: (tab: string) => void;
}

export default function Contact({ setActiveTab }: ContactProps) {
  return (
    <section className="pt-2 pb-12 md:pt-4 md:pb-20 flex flex-col justify-center max-w-[1400px] mx-auto relative min-h-[60vh]">
      <div className="text-center mb-8 md:mb-10">
        <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold tracking-tighter mb-4 uppercase">Ready to Automate?</h2>
        <p className="text-slate-400 light:text-slate-600 w-full max-w-2xl mx-auto text-xs sm:text-sm md:text-base px-4">I'm currently available for DevOps and IT Operations roles in Mumbai or Remote. Let's build something scalable together.</p>
      </div>
      <div className="flex flex-col gap-8 md:gap-12 w-full">
        {/* Social Links */}
        <div className="flex flex-col items-center">
          <p className="text-[10px] font-mono opacity-40 uppercase tracking-[0.4em] mb-8 font-bold">Connect on Socials</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-8 w-full">
            <a href="https://linkedin.com/in/omkarskumbhar11" target="_blank" rel="noopener noreferrer" className="glass-card p-5 sm:p-6 md:p-8 rounded-[1.5rem] sm:rounded-[2rem] flex items-center gap-4 sm:gap-6 group transition-all relative overflow-hidden" aria-label="Visit Omkar's LinkedIn Profile">
              <div className="absolute -top-10 -left-10 w-32 h-32 bg-accent/10 rounded-full blur-3xl group-hover:bg-accent/20 transition-all duration-700" />
              <motion.div 
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="p-3 sm:p-4 bg-accent/10 rounded-xl sm:rounded-2xl group-hover:bg-accent group-hover:text-white transition-all duration-500 shadow-lg"
              >
                <Linkedin className="w-5 h-5 sm:w-6 sm:h-6" />
              </motion.div>
              <div className="text-left">
                <p className="text-slate-400 light:text-slate-600 font-mono text-[8px] sm:text-[9px] uppercase tracking-widest mb-0.5">LinkedIn</p>
                <span className="font-bold text-xs sm:text-sm md:text-lg group-hover:text-accent transition-colors truncate max-w-[120px] sm:max-w-none block">omkarskumbhar11</span>
              </div>
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 ml-auto opacity-20 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
            </a>
            <a href="https://github.com/omkarskumbhar11" target="_blank" rel="noopener noreferrer" className="glass-card p-5 sm:p-6 md:p-8 rounded-[1.5rem] sm:rounded-[2rem] flex items-center gap-4 sm:gap-6 group transition-all relative overflow-hidden" aria-label="Visit Omkar's GitHub Profile">
              <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-accent/10 rounded-full blur-3xl group-hover:bg-accent/20 transition-all duration-700" />
              <motion.div 
                whileHover={{ scale: 1.1, rotate: -5 }}
                className="p-3 sm:p-4 bg-accent/10 rounded-xl sm:rounded-2xl group-hover:bg-accent group-hover:text-white transition-all duration-500 shadow-lg"
              >
                <Github className="w-5 h-5 sm:w-6 sm:h-6" />
              </motion.div>
              <div className="text-left">
                <p className="text-slate-400 light:text-slate-600 font-mono text-[8px] sm:text-[9px] uppercase tracking-widest mb-0.5">GitHub</p>
                <span className="font-bold text-xs sm:text-sm md:text-lg group-hover:text-accent transition-colors truncate max-w-[120px] sm:max-w-none block">omkarskumbhar11</span>
              </div>
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 ml-auto opacity-20 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
            </a>
          </div>
        </div>

        {/* Primary Contact */}
        <div className="flex flex-col items-center">
          <p className="text-[10px] font-mono opacity-40 uppercase tracking-[0.4em] mb-8 font-bold">Direct Communication</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-8 w-full">
            <a href="tel:+919075623562" className="glass-card p-5 sm:p-6 md:p-8 rounded-[1.5rem] sm:rounded-[2rem] flex items-center gap-4 sm:gap-6 group transition-all relative overflow-hidden" aria-label="Call Omkar">
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-accent/10 rounded-full blur-3xl group-hover:bg-accent/20 transition-all duration-700" />
              <motion.div 
                whileHover={{ scale: 1.1, rotate: 12 }}
                className="p-3 sm:p-4 bg-accent/10 rounded-xl sm:rounded-2xl group-hover:bg-accent group-hover:text-white transition-all duration-500 shadow-lg"
              >
                <Phone className="w-5 h-5 sm:w-6 sm:h-6" />
              </motion.div>
              <div className="text-left">
                <p className="text-slate-400 light:text-slate-600 font-mono text-[8px] sm:text-[9px] uppercase tracking-widest mb-0.5">Direct Line</p>
                <span className="font-bold text-xs sm:text-sm md:text-lg group-hover:text-accent transition-colors truncate max-w-[120px] sm:max-w-none block">+91 9075623562</span>
              </div>
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 ml-auto opacity-20 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
            </a>
            <a href="mailto:omkarskumbhar11@gmail.com" className="glass-card p-5 sm:p-6 md:p-8 rounded-[1.5rem] sm:rounded-[2rem] flex items-center gap-4 sm:gap-6 group transition-all relative overflow-hidden" aria-label="Email Omkar">
              <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-accent/10 rounded-full blur-3xl group-hover:bg-accent/20 transition-all duration-700" />
              <motion.div 
                whileHover={{ scale: 1.1, rotate: -12 }}
                className="p-3 sm:p-4 bg-accent/10 rounded-xl sm:rounded-2xl group-hover:bg-accent group-hover:text-white transition-all duration-500 shadow-lg"
              >
                <Mail className="w-5 h-5 sm:w-6 sm:h-6" />
              </motion.div>
              <div className="text-left">
                <p className="text-slate-400 light:text-slate-600 font-mono text-[8px] sm:text-[9px] uppercase tracking-widest mb-0.5">Email Address</p>
                <span className="font-bold text-xs sm:text-sm md:text-lg group-hover:text-accent transition-colors truncate max-w-[120px] sm:max-w-none block">omkarskumbhar11@gmail.com</span>
              </div>
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 ml-auto opacity-20 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
