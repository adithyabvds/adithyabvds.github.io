import { MapPin, Mail, Github, Linkedin, Globe } from "lucide-react";

export function ResumePrint({ data }: { data: any }) {
  const { profile, bio, education, experience, projects, skills, certs } = data;

  return (
    <div className="hidden print-visible bg-white text-black p-8 max-w-[210mm] mx-auto min-h-[297mm] print:p-0">
      
      {/* Header */}
      <header className="text-center mb-6 pb-6 border-b border-gray-300">
        <h1 className="text-4xl font-display font-extrabold tracking-tight mb-2 text-black">{profile.name}</h1>
        <div className="text-lg font-medium text-gray-700 mb-4">{profile.role}</div>
        
        <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
          <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {profile.location}</span>
          <span className="flex items-center gap-1"><Mail className="w-3.5 h-3.5" /> {profile.email}</span>
          {profile.github && <span className="flex items-center gap-1"><Github className="w-3.5 h-3.5" /> {profile.github.replace('https://', '')}</span>}
          {profile.linkedin && <span className="flex items-center gap-1"><Linkedin className="w-3.5 h-3.5" /> {profile.linkedin.replace('https://', '')}</span>}
          {profile.website && <span className="flex items-center gap-1"><Globe className="w-3.5 h-3.5" /> {profile.website.replace('https://', '')}</span>}
        </div>
      </header>

      {/* Summary */}
      <section className="mb-6 print-avoid-break">
        <p className="text-sm leading-relaxed text-gray-800">{bio.summary}</p>
      </section>

      {/* Education */}
      <section className="mb-6 print-avoid-break">
        <h2 className="text-lg font-bold border-b border-gray-200 pb-1 mb-3 uppercase tracking-wider text-black">Education</h2>
        <div className="space-y-3">
          {education.map((edu: any, idx: number) => (
            <div key={idx} className="flex justify-between items-baseline">
              <div>
                <div className="font-bold text-black">{edu.degree}</div>
                <div className="text-sm text-gray-700">{edu.institution}, {edu.location}</div>
              </div>
              <div className="text-sm text-gray-600 font-mono text-right">
                <div>{edu.start} — {edu.end}</div>
                {edu.gpa && <div>GPA: {edu.gpa}</div>}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Skills */}
      <section className="mb-6 print-avoid-break">
        <h2 className="text-lg font-bold border-b border-gray-200 pb-1 mb-3 uppercase tracking-wider text-black">Technical Skills</h2>
        <div className="grid grid-cols-1 gap-2 text-sm">
          <div><span className="font-bold text-black">Programming:</span> <span className="text-gray-800">{skills.programming.join(", ")}</span></div>
          <div><span className="font-bold text-black">Tools & Infra:</span> <span className="text-gray-800">{skills.tools.join(", ")}</span></div>
          <div><span className="font-bold text-black">Core Methods:</span> <span className="text-gray-800">{skills.core.join(", ")}</span></div>
          <div><span className="font-bold text-black">Advanced:</span> <span className="text-gray-800">{skills.advanced.join(", ")}</span></div>
        </div>
      </section>

      {/* Experience */}
      <section className="mb-6">
        <h2 className="text-lg font-bold border-b border-gray-200 pb-1 mb-3 uppercase tracking-wider text-black">Experience</h2>
        <div className="space-y-4">
          {experience.map((job: any, idx: number) => (
            <div key={idx} className="print-avoid-break">
              <div className="flex justify-between items-baseline mb-1">
                <div className="font-bold text-black">{job.role}</div>
                <div className="text-sm font-mono text-gray-600">{job.start} — {job.end}</div>
              </div>
              <div className="text-sm italic text-gray-700 mb-2">{job.company}, {job.location}</div>
              <ul className="list-disc list-outside pl-4 text-sm space-y-1 text-gray-800">
                {job.bullets.map((bullet: string, bIdx: number) => (
                  <li key={bIdx}>{bullet}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Projects */}
      <section className="mb-6">
        <h2 className="text-lg font-bold border-b border-gray-200 pb-1 mb-3 uppercase tracking-wider text-black">Technical Projects</h2>
        <div className="space-y-3">
          {projects.filter((p: any) => p.public).map((project: any, idx: number) => (
            <div key={idx} className="print-avoid-break">
              <div className="font-bold text-black flex items-baseline gap-2">
                {project.title}
                <span className="text-xs font-normal text-gray-600 italic">| {project.role}</span>
              </div>
              <ul className="list-disc list-outside pl-4 text-sm mt-1 space-y-0.5 text-gray-800">
                <li><span className="font-medium text-black">Model:</span> {project.model}</li>
                <li><span className="font-medium text-black">Analysis:</span> {project.analysis}</li>
                {project.dashboard && <li><span className="font-medium text-black">Dashboard:</span> {project.dashboard}</li>}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Certifications */}
      {certs && certs.length > 0 && (
        <section className="print-avoid-break">
          <h2 className="text-lg font-bold border-b border-gray-200 pb-1 mb-3 uppercase tracking-wider text-black">Certifications</h2>
          <div className="space-y-1 text-sm text-gray-800">
            {certs.map((cert: any, idx: number) => (
              <div key={idx} className="flex justify-between">
                <span><span className="font-medium text-black">{cert.name}</span> — {cert.issuer}</span>
                <span className="font-mono text-gray-600">{cert.year}</span>
              </div>
            ))}
          </div>
        </section>
      )}
      
    </div>
  );
}