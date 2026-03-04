/**
 * 프로젝트 목록 (위젯 + Projects 창 공통)
 *
 * 공통: id, title, category, projectType, featured, image, shortDescription, role, period, color
 *   - projectType: 'company' | 'personal' | 'team' | 'hackathon' (회사/개인/팀/해커톤 구분)
 * Projects 창 상세:
 *   - desc, overview, developed, learnings, results, tech, features
 */
export const PROJECT_TYPE_LABELS = {
  company: '회사 프로젝트',
  personal: '개인 프로젝트',
  team: '팀 프로젝트',
  hackathon: '해커톤'
}

export const projects = [
  {
    id: 'planflow',
    title: 'PlanFlow',
    category: 'SaaS',
    projectType: 'hackathon',
    featured: true,
    image: '/logos/planflow.png',
    shortDescription: 'AI 기반 프로젝트 관리',
    role: 'Solo Developer',
    period: '출시 예정',
    desc: 'AI를 활용한 프로젝트 관리·업무 플로우 자동화 서비스. 태스크 추천, 일정 최적화, 팀 협업 기능을 제공할 예정입니다.',
    overview: 'AI 기반으로 프로젝트와 업무 플로우를 자동화하는 SaaS. 사용자 태스크를 분석해 우선순위와 일정을 추천하고, 팀 단위 협업을 지원하는 서비스입니다.',
    developed: ['태스크 추천·일정 최적화 로직', 'OpenAI 연동 API', '프로젝트/팀 대시보드', '알림·리마인더 기능'],
    learnings: ['LLM을 활용한 태스크 분류·추천 설계', '프로덕트 관점에서 가치 정의 후 개발하는 흐름'],
    results: ['OpenAI × 조코딩 해커톤 1인 제출 완료', 'planflow.net 출시 예정'],
    tech: ['React', 'OpenAI API', 'Node.js'],
    features: ['AI 태스크 추천', '일정 최적화', '팀 협업'],
    color: '#5e5ce6'
  },
  {
    id: 'sellerkit',
    title: 'SellerKit',
    category: 'SaaS',
    projectType: 'company',
    featured: true,
    image: '/logos/bizboost.png',
    shortDescription: '쿠팡 셀러 올인원 분석',
    role: 'Solo Developer',
    period: '2025.07 ~ Present',
    desc: '쿠팡 셀러를 위한 올인원 분석 및 관리 솔루션. 광고 효율 분석, 마진 계산, 키워드 트래킹 기능 제공.',
    overview: '쿠팡 셀러가 광고·매출·키워드를 한곳에서 분석·관리할 수 있는 SaaS. 마진 계산, 광고 효율 트래킹, 인기 검색어 추출 등을 제공합니다.',
    developed: ['SaaS 대시보드(광고·매출·키워드 분석)', 'Chrome Extension 3종(광고 추출, 키워드 추출, 판매량 추적)', 'Redis 기반 캐시·배치 처리'],
    learnings: ['이커머스 셀러 도메인 이해와 기능 우선순위 설계', 'Extension ↔ 백엔드 연동 설계'],
    results: ['1인 풀스택으로 플랫폼·Extension 동시 운영', '실 사용자 피드백 반영 및 기능 확장'],
    tech: ['Vue.js 3', 'Spring Boot 3.2', 'Redis', 'AWS'],
    features: ['마진 계산기', '키워드 분석', '광고 효율 트래킹'],
    color: '#0a84ff'
  },
  {
    id: 'onestack',
    title: 'OneStack',
    category: 'Platform',
    projectType: 'team',
    featured: true,
    image: 'linear-gradient(135deg, #bf5af2 0%, #ff375f 100%)',
    shortDescription: 'IT 전문가 매칭·협업 플랫폼',
    role: 'Team Lead',
    period: '2024.12 ~ 2025.02',
    desc: 'IT 전문가 매칭 및 협업을 위한 올인원 커뮤니티 플랫폼',
    overview: 'IT 전문가와 프로젝트를 매칭하고, 실시간 채팅·화상 회의로 협업할 수 있는 커뮤니티 플랫폼입니다.',
    developed: ['실시간 채팅(WebSocket)', '프로젝트 매칭·신청 플로우', '화상 회의 연동', '팀·프로젝트 관리 기능'],
    learnings: ['팀 리드로서 요구사항 정리·태스크 분배', '실시간 통신과 상태 동기화 설계'],
    results: ['팀 단위 기획·개발·배포 완료', '핵심 기능 MVP 출시'],
    tech: ['Java', 'Spring Boot', 'WebSocket', 'AWS', 'Docker'],
    features: ['실시간 채팅', '프로젝트 매칭', '화상 회의 연동'],
    color: '#bf5af2'
  },
  {
    id: 'onclass',
    title: 'OnClass',
    category: 'Platform',
    projectType: 'company',
    featured: false,
    image: 'linear-gradient(135deg, #30d158 0%, #32d74b 100%)',
    shortDescription: '온라인 교육 플랫폼',
    role: 'Solo Developer',
    period: '2025.04 ~ 2025.07',
    desc: '온라인 교육 플랫폼 백엔드 전체 구축. OAuth2 로그인, 결제 모듈, 스트리밍 서버 연동.',
    overview: '온라인 강의 수강·결제·자료 시청이 가능한 교육 플랫폼의 백엔드. OAuth2, 결제, 스트리밍 연동을 담당했습니다.',
    developed: ['OAuth2 로그인·권한 관리', '결제 모듈(PG 연동)', '스트리밍 서버 연동 API', '강의·자료실 CRUD'],
    learnings: ['결제·정산 플로우 설계', '스트리밍과 DRM 연동 경험'],
    results: ['백엔드 전 구간 1인 개발 완료', '운영 환경 배포 및 안정화'],
    tech: ['Spring Boot', 'Spring Security', 'JPA', 'MySQL'],
    features: ['강의 시청', '결제 시스템', '자료실'],
    color: '#30d158'
  },
  {
    id: 'ad-extractor',
    title: 'Ad Extractor',
    category: 'Tool',
    projectType: 'company',
    featured: false,
    image: 'linear-gradient(135deg, #ff9f0a 0%, #ffd60a 100%)',
    shortDescription: '쿠팡 광고 데이터 수집 도구',
    role: 'Toy Project',
    period: '2025.09',
    desc: '쿠팡 광고 데이터 자동 수집 Chrome Extension. 분석 시간 80% 단축.',
    overview: '쿠팡 셀러 광고 페이지에서 캠페인·키워드 데이터를 자동으로 수집해 엑셀로 내보내는 Chrome Extension입니다.',
    developed: ['광고 페이지 파싱·데이터 추출', '엑셀 다운로드(ExcelJS)', '옵션·필터 UI'],
    learnings: ['Chrome Extension API와 DOM 파싱', '대량 데이터를 엑셀로 내보내는 처리'],
    results: ['수동 수집 대비 분석 시간 약 80% 단축', '실무에서 사용·피드백 반영'],
    tech: ['Chrome Extension', 'JavaScript', 'ExcelJS'],
    features: ['광고 데이터 파싱', '엑셀 다운로드', '자동화'],
    color: '#ff9f0a'
  },
  {
    id: 'keyword-extractor',
    title: 'Keyword Tool',
    category: 'Tool',
    projectType: 'personal',
    featured: false,
    image: 'linear-gradient(135deg, #ff375f 0%, #bf5af2 100%)',
    shortDescription: '쿠팡 키워드·트렌드 분석',
    role: 'Toy Project',
    period: '2025.08',
    desc: '쿠팡 인기 검색어 및 트렌드 분석 도구.',
    overview: '쿠팡 인기 검색어·트렌드를 수집·시각화하는 도구. Chrome Extension으로 데이터를 추출하고 간단한 분석 뷰를 제공합니다.',
    developed: ['검색어 추출 로직(Fetch·파싱)', '트렌드 시각화 UI', '데이터 내보내기'],
    learnings: ['외부 페이지 데이터 수집 시 한계와 우회 방법'],
    results: ['키워드 기반 의사결정에 활용', 'SellerKit 키워드 기능의 기반이 됨'],
    tech: ['Chrome Extension', 'Fetch API', 'JSON Parsing'],
    features: ['키워드 추출', '트렌드 분석', '데이터 시각화'],
    color: '#ff375f'
  }
]

/** 위젯에 노출할 프로젝트 (featured === true) */
export const featuredProjects = projects.filter(p => p.featured)
