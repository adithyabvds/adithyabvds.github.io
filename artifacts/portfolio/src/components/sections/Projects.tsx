import { ScrollReveal } from "../ScrollReveal";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Github, ExternalLink } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export function Projects({ projects, sparklabs }: { projects: any[], sparklabs: any }) {
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [showSparkLabs, setShowSparkLabs] = useState(false);

  return (
    <section id="projects" className="py-32">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
        <ScrollReveal>
          <h2 className="text-4xl font-display font-bold sticky top-32">Work</h2>
        </ScrollReveal>
        
        <div className="md:col-span-2">
          {/* SparkLabs Featured Card */}
          <ScrollReveal delay={0.1}>
            <div 
              onClick={() => setShowSparkLabs(true)}
              className="glass-card cursor-pointer p-8 md:p-10 mb-8 group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
              
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-3 h-3 rounded-full bg-primary shadow-[0_0_8px_rgba(100,100,255,0.8)] animate-pulse" />
                  <h3 className="text-3xl font-display font-bold">{sparklabs.startup.name}</h3>
                </div>
                <p className="text-muted-foreground text-lg mb-8 leading-relaxed font-medium">
                  {sparklabs.startup.overview}
                </p>
                <div className="inline-flex items-center gap-2 text-primary font-medium glass-pill px-4 py-2 bg-primary/10">
                  Explore Initiative <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Standard Projects Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {projects.filter(p => p.public).map((project, idx) => (
              <ScrollReveal key={project.id} delay={idx * 0.1}>
                <div 
                  onClick={() => setSelectedProject(project)}
                  className="glass-card cursor-pointer h-full p-6 md:p-8 flex flex-col group"
                >
                  <h4 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">{project.title}</h4>
                  <p className="text-muted-foreground mb-8 flex-grow leading-relaxed">{project.summary}</p>
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.tech.slice(0, 3).map((t: string) => (
                      <span key={t} className="text-xs font-mono px-2 py-1 bg-white/5 border border-white/10 rounded-md">
                        {t}
                      </span>
                    ))}
                    {project.tech.length > 3 && (
                      <span className="text-xs font-mono px-2 py-1 bg-white/5 border border-white/10 rounded-md">
                        +{project.tech.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>

      {/* Modals using Framer Motion for liquid glass feel */}
      <AnimatePresence>
        {(selectedProject || showSparkLabs) && (
          <Dialog open={!!(selectedProject || showSparkLabs)} onOpenChange={(open) => {
            if (!open) {
              setSelectedProject(null);
              setShowSparkLabs(false);
            }
          }}>
            {/* The dialog content is overridden to use our glass-panel class via global CSS or inline styles in ui/dialog if possible, but let's just wrap it here */}
            <DialogContent className="max-w-3xl glass-panel border-white/10 bg-[#0a0a0f]/60 backdrop-blur-[28px] text-foreground p-0 overflow-hidden shadow-2xl sm:rounded-3xl">
              <div className="p-8 md:p-10">
                {selectedProject && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                    <DialogHeader className="mb-8">
                      <DialogTitle className="text-3xl font-display">{selectedProject.title}</DialogTitle>
                      <div className="text-primary font-medium text-lg mt-2">{selectedProject.role}</div>
                    </DialogHeader>
                    
                    <div className="space-y-8">
                      <div>
                        <h5 className="text-sm uppercase tracking-wider text-muted-foreground font-semibold mb-3">Overview</h5>
                        <p className="text-foreground/90 leading-relaxed text-lg">{selectedProject.summary}</p>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 p-6 glass-card bg-white/5">
                        <div>
                          <h5 className="text-sm uppercase tracking-wider text-muted-foreground font-semibold mb-3">Model & Analysis</h5>
                          <p className="text-foreground/90 font-medium">{selectedProject.model}</p>
                          <p className="text-muted-foreground text-sm mt-2">{selectedProject.analysis}</p>
                        </div>
                        <div>
                          <h5 className="text-sm uppercase tracking-wider text-muted-foreground font-semibold mb-3">Deliverable</h5>
                          <p className="text-foreground/90 font-medium">{selectedProject.dashboard}</p>
                        </div>
                      </div>
                      
                      <div>
                        <h5 className="text-sm uppercase tracking-wider text-muted-foreground font-semibold mb-3">Technologies</h5>
                        <div className="flex flex-wrap gap-2">
                          {selectedProject.tech.map((t: string) => (
                            <span key={t} className="text-sm font-mono px-3 py-1.5 bg-white/10 rounded-lg">
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex gap-4 pt-6 border-t border-white/10">
                        {selectedProject.showGithub && selectedProject.github && (
                          <a href={selectedProject.github} target="_blank" rel="noreferrer" className="glass-cta flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 hover:bg-white/10 font-medium transition-colors">
                            <Github className="w-4 h-4" /> Source Code
                          </a>
                        )}
                        {selectedProject.showLive && selectedProject.live && (
                          <a href={selectedProject.live} target="_blank" rel="noreferrer" className="glass-cta flex items-center gap-2 px-6 py-3 rounded-full bg-primary/20 text-white font-medium hover:bg-primary/30 transition-colors">
                            <ExternalLink className="w-4 h-4" /> Live Demo
                          </a>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}

                {showSparkLabs && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                    <DialogHeader className="mb-8">
                      <DialogTitle className="text-3xl font-display flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full bg-primary shadow-[0_0_8px_rgba(100,100,255,0.8)]" />
                        {sparklabs.startup.name}
                      </DialogTitle>
                      <p className="text-muted-foreground text-xl mt-3">{sparklabs.startup.overview}</p>
                    </DialogHeader>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
                      {sparklabs.products.filter((p: any) => p.public).map((product: any) => (
                        <div key={product.name} className="glass-card p-6 bg-white/5 border-white/10">
                          <div className="flex justify-between items-start mb-4">
                            <h4 className="font-bold text-xl">{product.name}</h4>
                            <span className={`text-xs font-medium px-2 py-1 rounded-full ${product.status === 'launched' ? 'bg-primary/20 text-primary border border-primary/20' : 'bg-white/10 text-muted-foreground'}`}>
                              {product.status}
                            </span>
                          </div>
                          <p className="text-muted-foreground text-sm mb-6 min-h-[40px] leading-relaxed">{product.description}</p>
                          <div className="flex gap-3">
                            {product.showGithub && product.github && (
                              <a href={product.github} target="_blank" rel="noreferrer" className="flex-1 flex items-center justify-center gap-1.5 text-xs font-medium bg-white/10 hover:bg-white/20 py-2 rounded-lg transition-colors">
                                <Github className="w-3.5 h-3.5" /> Code
                              </a>
                            )}
                            {product.showLive && product.live && (
                              <a href={product.live} target="_blank" rel="noreferrer" className="flex-1 flex items-center justify-center gap-1.5 text-xs font-medium bg-primary/20 hover:bg-primary/30 text-white py-2 rounded-lg transition-colors">
                                <ExternalLink className="w-3.5 h-3.5" /> App
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