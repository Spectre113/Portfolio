import { useEffect, useRef } from 'react';
import { ExternalLink, FolderGit2, GitBranch, GitCommit } from 'lucide-react';
import { useProjects } from '../../entities/project/hooks/useProjects.ts';
import avitoCover from '../../assets/Avito-test.png';
import marusyaCover from '../../assets/Marusya.png';
import portfolioCover from '../../assets/Portfolio.png';
import travelForgeCover from '../../assets/TravelForge.png';
import vkTestCover from '../../assets/VK-test.png';
import wWaveCover from '../../assets/W-wave.png';
import './ProjectsSection.css';

const projectCovers: Record<string, string> = {
  'avito-task': avitoCover,
  portfolio: portfolioCover,
  travelforge: travelForgeCover,
  'vk-marusya': marusyaCover,
  'vk-test': vkTestCover,
  'w-wave': wWaveCover,
};

function formatCommitDate(date: string) {
  if (!date) {
    return 'Дата коммита недоступна';
  }

  return new Intl.DateTimeFormat('ru-RU', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date(date));
}

export function ProjectsSection() {
  const { data: projects = [], isError, isLoading } = useProjects();
  const carouselOffsetRef = useRef(0);
  const isCarouselPausedRef = useRef(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const carouselProjects = [...projects, ...projects, ...projects];

  useEffect(() => {
    const viewport = viewportRef.current;

    if (!viewport || projects.length === 0) {
      return;
    }

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    const track = trackRef.current;

    if (!track) {
      return;
    }

    const getLoopWidth = () => track.scrollWidth / 3;

    const renderCarouselPosition = () => {
      track.style.transform = `translate3d(${-carouselOffsetRef.current}px, 0, 0)`;
    };

    const initializeScrollPosition = () => {
      const loopWidth = getLoopWidth();

      if (loopWidth > 0) {
        carouselOffsetRef.current = loopWidth;
        renderCarouselPosition();
      }
    };

    const normalizeScrollPosition = () => {
      const loopWidth = getLoopWidth();

      if (loopWidth === 0) {
        return;
      }

      while (carouselOffsetRef.current <= loopWidth * 0.5) {
        carouselOffsetRef.current += loopWidth;
      }

      while (carouselOffsetRef.current >= loopWidth * 1.5) {
        carouselOffsetRef.current -= loopWidth;
      }

      renderCarouselPosition();
    };

    initializeScrollPosition();
    window.requestAnimationFrame(initializeScrollPosition);

    const handleWheel = (event: WheelEvent) => {
      if (Math.abs(event.deltaX) > Math.abs(event.deltaY)) {
        return;
      }

      event.preventDefault();

      carouselOffsetRef.current += event.deltaY;
      normalizeScrollPosition();
    };

    const handlePointerEnter = () => {
      isCarouselPausedRef.current = true;
    };

    const handlePointerLeave = () => {
      isCarouselPausedRef.current = false;
    };

    viewport.addEventListener('wheel', handleWheel, { passive: false });
    viewport.addEventListener('pointerenter', handlePointerEnter);
    viewport.addEventListener('pointerleave', handlePointerLeave);

    let animationFrameId = 0;
    let lastFrameTime = 0;

    const animateCarousel = (timestamp: number) => {
      if (!lastFrameTime) {
        lastFrameTime = timestamp;
      }

      const deltaTime = timestamp - lastFrameTime;
      lastFrameTime = timestamp;

      if (!isCarouselPausedRef.current && !prefersReducedMotion) {
        carouselOffsetRef.current += deltaTime * 0.055;
        normalizeScrollPosition();
      }

      animationFrameId = window.requestAnimationFrame(animateCarousel);
    };

    animationFrameId = window.requestAnimationFrame(animateCarousel);

    return () => {
      viewport.removeEventListener('wheel', handleWheel);
      viewport.removeEventListener('pointerenter', handlePointerEnter);
      viewport.removeEventListener('pointerleave', handlePointerLeave);
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [projects.length]);

  return (
    <section className="container projects-section" id="projects">
      <div className="projects-section__heading">
        <div className="projects-section__title-group">
          <span className="projects-section__icon" aria-hidden="true">
            <FolderGit2 size={22} strokeWidth={2.1} />
          </span>
          <h2 className="projects-section__title">Проекты</h2>
        </div>

        <a className="projects-section__all-link" href="/projects">
          Подробнее о проектах
          <ExternalLink size={17} strokeWidth={2.2} aria-hidden="true" />
        </a>
      </div>

      {isLoading && (
        <p className="projects-section__state">Загружаю проекты из GitHub...</p>
      )}

      {isError && (
        <p className="projects-section__state">
          GitHub сейчас не ответил, показываю локальные данные проектов.
        </p>
      )}

      <div className="projects-section__viewport" ref={viewportRef}>
        <div className="projects-section__track" ref={trackRef}>
          {carouselProjects.map((project, index) => (
            <article
              className="project-card"
              key={`${project.slug}-${index}`}
              aria-hidden={
                index < projects.length || index >= projects.length * 2
              }
            >
              <div className="project-card__cover-wrap">
                <img
                  className="project-card__cover"
                  src={projectCovers[project.slug]}
                  alt={`Превью проекта ${project.title}`}
                  loading="lazy"
                />
              </div>

              <div className="project-card__body">
                <h3 className="project-card__title">{project.title}</h3>
                <p className="project-card__description">
                  {project.description}
                </p>

                <ul className="project-card__stack list-reset">
                  {project.stack.map((technology) => (
                    <li className="project-card__tag" key={technology}>
                      {technology}
                    </li>
                  ))}
                </ul>

                <p className="project-card__meta">
                  <GitCommit size={16} strokeWidth={2.1} aria-hidden="true" />
                  Последний коммит: {formatCommitDate(project.pushedAt)}
                </p>

                <div className="project-card__actions">
                  <a
                    className="project-card__action"
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <GitBranch size={17} strokeWidth={2.1} aria-hidden="true" />
                    GitHub
                  </a>

                  {project.demoUrl ? (
                    <a
                      className="project-card__action project-card__action--primary"
                      href={project.demoUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <ExternalLink
                        size={17}
                        strokeWidth={2.1}
                        aria-hidden="true"
                      />
                      Demo
                    </a>
                  ) : (
                    <span className="project-card__status">
                      {project.demoStatus ?? 'В разработке'}
                    </span>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
