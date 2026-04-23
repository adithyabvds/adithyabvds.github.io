import { ScrollReveal } from "../ScrollReveal";

export function Hero({ data }: { data: any }) {
  return (
    <section id="hero" className="min-h-[80vh] flex flex-col justify-center pt-20">
      <ScrollReveal>
        <h1 className="text-5xl md:text-7xl font-display font-extrabold tracking-tight mb-6 text-balance leading-[1.1]">
          {data.hero.headline}
        </h1>
      </ScrollReveal>
      <ScrollReveal delay={0.1}>
        <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl leading-relaxed mb-10">
          {data.hero.subheadline}
        </p>
      </ScrollReveal>
      <ScrollReveal delay={0.2}>
        <div className="flex flex-wrap gap-4">
          <button 
            onClick={() => window.print()}
            className="bg-primary text-primary-foreground px-8 py-4 rounded-md font-medium hover:opacity-90 transition-opacity active:scale-[0.98]"
          >
            {data.hero.ctas.primary}
          </button>
          <a 
            href="#projects"
            className="bg-secondary text-secondary-foreground px-8 py-4 rounded-md font-medium hover:bg-secondary/80 transition-colors active:scale-[0.98]"
          >
            {data.hero.ctas.secondary}
          </a>
        </div>
      </ScrollReveal>
    </section>
  );
}