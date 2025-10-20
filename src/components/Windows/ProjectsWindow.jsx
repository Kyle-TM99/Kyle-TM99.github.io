import { useState } from 'react'
import Window from './Window'

function ProjectsWindow({ onClose, onFocus, zIndex }) {
  const [expandedProject, setExpandedProject] = useState(null)

  const toggleProject = (projectId) => {
    setExpandedProject(expandedProject === projectId ? null : projectId)
  }

  const projects = [
    {
      id: 'sellerkit',
      icon: 'fa-shopping-cart',
      title: 'SellerKit',
      subtitle: '쿠팡 셀러 어시스턴트 솔루션 - 쿠팡 판매자를 위한 올인원 SaaS 플랫폼',
      badge: '1인 풀스택',
      badgeType: 'solo',
      period: '2025.07 ~ 현재',
      role: '1인 풀스택 개발',
      company: '베오',
      description: '쿠팡 판매자를 위한 통합 관리형 SaaS 솔루션으로, 광고 효율 분석부터 마진 계산, 소싱 전략 수립, 커뮤니티 운영까지 한 번에 관리할 수 있도록 설계된 플랫폼. 기획·설계·백엔드·프론트엔드·배포까지 전 과정을 1인 풀스택으로 수행.',
      features: [
        '쿠팡 Open API 연동: 광고 데이터, 매출 데이터 실시간 수집 및 분석',
        'KPI 대시보드: ROAS, CPC, CTR, CVR 등 핵심 지표 시각화',
        '광고 분석 엔진: 자동 계산 및 기간별 추이 분석 시스템',
        '마진 계산기: 국내/해외 사입, 제로 ROAS, 적정 원가 자동 산출',
        '소싱 분석기: 시장 점수 기반 상품 소싱 추천 및 수익률 비교',
        '성장 코치: 광고 효율, 매출 트렌드, 마진 개선 가이드 제공',
        '커뮤니티 시스템: 기수별 게시판, 댓글/대댓글, 좋아요, 공지, 권한 제어',
        '회원/보안 모듈: JWT 인증, 이메일/문자 인증, 프로필 관리, 실시간 알림'
      ],
      achievements: [
        '기획부터 배포까지 전 과정 1인 개발로 완성',
        '쿠팡 Open API 및 내부 네트워크 분석을 통한 데이터 수집 자동화',
        '실제 쿠팡 셀러들의 광고 효율·매출 분석·소싱 전략 자동화 도구로 상용화',
        '클라우드 기반 인프라 안정화 (AWS S3 + Redis + MySQL + SMTP + SMS)',
        'Vue3 + Tailwind + Chart.js를 통한 직관적이고 모던한 UI 구현'
      ],
      tech: ['Java 17', 'Spring Boot 3.2.0', 'Spring Security', 'MyBatis', 'MySQL', 'Redis', 'JWT', 'Vue.js 3', 'Vite', 'Pinia', 'Tailwind CSS', 'Chart.js', 'AWS S3', 'Coupang API']
    },
    {
      id: 'ad-extractor',
      icon: 'fa-puzzle-piece',
      title: '쿠팡 광고 캠페인 추출기',
      subtitle: 'Chrome Extension - 광고 데이터 자동 수집 도구',
      badge: '개인 프로젝트',
      badgeType: 'solo',
      period: '2025.09',
      role: '개인 프로젝트',
      company: '베오',
      description: '쿠팡 광고보드의 네트워크 응답값을 파싱하여 Excel 데이터로 자동 변환하는 브라우저 확장 프로그램. 광고 캠페인별 KPI를 빠르게 수집하여 분석 시간을 80% 이상 단축.',
      features: [
        '네트워크 트래픽 분석: 쿠팡 관리자 페이지의 네트워크 응답 데이터 실시간 파싱',
        '자동 데이터 변환: 광고 그룹, 캠페인명, 노출수, 클릭수, 전환율, 광고비 등 핵심 지표 자동 정리',
        'Excel 다운로드: ExcelJS를 이용한 실시간 데이터 시트 생성 및 다운로드',
        '분석 시간 단축: 수동 작업 대비 80% 이상의 시간 절감 효과'
      ],
      tech: ['Chrome Extension', 'Manifest v3', 'JavaScript', 'Axios', 'ExcelJS', 'JSON Parsing']
    },
    {
      id: 'keyword-extractor',
      icon: 'fa-search',
      title: '쿠팡 인기상품 검색어 추출기',
      subtitle: 'Chrome Extension - 트렌딩 키워드 수집 도구',
      badge: '개인 프로젝트',
      badgeType: 'solo',
      period: '2025.08',
      role: '개인 프로젝트',
      company: '베오',
      description: '쿠팡 관리자 페이지의 "인기상품 검색" 기능에서 실시간 인기 검색어·상품 현황을 추출하는 브라우저 확장 프로그램. 마케팅 캠페인 및 상품 등록 시점 최적화에 활용.',
      features: [
        '실시간 트렌드 수집: 쿠팡 내부 API에서 인기 검색어 및 상품 데이터 추출',
        'Network 응답 가공: JSON 응답 데이터를 가공하여 엑셀 형식으로 변환',
        '마케팅 인사이트: 상품 등록 및 광고 캠페인 시점 최적화를 위한 데이터 제공',
        '사용자 친화적 UI: 간편한 클릭 한 번으로 데이터 다운로드'
      ],
      tech: ['Chrome Extension', 'Manifest v3', 'JavaScript', 'Fetch API', 'ExcelJS', 'API Interception']
    },
    {
      id: 'sales-tracker',
      icon: 'fa-chart-line',
      title: '쿠팡 판매량 추적기',
      subtitle: 'Chrome Extension - 실판매량 데이터 추출 도구',
      badge: '개인 프로젝트',
      badgeType: 'solo',
      period: '2025.10',
      role: '개인 프로젝트',
      company: '베오',
      description: '쿠팡 내부 API 요청 인터셉트를 통해 상품별 실판매량 데이터를 100% 정확도로 추출하는 브라우저 확장 프로그램. 오피셜 API 미지원 데이터까지 직접 수집하여 정밀한 매출 분석 기반 확보.',
      features: [
        'API 인터셉트: 쿠팡 내부 API 요청을 인터셉트하여 실판매량 데이터 추출',
        '정확한 데이터 수집: 상품별 일별 판매량, 누적 매출, 카테고리별 트렌드 100% 정확도로 추적',
        '미지원 데이터 확보: 공식 API에서 제공하지 않는 내부 데이터까지 수집',
        '정밀한 분석 기반: 실제 판매 데이터 기반의 정확한 시장 분석 가능'
      ],
      achievements: [
        'Axios/Fetch API 인터셉트를 통한 네트워크 트래픽 모니터링',
        '사용자 입력 기반 동적 URL 추출 및 인증 쿠키 기반 세션 유지',
        '스크립트 경량화 및 비동기 처리로 빠른 응답 구현'
      ],
      tech: ['Chrome Extension', 'Manifest v3', 'JavaScript', 'API Interception', 'ExcelJS', 'Cookie Management']
    },
    {
      id: 'onclass',
      icon: 'fa-graduation-cap',
      title: 'OnClass',
      subtitle: '온라인 교육 플랫폼',
      badge: '1인 풀스택',
      badgeType: 'solo',
      period: '2025.04 ~ 2025.07 (1개월 개발)',
      role: '1인 풀스택 개발',
      company: 'GoodSen',
      description: '1개월 내 개발 완료 및 실서비스 운영 중인 확장 가능한 온라인 교육 플랫폼. Spring Boot 기반 백엔드 시스템 설계 및 15개 핵심 모듈 개발.',
      features: [
        'OAuth2 소셜 로그인: Spring Security OAuth2 기반 커스텀 OAuth2UserService 구현, JWT 토큰 자동 갱신',
        '강의 관리 시스템: 강의 등록, 수정, 삭제, 카테고리별 조회 및 검색 기능',
        '결제 시스템: PortOne API 연동, 멱등성 키 검증 로직, 분산 락 기반 트랜잭션 처리',
        '파일 업로드: AWS S3 Presigned URL 활용한 직접 업로드 방식, 대용량 동영상 처리',
        '수강생 관리: 수강 신청, 진도율 추적, 수료증 발급 시스템'
      ],
      achievements: [
        '성능 최적화: MyBatis JOIN 최적화 및 복합 인덱스 설계로 응답시간 40% 향상 (3초 → 1.8초)',
        '비즈니스 임팩트: OAuth2 소셜 로그인 도입으로 회원가입 완료율 106% 향상 (35% → 72%)',
        '시스템 안정성: 결제 실패율 80% 감소 (5% → 1% 미만), 결제 데이터 정합성 100% 확보',
        '배포 자동화: Docker 컨테이너화 및 Jenkins CI/CD 파이프라인 구축으로 배포 시간 60% 단축',
        '비용 절감: AWS S3 Presigned URL 활용으로 서버 트래픽 비용 20% 절감'
      ],
      tech: ['Java', 'Spring Boot 3.2.3', 'Spring Security', 'MyBatis', 'OAuth2', 'JWT', 'MySQL', 'AWS S3', 'AWS EC2', 'PortOne', 'Docker', 'Jenkins']
    },
    {
      id: 'onestack',
      icon: 'fa-users',
      title: 'OneStack',
      subtitle: 'IT 전문가 매칭 플랫폼',
      badge: '팀장',
      badgeType: 'team-lead',
      period: '2024.12 ~ 2025.02 (2개월)',
      role: '5명 팀 프로젝트',
      contribution: '백엔드 75% + 프론트엔드 50% + 배포 100%',
      description: 'IT 전문가와 클라이언트를 연결하는 매칭 플랫폼',
      features: [
        'Technical Lead: OAuth2.0 소셜 로그인(카카오, 구글), JWT 인증 및 비밀번호 복구 기능, WebSocket 기반 실시간 채팅 시스템 및 알림 기능, 게시판 및 협업 캘린더 시스템, 견적 요청 및 상태 관리 시스템, 리뷰 조회 및 작성 기능',
        'Infrastructure: AWS 기반 인프라 구축(EC2, MySQL, Docker, NGINX), CI/CD 자동화(Jenkins, GitHub Actions), HTTPS 인증 및 도메인 구성(Let\'s Encrypt), 이미지 서버 구축 및 최적화',
        'Project Lead: 프로젝트 수행 계획서, 요구사항 명세서, 기능 명세서 작성, 서비스 기획 및 시장 조사, 화면 레이아웃 설계, 데이터베이스 설계 및 ERD 구성, Develop Sequence 정의 및 일정 관리',
        'People Management: 팀원별 역할 분배 및 업무 진행 상황 모니터링, GitHub Issues 및 PR 리뷰 문화 도입, 정기 회의 진행 및 피드백 반영, 팀 내 기술 공유 세션 운영, 이슈 조정 및 해결을 위한 소통 담당'
      ],
      challenges: [
        'WebSocket 연결 유지 및 메시지 전달 누락 방지를 위한 세션 관리 및 예외 처리 구조 설계',
        'AWS EC2, Docker, NGINX 활용한 인프라 설계 및 배포 자동화 과정에서 네트워크 포트 충돌, CI/CD 구성 오류, 도메인 연결 문제 해결',
        '서비스 기획부터 배포까지 전체 프로젝트 라이프사이클 리딩하며 팀원 역량과 일정 조율, 기능 우선순위 재조정을 통한 리스크 관리'
      ],
      tech: ['Java', 'Spring', 'WebSocket', 'OAuth2', 'JWT', 'AWS', 'Docker', 'Jenkins', 'MySQL', 'NGINX']
    }
  ]

  return (
    <Window
      id="projects-window"
      title="Projects"
      icon="fa-folder-open"
      onClose={onClose}
      onFocus={onFocus}
      zIndex={zIndex}
      width="900px"
      height="700px"
    >
      <div className="projects-container">
        {projects.map(project => (
          <div key={project.id} className="project-card">
            <div 
              className={`project-header ${expandedProject === project.id ? 'expanded' : ''}`}
              onClick={() => toggleProject(project.id)}
            >
              <div className="project-icon">
                <i className={`fas ${project.icon}`}></i>
              </div>
              <div className="project-title">
                <h3>{project.title}</h3>
                <p className="project-subtitle">{project.subtitle}</p>
              </div>
              <div className={`project-badge ${project.badgeType}`}>
                <i className="fas fa-building"></i> {project.badge}
              </div>
              <div className="project-toggle">
                <i className="fas fa-chevron-down"></i>
              </div>
            </div>
            <div className={`project-details ${expandedProject === project.id ? 'expanded' : ''}`}>
              <div className="project-meta">
                <span><i className="fas fa-calendar"></i> {project.period}</span>
                <span><i className="fas fa-user"></i> {project.role}</span>
                <span><i className="fas fa-building"></i> {project.company}</span>
                {project.contribution && <span><i className="fas fa-code"></i> {project.contribution}</span>}
              </div>
              <div className="project-description">
                <h4>프로젝트 개요</h4>
                <p>{project.description}</p>
                
                <h4>주요 기능</h4>
                <ul>
                  {project.features.map((feature, index) => (
                    <li key={index} dangerouslySetInnerHTML={{ __html: feature.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                  ))}
                </ul>
                
                {project.achievements && (
                  <>
                    <h4>기술적 성과</h4>
                    <ul>
                      {project.achievements.map((achievement, index) => (
                        <li key={index} dangerouslySetInnerHTML={{ __html: achievement.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                      ))}
                    </ul>
                  </>
                )}
                
                {project.challenges && (
                  <>
                    <h4>기술적 도전 과제</h4>
                    <ul>
                      {project.challenges.map((challenge, index) => (
                        <li key={index}>{challenge}</li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
              <div className="project-tech">
                {project.tech.map((tech, index) => (
                  <span key={index} className="tech-tag">{tech}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Window>
  )
}

export default ProjectsWindow

