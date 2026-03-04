import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Window from './Window'
import './AboutWindow.css'
import './CareerStyles.css'

const TYPEWRITER_PHRASE = '비즈니스 가치를 끝까지 만듭니다.'
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
    logoImage: '/logos/baro_logo.png',
    color: '#30d158',
    summary: '멀티테넌트 중고차 솔루션 · 자사 홈페이지 1인 E2E',
    identity: 'The Product Maker',
    identityDesc: '멀티테넌트 기반 중고차 판매 사이트 솔루션과 자사 홈페이지를 1인 End-to-End로 개발',
    stats: [
      { label: '중고차 솔루션', value: '1' },
      { label: '자사 홈페이지', value: '1' },
      { label: 'Domain', value: '교육·커머스' }
    ],
    projects: [
      { title: '중고차 판매 사이트 솔루션', type: 'Multi-tenant SaaS', desc: '멀티테넌트 기반 중고차 판매 사이트 솔루션 1인 End-to-End 개발.', tech: ['Vue.js 3', 'Spring Boot', 'MySQL', 'AWS'] },
      { title: '자사 홈페이지', type: 'Web', desc: '자사 홈페이지 1인 End-to-End 개발.', tech: ['Vue.js', 'Spring Boot', 'AWS'] }
    ]
  },
  {
    id: 'beo',
    name: '비즈부스트 (BEO)',
    role: 'Education PM & Full-stack Developer',
    period: '2025.07 ~ 2025.11',
    logo: 'fas fa-cube',
    logoImage: '/logos/bizboost.png',
    color: '#0a84ff',
    summary: '이커머스 셀러 광고·올인원 분석/관리 솔루션 1인 E2E',
    identity: 'The All-Rounder',
    identityDesc: '이커머스 셀러를 위한 광고·올인원 분석·관리 솔루션(SellerKit)을 1인 End-to-End로 설계·개발',
    stats: [
      { label: 'SaaS Platform', value: '1' },
      { label: 'Extensions', value: '3' },
      { label: 'Modules', value: '15+' }
    ],
    projects: [
      { title: 'SellerKit', type: 'SaaS Platform', desc: '이커머스 셀러를 위한 광고·올인원 분석 및 관리 솔루션. 1인 E2E 개발.', tech: ['Vue.js 3', 'Spring Boot 3.2', 'Redis', 'AWS'] },
      { title: 'AutoCollector', type: 'Chrome Extension', desc: '이커머스 데이터 수집 자동화 도구.', tech: ['JavaScript', 'Python', 'Selenium'] }
    ]
  },
  {
    id: 'goodsen',
    name: 'GoodSen (굿센)',
    role: 'Backend Developer',
    period: '2025.04 ~ 2025.07',
    logo: 'fas fa-building',
    logoImage: '/logos/goodsen.png',
    color: '#bf5af2',
    summary: '온라인 전자책 이커머스 플랫폼 1인 E2E 구축',
    identity: 'The End-to-End Builder',
    identityDesc: '온라인 전자책 이커머스 플랫폼을 1인 End-to-End로 구축',
    stats: [
      { label: 'Conversion', value: '106%↑' },
      { label: 'Stability', value: '100%' },
      { label: 'Automation', value: '70%↑' }
    ],
    projects: [
      { title: '전자책 이커머스 플랫폼', type: 'E-commerce Platform', desc: '온라인 전자책 이커머스 플랫폼 1인 End-to-End 구축.', tech: ['Spring Boot', 'Spring Security', 'JPA', 'MySQL'] },
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
      width="1100px"
      height="780px"
      minWidth="520px"
      minHeight="480px"
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
                <h2 className="about-headline">비즈니스 가치를 생각하는 End-to-End 프로덕트 빌더, 김태민입니다</h2>
                <p className="about-oneliner">기획부터 배포·운영까지 완결하고, 실무와 해커톤으로 검증한 실행력 · BARO Interactive</p>

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

                <div className="section-title"><i className="fas fa-quote-left" aria-hidden /> 요약</div>
                <div className="summary-card">
                  <p style={{ lineHeight: '1.6', color: 'var(--foreground)' }}>
                    <span className="typewriter-quote">"{display}{!done && <span className="cursor-blink">|</span>}"</span>
                    <br /><br />
                    저의 강점은 단순히 만드는 것이 아니라, <strong>만들어서 가치를 남기는 것</strong>입니다. 그걸 실무와 해커톤이라는 두 축으로 쌓아왔습니다.
                    <br /><br />
                    실무에서는 <strong>끝까지 완결하는 경험</strong>이 쌓였습니다. 굿센에서 온라인 전자책 이커머스 플랫폼을 1인으로 구축하면서, 기획부터 배포까지 한 사람이 보는 것이 비즈니스와 개발 사이 간극을 얼마나 줄이는지 느꼈습니다. 베오에서는 이커머스 셀러를 위한 광고·올인원 분석 솔루션(SellerKit)을 1인으로 설계·개발하면서, “누가 쓰고 왜 쓸까”를 개발 단계부터 같이 고민하는 습관이 생겼습니다. 그 연장선에서 지금 BARO에서는 멀티테넌트 중고차 판매 솔루션과 자사 홈페이지를 1인 End-to-End로 맡고 있습니다.
                    <br /><br />
                    해커톤에서는 <strong>가치부터 설계하는 감각</strong>을 단련했습니다. OpenAI × 조코딩 해커톤에서 PlanFlow를 1인으로 개발·제출하면서, “무엇을 만들지”보다 “어떤 문제를 풀고 어떤 가치를 줄지”를 먼저 정하는 경험을 했습니다. 실무에서의 1인 완결력과 해커톤에서의 가치 설계가 맞닿은 지점이, 제가 비즈니스 가치를 생각하는 End-to-End 프로덕트 빌더로 서 있는 이유입니다.
                    <br /><br />
                    그걸 실무 밖에서도 이어가고 있습니다. 이커머스 자동화 솔루션 <strong>SellerWiz</strong>를 사이드 프로젝트로 개발 중이며, 스스로 문제를 정의하고 가치를 설계해 끝까지 만들어 보는 걸 멈추지 않고 있습니다.
                  </p>
                </div>

                <div className="section-title"><i className="fas fa-star" aria-hidden /> 핵심 가치</div>
                <div className="skills-grid">
                  <div className="skill-category">
                    <h3>End-to-End</h3>
                    <p style={{ fontSize: '13px', color: 'var(--muted-foreground)' }}>기획·개발·배포·운영까지 혼자서 완결하는 프로덕트 빌딩</p>
                  </div>
                  <div className="skill-category">
                    <h3>Business Impact</h3>
                    <p style={{ fontSize: '13px', color: 'var(--muted-foreground)' }}>비즈니스 성과(가입율, 효율)를 만들어내는 개발</p>
                  </div>
                  <div className="skill-category">
                    <h3>실무 × 해커톤</h3>
                    <p style={{ fontSize: '13px', color: 'var(--muted-foreground)' }}>실무 경험과 비즈니스 가치를 따지는 해커톤이 검증한 실행력</p>
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
                        <div className={`company-logo-wrapper ${company.id === 'baro' || company.id === 'goodsen' || company.id === 'beo' ? 'company-logo-wrapper--white' : ''}`}>
                          {company.logoImage ? (
                            <img src={company.logoImage} alt="" className="company-logo-img" />
                          ) : (
                            <i className={company.logo} />
                          )}
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
                              <div className="identity-label">역할</div>
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
                                <h3>주요 프로젝트</h3>
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
