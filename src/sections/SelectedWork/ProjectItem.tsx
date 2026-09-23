import type { Project } from '../../data/content'

interface ProjectItemProps {
  project: Project
  index: number
  onItemFocus?: (el: HTMLElement) => void
}

export default function ProjectItem({ project, index, onItemFocus }: ProjectItemProps) {
  const isPortrait = project.aspect === 'portrait'
  const isEager = index < 2

  return (
    <a
      href={project.href}
      aria-label={`${project.title}, ${project.category}, ${project.year}`}
      className={`project-card ${isPortrait ? 'is-portrait' : 'is-landscape'}`}
      onFocus={(e) => {
        onItemFocus?.(e.currentTarget)
      }}
    >
      <div className="project-image-box">
        <img
          src={project.image.src}
          alt={project.image.alt}
          loading={isEager ? 'eager' : 'lazy'}
          decoding="async"
          width={isPortrait ? 480 : 600}
          height={isPortrait ? 660 : 400}
          className="project-image"
        />
      </div>

      <div className="project-info-row" aria-hidden="true">
        <span className="project-info-meta">
          {project.year} — {project.city.toUpperCase()}
        </span>
        <span className="project-info-title">
          {project.title.toUpperCase()}{' '}
          <span className="project-arrow">→</span>
        </span>
      </div>
    </a>
  )
}
