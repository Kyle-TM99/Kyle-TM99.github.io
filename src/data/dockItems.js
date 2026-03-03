/**
 * Dock에 표시되는 앱/링크 목록
 * - id: 창 식별자 (openWindows와 매칭, external이 있으면 미사용)
 * - icon: FontAwesome 클래스 (fas/fab fa-xxx)
 * - tooltip: 호버 시 표시 텍스트
 * - external: 있으면 새 탭으로 열기 (없으면 onOpenWindow(id) 호출)
 */
export const dockItems = [
  { id: 'about', icon: 'fas fa-user-circle', tooltip: 'About Me' },
  { id: 'news', icon: 'fas fa-newspaper', tooltip: 'News' },
  { id: 'projects', icon: 'fas fa-folder-open', tooltip: 'Projects' },
  { id: 'contact', icon: 'fas fa-envelope', tooltip: 'Contact' },
  { id: 'blog', icon: 'fas fa-blog', tooltip: 'Tech Blog', external: 'https://pids.tistory.com/' },
  { id: 'github', icon: 'fab fa-github', tooltip: 'GitHub', external: 'https://github.com/Kyle-TM99' },
  { id: 'terminal', icon: 'fas fa-terminal', tooltip: 'Terminal' }
]
