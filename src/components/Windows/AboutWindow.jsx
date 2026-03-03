import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Window from './Window'
import { TABS, CAREER_DATA, SKILLS_CATEGORIES, PROJECTS_GALLERY } from './aboutData'
import './AboutWindow.css'

const TYPEWRITER_PHRASE = '처음부터 끝까지, 제가 직접 만듭니다.'
const TYPEWRITER_SPEED = 80

function useTypewriter(text, speed, enabled = true) {
  const [display, setDisplay] = useState('')
  const [done, setDone] = useState(false)
  useEffect(() => {
    if (!enabled) {
      setDisplay(text)
      setDone(true)
      return
    }
    setDisplay('')
    setDone(false)
    let i = 0
    const t = setInterval(() => {
      if (i >= text.length) {
        clearInterval(t)
        setDone(true)
        return
      }
      setDisplay(text.slice(0, i + 1))
      i += 1
    }, speed)
    return () => clearInterval(t)
  }, [text, speed, enabled])
  return { display, done }
}

function AboutWindow({ onClose, onFocus, zIndex }) {
  const [activeTab, setActiveTab] = useState('profile')

  return (
    <Window
      id="about-window"
      title="About Me"
      icon="fa-user-circle"
      onClose={onClose}
      onFocus={onFocus}
      zIndex={zIndex}
      width="900px"
      height="650px"
      minWidth="400px"
      minHeight="400px"
    >
      <div className="about-container">
        <div className="about-sidebar">
          {TABS.map(tab => (
            <button
              key={tab.id}
              className={`sidebar-btn ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
              type="button"
              aria-pressed={activeTab === tab.id}
            >
              <i className={`fas ${tab.icon}`} aria-hidden></i>
              {tab.label}
            </button>
          ))}
        </div>

        <div className="about-main">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {activeTab === 'profile' && <ProfileTab />}
              {activeTab === 'career' && <CareerTab />}
              {activeTab === 'skills' && <SkillsTab />}
              {activeTab === 'projects' && <ProjectsTab />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </Window>
  )
}

function ProfileTab() {
  const { display, done } = useTypewriter(TYPEWRITER_PHRASE, TYPEWRITER_SPEED)

  return (
    <div className="tab-content">
      <div className="profile-header">
        <div className="profile-avatar-container">
          <img
            src="/taemin.jpg"
            alt="Profile picture of Tae-min Kim (Kyle Kim)"
            className="profile-avatar"
          />
          <div className="online-status">
            <div className="status-dot"></div>
            <span>Online</span>
          </div>
        </div>
        <div className="profile-info">
          <h1>Kyle Kim (김태민)</h1>
          <div className="profile-role">
            <i className="fas fa-terminal" aria-hidden></i>
            <span>Full-stack Developer</span>
          </div>
          <div className="contact-chips">
            <a href="mailto:rlaxoals9977@gmail.com" className="chip chip-link" target="_blank" rel="noopener noreferrer">
              <i className="fas fa-envelope" aria-hidden></i> rlaxoals9977@gmail.com
            </a>
            <a href="https://github.com/Kyle-TM99" className="chip chip-link" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-github" aria-hidden></i> github.com/Kyle-TM99
            </a>
            <div className="chip">
              <i className="fas fa-map-marker-alt" aria-hidden></i> Seoul, Korea
            </div>
          </div>
        </div>
      </div>

      <div className="section-title"><i className="fas fa-quote-left" aria-hidden></i> Summary</div>
      <div className="summary-card">
        <p style={{ lineHeight: '1.6', color: 'rgba(255,255,255,0.85)' }}>
          <span className="typewriter-quote">"{display}{!done && <span className="cursor-blink">|</span>}"</span>
          <br /><br />
          <strong>1년 차 풀스택 개발자</strong>로서 기획부터 배포까지 전체 프로세스를 독립적으로 수행하는 <strong>End-to-End 개발 역량</strong>을 보유하고 있습니다.
          아이디어와 상상을 현실의 프로덕트로 만들어내는 실행력을 바탕으로, 현재 <strong>베오(BEO)</strong>에서 Education PM 겸 1인 풀스택 개발자로 SaaS 플랫폼을 단독 개발 및 운영하고 있습니다.
        </p>
      </div>

      <div className="section-title"><i className="fas fa-star" aria-hidden></i> Core Values</div>
      <div className="skills-grid">
        <div className="skill-category">
          <h3>End-to-End</h3>
          <p style={{ fontSize: '13px', color: '#ccc' }}>기획, 디자인, 개발, 배포, 운영까지 혼자서 완결 가능한 실행력</p>
        </div>
        <div className="skill-category">
          <h3>Business Impact</h3>
          <p style={{ fontSize: '13px', color: '#ccc' }}>단순 구현이 아닌, 비즈니스 성과(가입율, 효율)를 만들어내는 개발</p>
        </div>
      </div>
    </div>
  )
}

function CareerTab() {
  const [selectedCompany, setSelectedCompany] = useState(null)

  const detailsTransition = {
    type: 'tween',
    duration: 0.35,
    ease: [0.32, 0.72, 0, 1]
  }

  return (
    <div className="tab-content career-content">
      <div className="section-title"><i className="fas fa-film" aria-hidden></i> Career Journey</div>
      <div className="career-grid">
        {CAREER_DATA.map(company => (
          <motion.div
            key={company.id}
            className={`company-card ${selectedCompany === company.id ? 'expanded' : ''}`}
            onClick={() => setSelectedCompany(selectedCompany === company.id ? null : company.id)}
            style={{ '--accent-color': company.color }}
            whileHover={selectedCompany !== company.id ? { boxShadow: `0 0 24px ${company.color}40` } : undefined}
            initial={false}
            transition={{ type: 'tween', duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
          >
            <div className="company-header">
              <div className="company-logo-wrapper">
                <i className={company.logo} aria-hidden></i>
              </div>
              <div className="company-info">
                <h2>{company.name}</h2>
                <span className="company-period">{company.period}</span>
              </div>
              <motion.div
                className="company-toggle-icon"
                animate={{ rotate: selectedCompany === company.id ? 180 : 0 }}
                transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
              >
                <i className="fas fa-chevron-down" aria-hidden></i>
              </motion.div>
            </div>

            <div className="company-role-badge">
              {company.role}
            </div>

            <AnimatePresence initial={false} mode="wait">
              {selectedCompany === company.id ? (
                <motion.div
                  key={`details-${company.id}`}
                  className="company-details-wrapper"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={detailsTransition}
                  style={{ overflow: 'hidden' }}
                >
                  <div className="company-details">
                    <div className="identity-section">
                      <div className="identity-label">MY ROLE AS</div>
                      <div className="identity-title">"{company.identity}"</div>
                      <p className="identity-desc">{company.identityDesc}</p>
                    </div>

                    <div className="impact-stats">
                      {company.stats.map((stat, idx) => (
                        <div key={idx} className="stat-box">
                          <div className="stat-value" style={{ color: company.color }}>{stat.value}</div>
                          <div className="stat-label">{stat.label}</div>
                        </div>
                      ))}
                    </div>

                    <div className="projects-showcase">
                      <h3>Key Projects</h3>
                      <div className="company-projects-list">
                        {company.projects.map((project, pIdx) => (
                          <div key={pIdx} className="mini-project-card">
                            <div className="mini-project-header">
                              <span className="project-type">{project.type}</span>
                              <h4>{project.title}</h4>
                            </div>
                            <p>{project.desc}</p>
                            <div className="mini-tech-stack">
                              {project.tech.map((t, i) => <span key={i}>{t}</span>)}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.p
                  key={`summary-${company.id}`}
                  className="company-summary"
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{
                    opacity: { duration: 0.22 },
                    y: { duration: 0.22 }
                  }}
                >
                  {company.summary}
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

const skillsContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.04, delayChildren: 0.05 }
  }
}

const skillCategoryVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0 }
}

const skillTagVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1 }
}

function SkillsTab() {
  return (
    <div className="tab-content">
      <div className="section-title"><i className="fas fa-layer-group" aria-hidden></i> Tech Stack</div>
      <motion.div
        className="skills-grid"
        variants={skillsContainerVariants}
        initial="hidden"
        animate="visible"
      >
        {SKILLS_CATEGORIES.map((cat, cIdx) => (
          <motion.div
            key={cIdx}
            className="skill-category skill-category-interactive"
            variants={skillCategoryVariants}
          >
            <h3><i className={`fas ${cat.icon}`} aria-hidden></i> {cat.title}</h3>
            <div className="skill-tags">
              {cat.tags.map((tag, tIdx) => (
                <motion.span
                  key={tIdx}
                  className="skill-tag"
                  variants={skillTagVariants}
                  whileHover={{ scale: 1.05, boxShadow: '0 0 12px rgba(10, 132, 255, 0.35)' }}
                >
                  {tag}
                </motion.span>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}

const galleryContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.05 }
  }
}

const galleryCardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}

function ProjectsTab() {
  return (
    <div className="tab-content">
      <div className="section-title"><i className="fas fa-layer-group" aria-hidden></i> All Projects Gallery</div>
      <motion.div
        className="projects-gallery"
        variants={galleryContainerVariants}
        initial="hidden"
        animate="visible"
      >
        {PROJECTS_GALLERY.map((project, idx) => (
          <motion.div
            key={idx}
            className="gallery-card"
            variants={galleryCardVariants}
            whileHover={{ y: -5, boxShadow: `0 12px 40px ${project.color}30` }}
            style={{ borderTop: `4px solid ${project.color}` }}
          >
            <div className="gallery-header">
              <span className="gallery-category">{project.category}</span>
              <h3>{project.title}</h3>
            </div>
            <div className="gallery-meta">
              <span><i className="fas fa-user-tag" aria-hidden></i> {project.role}</span>
              <span><i className="far fa-calendar-alt" aria-hidden></i> {project.period}</span>
            </div>
            <p className="gallery-desc">{project.desc}</p>
            <div className="gallery-features">
              {project.features.map((f, i) => (
                <div key={i} className="feature-dot-item">
                  <div className="dot" style={{ background: project.color }}></div>
                  {f}
                </div>
              ))}
            </div>
            <div className="gallery-tech">
              {project.tech.map((t, i) => <span key={i}>{t}</span>)}
            </div>
            {(project.liveUrl || project.repoUrl) && (
              <div className="gallery-actions">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    className="gallery-btn gallery-btn-primary"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fas fa-external-link-alt" aria-hidden></i> Run App
                  </a>
                )}
                {project.repoUrl && (
                  <a
                    href={project.repoUrl}
                    className="gallery-btn gallery-btn-secondary"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fab fa-github" aria-hidden></i> View Source
                  </a>
                )}
              </div>
            )}
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}

export default AboutWindow
