import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Window from './Window'
import './AboutWindow.css'
import './CareerStyles.css'

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

const careerData = [
  {
    id: 'baro',
    name: 'BARO Interactive',
    role: 'Full-stack Developer',
    period: '2025.12 ~ Current',
    logo: 'fas fa-rocket',
    color: '#30d158',
    summary: 'Web/App · 교육·커머스 도메인',
    identity: 'The Product Maker',
    identityDesc: '기획부터 배포까지 A to Z를 직접 완결 짓는 프로덕트 메이커',
    stats: [
      { label: 'Web/App', value: '–' },
      { label: 'Domain', value: '교육·커머스' }
    ],
    projects: []
  },
  {
    id: 'beo',
    name: 'BEO (베오)',
    role: 'Education PM & Full-stack Developer',
    period: '2025.07 ~ 2025.11',
    logo: 'fas fa-cube',
    color: '#0a84ff',
    summary: 'EdTech SaaS Startup',
    identity: 'The All-Rounder',
    identityDesc: '기획부터 개발, 운영까지 혼자서 A to Z를 책임지는 1인 메이커',
    stats: [
      { label: 'SaaS Platform', value: '1' },
      { label: 'Extensions', value: '3' },
      { label: 'Modules', value: '15+' }
    ],
    projects: [
      { title: 'SellerKit', type: 'SaaS Platform', desc: '쿠팡 셀러를 위한 올인원 분석 및 관리 솔루션.', tech: ['Vue.js 3', 'Spring Boot 3.2', 'Redis', 'AWS'] },
      { title: 'AutoCollector', type: 'Chrome Extension', desc: '이커머스 데이터 수집 자동화 도구.', tech: ['JavaScript', 'Python', 'Selenium'] }
    ]
  },
  {
    id: 'goodsen',
    name: 'GoodSen (굿센)',
    role: 'Backend Developer',
    period: '2025.04 ~ 2025.07',
    logo: 'fas fa-building',
    color: '#bf5af2',
    summary: 'Online Education Platform',
    identity: 'The System Architect',
    identityDesc: '대규모 트래픽을 고려한 안정적인 백엔드 시스템 설계 및 최적화',
    stats: [
      { label: 'Conversion', value: '106%↑' },
      { label: 'Stability', value: '100%' },
      { label: 'Automation', value: '70%↑' }
    ],
    projects: [
      { title: 'OnClass', type: 'LMS Platform', desc: '온라인 교육 플랫폼 백엔드 전체 구축.', tech: ['Spring Boot', 'Spring Security', 'JPA', 'MySQL'] },
      { title: 'BizAuto', type: 'Automation Tool', desc: '사내 업무 자동화. 업무 효율 70% 증대.', tech: ['Python', 'Pandas', 'Google API'] }
    ]
  }
]

const skillsData = [
  { category: '💻 Programming Languages & Frameworks', items: ['Java', 'JavaScript', 'HTML', 'CSS'] },
  { category: '🌱 Spring Ecosystem', items: ['Spring Boot', 'Spring Security', 'Spring Data JDBC', 'JPA', 'MyBatis'] },
  { category: '⚛️ Frontend', items: ['Vue.js 3', 'Vite', 'Vue Router', 'Pinia', 'Tailwind CSS', 'Chart.js', 'SASS', 'Thymeleaf'] },
  { category: '🗄️ Database & Caching', items: ['MySQL', 'Redis', 'H2', 'QueryDSL'] },
  { category: '☁️ Cloud & DevOps', items: ['AWS S3', 'AWS EC2', 'Docker', 'Jenkins', 'Linux'] },
  { category: '🔐 Security', items: ['JWT', 'OAuth2', 'Spring Security'] },
  { category: '🛠️ Tools', items: ['Git', 'GitHub', 'Confluence', 'Notion', 'Swagger/OpenAPI'] },
  { category: '⚡ Web & APIs', items: ['WebSocket', 'AJAX', 'Axios', 'RESTful API'] },
  { category: '🧩 Extensions & Automation', items: ['Chrome Extension', 'Manifest v3', 'ExcelJS'] },
  { category: '📧 External Services', items: ['Gmail SMTP', 'ALIGO SMS API', 'PortOne', 'Coupang Open API'] }
]

function AboutWindow({ onClose, onFocus, zIndex }) {
  const [activeSection, setActiveSection] = useState('profile')
  const [selectedCompany, setSelectedCompany] = useState(null)
  const { display, done } = useTypewriter(TYPEWRITER_PHRASE, TYPEWRITER_SPEED, activeSection === 'profile')

  const sections = [
    { id: 'profile', label: 'Profile', icon: 'fas fa-user' },
    { id: 'experience', label: 'Experience', icon: 'fas fa-briefcase' },
    { id: 'skills', label: 'Skills', icon: 'fas fa-code' }
  ]

  return (
    <Window
      id="about-window"
      title="About Me"
      icon="fa-user-circle"
      onClose={onClose}
      onFocus={onFocus}
      zIndex={zIndex}
      width="920px"
      height="680px"
      minWidth="480px"
      minHeight="420px"
    >
      <div className="about-container about-container--with-sidebar">
        <nav className="about-sidebar">
          {sections.map((s) => (
            <button
              key={s.id}
              type="button"
              className={`sidebar-btn ${activeSection === s.id ? 'active' : ''}`}
              onClick={() => setActiveSection(s.id)}
            >
              <i className={s.icon} aria-hidden />
              {s.label}
            </button>
          ))}
        </nav>
        <div className="about-main">
          <AnimatePresence mode="wait">
            {activeSection === 'profile' && (
              <motion.div
                key="profile"
                className="tab-content"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.2 }}
              >
                <h2 className="about-headline">풀스택 개발자 김태민입니다</h2>
                <p className="about-oneliner">기획부터 배포까지 끝까지 만드는 1인 풀스택 개발자 · BARO Interactive</p>

                <div className="profile-header">
                  <div className="profile-avatar-container">
                    <img src="/taemin.jpg" alt="김태민(Kyle) 프로필" className="profile-avatar" />
                    <div className="online-status">
                      <div className="status-dot" />
                      <span>Online</span>
                    </div>
                  </div>
                  <div className="profile-info">
                    <h1>Kyle Kim (김태민)</h1>
                    <div className="profile-role">
                      <i className="fas fa-terminal" aria-hidden />
                      <span>Full-stack Developer</span>
                    </div>
                    <div className="contact-chips">
                      <a href="mailto:rlaxoals9977@gmail.com" className="chip chip-link" target="_blank" rel="noopener noreferrer">
                        <i className="fas fa-envelope" aria-hidden /> rlaxoals9977@gmail.com
                      </a>
                      <a href="https://github.com/Kyle-TM99" className="chip chip-link" target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-github" aria-hidden /> github.com/Kyle-TM99
                      </a>
                      <div className="chip">
                        <i className="fas fa-map-marker-alt" aria-hidden /> Seoul, Korea
                      </div>
                    </div>
                  </div>
                </div>

                <div className="section-title"><i className="fas fa-quote-left" aria-hidden /> Summary</div>
                <div className="summary-card">
                  <p style={{ lineHeight: '1.6', color: 'rgba(255,255,255,0.85)' }}>
                    <span className="typewriter-quote">"{display}{!done && <span className="cursor-blink">|</span>}"</span>
                    <br /><br />
                    <strong>1년 차 풀스택 개발자</strong>로서 기획부터 배포까지 전체 프로세스를 독립적으로 수행하는 <strong>End-to-End 개발 역량</strong>을 보유하고 있습니다.
                    현재 <strong>BARO Interactive</strong>에서 풀스택 개발자로 활동하고 있습니다.
                  </p>
                </div>

                <div className="section-title"><i className="fas fa-star" aria-hidden /> Core Values</div>
                <div className="skills-grid">
                  <div className="skill-category">
                    <h3>End-to-End</h3>
                    <p style={{ fontSize: '13px', color: '#ccc' }}>기획, 디자인, 개발, 배포, 운영까지 혼자서 완결 가능한 실행력</p>
                  </div>
                  <div className="skill-category">
                    <h3>Business Impact</h3>
                    <p style={{ fontSize: '13px', color: '#ccc' }}>비즈니스 성과(가입율, 효율)를 만들어내는 개발</p>
                  </div>
                </div>
              </motion.div>
            )}

            {activeSection === 'experience' && (
              <motion.div
                key="experience"
                className="tab-content"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.2 }}
                style={{ padding: '0 8px' }}
              >
                <div className="career-grid">
                  {careerData.map((company) => (
                    <motion.div
                      key={company.id}
                      layoutId={`exp-card-${company.id}`}
                      className={`company-card ${selectedCompany === company.id ? 'expanded' : ''}`}
                      onClick={() => setSelectedCompany(selectedCompany === company.id ? null : company.id)}
                      style={{ '--accent-color': company.color }}
                    >
                      <motion.div className="company-header" layoutId={`exp-header-${company.id}`}>
                        <div className="company-logo-wrapper">
                          <i className={company.logo} />
                        </div>
                        <div className="company-info">
                          <motion.h2 layoutId={`exp-title-${company.id}`}>{company.name}</motion.h2>
                          <span className="company-period">{company.period}</span>
                        </div>
                        <div className="company-toggle-icon">
                          <i className={`fas fa-chevron-${selectedCompany === company.id ? 'up' : 'down'}`} />
                        </div>
                      </motion.div>
                      <motion.div className="company-role-badge" layoutId={`exp-role-${company.id}`}>
                        {company.role}
                      </motion.div>
                      <AnimatePresence>
                        {selectedCompany === company.id && (
                          <motion.div
                            className="company-details"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                          >
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
                            {company.projects?.length > 0 && (
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
                            )}
                          </motion.div>
                        )}
                      </AnimatePresence>
                      {selectedCompany !== company.id && (
                        <motion.p className="company-summary" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
                          {company.summary}
                        </motion.p>
                      )}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeSection === 'skills' && (
              <motion.div
                key="skills"
                className="tab-content"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.2 }}
              >
                <div className="skills-grid">
                  {skillsData.map((skillGroup, index) => (
                    <div key={index} className="skill-category">
                      <h3>{skillGroup.category}</h3>
                      <div className="skill-items">
                        {skillGroup.items.map((item, itemIndex) => (
                          <span key={itemIndex} className="skill-tag">{item}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </Window>
  )
}

export default AboutWindow
