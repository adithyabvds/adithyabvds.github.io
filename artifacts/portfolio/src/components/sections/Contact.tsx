import { ScrollReveal } from "../ScrollReveal";
import { Mail, Github, Linkedin } from "lucide-react";

export function Contact({ profile, contact }: { profile: any, contact: any }) {
  return (
    <section id="contact" className="py-24 lg:py-32">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        <ScrollReveal>
          <div className="sticky top-32">
            <div className="flex items-center gap-4 mb-4">
              <div className="h-px bg-white/10 flex-grow max-w-[40px] print-hidden" />
              <span className="text-xs font-medium tracking-widest text-muted-foreground uppercase">Reach Out</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-bold">Contact</h2>
          </div>
        </ScrollReveal>
        
        <div className="md:col-span-2">
          <ScrollReveal delay={0.1}>
            <div className="glass-card p-10 md:p-14 overflow-hidden relative">
              {/* Soft glow behind the card */}
              <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-primary/20 blur-[80px] rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none" />
              
              <div className="relative z-10 text-left">
                <h3 className="text-3xl font-bold mb-6 font-display">Let's connect.</h3>
                <p className="text-lg text-muted-foreground mb-10 max-w-lg">
                  {contact.blurb}
                </p>
                
                <div className="flex flex-col sm:flex-row gap-6 mb-12">
                  <a 
                    href={`mailto:${contact.email}`}
                    className="glass-cta flex items-center justify-center gap-3 bg-primary/20 text-white px-8 py-4 font-medium"
                  >
                    <Mail className="w-5 h-5" /> Email Me
                  </a>
                  
                  <div className="flex gap-4">
                    <a href={profile.github} target="_blank" rel="noreferrer noopener" className="glass-cta flex items-center justify-center w-14 h-14 bg-white/5 text-foreground">
                      <Github className="w-6 h-6" />
                    </a>
                    <a href={profile.linkedin} target="_blank" rel="noreferrer noopener" className="glass-cta flex items-center justify-center w-14 h-14 bg-white/5 text-foreground">
                      <Linkedin className="w-6 h-6" />
                    </a>
                  </div>
                </div>
                
                <div className="inline-flex items-center gap-3 bg-white/5 px-4 py-2 rounded-full border border-white/10">
                  <div className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                  </div>
                  <span className="text-sm font-medium text-muted-foreground">{contact.availability}</span>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}