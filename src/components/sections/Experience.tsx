interface ExperienceProps {}

export default function Experience({}: ExperienceProps) {
  return (
    <section className="pt-2 pb-12 md:pt-4 md:pb-20 flex flex-col justify-center max-w-[1400px] mx-auto min-h-[60vh]">
      <div className="text-center mb-6">
        <h2 className="text-2xl md:text-4xl font-bold tracking-tighter mb-2 uppercase">Experience</h2>
        <p className="text-slate-400 light:text-slate-600 font-mono text-[10px] uppercase tracking-widest">My professional journey in IT & DevOps</p>
      </div>
      <div className="space-y-4 md:space-y-6 w-full">
        <div className="glass-card p-4 md:p-6 rounded-[1.5rem] md:rounded-[2rem] relative overflow-hidden group">
          <div className="absolute -top-10 -right-10 w-48 h-48 bg-accent/10 rounded-full blur-3xl group-hover:bg-accent/20 transition-all duration-700" />
          <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-accent/10 rounded-full blur-3xl group-hover:bg-accent/20 transition-all duration-700" />
          <div className="relative z-10 flex flex-col lg:flex-row gap-6">
            <div className="w-full lg:w-1/4 aspect-video rounded-2xl overflow-hidden relative group/exp-img border border-accent/20">
              <img 
                src="https://i.ibb.co/fV67LvSF/517049530.webp" 
                alt="NSE Exchange Production Environment Monitoring and Management" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex-1">
              <div className="flex flex-col md:flex-row justify-between items-start mb-4 gap-2">
                <div>
                  <h3 className="text-lg md:text-2xl font-bold">Jr. DevOps Engineer | IT Operations</h3>
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
          <div className="absolute -top-10 -left-10 w-48 h-48 bg-accent/10 rounded-full blur-3xl group-hover:bg-accent/20 transition-all duration-700" />
          <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-accent/10 rounded-full blur-3xl group-hover:bg-accent/20 transition-all duration-700" />
          <div className="relative z-10 flex flex-col lg:flex-row gap-6">
            <div className="w-full lg:w-1/4 aspect-video rounded-2xl overflow-hidden relative group/exp-img border border-accent/20">
              <img 
                src="https://i.ibb.co/B5v6PmqV/society-of-operations-engineers-cover.jpg" 
                alt="NTPC Operations Engineering Training and System Monitoring" 
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
}
