import { motion } from 'motion/react';
import { GraduationCap, ChevronRight } from 'lucide-react';

interface EducationProps {}

export default function Education({}: EducationProps) {
  return (
    <section className="pt-2 pb-12 md:pt-4 md:pb-20 flex flex-col justify-center max-w-[1400px] mx-auto min-h-[60vh]">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-4 uppercase">Education</h2>
        <p className="text-slate-400 light:text-slate-600 font-mono text-xs uppercase tracking-widest">Academic background & certifications</p>
      </div>
      <div className="w-full max-w-4xl mx-auto">
        <div className="glass-card p-6 sm:p-8 md:p-10 rounded-[2rem] flex flex-col md:flex-row items-center gap-6 sm:gap-8 group transition-all relative overflow-hidden">
          <div className="absolute -top-10 -left-10 w-48 h-48 bg-accent/10 rounded-full blur-3xl group-hover:bg-accent/20 transition-all duration-700" />
          
          <motion.div 
            whileHover={{ scale: 1.05, rotate: 5 }}
            className="w-24 h-24 sm:w-32 sm:h-32 rounded-2xl overflow-hidden border-2 border-accent/20 flex-shrink-0 relative z-10"
          >
            <img 
              src="https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=1000&auto=format&fit=crop" 
              alt="Tatyasaheb Kore College of Engineering & Technology" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              referrerPolicy="no-referrer"
            />
          </motion.div>

          <div className="text-center md:text-left flex-1 relative z-10">
            <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
              <div className="p-2 bg-accent/10 rounded-lg text-accent">
                <GraduationCap className="w-5 h-5" />
              </div>
              <p className="text-slate-400 light:text-slate-600 font-mono text-[10px] sm:text-xs uppercase tracking-widest">Shivaji University, Kolhapur</p>
            </div>
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 uppercase tracking-tighter group-hover:text-accent transition-colors">Bachelor of Engineering (B.E.)</h3>
            <p className="text-slate-300 text-sm sm:text-base md:text-lg mb-1">Tatyasaheb Kore College of Engineering & Technology</p>
            <p className="opacity-50 font-mono text-[10px] sm:text-xs uppercase tracking-widest">2017 — 2021</p>
          </div>

          <div className="hidden md:block ml-auto">
            <ChevronRight className="w-6 h-6 opacity-20 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-accent" />
          </div>
        </div>
      </div>
    </section>
  );
}
