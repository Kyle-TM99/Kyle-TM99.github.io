function ExperienceWidget() {
  const experiences = [
    {
      period: '2025.12 ~ Current',
      company: 'BARO Interactive',
      position: 'Full-stack Developer',
      impactTags: ['Web/App 개발', '교육·커머스 도메인'],
      current: true
    },
    {
      period: '2025.07 ~ 2025.11',
      company: 'BEO (베오)',
      position: 'PM & Full-stack',
      impactTags: ['1인 SaaS 플랫폼', 'Chrome Extension 3종'],
      current: false
    },
    {
      period: '2025.04 ~ 2025.07',
      company: 'GoodSen',
      position: 'Backend Developer',
      impactTags: ['LMS 백엔드 구축', '업무 효율 70% 증대'],
      current: false
    }
  ]

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div className="widget-header">
        <i className="fas fa-briefcase" aria-hidden></i>
        <span>Experience</span>
      </div>
      <div className="widget-content">
        <div className="experience-summary">
          <div className="experience-list">
            {experiences.map((exp, idx) => (
              <div
                key={idx}
                className={`experience-item-mini ${exp.current ? 'current' : ''}`}
              >
                <div className="experience-dot"></div>
                <span className="period">{exp.period}</span>
                <span className="company-name">{exp.company}</span>
                <span className="position">{exp.position}</span>
                <div className="impact-tags">
                  {exp.impactTags.map((tag, i) => (
                    <span key={i} className="impact-tag">{tag}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ExperienceWidget

