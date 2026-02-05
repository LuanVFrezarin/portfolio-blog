import { Github, Linkedin, Twitter, Mail, MapPin, Briefcase, GraduationCap, Award } from "lucide-react";
import { author } from "@/data/author";
import { SOCIAL_LINKS } from "@/lib/constants";

export const metadata = {
  title: "Sobre | BlogDev",
  description: "Conhea Luan Frezarin, desenvolvedor Full Stack e Mobile apaixonado por tecnologia.",
};

export default function SobrePage() {
  const skills = [
    { category: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "HTML/CSS"] },
    { category: "Mobile", items: ["React Native", "Flutter", "Expo", "Dart"] },
    { category: "Backend", items: ["Node.js", "Express", "NestJS", "PostgreSQL", "MongoDB"] },
    { category: "DevOps", items: ["Docker", "GitHub Actions", "Vercel", "AWS", "Linux"] },
    { category: "Ferramentas", items: ["Git", "VS Code", "Figma", "Jest", "Postman"] },
  ];

  const timeline = [
  {
      year: "2026",
      title: "3 Semestre de Analise e Desenvolvimento de Sistemas",
      description: "Criei meu primeiro aplicativo, fiz deploy, subi na Apple Store e Play Store. Liderando projetos web e mobile com React, Next.js e React Native. Foco em arquitetura.",
      icon: Briefcase,
    },
  {
      year: "2025",
      title: "Inicio da faculdade de Analise e Desenvolvimento de Sistemas",
      description: "Entrando em transição de carreira do EB para Desenvolvedor",
      icon: Briefcase,
    },
    {
      year: "2024",
      title: "Curso para cabo no Exército Brasileiro",
      description: "Curso para Cabo do Exército Brasileiro. Concluído com sucesso, adquirindo habilidades de liderança, disciplina e trabalho em equipe. Preparação para transição de carreira para desenvolvimento de software.",
      icon: Briefcase,
    },
    {
      year: "2023",
      title: "Segui como soldado no Exército Brasileiro",
      description: "Desenvolvimento de aplicativos multiplataforma com React Native e Flutter para startups.",
      icon: Briefcase,
    },
    {
      year: "2022",
      title: "Soldado no Exército Brasileiro",
      description: "Criacao de interfaces modernas e responsivas com React e TypeScript.",
      icon: Briefcase,
    },
    {
      year: "2021",
      title: "Inicio no exército",
      description: "",
      icon: GraduationCap,
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900 py-20">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-start gap-8">
            <img
              src={author.avatar}
              alt={author.name}
              className="w-32 h-32 rounded-2xl shadow-lg"
            />
            <div>
              <h1 className="text-4xl font-black text-slate-900 dark:text-white">{author.name}</h1>
              <p className="text-lg text-blue-600 dark:text-blue-400 font-medium mt-1">
                {author.role}
              </p>
              <p className="text-slate-600 dark:text-slate-400 mt-4 leading-relaxed max-w-xl">
                {author.bio}
              </p>
              <div className="flex items-center gap-2 mt-3 text-sm text-slate-500 dark:text-slate-400">
                <MapPin className="w-4 h-4" /> São Paulo -Brasil
              </div>

              {/* Social Links */}
              <div className="flex items-center gap-3 mt-6">
                <a
                  href={SOCIAL_LINKS.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-sm font-medium hover:opacity-90 transition-opacity"
                >
                  <Github className="w-4 h-4" /> GitHub
                </a>
                <a
                  href={SOCIAL_LINKS.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors"
                >
                  <Linkedin className="w-4 h-4" /> LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className="max-w-4xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-8 flex items-center gap-2">
          <Award className="w-6 h-6 text-blue-600" /> Habilidades tecnicas
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((skill) => (
            <div
              key={skill.category}
              className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800"
            >
              <h3 className="font-bold text-slate-900 dark:text-white mb-3">{skill.category}</h3>
              <div className="flex flex-wrap gap-2">
                {skill.items.map((item) => (
                  <span
                    key={item}
                    className="px-3 py-1 rounded-full text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-slate-50 dark:bg-slate-900/50 py-16">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-8 flex items-center gap-2">
            <Briefcase className="w-6 h-6 text-blue-600" /> Trajetoria
          </h2>
          <div className="space-y-8">
            {timeline.map((item, i) => (
              <div key={i} className="flex gap-6">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  {i < timeline.length - 1 && (
                    <div className="w-px h-full bg-slate-200 dark:bg-slate-700 mt-2" />
                  )}
                </div>
                <div className="pb-8">
                  <span className="text-sm font-bold text-blue-600 dark:text-blue-400">{item.year}</span>
                  <h3 className="font-bold text-slate-900 dark:text-white mt-1">{item.title}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-black text-slate-900 dark:text-white">
          Vamos trabalhar juntos?
        </h2>
        <p className="text-slate-600 dark:text-slate-400 mt-2 max-w-md mx-auto">
          Estou sempre aberto a novos projetos e oportunidades. Entre em contato!
        </p>
        <a
          href="/contato"
          className="inline-flex items-center gap-2 mt-6 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors"
        >
          <Mail className="w-4 h-4" /> Entrar em contato
        </a>
      </section>
    </div>
  );
}
