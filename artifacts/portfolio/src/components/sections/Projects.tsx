import { ScrollReveal } from "../ScrollReveal";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Github, ExternalLink } from "lucide-react";

export function Projects({ projects, sparklabs }: { projects: any[], sparklabs: any }) {
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [showSparkLabs, setShowSparkLabs] = useState(false);

  return (
    <section id="projects" className="py-24 border-t border-border/50">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
        <ScrollReveal>
          <h2 className="text-3xl font-display font-bold sticky top-24">Selected Work</h2>
        </ScrollReveal>
        
        <div className="md:col-span-2">
          {/* SparkLabs Featured Card */}
          <ScrollReveal>
            <div 
              onClick={() => setShowSparkLabs(true)}
              className="group cursor-pointer bg-card border border-border p-8 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 mb-8"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-3 h-3 rounded-full bg-primary animate-pulse" />
                <h3 className="text-2xl font-bold">{sparklabs.startup.name}</h3>
              </div>
              <p className="text-muted-foreground text-lg mb-6">{sparklabs.startup.overview}</p>
              <div className="flex items-center text-primary font-medium group-hover:underline">
                Explore Initiative &rarr;
              </div>
            </div>
          </ScrollReveal>

          {/* Standard Projects Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {projects.filter(p => p.public).map((project, idx) => (
              <ScrollReveal key={project.id} delay={idx * 0.1}>
                <div 
                  onClick={() => setSelectedProject(project)}
                  className="group cursor-pointer h-full bg-card border border-border p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 flex flex-col"
                >
                  <h4 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{project.title}</h4>
                  <p className="text-muted-foreground mb-6 flex-grow">{project.summary}</p>
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.tech.slice(0, 3).map((t: string) => (
                      <span key={t} className="text-xs font-mono px-2 py-1 bg-secondary text-secondary-foreground rounded">
                        {t}
                      </span>
                    ))}
                    {project.tech.length > 3 && (
                      <span className="text-xs font-mono px-2 py-1 bg-secondary text-secondary-foreground rounded">
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

      {/* Standard Project Modal */}
      <Dialog open={!!selectedProject} onOpenChange={(open) => !open && setSelectedProject(null)}>
        <DialogContent className="max-w-2xl">
          {selectedProject && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl font-display">{selectedProject.title}</DialogTitle>
                <div className="text-primary font-medium">{selectedProject.role}</div>
              </DialogHeader>
              <div className="space-y-6 mt-4">
                <div>
                  <h5 className="font-bold mb-2">Overview</h5>
                  <p className="text-muted-foreground leading-relaxed">{selectedProject.summary}</p>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h5 className="font-bold mb-2">Model & Analysis</h5>
                    <p className="text-muted-foreground text-sm">{selectedProject.model}</p>
                    <p className="text-muted-foreground text-sm mt-1">{selectedProject.analysis}</p>
                  </div>
                  <div>
                    <h5 className="font-bold mb-2">Deliverable</h5>
                    <p className="text-muted-foreground text-sm">{selectedProject.dashboard}</p>
                  </div>
                </div>
                <div>
                  <h5 className="font-bold mb-3">Technologies</h5>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tech.map((t: string) => (
                      <span key={t} className="text-xs font-mono px-2 py-1 bg-secondary text-secondary-foreground rounded">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex gap-4 pt-4 border-t border-border">
                  {selectedProject.showGithub && selectedProject.github && (
                    <a href={selectedProject.github} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors">
                      <Github className="w-4 h-4" /> Source
                    </a>
                  )}
                  {selectedProject.showLive && selectedProject.live && (
                    <a href={selectedProject.live} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors">
                      <ExternalLink className="w-4 h-4" /> Live Demo
                    </a>
                  )}
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* SparkLabs Modal */}
      <Dialog open={showSparkLabs} onOpenChange={setShowSparkLabs}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-display flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-primary" />
              {sparklabs.startup.name}
            </DialogTitle>
            <p className="text-muted-foreground text-lg mt-2">{sparklabs.startup.overview}</p>
          </DialogHeader>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
            {sparklabs.products.filter((p: any) => p.public).map((product: any) => (
              <div key={product.name} className="border border-border p-6 rounded-lg bg-card">
                <div className="flex justify-between items-start mb-3">
                  <h4 className="font-bold text-lg">{product.name}</h4>
                  <span className={`text-xs px-2 py-1 rounded-full ${product.status === 'launched' ? 'bg-primary/10 text-primary' : 'bg-secondary text-secondary-foreground'}`}>
                    {product.status}
                  </span>
                </div>
                <p className="text-muted-foreground text-sm mb-4 min-h-[40px]">{product.description}</p>
                <div className="flex gap-4">
                  {product.showGithub && product.github && (
                    <a href={product.github} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-xs font-medium hover:text-primary transition-colors">
                      <Github className="w-3.5 h-3.5" /> Code
                    </a>
                  )}
                  {product.showLive && product.live && (
                    <a href={product.live} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-xs font-medium hover:text-primary transition-colors">
                      <ExternalLink className="w-3.5 h-3.5" /> App
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}