import { useState, useEffect, ChangeEvent } from 'react';
import { 
  Github, 
  Linkedin, 
  Mail, 
  Phone, 
  FileDown, 
  Moon, 
  Sun, 
  Menu, 
  X,
  ChevronRight,
  University,
  Sparkles,
  Terminal,
  Cpu,
  Camera,
  Upload,
  Image as ImageIcon
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Navbar from './components/Navbar';
import ImageEditor from './components/ImageEditor';

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
  const [customProfilePhoto, setCustomProfilePhoto] = useState<string | null>("https://i.ibb.co/KYDH6gS/4.png");
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handlePhotoUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCustomProfilePhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const [customPhotos, setCustomPhotos] = useState<string[]>([
    "https://i.ibb.co/3yhsLFVn/16.png",
    "https://i.ibb.co/5gHcwzgN/3.png",
    "https://i.ibb.co/jPTyMHdD/Gemini-Generated-Image-t59yict59yict59y.png",
    "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1000&auto=format&fit=crop"
  ]);

  const [expPhotos, setExpPhotos] = useState<string[]>([
    "https://i.ibb.co/fV67LvSF/517049530.webp",
    "https://i.ibb.co/B5v6PmqV/society-of-operations-engineers-cover.jpg"
  ]);
  const [eduPhoto, setEduPhoto] = useState<string>("https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=1000&auto=format&fit=crop");
  const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false);
  const [isEditorActive, setIsEditorActive] = useState(false);

  const handleExpPhotoUpload = (event: ChangeEvent<HTMLInputElement>, index: number) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newPhotos = [...expPhotos];
        newPhotos[index] = reader.result as string;
        setExpPhotos(newPhotos);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEduPhotoUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEduPhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCardPhotoUpload = (event: ChangeEvent<HTMLInputElement>, index: number) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newPhotos = [...customPhotos];
        newPhotos[index] = reader.result as string;
        setCustomPhotos(newPhotos);
      };
      reader.readAsDataURL(file);
    }
  };

  // Sync hash with state
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace("#", "");
      if (["profile", "tools", "experience", "education", "lab", "contact"].includes(hash)) {
        setActiveTab(hash);
      }
    };
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  useEffect(() => {
    window.location.hash = activeTab;
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
          initial={{ opacity: 0, x: 20, filter: "blur(10px)" }}
          animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, x: -20, filter: "blur(10px)" }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="w-full"
        >
          {(() => {
            switch (activeTab) {
              case "profile":
                return (
                  <section className="pt-2 pb-20 md:pt-4 md:pb-32 flex flex-col justify-center relative max-w-[1500px] mx-auto min-h-[70vh] px-6 md:px-10">
                    <div className="glow-circle top-0 right-0 opacity-60 bg-accent/20"></div>
                    <div className="glow-circle bottom-0 left-0 opacity-40 bg-purple-500/10"></div>
                    <div className="w-full grid lg:grid-cols-2 gap-12 items-center">
                      <div>
                        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-8">
                          <motion.div 
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="group relative w-40 h-40 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-accent/20 shadow-2xl flex-shrink-0 flex items-center justify-center bg-accent/10"
                          >
                            {customProfilePhoto ? (
                              <img 
                                src={customProfilePhoto} 
                                alt="Profile" 
                                className="w-full h-full object-cover"
                                referrerPolicy="no-referrer"
                              />
                            ) : (
                              <Terminal className="w-16 h-16 text-accent" />
                            )}
                          </motion.div>
                          <div>
                            <motion.p 
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              className="font-mono text-accent mb-4 tracking-[0.4em] uppercase text-xs md:text-sm"
                            >
                              DevOps Engineer | IT Operations 
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
                        <div className="font-mono text-base sm:text-lg md:text-2xl text-slate-400 mb-6 h-8 text-center md:text-left">
                          <span>{typewriterText}</span>
                          <span className="animate-pulse text-accent">|</span>
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
                          className="flex flex-wrap gap-3 md:gap-4 justify-center md:justify-start"
                        >
                          <button onClick={() => setActiveTab("contact")} className="bg-accent text-white px-5 md:px-6 py-2.5 md:py-3 rounded-xl font-bold hover:scale-105 transition-all shadow-lg shadow-accent/40 cursor-pointer text-xs md:text-sm hover:brightness-110 active:scale-95">
                            Let's Talk
                          </button>
                          <a href="https://1drv.ms/b/c/53eabff235c84771/IQCo_G4bh7WKRYjWrOoXcQqSAQfnefpqDFuI0esWtUvcJiE?e=GjNoV4" target="_blank" rel="noopener noreferrer" className="glass-card px-5 md:px-6 py-2.5 md:py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-accent hover:text-white transition-all text-xs md:text-sm hover:shadow-lg hover:shadow-accent/20">
                            <FileDown className="w-4 h-4" /> Resume
                          </a>
                          <a href="https://linkedin.com/in/omkarskumbhar11" target="_blank" className="glass-card px-5 md:px-6 py-2.5 md:py-3 rounded-xl flex items-center gap-2 text-xs md:text-sm hover:bg-[#0077b5] hover:text-white transition-all hover:shadow-lg hover:shadow-[#0077b5]/30">
                            <Linkedin className="w-4 h-4" /> LinkedIn
                          </a>
                          <a href="https://github.com/omkarskumbhar11" target="_blank" className="glass-card px-5 md:px-6 py-2.5 md:py-3 rounded-xl flex items-center gap-2 text-xs md:text-sm hover:bg-white hover:text-black transition-all hover:shadow-lg hover:shadow-white/20">
                            <Github className="w-4 h-4" /> GitHub
                          </a>
                        </motion.div>
                      </div>

                      <motion.div 
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
                        className="relative block mt-12 lg:mt-0"
                      >
                        <div className="relative w-full max-w-[280px] sm:max-w-[320px] md:max-w-[400px] lg:max-w-[450px] aspect-[3/4] mx-auto lg:ml-auto lg:mr-0 cursor-pointer" onClick={() => setPhotoIndex((prev) => (prev + 1) % customPhotos.length)}>
                          {/* Stacked Cards Effect */}
                          <AnimatePresence mode="popLayout">
                            {[...Array(Math.min(5, customPhotos.length))].map((_, i) => {
                              const index = (photoIndex + i) % customPhotos.length;
                              const isTop = i === 0;
                              return (
                                <motion.div
                                  key={index}
                                  initial={isTop ? { x: 50, opacity: 0, scale: 0.9 } : false}
                                  animate={{ 
                                    x: i * (windowWidth < 768 ? 4 : 8), 
                                    y: i * (windowWidth < 768 ? 4 : 8), 
                                    z: -i * 10,
                                    scale: 1 - (i * 0.04),
                                    opacity: 1 - (i * 0.18),
                                    rotate: i * 1
                                  }}
                                  exit={{ x: -100, opacity: 0, scale: 0.8, rotate: -10 }}
                                  transition={{ duration: 0.5, ease: "easeOut" }}
                                  className="absolute inset-0 z-10"
                                  style={{ zIndex: 30 - i }}
                                >
                                  <div className="group/card w-full h-full rounded-[1.5rem] md:rounded-[2rem] overflow-hidden glass-card border-2 border-accent/30 shadow-2xl shadow-accent/10 relative">
                                    <img 
                                      src={customPhotos[index]} 
                                      alt={`DevOps Concept ${index}`} 
                                      className="w-full h-full object-cover"
                                      referrerPolicy="no-referrer"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-transparent to-transparent opacity-40"></div>
                                  </div>
                                </motion.div>
                              );
                            })}
                          </AnimatePresence>

                          {/* Floating Badge */}
                          <motion.div 
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute -bottom-2 -right-2 md:-bottom-4 md:-right-4 glass-card p-2 md:p-4 rounded-xl md:rounded-2xl z-40 flex items-center gap-2 md:gap-3 shadow-xl"
                          >
                            <div className="w-8 h-8 md:w-10 md:h-10 bg-accent rounded-lg md:rounded-xl flex items-center justify-center text-white">
                              <Sparkles className="w-4 h-4 md:w-5 h-5" />
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
              case "tools":
                return (
                  <section className="pt-2 pb-20 md:pt-4 md:pb-32 max-w-[1400px] mx-auto min-h-[70vh]">
                      <div className="text-center mb-6">
                        <h2 className="text-2xl md:text-4xl font-bold tracking-tighter mb-2 uppercase">Tech Tools</h2>
                        <p className="text-slate-400 font-mono text-[10px] uppercase tracking-widest">My technical arsenal for cloud & automation</p>
                      </div>
                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 md:gap-6 w-full">
                      {TECH_TOOLS.map((tool, idx) => (
                        <motion.div 
                          key={idx}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.05 }}
                          whileHover={{ y: -5 }}
                          className="glass-card aspect-square rounded-2xl text-center flex flex-col items-center justify-center group p-2"
                        >
                          <div className="relative flex items-center justify-center w-full h-12 md:h-16">
                            {'image' in tool ? (
                              <img 
                                src={tool.image as string} 
                                alt={tool.label} 
                                className="h-full object-contain transition-all duration-500 group-hover:scale-110 group-hover:filter group-hover:drop-shadow-[0_0_15px_rgba(129,140,248,0.5)]"
                                referrerPolicy="no-referrer"
                              />
                            ) : (
                              <i className={`${tool.icon} ${['GitHub', 'Version Control', 'Linux OS'].includes(tool.label) ? '' : 'colored'} text-4xl md:text-5xl transition-all duration-500 group-hover:scale-110 group-hover:filter group-hover:drop-shadow-[0_0_15px_rgba(129,140,248,0.5)]`} style={tool.color ? { color: tool.color } : {}}></i>
                            )}
                          </div>
                          <p className="mt-2 font-mono text-[9px] md:text-[10px] opacity-40 uppercase tracking-widest font-bold">{tool.label}</p>
                        </motion.div>
                      ))}
                    </div>
                  </section>
                );
              case "experience":
                return (
                  <section className="pt-2 pb-20 md:pt-4 md:pb-32 max-w-[1400px] mx-auto min-h-[70vh]">
                      <div className="text-center mb-6">
                        <h2 className="text-2xl md:text-4xl font-bold tracking-tighter mb-2 uppercase">Experience</h2>
                        <p className="text-slate-400 light:text-slate-600 font-mono text-[10px] uppercase tracking-widest">My professional journey in IT & DevOps</p>
                      </div>
                    <div className="space-y-4 md:space-y-6 w-full">
                      <div className="glass-card p-4 md:p-6 rounded-[1.5rem] md:rounded-[2rem] relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-150"></div>
                        <div className="flex flex-col lg:flex-row gap-6">
                          <div className="w-full lg:w-1/4 aspect-video rounded-2xl overflow-hidden relative group/exp-img border border-accent/20">
                            <img 
                              src={expPhotos[0]} 
                              alt="Experience 1" 
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                              referrerPolicy="no-referrer"
                            />
                          </div>
                          <div className="flex-1">
                            <div className="flex flex-col md:flex-row justify-between items-start mb-4 gap-2">
                              <div>
                                <h3 className="text-lg md:text-2xl font-bold">IT Operation | Jr. DevOps Engineer</h3>
                                <p className="text-accent font-mono mt-1 text-xs md:text-sm">Excellex Technologies Pvt. Ltd. (Client: NSE, Mumbai)</p>
                              </div>
                              <span className="px-3 py-0.5 bg-accent/10 text-accent rounded-full font-mono text-[10px] whitespace-nowrap">May 2024 — Present</span>
                            </div>
                            <div className="grid md:grid-cols-2 gap-4 text-left">
                              <div>
                                <p className="font-bold mb-2 uppercase text-[9px] tracking-[0.2em] text-accent/80 border-b border-accent/20 pb-1">NSE Exchange Applications</p>
                                <ul className="space-y-2 text-xs sm:text-sm text-slate-400 light:text-slate-600">
                                 <li className="flex gap-2"><span className="text-accent">•</span> Managed mission-critical NSE exchange applications (IPO, CBR, RFQ, NDM, EBP) in 24×7 production environments.</li>
                                 <li className="flex gap-2"><span className="text-accent">•</span> Performed UAT to Production releases on Linux VM infrastructure ensuring zero-downtime deployments.</li>
                                 <li className="flex gap-2"><span className="text-accent">•</span> Troubleshot production incidents by collaborating with Development, QA and Business teams.</li>
                                 <li className="flex gap-2"><span className="text-accent">•</span> Followed ITIL Incident, Change and Release Management processes using ALM.</li>
                                 <li className="flex gap-2"><span className="text-accent">•</span> Performed log analysis, performance monitoring and health checks using ITRS Geneos.</li>
                                 <li className="flex gap-2"><span className="text-accent">•</span> Ensured high availability and reliability of on-prem production systems.</li>
                                </ul>
                              </div>
                              <div>
                                <p className="font-bold mb-2 uppercase text-[10px] tracking-[0.2em] text-accent/80 border-b border-accent/20 pb-1">Cloud Operations</p>
                                <ul className="space-y-2 text-xs sm:text-sm text-slate-400 light:text-slate-600">
                                  <li className="flex gap-2"><span className="text-accent">•</span> Worked with AWS services including EC2, VPC, S3, RDS, ELB, Auto Scaling, IAM, Route53, CloudWatch and CloudTrail.</li>
                                  <li className="flex gap-2"><span className="text-accent">•</span> Designed highly available architecture using Load Balancers and Auto Scaling.</li>
                                  <li className="flex gap-2"><span className="text-accent">•</span> Implemented secure IAM roles and policies for access control.</li>
                                  <li className="flex gap-2"><span className="text-accent">•</span> Managed S3 lifecycle policies, backups and disaster recovery.</li>
                                  <li className="flex gap-2"><span className="text-accent">•</span> Deployed containerized applications using Docker and Kubernetes.</li>
                                  <li className="flex gap-2"><span className="text-accent">•</span> Worked with Kubernetes clusters for application deployment and scaling.</li>
                                  <li className="flex gap-2"><span className="text-accent">•</span> Implemented monitoring stack using Prometheus and Grafana.</li>
                                  <li className="flex gap-2"><span className="text-accent">•</span> Maintained reliability and scalability across AWS and GCP environments.</li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="glass-card p-4 md:p-6 rounded-[1.5rem] md:rounded-[2rem] relative overflow-hidden group">
                        <div className="flex flex-col lg:flex-row gap-6">
                          <div className="w-full lg:w-1/4 aspect-video rounded-2xl overflow-hidden relative group/exp-img border border-accent/20">
                            <img 
                              src={expPhotos[1]} 
                              alt="Experience 2" 
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                              referrerPolicy="no-referrer"
                            />
                          </div>
                          <div className="flex-1">
                            <div className="flex flex-col md:flex-row justify-between items-start mb-4 gap-2">
                              <div>
                                <h3 className="text-lg md:text-2xl font-bold">Trainee Operation Engineer</h3>
                                <p className="text-accent font-mono mt-1 text-xs md:text-sm">NTPC Ltd.</p>
                              </div>
                              <span className="px-3 py-0.5 bg-accent/10 text-accent rounded-full font-mono text-[10px] whitespace-nowrap">Oct 2021 — Jan 2023</span>
                            </div>
                            <ul className="space-y-2 text-xs sm:text-sm text-slate-400 light:text-slate-600">
                              <li className="flex gap-2"><span className="text-accent">•</span> Monitored system parameters, alarms and logs in a high-availability environment.</li>
                              <li className="flex gap-2"><span className="text-accent">•</span> Assisted in preventive maintenance and daily operational reporting.</li>
                              <li className="flex gap-2"><span className="text-accent">•</span> Collaborated with senior engineers to ensure safe and reliable operations.</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                );
              case "education":
                return (
                  <section className="pt-2 pb-20 md:pt-4 md:pb-32 max-w-[1400px] mx-auto min-h-[70vh]">
                      <div className="text-center mb-10">
                        <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-4 uppercase">Education</h2>
                        <p className="text-slate-400 light:text-slate-600 font-mono text-xs uppercase tracking-widest">Academic background & certifications</p>
                      </div>
                    <div className="w-full">
                      <div className="glass-card p-6 sm:p-8 md:p-12 lg:p-16 rounded-[2rem] md:rounded-[3rem] lg:rounded-[4rem] text-center relative overflow-hidden group/edu">
                        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-accent/5 rounded-full"></div>
                        
                        <div className="relative w-28 h-28 sm:w-32 sm:h-32 md:w-48 md:h-48 mx-auto mb-6 md:mb-8 rounded-full overflow-hidden border-4 border-accent/20 group/edu-img">
                          <img 
                            src={eduPhoto} 
                            alt="Education" 
                            className="w-full h-full object-cover transition-transform duration-700 group-hover/edu:scale-110"
                            referrerPolicy="no-referrer"
                          />
                        </div>

                        <h3 className="text-xl sm:text-2xl md:text-4xl font-bold mb-3 md:mb-4 uppercase tracking-tighter">Bachelor of Engineering (B.E.)</h3>
                        <p className="text-slate-300 text-base sm:text-lg md:text-xl mb-2">Tatyasaheb Kore College of Engineering & Technology</p>
                        <p className="opacity-50 font-mono text-[10px] sm:text-xs md:text-sm uppercase tracking-widest">Shivaji University, Kolhapur | 2017 — 2021</p>
                      </div>
                    </div>
                  </section>
                );
              case "lab":
                return (
                  <section className={`pt-2 pb-20 md:pt-4 md:pb-32 max-w-[1100px] mx-auto px-4 transition-all duration-700 relative min-h-[70vh] ${isEditorActive ? 'scale-[1.02]' : ''}`}>
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
                return (
                  <section className="pt-2 pb-20 md:pt-4 md:pb-32 max-w-[1400px] mx-auto relative min-h-[70vh]">
                      <div className="glow-circle bottom-0 left-0 opacity-30"></div>
                      <div className="text-center mb-8 md:mb-10">
                        <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold tracking-tighter mb-4 uppercase">Ready to Automate?</h2>
                        <p className="text-slate-400 light:text-slate-600 w-full max-w-2xl mx-auto text-xs sm:text-sm md:text-base px-4">I'm currently available for DevOps and IT Operations roles in Mumbai or Remote. Let's build something scalable together.</p>
                      </div>
                      <div className="flex flex-col gap-8 md:gap-12 w-full">
                        {/* Social Links */}
                        <div className="flex flex-col items-center">
                          <p className="text-[10px] font-mono opacity-40 uppercase tracking-[0.4em] mb-8 font-bold">Connect on Socials</p>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-8 w-full">
                            <a href="https://linkedin.com/in/omkarskumbhar11" target="_blank" rel="noopener noreferrer" className="glass-card p-5 sm:p-6 md:p-8 rounded-[1.5rem] sm:rounded-[2rem] flex items-center gap-4 sm:gap-6 group hover:bg-accent/10 transition-all border-accent/10 hover:border-accent/30">
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
                            <a href="https://github.com/omkarskumbhar11" target="_blank" rel="noopener noreferrer" className="glass-card p-5 sm:p-6 md:p-8 rounded-[1.5rem] sm:rounded-[2rem] flex items-center gap-4 sm:gap-6 group hover:bg-accent/10 transition-all border-accent/10 hover:border-accent/30">
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
                            <a href="tel:+919075623562" className="glass-card p-5 sm:p-6 md:p-8 rounded-[1.5rem] sm:rounded-[2rem] flex items-center gap-4 sm:gap-6 group hover:bg-accent/10 transition-all border-accent/10 hover:border-accent/30">
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
                            <a href="mailto:omkarskumbhar11@gmail.com" className="glass-card p-5 sm:p-6 md:p-8 rounded-[1.5rem] sm:rounded-[2rem] flex items-center gap-4 sm:gap-6 group hover:bg-accent/10 transition-all border-accent/10 hover:border-accent/30">
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
              default:
                return null;
            }
          })()}
        </motion.div>
      </AnimatePresence>
    );
  };

  return (
    <div className={`antialiased min-h-screen flex flex-col ${theme}`}>
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        theme={theme} 
        setTheme={setTheme} 
      />

      <main className="flex-1 pt-24 md:pt-28 pb-6 px-4 md:px-10 lg:px-16 overflow-x-hidden">
        <div className="w-full h-full">
          {renderContent()}
        </div>
      </main>

      {/* Gallery Management Modal */}
      <AnimatePresence>
        {isGalleryModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-black/80 backdrop-blur-md"
            onClick={() => setIsGalleryModalOpen(false)}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="glass-card w-full max-w-4xl rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setIsGalleryModalOpen(false)}
                className="absolute top-8 right-8 p-3 bg-white/5 hover:bg-red-500/20 hover:text-red-500 rounded-2xl transition-all"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="mb-12">
                <h3 className="text-3xl font-bold mb-2 uppercase tracking-tighter">Manage Gallery</h3>
                <p className="opacity-50 font-mono text-xs uppercase tracking-widest">Customize your portfolio showcase photos</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {customPhotos.map((photo, idx) => (
                  <div key={idx} className="group relative aspect-[3/4] rounded-3xl overflow-hidden glass-card border-2 border-accent/20">
                    <img 
                      src={photo} 
                      alt={`Gallery ${idx}`} 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-4">
                      <label className="p-4 bg-accent text-white rounded-2xl cursor-pointer hover:scale-110 transition-transform shadow-xl">
                        <Camera className="w-6 h-6" />
                        <input 
                          type="file" 
                          accept="image/*" 
                          className="hidden" 
                          onChange={(e) => handleCardPhotoUpload(e, idx)}
                        />
                      </label>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-white">Replace Photo {idx + 1}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-12 p-6 rounded-3xl bg-accent/5 border border-accent/10 flex items-center gap-4">
                <div className="w-10 h-10 bg-accent/20 rounded-xl flex items-center justify-center text-accent">
                  <Sparkles className="w-5 h-5" />
                </div>
                <p className="text-xs opacity-60 leading-relaxed">
                  These photos are displayed in the stacked card gallery on your profile. You can replace them with your own project screenshots or professional photos.
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="py-10 text-center opacity-40 font-mono text-[10px] uppercase tracking-widest flex flex-col gap-2">
        <div>&copy; {new Date().getFullYear()} Omkar Sunil Kumbhar // Built with Great Mindset // AWS & GCP</div>
        <div className="opacity-50">Version 1.1.0</div>
      </footer>
    </div>
  );
}
