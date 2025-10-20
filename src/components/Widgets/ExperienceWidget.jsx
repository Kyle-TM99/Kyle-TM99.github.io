import { useState, useEffect } from 'react'

function ExperienceWidget() {
  const [totalExperience, setTotalExperience] = useState('')

  useEffect(() => {
    updateExperience()
    const interval = setInterval(updateExperience, 60000) // 1분마다 업데이트
    return () => clearInterval(interval)
  }, [])

  const updateExperience = () => {
    const startDate = new Date('2025-04-21')
    const currentDate = new Date()
    
    const diffTime = currentDate.getTime() - startDate.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    
    const months = Math.floor(diffDays / 30)
    const remainingDays = diffDays % 30
    
    let experienceText = ''
    if (months > 0) {
      experienceText = `${months}개월`
      if (remainingDays > 0) {
        experienceText += ` ${remainingDays}일`
      }
    } else {
      experienceText = `${remainingDays}일`
    }
    
    setTotalExperience(experienceText)
  }

  return (
    <div className="widget experience-widget">
      <div className="widget-header">
        <i className="fas fa-briefcase"></i>
        <span>Kyle Experience</span>
      </div>
      <div className="widget-content">
        <div className="experience-summary">
          <div className="total-experience">
            <span className="experience-label">총 경력</span>
            <span className="experience-duration">{totalExperience || '계산 중...'}</span>
          </div>
          <div className="experience-list">
            <div className="experience-item-mini current">
              <div className="experience-dot active"></div>
              <div className="experience-info">
                <span className="company-name">베오</span>
                <span className="position">Education PM & Full-stack Developer</span>
                <span className="period">2025.07 ~ 현재</span>
              </div>
            </div>
            <div className="experience-item-mini">
              <div className="experience-dot"></div>
              <div className="experience-info">
                <span className="company-name">GoodSen</span>
                <span className="position">백엔드 개발자 (1인 개발)</span>
                <span className="period">2025.04 ~ 2025.07</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ExperienceWidget

