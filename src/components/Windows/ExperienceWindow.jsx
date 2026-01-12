import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Window from './Window'
import './CareerStyles.css'

function ExperienceWindow({ onClose, onFocus, zIndex }) {
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
    <Window
      id="experience-window"
      title="Experience Journey"
      icon="fa-briefcase"
      onClose={onClose}
      onFocus={onFocus}
      zIndex={zIndex}
      width="900px"
      height="750px"
    >
      <div style={{ padding: '30px', height: '100%', overflowY: 'auto' }}>
        <div className="career-grid">
          {careerData.map(company => (
            <motion.div
              key={company.id}
              layoutId={`exp-card-${company.id}`}
              className={`company-card ${selectedCompany === company.id ? 'expanded' : ''}`}
              onClick={() => setSelectedCompany(selectedCompany === company.id ? null : company.id)}
              style={{ '--accent-color': company.color }}
            >
              <motion.div className="company-header" layoutId={`exp-header-${company.id}`}>
                <div className="company-logo-wrapper">
                  <i className={company.logo}></i>
                </div>
                <div className="company-info">
                  <motion.h2 layoutId={`exp-title-${company.id}`}>{company.name}</motion.h2>
                  <span className="company-period">{company.period}</span>
                </div>
                <div className="company-toggle-icon">
                  <i className={`fas fa-chevron-${selectedCompany === company.id ? 'up' : 'down'}`}></i>
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
    </Window>
  )
}

export default ExperienceWindow

