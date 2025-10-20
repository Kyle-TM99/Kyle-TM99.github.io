import { useState } from 'react'
import Window from './Window'

function ExperienceWindow({ onClose, onFocus, zIndex }) {
  const [expandedExperience, setExpandedExperience] = useState(null)

  const toggleExperience = (expId) => {
    setExpandedExperience(expandedExperience === expId ? null : expId)
  }

  const experiences = [
    {
      id: 'beo',
      icon: 'fa-building',
      company: '베오',
      position: 'Education PM & Full-stack Developer',
      badge: '재직중',
      badgeType: 'current',
      period: '2025.07 ~ 현재',
      location: '서울, 대한민국',
      role: 'PM & 풀스택 개발',
      achievements: [
        { icon: 'fa-graduation-cap', text: 'Education PM' },
        { icon: 'fa-laptop-code', text: 'Full-stack Developer' },
        { icon: 'fa-rocket', text: '1인 개발 체제' }
      ],
      duties: [
        { 
          title: '교육 플랫폼 프로젝트 매니징',
          icon: 'fa-project-diagram',
          description: '교육 플랫폼 프로젝트의 전체 기획, 개발 일정 관리, 팀원 간 업무 조율 및 진행 상황 모니터링, 이해관계자 커뮤니케이션 담당'
        },
        {
          title: 'SellerKit (쿠팡 셀러 어시스턴트 솔루션) 1인 풀스택 개발',
          icon: 'fa-code',
          description: '쿠팡 셀러를 위한 올인원 관리 플랫폼 개발 (기획·설계·백엔드·프론트엔드·배포 전 과정 단독 수행)'
        },
        {
          title: 'Chrome Extension 개발',
          icon: 'fa-puzzle-piece',
          description: '광고 캠페인 추출기, 인기상품 검색어 추출기, 판매량 추적기 등 데이터 수집 자동화 도구 개발'
        }
      ],
      results: [
        {
          title: '1인 End-to-End 개발 완성',
          icon: 'fa-rocket',
          description: '기획부터 배포까지 전 과정을 단독 수행하여 상용화 수준의 SaaS 플랫폼 구축 완료'
        },
        {
          title: '실시간 데이터 수집 자동화',
          icon: 'fa-plug',
          description: '쿠팡 Open API 연동 및 내부 네트워크 분석을 통한 광고·매출 데이터 자동 수집 시스템 구현'
        },
        {
          title: '분석 시간 80% 단축',
          icon: 'fa-chart-line',
          description: 'Chrome Extension 개발을 통해 수동 작업 대비 광고 캠페인 분석 시간 80% 이상 절감'
        },
        {
          title: '최신 기술 스택 도입',
          icon: 'fa-layer-group',
          description: 'Vue.js 3, Vite, Tailwind CSS, Chart.js 등 모던 프론트엔드 기술 스택과 Spring Boot 3.2, Redis 등을 활용한 고성능 백엔드 시스템 구축'
        }
      ],
      tech: ['Java 17', 'Spring Boot 3.2.0', 'Vue.js 3', 'Tailwind CSS', 'Chart.js', 'MySQL', 'Redis', 'AWS S3', 'Chrome Extension']
    },
    {
      id: 'goodsen',
      icon: 'fa-building',
      company: 'GoodSen',
      position: 'Backend Developer',
      badge: '완료',
      badgeType: 'past',
      period: '2025.04 ~ 2025.07',
      location: '서울, 대한민국',
      role: '1인 풀스택 개발',
      achievements: [
        { icon: 'fa-server', text: 'Backend Developer' },
        { icon: 'fa-robot', text: 'Automation Engineer' },
        { icon: 'fa-rocket', text: '1인 개발 체제' }
      ],
      duties: [
        {
          title: '온라인 교육 플랫폼 백엔드 시스템 개발',
          icon: 'fa-graduation-cap',
          description: 'Spring Boot 기반 교육 플랫폼 백엔드 시스템 설계 및 구축, 15개 핵심 모듈 개발 (1개월 내 완성 후 실서비스 운영 중)'
        },
        {
          title: '사내 업무 자동화 시스템 개발',
          icon: 'fa-robot',
          description: 'Python 기반 인사팀 업무 자동화 시스템 구축 (채용 플랫폼 크롤링, 프리랜서 관리, SNS 계정 통합 관리)'
        }
      ],
      expertise: [
        {
          title: '성능 최적화',
          icon: 'fa-tachometer-alt',
          description: '데이터베이스 쿼리 최적화로 응답시간 40% 향상, AWS S3 Presigned URL 활용으로 서버 트래픽 비용 20% 절감, 배포 자동화로 배포 시간 60% 단축'
        },
        {
          title: '비즈니스 임팩트',
          icon: 'fa-chart-bar',
          description: 'OAuth2 소셜 로그인 도입으로 회원가입 완료율 106% 향상, 결제 시스템 안정화로 결제 실패율 80% 감소, 업무 자동화로 인사팀 효율성 70% 향상'
        },
        {
          title: '기술적 리더십',
          icon: 'fa-crown',
          description: '1인 풀스택 개발자로 기획부터 배포까지 전 개발 사이클 독립 수행, Docker 기반 CI/CD 파이프라인 구축, 확장 가능한 시스템 아키텍처 설계'
        },
        {
          title: '문제 해결 역량',
          icon: 'fa-lightbulb',
          description: 'N+1 쿼리 문제, JWT 토큰 갱신, 결제 데이터 정합성 등 복잡한 기술적 문제를 체계적으로 분석하고 창의적 해결책 도출'
        }
      ],
      tech: ['Java', 'Spring Boot 3.2.3', 'MyBatis', 'MySQL', 'AWS S3', 'Docker', 'Jenkins', 'Python', 'Selenium']
    }
  ]

  return (
    <Window
      id="experience-window"
      title="Experience"
      icon="fa-briefcase"
      onClose={onClose}
      onFocus={onFocus}
      zIndex={zIndex}
      width="900px"
      height="700px"
    >
      <div className="experience-container">
        {experiences.map(exp => (
          <div key={exp.id} className="experience-card">
            <div 
              className={`experience-header ${expandedExperience === exp.id ? 'expanded' : ''}`}
              onClick={() => toggleExperience(exp.id)}
            >
              <div className="experience-icon">
                <i className={`fas ${exp.icon}`}></i>
              </div>
              <div className="experience-title">
                <h3>{exp.company}</h3>
                <p className="company">{exp.position}</p>
              </div>
              <div className={`experience-badge ${exp.badgeType}`}>
                <i className="fas fa-building"></i> {exp.badge}
              </div>
              <div className="experience-toggle">
                <i className="fas fa-chevron-down"></i>
              </div>
            </div>
            <div className={`experience-details ${expandedExperience === exp.id ? 'expanded' : ''}`}>
              <div className="experience-meta">
                <span><i className="fas fa-calendar"></i> {exp.period}</span>
                <span><i className="fas fa-map-marker-alt"></i> {exp.location}</span>
                <span><i className="fas fa-user"></i> {exp.role}</span>
              </div>
              <div className="experience-description">
                <h4><i className="fas fa-briefcase"></i> 주요 직무 및 역할</h4>
                
                <div className="achievement-highlight">
                  {exp.achievements.map((achievement, index) => (
                    <div key={index} className="achievement-item">
                      <i className={`fas ${achievement.icon}`}></i>
                      <span>{achievement.text}</span>
                    </div>
                  ))}
                </div>
                
                <ul>
                  {exp.duties.map((duty, index) => (
                    <li key={index}>
                      <strong><i className={`fas ${duty.icon}`}></i> {duty.title}</strong><br />
                      {duty.description}
                    </li>
                  ))}
                </ul>
                
                {exp.results && (
                  <>
                    <h4><i className="fas fa-trophy"></i> 핵심 성과</h4>
                    <ul>
                      {exp.results.map((result, index) => (
                        <li key={index}>
                          <strong><i className={`fas ${result.icon}`}></i> {result.title}</strong><br />
                          {result.description}
                        </li>
                      ))}
                    </ul>
                  </>
                )}
                
                {exp.expertise && (
                  <>
                    <h4><i className="fas fa-trophy"></i> 핵심 성과</h4>
                    <div className="expertise-grid">
                      {exp.expertise.map((item, index) => (
                        <div key={index} className="expertise-item">
                          <div className="expertise-icon">
                            <i className={`fas ${item.icon}`}></i>
                          </div>
                          <div className="expertise-content">
                            <h5>{item.title}</h5>
                            <p>{item.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}
                
                <div className="tech-stack-section">
                  <h5><i className="fas fa-tools"></i> 활용 기술 스택</h5>
                  <div className="tech-stack-tags">
                    {exp.tech.map((tech, index) => (
                      <span key={index} className="tech-tag">{tech}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Window>
  )
}

export default ExperienceWindow

