import { ScrollReveal } from "../ScrollReveal";
import { motion } from "framer-motion";

export function Hero({ data }: { data: any }) {
  return (
    <section id="hero" className="min-h-screen flex flex-col justify-center pt-24 relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] bg-primary/5 rounded-full blur-[100px] pointer-events-none z-[-1]" />
      
      <div className="flex flex-col items-start max-w-4xl relative z-10">
        <ScrollReveal>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-pill text-sm font-medium text-primary mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Available for new opportunities
          </div>
        </ScrollReveal>
        
        <ScrollReveal delay={0.1}>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-extrabold tracking-tight mb-6 text-balance leading-[1.05]">
            <span className="text-gradient block">{data.hero.headline.split(' ').slice(0, 2).join(' ')}</span>
            <span className="text-foreground">{data.hero.headline.split(' ').slice(2).join(' ')}</span>
          </h1>
        </ScrollReveal>
        
        <ScrollReveal delay={0.2}>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl leading-relaxed mb-10 font-medium">
            {data.hero.subheadline}
          </p>
        </ScrollReveal>
        
        <ScrollReveal delay={0.3}>
          <div className="flex flex-wrap gap-4">
            <button 
              onClick={() => window.print()}
              className="glass-cta bg-primary/20 hover:bg-primary/30 text-white px-8 py-4 rounded-full font-semibold text-lg"
            >
              {data.hero.ctas.primary}
            </button>
            <a 
              href="#projects"
              className="glass-cta bg-white/5 hover:bg-white/10 text-white px-8 py-4 rounded-full font-semibold text-lg"
            >
              {data.hero.ctas.secondary}
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}