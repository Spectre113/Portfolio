import {
  Accessibility,
  ArrowRight,
  Bot,
  Braces,
  GitBranch,
  Layers3,
  MonitorSmartphone,
  Server,
  Sparkles,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { GitHubIcon } from '../../shared/ui/BrandIcon/BrandIcon.tsx';
import './SkillsSection.css';

type SkillIcon =
  | 'react'
  | 'typescript'
  | 'javascript'
  | 'vite'
  | 'zod'
  | 'sass'
  | 'rest'
  | 'responsive'
  | 'accessibility'
  | 'git'
  | 'github'
  | 'ai';

type Skill = {
  icon: SkillIcon;
  label: string;
};

const skills: Skill[] = [
  { icon: 'react', label: 'React' },
  { icon: 'typescript', label: 'TypeScript' },
  { icon: 'javascript', label: 'JavaScript' },
  { icon: 'vite', label: 'Vite' },
  { icon: 'zod', label: 'Zod' },
  { icon: 'sass', label: 'SCSS / Sass' },
  { icon: 'rest', label: 'REST API' },
  { icon: 'responsive', label: 'Responsive UI' },
  { icon: 'accessibility', label: 'Accessibility' },
  { icon: 'git', label: 'Git' },
  { icon: 'github', label: 'GitHub' },
  { icon: 'ai', label: 'AI-assisted workflow' },
];

export function SkillsSection() {
  return (
    <section className="container skills-section">
      <header className="skills-section__header">
        <div className="skills-section__title-group">
          <span className="skills-section__icon" aria-hidden="true">
            <Layers3 size={22} strokeWidth={2.2} />
          </span>
          <h2 className="skills-section__title">Технологии и инструменты</h2>
        </div>

        <Link className="skills-section__link" to="/skills">
          Все навыки
          <ArrowRight size={18} strokeWidth={2.2} aria-hidden="true" />
        </Link>
      </header>

      <ul className="skills-section__grid list-reset">
        {skills.map((skill) => (
          <li className="skills-section__item" key={skill.label}>
            <SkillIcon icon={skill.icon} />
            <span>{skill.label}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

function SkillIcon({ icon }: { icon: SkillIcon }) {
  if (icon === 'github') {
    return (
      <span className="skills-section__brand skills-section__brand--github">
        <GitHubIcon />
      </span>
    );
  }

  if (icon === 'rest') {
    return (
      <span className="skills-section__brand skills-section__brand--rest">
        <Server size={24} strokeWidth={2.1} />
      </span>
    );
  }

  if (icon === 'responsive') {
    return (
      <span className="skills-section__brand skills-section__brand--responsive">
        <MonitorSmartphone size={24} strokeWidth={2.1} />
      </span>
    );
  }

  if (icon === 'accessibility') {
    return (
      <span className="skills-section__brand skills-section__brand--accessibility">
        <Accessibility size={25} strokeWidth={2.1} />
      </span>
    );
  }

  if (icon === 'git') {
    return (
      <span className="skills-section__brand skills-section__brand--git">
        <GitBranch size={24} strokeWidth={2.2} />
      </span>
    );
  }

  if (icon === 'ai') {
    return (
      <span className="skills-section__brand skills-section__brand--ai">
        <Bot size={24} strokeWidth={2.1} />
      </span>
    );
  }

  if (icon === 'react') {
    return (
      <span className="skills-section__brand skills-section__brand--react">
        <Sparkles size={24} strokeWidth={2.1} />
      </span>
    );
  }

  if (icon === 'sass') {
    return (
      <span className="skills-section__brand skills-section__brand--sass">
        <Braces size={24} strokeWidth={2.1} />
      </span>
    );
  }

  return (
    <span className={`skills-section__brand skills-section__brand--${icon}`}>
      {getShortLabel(icon)}
    </span>
  );
}

function getShortLabel(icon: SkillIcon) {
  const labels: Partial<Record<SkillIcon, string>> = {
    javascript: 'JS',
    typescript: 'TS',
    vite: 'V',
    zod: 'Z',
  };

  return labels[icon];
}
