import { motion } from 'motion/react';

interface Tool {
  icon?: string;
  label: string;
  image?: string;
  color?: string;
}

interface ToolsProps {
  techTools: Tool[];
}

export default function Tools({ techTools }: ToolsProps) {
  return (
    <section className="pt-2 pb-12 md:pt-4 md:pb-20 flex flex-col justify-center max-w-[1400px] mx-auto min-h-[60vh]">
      <div className="text-center mb-6">
        <h2 className="text-2xl md:text-4xl font-bold tracking-tighter mb-2 uppercase">Tech Tools</h2>
        <p className="text-slate-400 font-mono text-[10px] uppercase tracking-widest">My technical arsenal for cloud & automation</p>
      </div>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 md:gap-6 w-full">
        {techTools.map((tool, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            whileHover={{ y: -5 }}
            className="glass-card aspect-square rounded-2xl text-center flex flex-col items-center justify-center group p-2 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />
            <div className="relative flex items-center justify-center w-full h-12 md:h-16">
              {tool.image ? (
                <img 
                  src={tool.image} 
                  alt={`${tool.label} logo`} 
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
}
