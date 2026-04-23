import { ScrollReveal } from "../ScrollReveal";
import { useState, useRef, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Github, ExternalLink, ArrowRight } from "lucide-react";
import { AnimatePresence, motion, useSpring, useMotionValue, useTransform } from "framer-motion";

function ProjectCard({ project, onClick }: { project: any, onClick: () => void }) {
  const cardRef = useRef<HTMLDivElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [6, -6]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-6, 6]), { stiffness: 300, damping: 30 });

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    if (!cardRef.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseXPos = event.clientX - rect.left;
    const mouseYPos = event.clientY - rect.top;
    
    const xPct = mouseXPos / width - 0.5;
    const yPct = mouseYPos / height - 0.5;
    x.set(xPct);
    y.set(yPct);
    
    mouseX.set(mouseXPos);
    mouseY.set(mouseYPos);
    
    cardRef.current.style.setProperty('--mouse-x', `${mouseXPos}px`);
    cardRef.current.style.setProperty('--mouse-y', `${mouseYPos}px`);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  const visibleTech = project.tech.slice(0, 4);
  const hiddenTechCount = project.tech.length - 4;

  return (
    <motion.div
      ref={cardRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="glass-card cursor-pointer h-full p-6 md:p-8 flex flex-col group transition-all duration-300 overflow-hidden relative spotlight-card"
    >
      <div 
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(255,255,255,.1), transparent 40%)`,
          zIndex: 1
        }}
      />
      <div className="flex-grow relative z-10" style={{ transform: "translateZ(20px)" }}>
        <h4 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors line-clamp-1">{project.title}</h4>
        <p className="text-muted-foreground mb-6 leading-relaxed line-clamp-2 text-sm">{project.summary}</p>
        
        <div className="flex flex-wrap gap-2 mb-6">
          {visibleTech.map((t: string) => (
            <span key={t} className="text-xs font-mono px-2.5 py-1 bg-white/5 border border-white/10 rounded-md text-foreground/80 tag-pulse">
              {t}
            </span>
          ))}
          {hiddenTechCount > 0 && (
            <span className="text-xs font-mono px-2.5 py-1 bg-white/5 border border-white/10 rounded-md text-muted-foreground">
              +{hiddenTechCount}
            </span>
          )}
        </div>
      </div>

      <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between relative h-[40px] print-hidden z-10" style={{ transform: "translateZ(20px)" }}>
        <div className="absolute inset-0 flex items-center gap-2 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
          <span className="text-xs font-medium px-2.5 py-1 bg-primary/10 text-primary rounded-md">
            {project.role}
          </span>
          <span className="text-xs font-medium px-2.5 py-1 bg-white/5 text-muted-foreground rounded-md capitalize">
            {project.status}
          </span>
        </div>
        
        <div className="flex items-center text-sm font-medium text-foreground/80 group-hover:text-primary transition-colors group-hover:opacity-0 group-hover:-translate-y-4 duration-300 absolute inset-y-0 right-0 left-0 w-full">
          View Details
        </div>
        <div className="absolute right-0 h-full flex items-center justify-center">
          <ArrowRight className="w-4 h-4 text-primary opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
        </div>
      </div>
    </motion.div>
  );
}

export function Projects({ projects, sparklabs }: { projects: any[], sparklabs: any }) {
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [showSparkLabs, setShowSparkLabs] = useState(false);

  const handlePulse = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    const el = e.currentTarget;
    el.classList.remove('pulsing');
    void el.offsetWidth;
    el.classList.add('pulsing');
  };

  return (
    <section id="projects" className="py-24 lg:py-32 print-avoid-break">
      <div className="mb-12">
        <ScrollReveal>
          <div className="flex items-center gap-4 mb-4">
            <div className="h-px bg-white/10 flex-grow max-w-[40px] print-hidden" />
            <span className="text-xs font-medium tracking-widest text-muted-foreground uppercase">Selected Work</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-bold">Projects</h2>
        </ScrollReveal>
      </div>
      
      {/* SparkLabs Featured Card */}
      <ScrollReveal delay={0.1}>
        <div className="relative group mb-12" style={{ perspective: 1000 }}>
          {/* Animated gradient glow halo */}
          <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-primary/30 via-purple-500/30 to-blue-500/30 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 print-hidden" style={{ animation: 'spin 10s linear infinite' }} />
          
          {/* Floating orbs */}
          <div className="absolute top-10 left-10 w-24 h-24 bg-primary/20 rounded-full blur-2xl animate-[blob-drift-1_15s_infinite_alternate_ease-in-out] print-hidden" />
          <div className="absolute bottom-10 right-20 w-32 h-32 bg-purple-500/20 rounded-full blur-2xl animate-[blob-drift-2_20s_infinite_alternate_ease-in-out] print-hidden" />
          <div className="absolute top-1/2 left-1/2 w-20 h-20 bg-blue-500/20 rounded-full blur-2xl animate-[blob-drift-3_18s_infinite_alternate_ease-in-out] print-hidden" />
          
          <div 
            onClick={() => setShowSparkLabs(true)}
            className="glass-card cursor-pointer p-8 md:p-12 relative z-10 transition-all duration-300 will-change-transform w-full border-white/20 bg-white/[0.03]"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 print-hidden" />
            
            <div className="relative z-10 flex flex-col md:flex-row gap-8 justify-between items-start md:items-center">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-4 h-4 rounded-full bg-primary shadow-[0_0_12px_rgba(100,100,255,0.8)] animate-pulse print-hidden" />
                  <h3 className="text-4xl font-display font-bold text-foreground bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">{sparklabs.startup.name}</h3>
                </div>
                <p className="text-muted-foreground text-xl mb-8 leading-relaxed font-medium max-w-4xl">
                  {sparklabs.startup.overview}
                </p>
                <div className="flex items-center gap-4">
                  <div className="inline-flex items-center gap-2 text-primary font-medium glass-pill px-6 py-3 bg-primary/10 print-hidden shine-sweep overflow-hidden relative btn-pulse-ring">
                    <span className="relative z-10 flex items-center gap-2">Explore Initiative <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" /></span>
                  </div>
                  <span className="text-sm font-mono px-4 py-2 bg-white/5 rounded-md text-muted-foreground border border-white/10">
                    {sparklabs.startup.role}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* Standard Projects Grid */}
      <ScrollReveal staggerChildren className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8" style={{ perspective: 1200 }}>
        {projects.filter(p => p.public).map((project) => (
          <ProjectCard key={project.id} project={project} onClick={() => setSelectedProject(project)} />
        ))}
      </ScrollReveal>

      {/* Modals */}
      <AnimatePresence>
        {(selectedProject || showSparkLabs) && (
          <Dialog open={!!(selectedProject || showSparkLabs)} onOpenChange={(open) => {
            if (!open) {
              setSelectedProject(null);
              setShowSparkLabs(false);
            }
          }}>
            <DialogContent 
              className="max-w-[960px] glass-panel border-white/10 bg-[#0a0a0f]/80 backdrop-blur-[32px] text-foreground p-0 overflow-hidden shadow-[0_32px_80px_-16px_rgba(0,0,0,0.8)] max-h-[90vh] flex flex-col"
              style={{ backdropFilter: "blur(40px)" }}
            >
              <DialogTitle className="sr-only">Project Details</DialogTitle>
              <DialogDescription className="sr-only">Detailed view of the selected project or initiative.</DialogDescription>
              
              <div className="flex-1 overflow-y-auto p-6 sm:p-8 md:p-10 hide-scrollbar">
                {selectedProject && (
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, ease: "easeOut" }}>
                    <div className="flex flex-col md:flex-row gap-12">
                      <div className="md:w-3/5 space-y-8">
                        <div>
                          <div className="flex items-center gap-3 mb-4">
                            <span className="text-xs font-medium px-3 py-1 bg-primary/15 text-primary rounded-full border border-primary/20">
                              {selectedProject.role}
                            </span>
                            <span className="text-xs font-medium px-3 py-1 bg-white/10 text-muted-foreground rounded-full capitalize border border-white/10">
                              {selectedProject.status}
                            </span>
                          </div>
                          <h2 className="text-3xl md:text-4xl font-display font-bold text-gradient mb-6 leading-tight">{selectedProject.title}</h2>
                        </div>
                        
                        <div className="prose prose-invert max-w-none">
                          <p className="text-foreground/90 leading-relaxed text-lg mb-4">{selectedProject.summary}</p>
                          {selectedProject.analysis && (
                            <p className="text-muted-foreground leading-relaxed">{selectedProject.analysis}</p>
                          )}
                        </div>
                      </div>

                      <div className="md:w-2/5 space-y-8 flex flex-col">
                        <div className="glass-card p-6 rounded-2xl bg-white/[0.02] border-white/5">
                          <h5 className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-4">Technologies</h5>
                          <div className="flex flex-wrap gap-2">
                            {selectedProject.tech.map((t: string) => (
                              <span key={t} className="text-sm font-mono px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-foreground/80 tag-pulse cursor-default">
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="glass-card p-6 rounded-2xl bg-white/[0.02] border-white/5 flex-grow">
                          <h5 className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-5">Deliverables</h5>
                          <div className="space-y-4">
                            {selectedProject.model && (
                              <div>
                                <span className="text-xs text-muted-foreground block mb-1">Model Used</span>
                                <span className="text-sm font-medium text-foreground">{selectedProject.model}</span>
                              </div>
                            )}
                            {selectedProject.dashboard && (
                              <div>
                                <span className="text-xs text-muted-foreground block mb-1">Created Asset</span>
                                <span className="text-sm font-medium text-foreground">{selectedProject.dashboard}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-end gap-4">
                      {selectedProject.showGithub && selectedProject.github && (
                        <a href={selectedProject.github} onClick={handlePulse as any} target="_blank" rel="noreferrer noopener" className="glass-cta btn-pulse-ring flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white/5 hover:bg-white/10 font-medium transition-colors border border-white/10">
                          <Github className="w-4 h-4" /> Source Code
                        </a>
                      )}
                      {selectedProject.showLive && selectedProject.live && (
                        <a href={selectedProject.live} onClick={handlePulse as any} target="_blank" rel="noreferrer noopener" className="glass-cta btn-pulse-ring flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20 border-none">
                          <ExternalLink className="w-4 h-4" /> Live Dashboard
                        </a>
                      )}
                    </div>
                  </motion.div>
                )}

                {showSparkLabs && (
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, ease: "easeOut" }}>
                    <div className="mb-10">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-4 h-4 rounded-full bg-primary shadow-[0_0_12px_rgba(100,100,255,0.8)]" />
                        <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">{sparklabs.startup.name}</h2>
                      </div>
                      <p className="text-muted-foreground text-lg leading-relaxed max-w-3xl">{sparklabs.startup.overview}</p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {sparklabs.products.filter((p: any) => p.public).map((product: any) => (
                        <div key={product.name} className="glass-card p-6 md:p-8 bg-white/[0.02] flex flex-col">
                          <div className="flex justify-between items-start mb-5">
                            <h4 className="font-bold text-2xl text-foreground">{product.name}</h4>
                            <span className={`text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider ${product.status === 'launched' ? 'bg-primary/20 text-primary border border-primary/20' : 'bg-white/5 text-muted-foreground border border-white/10'}`}>
                              {product.status}
                            </span>
                          </div>
                          
                          <p className="text-muted-foreground text-sm mb-8 flex-grow leading-relaxed">{product.description}</p>
                          
                          <div className="flex gap-3 mt-auto pt-4 border-t border-white/5">
                            {product.showGithub && product.github && (
                              <a href={product.github} onClick={handlePulse as any} target="_blank" rel="noreferrer noopener" className="flex-1 btn-pulse-ring flex items-center justify-center gap-2 text-sm font-medium bg-white/5 hover:bg-white/10 py-2.5 rounded-lg transition-colors border border-white/5 glass-cta">
                                <Github className="w-4 h-4" /> Code
                              </a>
                            )}
                            {product.showLive && product.live && (
                              <a href={product.live} onClick={handlePulse as any} target="_blank" rel="noreferrer noopener" className="flex-1 btn-pulse-ring flex items-center justify-center gap-2 text-sm font-medium bg-primary/20 hover:bg-primary/30 text-primary py-2.5 rounded-lg transition-colors border border-primary/20 glass-cta">
                                <ExternalLink className="w-4 h-4" /> App
                              </a>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>
    </section>
  );
}
