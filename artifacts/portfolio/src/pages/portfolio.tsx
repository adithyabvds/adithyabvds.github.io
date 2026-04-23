import React, { useEffect, useState } from "react";
import { usePortfolioData } from "@/hooks/use-portfolio-data";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Experience } from "@/components/sections/Experience";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";
import { Contact } from "@/components/sections/Contact";
import { ResumePrint } from "@/components/ResumePrint";
import { Menu, X } from "lucide-react";

export default function Portfolio() {
  const { data, loading, error } = usePortfolioData();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -60% 0px" }
    );

    document.querySelectorAll("section[id]").forEach((section) => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, [loading]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center font-mono text-sm">Loading portfolio...</div>;
  }

  if (error || !data) {
    return <div className="min-h-screen flex items-center justify-center font-mono text-sm text-destructive">Error loading portfolio</div>;
  }

  const navLinks = [
    { href: "#about", label: "About" },
    { href: "#experience", label: "Experience" },
    { href: "#projects", label: "Projects" },
    { href: "#skills", label: "Skills" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <div className="min-h-screen bg-background selection:bg-primary/20">
      <ResumePrint data={data} />
      
      <div className="print-hidden">
        {/* Navigation */}
        <nav className="fixed top-0 w-full z-50 bg-white/70 dark:bg-black/70 backdrop-blur-xl border-b border-border transition-all">
          <div className="container mx-auto px-6 h-16 flex items-center justify-between max-w-5xl">
            <a href="#hero" className="font-display font-bold text-lg tracking-tight hover:text-primary transition-colors">
              {data.profile.name.split(' ')[0]}
              <span className="text-primary">.</span>
            </a>
            
            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8 text-sm font-medium">
              {navLinks.map(link => (
                <a 
                  key={link.href}
                  href={link.href} 
                  className={`transition-colors hover:text-primary ${activeSection === link.href.slice(1) ? 'text-primary' : 'text-muted-foreground'}`}
                >
                  {link.label}
                </a>
              ))}
              <button 
                onClick={() => window.print()}
                className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:opacity-90 transition-opacity"
              >
                Resume
              </button>
            </div>

            {/* Mobile Nav Toggle */}
            <button 
              className="md:hidden p-2 text-foreground"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

          {/* Mobile Nav Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden absolute top-16 left-0 w-full bg-background border-b border-border p-4 flex flex-col gap-4 shadow-lg">
              {navLinks.map(link => (
                <a 
                  key={link.href}
                  href={link.href} 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`px-4 py-2 rounded-md transition-colors ${activeSection === link.href.slice(1) ? 'bg-primary/10 text-primary' : 'hover:bg-secondary'}`}
                >
                  {link.label}
                </a>
              ))}
              <button 
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  window.print();
                }}
                className="w-full mt-2 bg-primary text-primary-foreground px-4 py-3 rounded-md hover:opacity-90 transition-opacity"
              >
                Download Resume
              </button>
            </div>
          )}
        </nav>
        
        {/* Main Content */}
        <main className="container mx-auto px-6 max-w-5xl">
          <Hero data={data} />
          <About bio={data.bio} education={data.education} />
          <Experience experience={data.experience} />
          <Projects projects={data.projects} sparklabs={data.sparklabs} />
          <Skills skills={data.skills} certs={data.certs} />
          <Contact profile={data.profile} contact={data.contact} />
        </main>

        <footer className="py-8 text-center text-sm text-muted-foreground border-t border-border mt-12">
          <p>&copy; {new Date().getFullYear()} {data.profile.name}. Designed & Built with intent.</p>
        </footer>
      </div>
    </div>
  );
}