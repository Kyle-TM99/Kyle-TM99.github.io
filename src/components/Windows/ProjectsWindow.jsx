import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Window from './Window'
import './CareerStyles.css'

function ProjectsWindow({ onClose, onFocus, zIndex }) {
  const [filter, setFilter] = useState('All')

  const projects = [
    {
      id: 'onestack',
      title: 'OneStack',
      role: 'Team Lead',
      period: '2024.12 ~ 2025.02',
      category: 'Platform',
      desc: 'IT 전문가 매칭 및 협업을 위한 올인원 커뮤니티 플랫폼',
      tech: ['Java', 'Spring Boot', 'WebSocket', 'AWS', 'Docker'],
      features: ['실시간 채팅', '프로젝트 매칭', '화상 회의 연동'],
      color: '#bf5af2'
    },
    {
      id: 'sellerkit',
      title: 'SellerKit',
      role: 'Solo Developer',
      period: '2025.07 ~ Present',
      category: 'SaaS',
      desc: '쿠팡 셀러를 위한 올인원 분석 및 관리 솔루션. 광고 효율 분석, 마진 계산, 키워드 트래킹 기능 제공.',
      tech: ['Vue.js 3', 'Spring Boot 3.2', 'Redis', 'AWS'],
      features: ['마진 계산기', '키워드 분석', '광고 효율 트래킹'],
      color: '#0a84ff'
    },
    {
      id: 'onclass',
      title: 'OnClass',
      role: 'Solo Developer',
      period: '2025.04 ~ 2025.07',
      category: 'Platform',
      desc: '온라인 교육 플랫폼 백엔드 전체 구축. OAuth2 로그인, 결제 모듈, 스트리밍 서버 연동.',
      tech: ['Spring Boot', 'Spring Security', 'JPA', 'MySQL'],
      features: ['강의 시청', '결제 시스템', '자료실'],
      color: '#30d158'
    },
    {
      id: 'ad-extractor',
      title: 'Ad Extractor',
      role: 'Toy Project',
      period: '2025.09',
      category: 'Tool',
      desc: '쿠팡 광고 데이터 자동 수집 Chrome Extension. 분석 시간 80% 단축.',
      tech: ['Chrome Extension', 'JavaScript', 'ExcelJS'],
      features: ['광고 데이터 파싱', '엑셀 다운로드', '자동화'],
      color: '#ff9f0a'
    },
    {
      id: 'keyword-extractor',
      title: 'Keyword Tool',
      role: 'Toy Project',
      period: '2025.08',
      category: 'Tool',
      desc: '쿠팡 인기 검색어 및 트렌드 분석 도구.',
      tech: ['Chrome Extension', 'Fetch API', 'JSON Parsing'],
      features: ['키워드 추출', '트렌드 분석', '데이터 시각화'],
      color: '#ff375f'
    }
  ]

  const filteredProjects = filter === 'All'
    ? projects
    : projects.filter(p => p.category === filter)

  const categories = ['All', 'SaaS', 'Platform', 'Tool']

  return (
    <Window
      id="projects-window"
      title="Projects Gallery"
      icon="fa-folder-open"
      onClose={onClose}
      onFocus={onFocus}
      zIndex={zIndex}
      width="900px"
      height="750px"
    >
      <div style={{ padding: '30px', height: '100%', overflowY: 'auto' }}>

        <div className="filter-bar">
          {categories.map(cat => (
            <div
              key={cat}
              className={`filter-chip ${filter === cat ? 'active' : ''}`}
              onClick={() => setFilter(cat)}
            >
              {cat}
            </div>
          ))}
        </div>

        <div className="projects-gallery">
          <AnimatePresence mode='popLayout'>
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
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
          </AnimatePresence>
        </div>
      </div>
    </Window>
  )
}

export default ProjectsWindow

