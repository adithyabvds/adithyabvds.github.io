import { ScrollReveal } from "../ScrollReveal";
import { Mail, Github, Linkedin } from "lucide-react";

export function Contact({ profile, contact }: { profile: any, contact: any }) {
  return (
    <section id="contact" className="py-24 border-t border-border/50">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        <ScrollReveal>
          <h2 className="text-3xl font-display font-bold sticky top-24">Contact</h2>
        </ScrollReveal>
        
        <div className="md:col-span-2">
          <ScrollReveal>
            <div className="bg-primary/5 rounded-2xl p-8 md:p-12 border border-primary/10">
              <h3 className="text-2xl font-bold mb-4">Let's connect.</h3>
              <p className="text-lg text-muted-foreground mb-8 max-w-lg leading-relaxed">
                {contact.blurb}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6">
                <a 
                  href={`mailto:${contact.email}`}
                  className="flex items-center justify-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-md font-medium hover:opacity-90 transition-opacity"
                >
                  <Mail className="w-4 h-4" /> Email Me
                </a>
                
                <div className="flex gap-4">
                  <a href={profile.github} target="_blank" rel="noreferrer" className="flex items-center justify-center w-12 h-12 bg-card border border-border rounded-md hover:border-primary text-foreground hover:text-primary transition-colors">
                    <Github className="w-5 h-5" />
                  </a>
                  <a href={profile.linkedin} target="_blank" rel="noreferrer" className="flex items-center justify-center w-12 h-12 bg-card border border-border rounded-md hover:border-primary text-foreground hover:text-primary transition-colors">
                    <Linkedin className="w-5 h-5" />
                  </a>
                </div>
              </div>
              
              <div className="mt-8 text-sm font-medium flex items-center gap-2 text-primary">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                {contact.availability}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}