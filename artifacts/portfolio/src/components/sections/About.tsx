import { ScrollReveal } from "../ScrollReveal";

export function About({ bio, education }: { bio: any, education: any[] }) {
  return (
    <section id="about" className="py-24 border-t border-border/50">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        <ScrollReveal>
          <h2 className="text-3xl font-display font-bold sticky top-24">About</h2>
        </ScrollReveal>
        
        <div className="md:col-span-2 space-y-12">
          <ScrollReveal>
            <div className="prose prose-lg dark:prose-invert">
              <p className="text-lg leading-relaxed text-muted-foreground">
                {bio.longBio}
              </p>
            </div>
          </ScrollReveal>

          <div className="space-y-6">
            <ScrollReveal>
              <h3 className="text-xl font-display font-bold">Education</h3>
            </ScrollReveal>
            <div className="space-y-8">
              {education.map((edu, idx) => (
                <ScrollReveal key={idx} delay={idx * 0.1}>
                  <div className="group relative pl-4 border-l-2 border-border hover:border-primary transition-colors">
                    <h4 className="font-bold text-lg">{edu.degree}</h4>
                    <div className="text-muted-foreground">{edu.institution} &middot; {edu.location}</div>
                    <div className="text-sm text-muted-foreground mt-1">{edu.start} — {edu.end}</div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}