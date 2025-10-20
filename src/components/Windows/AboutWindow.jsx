import Window from './Window'

function AboutWindow({ onClose, onFocus, zIndex }) {
  return (
    <Window
      id="about-window"
      title="About Me - Resume"
      icon="fa-user-circle"
      onClose={onClose}
      onFocus={onFocus}
      zIndex={zIndex}
      width="1000px"
      height="750px"
    >
      <div className="resume-content">
        {/* Header Section - Professional Card */}
        <div className="resume-header">
          <div className="resume-photo-section">
            <div className="resume-photo">
              <img src="/taemin.jpg" alt="Kyle" />
              <div className="status-badge">
                <div className="status-dot"></div>
                <span>Available</span>
              </div>
            </div>
          </div>
          
          <div className="resume-info-section">
            <div className="name-title">
              <h1>김태민 <span className="eng-name">Kyle Kim</span></h1>
              <p className="job-title">
                <i className="fas fa-code"></i> Education PM & Full-stack Developer
              </p>
            </div>
            
            <div className="contact-grid">
              <div className="contact-item">
                <i className="fas fa-envelope"></i>
                <span>rlaxoals9977@gmail.com</span>
              </div>
              <div className="contact-item">
                <i className="fas fa-phone"></i>
                <span>010-5578-5037</span>
              </div>
              <div className="contact-item">
                <i className="fas fa-map-marker-alt"></i>
                <span>Seoul, Korea</span>
              </div>
              <div className="contact-item">
                <i className="fas fa-birthday-cake"></i>
                <span>1999 (25세)</span>
              </div>
              <div className="contact-item">
                <i className="fab fa-github"></i>
                <span>github.com/Kyle-TM99</span>
              </div>
              <div className="contact-item">
                <i className="fas fa-blog"></i>
                <span>pids.tistory.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Professional Summary */}
        <section className="resume-section summary-section">
          <div className="section-header">
            <i className="fas fa-quote-left"></i>
            <h2>Professional Summary</h2>
          </div>
          <div className="summary-content">
            <p className="summary-quote">"처음부터 끝까지, 제가 직접 만듭니다"</p>
            <p className="summary-text">
              <strong>1년 차 풀스택 개발자</strong>로서 기획부터 배포까지 전체 프로세스를 독립적으로 수행하는 <strong>End-to-End 개발 역량</strong>을 보유하고 있습니다. 
              두 차례의 팀 프로젝트에서 <strong>팀 리더</strong>를 맡아 프로젝트를 성공적으로 이끌었으며, 
              현재는 <strong>베오</strong>에서 Education PM 겸 1인 풀스택 개발자로 <strong>SaaS 플랫폼</strong>을 단독 개발·운영하고 있습니다.
            </p>
            <p className="summary-text">
              단순히 코드를 작성하는 것을 넘어, <strong>비즈니스 가치를 창출</strong>하는 개발자입니다. 
              회원가입 완료율 <strong>106% 향상</strong>, 응답시간 <strong>40% 개선</strong>, 분석 시간 <strong>80% 단축</strong> 등 
              <strong>측정 가능한 성과</strong>를 만들어내며, 기술이 실제 문제를 해결하는 과정에 집중합니다.
            </p>
          </div>
        </section>

        {/* Core Competencies - Card Style */}
        <section className="resume-section">
          <div className="section-header">
            <i className="fas fa-star"></i>
            <h2>Core Competencies</h2>
          </div>
          <div className="competencies-grid">
            <div className="competency-card">
              <div className="competency-icon">
                <i className="fas fa-project-diagram"></i>
              </div>
              <h3>End-to-End Development</h3>
              <p>기획, 설계, 개발, 배포, 운영까지 전체 프로세스를 독립적으로 수행</p>
              <ul className="competency-items">
                <li>1인 풀스택 SaaS 플랫폼 구축</li>
                <li>15개 핵심 모듈 1개월 내 완성</li>
                <li>실서비스 운영 및 유지보수</li>
              </ul>
            </div>
            
            <div className="competency-card">
              <div className="competency-icon">
                <i className="fas fa-users-cog"></i>
              </div>
              <h3>Team Leadership</h3>
              <p>프로젝트 리딩 및 팀원 간 효과적인 커뮤니케이션 조율</p>
              <ul className="competency-items">
                <li>2회 팀 프로젝트 리더 경험</li>
                <li>5명 팀 프로젝트 성공적 완수</li>
                <li>기획·일정·리스크 관리</li>
              </ul>
            </div>
            
            <div className="competency-card">
              <div className="competency-icon">
                <i className="fas fa-chart-line"></i>
              </div>
              <h3>Business Impact</h3>
              <p>측정 가능한 비즈니스 성과를 만들어내는 개발</p>
              <ul className="competency-items">
                <li>회원가입 완료율 106% 향상</li>
                <li>응답시간 40% 개선</li>
                <li>업무 효율 70% 증대</li>
              </ul>
            </div>
            
            <div className="competency-card">
              <div className="competency-icon">
                <i className="fas fa-lightbulb"></i>
              </div>
              <h3>Problem Solving</h3>
              <p>복잡한 기술적 문제를 체계적으로 분석하고 해결</p>
              <ul className="competency-items">
                <li>N+1 쿼리 최적화</li>
                <li>결제 데이터 정합성 100% 확보</li>
                <li>분석 시간 80% 단축</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Key Achievements */}
        <section className="resume-section">
          <div className="section-header">
            <i className="fas fa-trophy"></i>
            <h2>Key Achievements</h2>
          </div>
          <div className="achievements-showcase">
            <div className="achievement-box">
              <div className="achievement-number">106%</div>
              <div className="achievement-label">회원가입 완료율 향상</div>
              <div className="achievement-desc">OAuth2 소셜 로그인 도입</div>
            </div>
            <div className="achievement-box">
              <div className="achievement-number">40%</div>
              <div className="achievement-label">응답시간 개선</div>
              <div className="achievement-desc">쿼리 최적화 및 인덱스 설계</div>
            </div>
            <div className="achievement-box">
              <div className="achievement-number">80%</div>
              <div className="achievement-label">분석 시간 단축</div>
              <div className="achievement-desc">Chrome Extension 개발</div>
            </div>
            <div className="achievement-box">
              <div className="achievement-number">70%</div>
              <div className="achievement-label">업무 효율 증대</div>
              <div className="achievement-desc">Python 자동화 시스템 구축</div>
            </div>
            <div className="achievement-box">
              <div className="achievement-number">100%</div>
              <div className="achievement-label">결제 정합성 확보</div>
              <div className="achievement-desc">분산 락 기반 처리</div>
            </div>
            <div className="achievement-box">
              <div className="achievement-number">60%</div>
              <div className="achievement-label">배포 시간 단축</div>
              <div className="achievement-desc">Docker CI/CD 구축</div>
            </div>
          </div>
        </section>

        {/* Technical Stack Summary */}
        <section className="resume-section">
          <div className="section-header">
            <i className="fas fa-laptop-code"></i>
            <h2>Technical Expertise</h2>
          </div>
          <div className="tech-summary">
            <div className="tech-category-summary">
              <div className="tech-category-icon">
                <i className="fas fa-server"></i>
              </div>
              <div className="tech-category-content">
                <h4>Backend</h4>
                <p>Java 17, Spring Boot 3.x, Spring Security, JPA, MyBatis, JWT, OAuth2</p>
              </div>
            </div>
            <div className="tech-category-summary">
              <div className="tech-category-icon">
                <i className="fas fa-desktop"></i>
              </div>
              <div className="tech-category-content">
                <h4>Frontend</h4>
                <p>Vue.js 3, React 18, Vite, Tailwind CSS, Chart.js, JavaScript ES6+</p>
              </div>
            </div>
            <div className="tech-category-summary">
              <div className="tech-category-icon">
                <i className="fas fa-database"></i>
              </div>
              <div className="tech-category-content">
                <h4>Database</h4>
                <p>MySQL, Redis, QueryDSL, 쿼리 최적화, 인덱스 설계</p>
              </div>
            </div>
            <div className="tech-category-summary">
              <div className="tech-category-icon">
                <i className="fas fa-cloud"></i>
              </div>
              <div className="tech-category-content">
                <h4>DevOps</h4>
                <p>AWS (EC2, S3), Docker, Jenkins, CI/CD, Linux</p>
              </div>
            </div>
            <div className="tech-category-summary">
              <div className="tech-category-icon">
                <i className="fas fa-puzzle-piece"></i>
              </div>
              <div className="tech-category-content">
                <h4>Tools & More</h4>
                <p>Git, Chrome Extension, Python, Selenium, API Integration</p>
              </div>
            </div>
          </div>
        </section>

        {/* Career Timeline */}
        <section className="resume-section">
          <div className="section-header">
            <i className="fas fa-briefcase"></i>
            <h2>Career Timeline</h2>
          </div>
          <div className="timeline">
            <div className="timeline-item current">
              <div className="timeline-marker">
                <i className="fas fa-circle"></i>
              </div>
              <div className="timeline-content">
                <div className="timeline-header">
                  <h3>베오 (BEO)</h3>
                  <span className="timeline-period">2025.07 ~ 현재</span>
                </div>
                <p className="timeline-position">Education PM & Full-stack Developer</p>
                <ul className="timeline-highlights">
                  <li>SellerKit SaaS 플랫폼 1인 풀스택 개발 (Vue.js 3 + Spring Boot 3.2)</li>
                  <li>Chrome Extension 3종 개발 (데이터 수집 자동화)</li>
                  <li>교육 플랫폼 프로젝트 PM (기획, 일정 관리, 팀 조율)</li>
                  <li>쿠팡 Open API 연동 및 실시간 데이터 분석 시스템 구축</li>
                </ul>
              </div>
            </div>
            
            <div className="timeline-item">
              <div className="timeline-marker">
                <i className="fas fa-circle"></i>
              </div>
              <div className="timeline-content">
                <div className="timeline-header">
                  <h3>GoodSen</h3>
                  <span className="timeline-period">2025.04 ~ 2025.07</span>
                </div>
                <p className="timeline-position">Backend Developer (1인 개발)</p>
                <ul className="timeline-highlights">
                  <li>온라인 교육 플랫폼 백엔드 시스템 설계 및 구축 (15개 모듈, 1개월 완성)</li>
                  <li>OAuth2 소셜 로그인 구현 (회원가입 완료율 106% 향상)</li>
                  <li>결제 시스템 안정화 (실패율 80% 감소, 정합성 100% 확보)</li>
                  <li>Python 업무 자동화 시스템 구축 (인사팀 효율 70% 향상)</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Projects */}
        <section className="resume-section">
          <div className="section-header">
            <i className="fas fa-rocket"></i>
            <h2>Featured Projects</h2>
          </div>
          <div className="featured-projects">
            <div className="featured-project">
              <div className="project-header-mini">
                <div className="project-icon-mini">
                  <i className="fas fa-shopping-cart"></i>
                </div>
                <div>
                  <h4>SellerKit - 쿠팡 셀러 어시스턴트 SaaS</h4>
                  <span className="project-badge-mini">1인 풀스택 | 2025.07~현재</span>
                </div>
              </div>
              <p>쿠팡 판매자를 위한 올인원 관리 플랫폼. 광고 분석, 마진 계산, 소싱 전략, 커뮤니티 운영 등 통합 솔루션</p>
              <div className="project-tech-mini">
                <span>Vue.js 3</span>
                <span>Spring Boot 3.2</span>
                <span>Redis</span>
                <span>MySQL</span>
                <span>AWS S3</span>
              </div>
            </div>
            
            <div className="featured-project">
              <div className="project-header-mini">
                <div className="project-icon-mini">
                  <i className="fas fa-graduation-cap"></i>
                </div>
                <div>
                  <h4>OnClass - 온라인 교육 플랫폼</h4>
                  <span className="project-badge-mini">1인 풀스택 | 2025.04~2025.07</span>
                </div>
              </div>
              <p>1개월 내 개발 완료 및 실서비스 운영 중. 15개 핵심 모듈 포함 (인증, 결제, 강의관리, 파일업로드 등)</p>
              <div className="project-tech-mini">
                <span>Spring Boot</span>
                <span>OAuth2</span>
                <span>JWT</span>
                <span>PortOne</span>
                <span>Docker</span>
              </div>
            </div>
            
            <div className="featured-project">
              <div className="project-header-mini">
                <div className="project-icon-mini">
                  <i className="fas fa-users"></i>
                </div>
                <div>
                  <h4>OneStack - IT 전문가 매칭 플랫폼</h4>
                  <span className="project-badge-mini">팀장 (5명) | 2024.12~2025.02</span>
                </div>
              </div>
              <p>프로젝트 리딩, AWS 인프라 구축, WebSocket 채팅, CI/CD 파이프라인 구축 (백엔드 75% + 배포 100%)</p>
              <div className="project-tech-mini">
                <span>Spring</span>
                <span>WebSocket</span>
                <span>AWS</span>
                <span>Docker</span>
                <span>Jenkins</span>
              </div>
            </div>
          </div>
        </section>

        {/* Professional Strength */}
        <section className="resume-section">
          <div className="section-header">
            <i className="fas fa-medal"></i>
            <h2>Why Me?</h2>
          </div>
          <div className="why-me-content">
            <div className="why-me-item">
              <div className="why-me-number">01</div>
              <div className="why-me-text">
                <h4>독립적인 개발 역량</h4>
                <p>기획부터 배포까지 전 과정을 혼자서도 완성할 수 있는 풀스택 역량. 1인 개발 프로젝트 다수 성공적 완수</p>
              </div>
            </div>
            <div className="why-me-item">
              <div className="why-me-number">02</div>
              <div className="why-me-text">
                <h4>증명된 팀 리더십</h4>
                <p>2회 팀 프로젝트 리더 경험. 기획, 일정 관리, 팀원 조율을 통해 프로젝트를 성공으로 이끈 실적</p>
              </div>
            </div>
            <div className="why-me-item">
              <div className="why-me-number">03</div>
              <div className="why-me-text">
                <h4>비즈니스 가치 창출</h4>
                <p>단순한 개발이 아닌, 측정 가능한 비즈니스 성과를 만들어내는 개발. 숫자로 증명된 임팩트</p>
              </div>
            </div>
            <div className="why-me-item">
              <div className="why-me-number">04</div>
              <div className="why-me-text">
                <h4>빠른 학습과 적응</h4>
                <p>새로운 기술 스택을 빠르게 습득하고 실무에 적용. Vue.js, React, Chrome Extension 등 다양한 기술 경험</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Window>
  )
}

export default AboutWindow
