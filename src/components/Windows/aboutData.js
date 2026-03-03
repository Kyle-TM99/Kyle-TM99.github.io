/**
 * About Me 창에서 사용하는 정적 데이터
 * 이력/프로젝트 업데이트 시 이 파일만 수정하면 됨
 */

export const TABS = [
  { id: 'profile', icon: 'fa-user', label: 'Profile' },
  { id: 'career', icon: 'fa-briefcase', label: 'Career' },
  { id: 'skills', icon: 'fa-code', label: 'Skills' },
  { id: 'projects', icon: 'fa-rocket', label: 'Projects' }
]

export const CAREER_DATA = [
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

export const SKILLS_CATEGORIES = [
  {
    icon: 'fa-server',
    title: 'Backend',
    tags: ['Java 17', 'Spring Boot 3', 'JPA/Hibernate', 'QueryDSL', 'Redis', 'MySQL']
  },
  {
    icon: 'fa-desktop',
    title: 'Frontend',
    tags: ['React 18', 'Vue.js 3', 'TailwindCSS', 'Vite', 'Framer Motion']
  },
  {
    icon: 'fa-cloud',
    title: 'DevOps & Tools',
    tags: ['AWS (EC2, S3)', 'Docker', 'Jenkins', 'Git', 'Selenium']
  }
]

export const PROJECTS_GALLERY = [
  {
    title: 'OneStack',
    role: 'Team Lead',
    period: '2024.12 ~ 2025.02',
    category: 'Community Platform',
    desc: 'IT 전문가 매칭 및 협업을 위한 올인원 커뮤니티 플랫폼',
    tech: ['Java', 'Spring Boot', 'WebSocket', 'AWS', 'Docker'],
    features: ['실시간 채팅', '프로젝트 매칭', '화상 회의 연동'],
    color: '#bf5af2',
    liveUrl: '',
    repoUrl: 'https://github.com/Kyle-TM99'
  },
  {
    title: 'SellerKit',
    role: 'Solo Developer',
    period: '2025.07 ~ Present',
    category: 'SaaS Solution',
    desc: '쿠팡 셀러를 위한 데이터 분석 및 마진 관리 자동화 솔루션',
    tech: ['Vue.js', 'Spring Boot', 'Redis', 'JPA'],
    features: ['마진 계산기', '키워드 분석', '광고 효율 트래킹'],
    color: '#0a84ff',
    liveUrl: '',
    repoUrl: ''
  },
  {
    title: 'OnClass',
    role: 'Solo Developer',
    period: '2025.04 ~ 2025.07',
    category: 'LMS Platform',
    desc: '15개 핵심 모듈을 탑재한 온라인 교육 및 강의 플랫폼',
    tech: ['Spring Security', 'OAuth2', 'PortOne', 'MySQL'],
    features: ['강의 시청', '결제 시스템', '자료실'],
    color: '#30d158',
    liveUrl: '',
    repoUrl: ''
  }
]
