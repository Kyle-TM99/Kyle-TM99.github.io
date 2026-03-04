import { useState, useMemo, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Window from './Window'
import { projects, PROJECT_TYPE_LABELS } from '../../data/projects'
import './CareerStyles.css'
import './ProjectsWindow.css'

const CATEGORY_ALL = 'All'
const TYPE_ALL = 'All'

function ProjectsWindow({ onClose, onFocus, zIndex }) {
  const [categoryFilter, setCategoryFilter] = useState(CATEGORY_ALL)
  const [typeFilter, setTypeFilter] = useState(TYPE_ALL)
  const [selectedId, setSelectedId] = useState(projects[0]?.id ?? null)

  const categories = useMemo(
    () => [CATEGORY_ALL, ...new Set(projects.map(p => p.category))],
    []
  )
  const typeOptions = useMemo(
    () => [TYPE_ALL, ...Object.keys(PROJECT_TYPE_LABELS)],
    []
  )

  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      const matchCategory = categoryFilter === CATEGORY_ALL || p.category === categoryFilter
      const matchType = typeFilter === TYPE_ALL || p.projectType === typeFilter
      return matchCategory && matchType
    })
  }, [categoryFilter, typeFilter])

  const selectedProject = useMemo(
    () => filteredProjects.find((p) => p.id === selectedId) ?? filteredProjects[0],
    [filteredProjects, selectedId]
  )
  const selectedIndex = filteredProjects.findIndex((p) => p.id === selectedId)
  const hasPrev = selectedIndex > 0
  const hasNext = selectedIndex >= 0 && selectedIndex < filteredProjects.length - 1

  useEffect(() => {
    if (!filteredProjects.some((p) => p.id === selectedId)) {
      setSelectedId(filteredProjects[0]?.id ?? null)
    }
  }, [filteredProjects, selectedId])

  const goPrev = useCallback(() => {
    if (selectedIndex > 0) setSelectedId(filteredProjects[selectedIndex - 1].id)
  }, [filteredProjects, selectedIndex])
  const goNext = useCallback(() => {
    if (selectedIndex >= 0 && selectedIndex < filteredProjects.length - 1) {
      setSelectedId(filteredProjects[selectedIndex + 1].id)
    }
  }, [filteredProjects, selectedIndex])

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault()
        goPrev()
      } else if (e.key === 'ArrowRight') {
        e.preventDefault()
        goNext()
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [goPrev, goNext])

  return (
    <Window
      id="projects-window"
      title="Projects"
      icon="fa-folder-open"
      onClose={onClose}
      onFocus={onFocus}
      zIndex={zIndex}
      width="1000px"
      height="720px"
    >
      <div className="projects-app">
        <aside className="projects-sidebar">
          <div className="projects-filters">
            <div className="filter-group">
              <label className="filter-label">카테고리</label>
              <div className="filter-chips">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    className={`filter-chip ${categoryFilter === cat ? 'active' : ''}`}
                    onClick={() => setCategoryFilter(cat)}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
            <div className="filter-group">
              <label className="filter-label">유형</label>
              <div className="filter-chips">
                {typeOptions.map((type) => (
                  <button
                    key={type}
                    type="button"
                    className={`filter-chip filter-chip--small ${typeFilter === type ? 'active' : ''}`}
                    onClick={() => setTypeFilter(type)}
                  >
                    {type === TYPE_ALL ? '전체' : PROJECT_TYPE_LABELS[type]}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <nav className="projects-nav" aria-label="프로젝트 목록">
            {filteredProjects.length === 0 ? (
              <p className="projects-empty">조건에 맞는 프로젝트가 없습니다.</p>
            ) : (
              filteredProjects.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  className={`projects-nav-item ${selectedId === p.id ? 'active' : ''}`}
                  onClick={() => setSelectedId(p.id)}
                  style={{ '--accent': p.color }}
                >
                  <span className="projects-nav-title">{p.title}</span>
                  <span className="projects-nav-meta">{p.category} · {PROJECT_TYPE_LABELS[p.projectType] ?? p.projectType}</span>
                </button>
              ))
            )}
          </nav>
        </aside>

        <main className="projects-detail">
          {selectedProject ? (
            <AnimatePresence mode="wait">
              <motion.article
                key={selectedProject.id}
                className="project-detail-card"
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                transition={{ duration: 0.2 }}
                style={{ '--project-color': selectedProject.color }}
              >
                <header className="project-detail-header">
                  <div className="project-detail-badges">
                    <span className="project-detail-category">{selectedProject.category}</span>
                    {selectedProject.projectType && (
                      <span className="project-detail-type">
                        {PROJECT_TYPE_LABELS[selectedProject.projectType]}
                      </span>
                    )}
                  </div>
                  <h1 className="project-detail-title">{selectedProject.title}</h1>
                  <div className="project-detail-meta">
                    <span><i className="fas fa-user-tag" aria-hidden /> {selectedProject.role}</span>
                    <span><i className="far fa-calendar-alt" aria-hidden /> {selectedProject.period}</span>
                  </div>
                </header>

                <div className="project-detail-body">
                  <p className="project-detail-lead">{selectedProject.desc}</p>

                  {selectedProject.overview && (
                    <section className="project-detail-section">
                      <h2 className="project-detail-section-title">어떤 프로젝트인지</h2>
                      <p className="project-detail-overview">{selectedProject.overview}</p>
                    </section>
                  )}

                  {selectedProject.developed?.length > 0 && (
                    <section className="project-detail-section">
                      <h2 className="project-detail-section-title">개발한 것</h2>
                      <ul className="project-detail-list">
                        {selectedProject.developed.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    </section>
                  )}

                  {selectedProject.learnings?.length > 0 && (
                    <section className="project-detail-section">
                      <h2 className="project-detail-section-title">배운점</h2>
                      <ul className="project-detail-list">
                        {selectedProject.learnings.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    </section>
                  )}

                  {selectedProject.results?.length > 0 && (
                    <section className="project-detail-section">
                      <h2 className="project-detail-section-title">성과</h2>
                      <ul className="project-detail-list project-detail-list--results">
                        {selectedProject.results.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    </section>
                  )}

                  <section className="project-detail-section">
                    <h2 className="project-detail-section-title">주요 기능</h2>
                    <div className="project-detail-tags">
                      {selectedProject.features.map((f, i) => (
                        <span key={i} className="project-detail-tag">{f}</span>
                      ))}
                    </div>
                  </section>

                  <section className="project-detail-section">
                    <h2 className="project-detail-section-title">기술 스택</h2>
                    <div className="project-detail-tech">
                      {selectedProject.tech.map((t, i) => (
                        <span key={i}>{t}</span>
                      ))}
                    </div>
                  </section>
                </div>

                <footer className="project-detail-footer">
                  <button
                    type="button"
                    className="project-nav-btn"
                    onClick={goPrev}
                    disabled={!hasPrev}
                    aria-label="이전 프로젝트"
                  >
                    <i className="fas fa-chevron-left" />
                    이전
                  </button>
                  <span className="project-nav-counter">
                    {selectedIndex + 1} / {filteredProjects.length}
                  </span>
                  <button
                    type="button"
                    className="project-nav-btn"
                    onClick={goNext}
                    disabled={!hasNext}
                    aria-label="다음 프로젝트"
                  >
                    다음
                    <i className="fas fa-chevron-right" />
                  </button>
                </footer>
              </motion.article>
            </AnimatePresence>
          ) : (
            <div className="projects-detail-empty">
              <p>프로젝트를 선택하거나 필터를 조정해 주세요.</p>
            </div>
          )}
        </main>
      </div>
    </Window>
  )
}

export default ProjectsWindow
