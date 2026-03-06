import { useState, useEffect, ChangeEvent } from 'react';
import { 
  ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useWindowSize } from './hooks/useWindowSize';
import Navbar from './components/Navbar';
import ImageEditor from './components/ImageEditor';
import Hero from './components/sections/Hero';
import Tools from './components/sections/Tools';
import Experience from './components/sections/Experience';
import Education from './components/sections/Education';
import Contact from './components/sections/Contact';

const TECH_TOOLS = [
  { icon: "devicon-amazonwebservices-plain-wordmark", label: "AWS Cloud" },
  { icon: "devicon-googlecloud-plain", label: "Google Cloud" },
  { icon: "devicon-kubernetes-plain", label: "Orchestration" },
  { icon: "devicon-docker-plain", label: "Containers" },
  { icon: "devicon-terraform-plain-wordmark", label: "IaC" },
  { icon: "devicon-grafana-plain", label: "Grafana", color: "#ff0000" },
  { icon: "devicon-prometheus-original", label: "Prometheus" },
  { icon: "devicon-git-plain", label: "Version Control" },
  { icon: "devicon-github-original", label: "GitHub" },
  { icon: "devicon-ansible-plain", label: "Ansible", color: "#EE0000" },
  { icon: "devicon-linux-plain", label: "Linux OS" },
  { image: "https://www.jenkins.io/images/logos/jenkins/jenkins.png", label: "Jenkins CICD" },
];

const CUSTOM_PHOTOS = [
  "https://i.ibb.co/3yhsLFVn/16.png",
  "https://i.ibb.co/5gHcwzgN/3.png",
  "https://i.ibb.co/jPTyMHdD/Gemini-Generated-Image-t59yict59yict59y.png",
  "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1000&auto=format&fit=crop"
];

const PHRASES = [
  "Building Scalable CI/CD Pipelines",
  "AWS & GCP Cloud Operations",
  "Managing NSE Exchange Production"
];

export default function App() {
  const [theme, setTheme] = useState('dark');
  const [typewriterText, setTypewriterText] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [activeTab, setActiveTab] = useState(() => {
    const hash = window.location.hash.replace("#", "");
    return ["profile", "tools", "experience", "education", "lab", "contact"].includes(hash) ? hash : "profile";
  });
  const [photoIndex, setPhotoIndex] = useState(0);
  const [profilePhotoIndex, setProfilePhotoIndex] = useState(0);
  const [profilePhotos, setProfilePhotos] = useState<string[]>([
    "https://i.ibb.co/KYDH6gS/4.png",
    "https://i.ibb.co/4gmgTqVV/21.png"
  ]);
  const { width: windowWidth } = useWindowSize();

  const [isEditorActive, setIsEditorActive] = useState(false);

  // Sync hash with state
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace("#", "");
      if (["profile", "tools", "experience", "education", "lab", "contact"].includes(hash) && hash !== activeTab) {
        setActiveTab(hash);
      }
    };
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, [activeTab]);

  useEffect(() => {
    if (window.location.hash !== `#${activeTab}`) {
      window.location.hash = activeTab;
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [activeTab]);

  // Theme Toggle
  useEffect(() => {
    document.body.classList.remove('light', 'warm', 'midnight', 'forest', 'cyber');
    if (theme !== 'dark') {
      document.body.classList.add(theme);
    }
  }, [theme]);

  // Typewriter Effect
  useEffect(() => {
    const currentPhrase = PHRASES[phraseIndex];
    const typeSpeed = isDeleting ? 50 : 100;
    
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setTypewriterText(currentPhrase.substring(0, typewriterText.length + 1));
        if (typewriterText.length === currentPhrase.length) {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        setTypewriterText(currentPhrase.substring(0, typewriterText.length - 1));
        if (typewriterText.length === 0) {
          setIsDeleting(false);
          setPhraseIndex((prev) => (prev + 1) % PHRASES.length);
        }
      }
    }, typeSpeed);

    return () => clearTimeout(timeout);
  }, [typewriterText, isDeleting, phraseIndex]);

  const renderContent = () => {
    return (
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10, scale: 0.98, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -10, scale: 1.02, filter: "blur(10px)" }}
          transition={{ 
            duration: 0.4, 
            ease: [0.22, 1, 0.36, 1],
            opacity: { duration: 0.3 },
            filter: { duration: 0.3 }
          }}
          className="w-full"
        >
          {(() => {
            switch (activeTab) {
              case "profile":
                return (
                  <Hero 
                    profilePhotos={profilePhotos}
                    profilePhotoIndex={profilePhotoIndex}
                    setProfilePhotoIndex={setProfilePhotoIndex}
                    typewriterText={typewriterText}
                    setActiveTab={setActiveTab}
                    photoIndex={photoIndex}
                    setPhotoIndex={setPhotoIndex}
                    windowWidth={windowWidth}
                    customPhotos={CUSTOM_PHOTOS}
                  />
                );
              case "tools":
                return <Tools techTools={TECH_TOOLS} />;
              case "experience":
                return <Experience />;
              case "education":
                return <Education />;
              case "lab":
                return (
                  <section className={`pt-2 pb-12 md:pt-4 md:pb-20 flex flex-col justify-center max-w-[1100px] mx-auto px-4 transition-all duration-700 relative min-h-[60vh] ${isEditorActive ? 'scale-[1.02]' : ''}`}>
                    {isEditorActive && (
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute inset-0 -z-10 blur-3xl bg-accent/5 rounded-full"
                      />
                    )}
                    <div className="text-center mb-4">
                      <h2 className="text-xl md:text-2xl font-bold tracking-tighter mb-1 uppercase">AI LAB</h2>
                      <p className="text-slate-400 light:text-slate-600 font-mono text-[9px] uppercase tracking-widest">Experimenting with Generative AI & Vision</p>
                    </div>
                    <ImageEditor onActiveChange={setIsEditorActive} />
                  </section>
                );
              case "contact":
                return <Contact setActiveTab={setActiveTab} />;
              default:
                return null;
            }
          })()}
        </motion.div>
      </AnimatePresence>
    );
  };

  return (
    <div className="antialiased min-h-screen flex flex-col">
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        theme={theme} 
        setTheme={setTheme} 
      />

      <main className="flex-1 pt-24 md:pt-28 pb-6 px-4 md:px-10 lg:px-16">
        <div className="w-full h-full">
          {renderContent()}
        </div>
      </main>

      <footer className="py-6 text-center opacity-40 font-mono text-[10px] uppercase tracking-widest flex flex-col gap-2">
        <div>&copy; {new Date().getFullYear()} Omkar Sunil Kumbhar // Built with Great Mindset // AWS & GCP</div>
        <div className="opacity-50">Version 1.2.0</div>
      </footer>
    </div>
  );
}
