import { Terminal, Sparkles, FileDown, Linkedin, Github } from 'lucide-react';

interface ProfileBarProps {
  profilePhotos: string[];
  profilePhotoIndex: number;
  setProfilePhotoIndex: (index: number | ((prev: number) => number)) => void;
  setActiveTab: (tab: string) => void;
}

export default function ProfileBar({
  profilePhotos,
  profilePhotoIndex,
  setProfilePhotoIndex,
  setActiveTab
}: ProfileBarProps) {
  return (
    <div className="w-full mb-8 glass-card p-4 md:p-6 rounded-[2rem] flex flex-col md:flex-row items-center gap-6 md:gap-8 relative overflow-hidden group">
      <div className="absolute -top-10 -left-10 w-48 h-48 bg-accent/10 rounded-full blur-3xl group-hover:bg-accent/20 transition-all duration-700" />
      
      <div 
        className="group relative w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-accent/20 shadow-xl flex-shrink-0 flex items-center justify-center bg-accent/10 cursor-pointer focus:outline-none focus:ring-4 focus:ring-accent z-10"
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
        {profilePhotos[profilePhotoIndex] ? (
          <img 
            src={profilePhotos[profilePhotoIndex]} 
            alt="Omkar Kumbhar Profile" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        ) : (
          <Terminal className="w-10 h-10 text-accent" />
        )}
        
        <div className="absolute inset-0 bg-accent/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <Sparkles className="w-6 h-6 text-white animate-pulse" />
        </div>
      </div>

      <div className="text-center md:text-left z-10 flex-1">
        <p className="font-mono text-accent mb-1 tracking-[0.3em] uppercase text-[10px] md:text-xs">
          DevOps Engineer | IT Operations 
        </p>
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tighter leading-none mb-4">
          OMKAR <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-purple-400">KUMBHAR</span>
        </h1>

        <div className="flex flex-wrap gap-2 md:gap-3 justify-center md:justify-start items-stretch w-full">
          <button 
            onClick={() => setActiveTab("contact")} 
            className="flex-1 bg-accent text-white px-4 md:px-6 py-2 md:py-2.5 rounded-xl font-bold hover:scale-105 transition-all shadow-lg shadow-accent/40 cursor-pointer text-[10px] md:text-xs hover:brightness-110 active:scale-95 flex items-center justify-center min-w-[100px] md:min-w-[130px]"
          >
            Let's Talk
          </button>
          <a 
            href="https://1drv.ms/b/c/53eabff235c84771/IQCo_G4bh7WKRYjWrOoXcQqSAQfnefpqDFuI0esWtUvcJiE?e=GjNoV4" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex-1 glass-card px-4 md:px-6 py-2 md:py-2.5 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-accent hover:text-white transition-all text-[10px] md:text-xs hover:shadow-lg hover:shadow-accent/20 relative overflow-hidden group/btn min-w-[100px] md:min-w-[130px]"
          >
            <div className="absolute inset-0 bg-accent/10 opacity-0 group-hover/btn:opacity-100 blur-md transition-opacity" />
            <FileDown className="w-3 h-3 md:w-4 md:h-4 relative z-10" /> <span className="relative z-10">Resume</span>
          </a>
          <a 
            href="https://linkedin.com/in/omkarskumbhar11" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex-1 glass-card px-4 md:px-6 py-2 md:py-2.5 rounded-xl font-bold flex items-center justify-center gap-2 text-[10px] md:text-xs hover:bg-[#0077b5] hover:text-white transition-all hover:shadow-lg hover:shadow-[#0077b5]/30 relative overflow-hidden group/btn min-w-[100px] md:min-w-[130px]" 
            aria-label="Visit Omkar's LinkedIn Profile"
          >
            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover/btn:opacity-100 blur-md transition-opacity" />
            <Linkedin className="w-3 h-3 md:w-4 md:h-4 relative z-10" /> <span className="relative z-10">LinkedIn</span>
          </a>
          <a 
            href="https://github.com/omkarskumbhar11" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex-1 glass-card px-4 md:px-6 py-2 md:py-2.5 rounded-xl font-bold flex items-center justify-center gap-2 text-[10px] md:text-xs hover:bg-[#24292e] hover:text-white transition-all hover:shadow-lg hover:shadow-white/20 relative overflow-hidden group/btn min-w-[100px] md:min-w-[130px]" 
            aria-label="Visit Omkar's GitHub Profile"
          >
            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover/btn:opacity-100 blur-md transition-opacity" />
            <Github className="w-3 h-3 md:w-4 md:h-4 relative z-10" /> <span className="relative z-10">GitHub</span>
          </a>
        </div>
      </div>
    </div>
  );
}
