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
            <span>Full-stack Developer & Education PM</span>
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
  return (
    <div className="tab-content">
      <div className="section-title"><i className="fas fa-history"></i> Experience</div>
      <div className="timeline-container">
        <div className="timeline-track"></div>

        <div className="career-item">
          <div className="career-dot"></div>
          <div className="career-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <h3 style={{ margin: 0 }}>베오 (BEO)</h3>
              <span style={{ color: '#0a84ff', fontWeight: 600 }}>2025.07 ~ Present</span>
            </div>
            <div style={{ color: '#bf5af2', marginBottom: '12px', fontSize: '14px' }}>Education PM & Full-stack Developer</div>
            <ul style={{ paddingLeft: '20px', fontSize: '14px', color: 'rgba(255,255,255,0.8)', lineHeight: '1.6' }}>
              <li>SellerKit SaaS 플랫폼 1인 풀스택 개발 (Vue.js 3 + Spring Boot 3.2)</li>
              <li>Chrome Extension 3종 개발 (데이터 수집 자동화)</li>
              <li>쿠팡 Open API 연동 및 실시간 데이터 분석 시스템 구축</li>
            </ul>
          </div>
        </div>

        <div className="career-item">
          <div className="career-dot"></div>
          <div className="career-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <h3 style={{ margin: 0 }}>GoodSen</h3>
              <span style={{ color: '#0a84ff', fontWeight: 600 }}>2025.04 ~ 2025.07</span>
            </div>
            <div style={{ color: '#bf5af2', marginBottom: '12px', fontSize: '14px' }}>Backend Developer (1인 개발)</div>
            <ul style={{ paddingLeft: '20px', fontSize: '14px', color: 'rgba(255,255,255,0.8)', lineHeight: '1.6' }}>
              <li>온라인 교육 플랫폼 백엔드 시스템 설계 및 구축 (15개 모듈)</li>
              <li>OAuth2 소셜 로그인 구현 (회원가입 완료율 106% 향상)</li>
              <li>결제 시스템 안정화 (실패율 80% 감소)</li>
            </ul>
          </div>
        </div>
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
  return (
    <div className="tab-content">
      <div className="section-title"><i className="fas fa-rocket"></i> Featured Projects</div>
      <div className="projects-grid">
        <div className="project-card">
          <i className="fas fa-shopping-cart" style={{ fontSize: '32px', color: '#0a84ff', marginBottom: '12px' }}></i>
          <div className="project-role">1인 풀스택</div>
          <h3>SellerKit</h3>
          <p style={{ fontSize: '13px', color: '#aaa', margin: '8px 0 16px 0' }}>쿠팡 셀러를 위한 올인원 관리 & 분석 SaaS 플랫폼</p>
          <div className="skill-tags" style={{ justifyContent: 'center' }}>
            <span className="skill-tag">Vue.js</span>
            <span className="skill-tag">Spring Boot</span>
          </div>
        </div>
        <div className="project-card">
          <i className="fas fa-graduation-cap" style={{ fontSize: '32px', color: '#30d158', marginBottom: '12px' }}></i>
          <div className="project-role">1인 풀스택</div>
          <h3>OnClass</h3>
          <p style={{ fontSize: '13px', color: '#aaa', margin: '8px 0 16px 0' }}>15개 핵심 모듈을 탑재한 온라인 교육 플랫폼</p>
          <div className="skill-tags" style={{ justifyContent: 'center' }}>
            <span className="skill-tag">Spring Security</span>
            <span className="skill-tag">OAuth2</span>
          </div>
        </div>
        <div className="project-card">
          <i className="fas fa-users" style={{ fontSize: '32px', color: '#bf5af2', marginBottom: '12px' }}></i>
          <div className="project-role">Team Lead</div>
          <h3>OneStack</h3>
          <p style={{ fontSize: '13px', color: '#aaa', margin: '8px 0 16px 0' }}>IT 전문가 매칭 및 협업 플랫폼</p>
          <div className="skill-tags" style={{ justifyContent: 'center' }}>
            <span className="skill-tag">WebSocket</span>
            <span className="skill-tag">AWS</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutWindow
