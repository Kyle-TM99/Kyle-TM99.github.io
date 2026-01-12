import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Window from './Window'
import './AboutWindow.css'

function AboutWindow({ onClose, onFocus, zIndex }) {
  const [activeTab, setActiveTab] = useState('profile')

  const tabs = [
    { id: 'profile', icon: 'fa-user', label: 'Profile' },
    { id: 'career', icon: 'fa-briefcase', label: 'Career' },
    { id: 'skills', icon: 'fa-code', label: 'Skills' },
    { id: 'projects', icon: 'fa-rocket', label: 'Projects' }
  ]

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
    >
      <div className="about-container">
        {/* Sidebar Navigation */}
        <div className="about-sidebar">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`sidebar-btn ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <i className={`fas ${tab.icon}`}></i>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Main Content Area */}
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
  return (
    <div className="tab-content">
      <div className="profile-header">
        <div className="profile-avatar-container">
          <img src="/taemin.jpg" alt="Kyle" className="profile-avatar" />
          <div className="online-status">
            <div className="status-dot"></div>
            <span>Online</span>
          </div>
        </div>
        <div className="profile-info">
          <h1>Kyle Kim (김태민)</h1>
          <div className="profile-role">
            <i className="fas fa-terminal"></i>
            <span>Full-stack Developer</span>
          </div>
          <div className="contact-chips">
            <div className="chip"><i className="fas fa-envelope"></i> rlaxoals9977@gmail.com</div>
            <div className="chip"><i className="fab fa-github"></i> github.com/Kyle-TM99</div>
            <div className="chip"><i className="fas fa-map-marker-alt"></i> Seoul, Korea</div>
          </div>
        </div>
      </div>

      <div className="section-title"><i className="fas fa-quote-left"></i> Summary</div>
      <div className="summary-card">
        <p style={{ lineHeight: '1.6', color: 'rgba(255,255,255,0.85)' }}>
          "처음부터 끝까지, 제가 직접 만듭니다."<br /><br />
          <strong>1년 차 풀스택 개발자</strong>로서 기획부터 배포까지 전체 프로세스를 독립적으로 수행하는 <strong>End-to-End 개발 역량</strong>을 보유하고 있습니다.
          현재 <strong>베오(BEO)</strong>에서 Education PM 겸 1인 풀스택 개발자로 SaaS 플랫폼을 단독 개발 및 운영하고 있습니다.
        </p>
      </div>

      <div className="section-title"><i className="fas fa-star"></i> Core Values</div>
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

  const careerData = [
    {
      id: 'beo',
      name: 'BEO (베오)',
      role: 'Education PM & Full-stack Developer',
      period: '2025.07 ~ Present',
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
        {
          title: 'SellerKit',
          type: 'SaaS Platform',
          desc: '쿠팡 셀러를 위한 올인원 분석 및 관리 솔루션. 광고 효율 분석, 마진 계산, 키워드 트래킹 기능 제공.',
          tech: ['Vue.js 3', 'Spring Boot 3.2', 'Redis', 'AWS']
        },
        {
          title: 'AutoCollector',
          type: 'Chrome Extension',
          desc: '이커머스 데이터 수집 자동화 도구. 상품 정보 및 리뷰 데이터를 실시간으로 크롤링하여 분석.',
          tech: ['JavaScript', 'Python', 'Selenium']
        }
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
        {
          title: 'OnClass',
          type: 'LMS Platform',
          desc: '온라인 교육 플랫폼 백엔드 전체 구축. OAuth2 로그인, 결제 모듈, 스트리밍 서버 연동.',
          tech: ['Spring Boot', 'Spring Security', 'JPA', 'MySQL']
        },
        {
          title: 'BizAuto',
          type: 'Automation Tool',
          desc: '사내 업무 자동화 시스템. 인사/회계 데이터 처리 자동화로 업무 효율 70% 증대.',
          tech: ['Python', 'Pandas', 'Google API']
        }
      ]
    }
  ]

  return (
    <div className="tab-content career-content">
      <div className="section-title"><i className="fas fa-film"></i> Career Journey</div>
      <div className="career-grid">
        {careerData.map(company => (
          <motion.div
            key={company.id}
            layoutId={`card-${company.id}`}
            className={`company-card ${selectedCompany === company.id ? 'expanded' : ''}`}
            onClick={() => setSelectedCompany(selectedCompany === company.id ? null : company.id)}
            style={{ '--accent-color': company.color }}
          >
            <motion.div className="company-header" layoutId={`header-${company.id}`}>
              <div className="company-logo-wrapper">
                <i className={company.logo}></i>
              </div>
              <div className="company-info">
                <motion.h2 layoutId={`title-${company.id}`}>{company.name}</motion.h2>
                <span className="company-period">{company.period}</span>
              </div>
              <div className="company-toggle-icon">
                <i className={`fas fa-chevron-${selectedCompany === company.id ? 'up' : 'down'}`}></i>
              </div>
            </motion.div>

            <motion.div className="company-role-badge" layoutId={`role-${company.id}`}>
              {company.role}
            </motion.div>

            <AnimatePresence>
              {selectedCompany === company.id && (
                <motion.div
                  className="company-details"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
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
                </motion.div>
              )}
            </AnimatePresence>

            {selectedCompany !== company.id && (
              <motion.p
                className="company-summary"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {company.summary}
              </motion.p>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  )
}

function SkillsTab() {
  return (
    <div className="tab-content">
      <div className="section-title"><i className="fas fa-layer-group"></i> Tech Stack</div>
      <div className="skills-grid">
        <div className="skill-category">
          <h3><i className="fas fa-server"></i> Backend</h3>
          <div className="skill-tags">
            <span className="skill-tag">Java 17</span>
            <span className="skill-tag">Spring Boot 3</span>
            <span className="skill-tag">JPA/Hibernate</span>
            <span className="skill-tag">QueryDSL</span>
            <span className="skill-tag">Redis</span>
            <span className="skill-tag">MySQL</span>
          </div>
        </div>
        <div className="skill-category">
          <h3><i className="fas fa-desktop"></i> Frontend</h3>
          <div className="skill-tags">
            <span className="skill-tag">React 18</span>
            <span className="skill-tag">Vue.js 3</span>
            <span className="skill-tag">TailwindCSS</span>
            <span className="skill-tag">Vite</span>
            <span className="skill-tag">Framer Motion</span>
          </div>
        </div>
        <div className="skill-category">
          <h3><i className="fas fa-cloud"></i> DevOps & Tools</h3>
          <div className="skill-tags">
            <span className="skill-tag">AWS (EC2, S3)</span>
            <span className="skill-tag">Docker</span>
            <span className="skill-tag">Jenkins</span>
            <span className="skill-tag">Git</span>
            <span className="skill-tag">Selenium</span>
          </div>
        </div>
      </div>
    </div>
  )
}

function ProjectsTab() {
  const projects = [
    {
      title: 'OneStack',
      role: 'Team Lead',
      period: '2024.12 ~ 2025.02',
      category: 'Community Platform',
      desc: 'IT 전문가 매칭 및 협업을 위한 올인원 커뮤니티 플랫폼',
      tech: ['Java', 'Spring Boot', 'WebSocket', 'AWS', 'Docker'],
      features: ['실시간 채팅', '프로젝트 매칭', '화상 회의 연동'],
      color: '#bf5af2'
    },
    {
      title: 'SellerKit',
      role: 'Solo Developer',
      period: '2025.07 ~ Present',
      category: 'SaaS Solution',
      desc: '쿠팡 셀러를 위한 데이터 분석 및 마진 관리 자동화 솔루션',
      tech: ['Vue.js', 'Spring Boot', 'Redis', 'JPA'],
      features: ['마진 계산기', '키워드 분석', '광고 효율 트래킹'],
      color: '#0a84ff'
    },
    {
      title: 'OnClass',
      role: 'Solo Developer',
      period: '2025.04 ~ 2025.07',
      category: 'LMS Platform',
      desc: '15개 핵심 모듈을 탑재한 온라인 교육 및 강의 플랫폼',
      tech: ['Spring Security', 'OAuth2', 'PortOne', 'MySQL'],
      features: ['강의 시청', '결제 시스템', '자료실'],
      color: '#30d158'
    }
  ]

  return (
    <div className="tab-content">
      <div className="section-title"><i className="fas fa-layer-group"></i> All Projects Gallery</div>
      <div className="projects-gallery">
        {projects.map((project, idx) => (
          <motion.div
            key={idx}
            className="gallery-card"
            whileHover={{ y: -5 }}
            style={{ borderTop: `4px solid ${project.color}` }}
          >
            <div className="gallery-header">
              <span className="gallery-category">{project.category}</span>
              <h3>{project.title}</h3>
            </div>
            <div className="gallery-meta">
              <span><i className="fas fa-user-tag"></i> {project.role}</span>
              <span><i className="far fa-calendar-alt"></i> {project.period}</span>
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
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default AboutWindow
