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
    { id: 'profile', label: '프로필', icon: 'fas fa-user' },
    { id: 'experience', label: '경력', icon: 'fas fa-briefcase' },
    { id: 'skills', label: '스킬', icon: 'fas fa-code' }
  ]

  const coreValues = [
    {
      id: 'e2e',
      icon: 'fas fa-route',
      title: 'End-to-End',
      desc: '기획부터 배포·운영까지 한 사람이 끝까지 책임지는 완결력. “여기까지는 제가, 여기서부터는 다른 팀”이 아니라, 가치가 나올 때까지 손을 놓지 않습니다.'
    },
    {
      id: 'impact',
      icon: 'fas fa-chart-line',
      title: 'Business Impact',
      desc: '기능 구현이 아니라 비즈니스 결과를 만드는 개발. 가입률, 전환율, 운영 효율처럼 숫자로 말할 수 있는 임팩트를 목표로 설계하고 만듭니다.'
    },
    {
      id: 'proof',
      icon: 'fas fa-bolt',
      title: '검증된 실행력',
      desc: '실무에서 1인 E2E로 플랫폼을 세운 경험이 증명한, 말보다 먼저 나오는 실행력. 해커톤과 사이드 프로젝트까지 이어지는 “끝까지 해내는” 습관.'
    },
    {
      id: 'value-first',
      icon: 'fas fa-bullseye',
      title: '가치 설계 우선',
      desc: '"무엇을 만들지"보다 "어떤 문제를 풀고 어떤 가치를 줄지"를 먼저 정하는 습관. 기능 나열이 아니라 사용자와 비즈니스 관점에서 가치를 설계한 뒤, 그에 맞춰 제품을 만듭니다.'
    }
  ]

  const profileStagger = {
    initial: { opacity: 0, x: -10 },
    animate: { opacity: 1, x: 0, transition: { staggerChildren: 0.08, delayChildren: 0.12 } },
    exit: { opacity: 0, x: 10, transition: { duration: 0.2 } }
  }
  const profileItem = { initial: { opacity: 0, y: 14 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.35 } }

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
                className="tab-content tab-content--profile"
                variants={profileStagger}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <motion.div className="about-hero" variants={profileItem}>
                  <p className="about-lead">
                    <span className="typewriter-quote">"{display}{!done && <span className="cursor-blink">|</span>}"</span>
                  </p>
                  <h2 className="about-headline">만드는 사람이 아니라, <strong>가치를 만드는 사람</strong>입니다</h2>
                  <p className="about-oneliner">기획부터 배포·운영까지 끝까지 완결하는 End-to-End 프로덕트 빌더 · BARO Interactive</p>
                </motion.div>

                <motion.div className="profile-header" variants={profileItem}>
                  <div className="profile-avatar-container">
                    <img src="/taemin.jpg" alt="김태민(Kyle) 프로필" className="profile-avatar" />
                    <div className="online-status">
                      <div className="status-dot" />
                      <span>Online</span>
                    </div>
                  </div>
                  <div className="profile-info">
                    <h1 className="profile-name">Kyle Kim</h1>
                    <p className="profile-name-ko">김태민</p>
                    <div className="profile-role">
                      <i className="fas fa-terminal" aria-hidden />
                      <span>Full-stack Developer</span>
                    </div>
                    <div className="contact-chips">
                      <a href="mailto:rlaxoals9977@gmail.com" className="chip chip-link" target="_blank" rel="noopener noreferrer">
                        <i className="fas fa-envelope" aria-hidden /> rlaxoals9977@gmail.com
                      </a>
                      <a href="https://github.com/Kyle-TM99" className="chip chip-link" target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-github" aria-hidden /> GitHub
                      </a>
                      <div className="chip">
                        <i className="fas fa-map-marker-alt" aria-hidden /> Seoul, Korea
                      </div>
                    </div>
                  </div>
                </motion.div>

                <motion.div className="section-title" variants={profileItem}><i className="fas fa-quote-left" aria-hidden /> 스토리</motion.div>
                <motion.div className="summary-card" variants={profileItem}>
                  <p className="summary-lead">저의 강점은 단순히 만드는 것이 아니라, <strong>만들어서 가치를 남기는 것</strong>입니다. 실무와 지금, 두 축으로 쌓아왔습니다.</p>
                  <div className="summary-blocks">
                    <div className="summary-block">
                      <span className="summary-block-label">실무에서</span>
                      <p>
                        실무에서는 <strong>끝까지 완결하는 경험</strong>이 쌓였습니다. 굿센에서 온라인 전자책 이커머스 플랫폼을 1인으로 구축하면서, 기획부터 배포까지 한 사람이 보는 것이 비즈니스와 개발 사이 간극을 얼마나 줄이는지 느꼈습니다. 베오에서는 이커머스 셀러를 위한 광고·올인원 분석 솔루션(SellerKit)을 1인으로 설계·개발하면서, “누가 쓰고 왜 쓸까”를 개발 단계부터 같이 고민하는 습관이 생겼습니다. 그 연장선에서 지금 BARO에서는 멀티테넌트 중고차 판매 솔루션과 자사 홈페이지를 1인 End-to-End로 맡고 있습니다.
                      </p>
                    </div>
                    <div className="summary-block">
                      <span className="summary-block-label">지금도</span>
                      <p>
                        실무 밖에서도 그 흐름을 이어가고 있습니다. OpenAI × 조코딩 해커톤에서 PlanFlow를 1인으로 개발·제출하며 “무엇을 만들지”보다 “어떤 문제를 풀고 어떤 가치를 줄지”를 먼저 설계해 봤고, 지금은 이커머스 자동화 솔루션 <strong>SellerWiz</strong>를 사이드 프로젝트로 만들고 있습니다. 스스로 문제를 정의하고 가치를 설계해 끝까지 만들어 보는 일을, 일과 바깥을 가리지 않고 계속해서 해 나가고 있습니다.
                      </p>
                    </div>
                  </div>
                  <p className="summary-philosophy">
                    저는 결국, 한 번 꽂히면 끝까지 물고 늘어지는 끈기와 새벽까지라도 결과를 뽑아내는 실행력,
                    그리고 언젠가 제가 만든 프로덕트로 시장을 뒤흔들고 싶다는 야망을 가진 사람입니다.
                    이 페이지에 적힌 실무와 지금의 기록들은 그 욕심을 증명하는 중간 단계일 뿐이고,
                    앞으로도 저는 더 큰 문제와 더 큰 가치를 향해 제품을 만들어 나가려고 합니다.
                  </p>
                </motion.div>

                <motion.div className="section-title" variants={profileItem}><i className="fas fa-star" aria-hidden /> 핵심 가치</motion.div>
                <motion.div
                  className="values-grid"
                  variants={profileStagger}
                  initial="initial"
                  animate="animate"
                >
                  {coreValues.map((value, index) => (
                    <motion.div
                      key={value.id}
                      className="value-card"
                      variants={profileItem}
                      whileHover={{ y: -4, transition: { duration: 0.2 } }}
                      whileTap={{ scale: 0.98 }}
                      tabIndex={0}
                      role="group"
                      aria-labelledby={`value-title-${value.id}`}
                    >
                      <div className="value-card-icon" aria-hidden>
                        <i className={value.icon} />
                      </div>
                      <h3 id={`value-title-${value.id}`} className="value-card-title">{value.title}</h3>
                      <p className="value-card-desc">{value.desc}</p>
                    </motion.div>
                  ))}
                </motion.div>
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
