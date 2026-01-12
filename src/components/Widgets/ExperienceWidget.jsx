import { useState, useEffect } from 'react'

function ExperienceWidget() {
  const [totalExperience, setTotalExperience] = useState('')

  useEffect(() => {
    updateExperience()
    const interval = setInterval(updateExperience, 60000)
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
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div className="widget-header">
        <i className="fas fa-briefcase"></i>
        <span>Experience ({totalExperience})</span>
      </div>
      <div className="widget-content">
        <div className="experience-summary">
          <div className="experience-list">

            <div className="experience-item-mini current">
              <div className="experience-dot"></div>
              <span className="period">2025.12 ~ Current</span>
              <span className="company-name">BARO interactive</span>
              <span className="position">Full-stack Developer</span>
            </div>

            <div className="experience-item-mini">
              <div className="experience-dot"></div>
              <span className="period">2025.07 ~ 2025.11</span>
              <span className="company-name">Beo (베오)</span>
              <span className="position">PM & Full-stack</span>
            </div>

            <div className="experience-item-mini">
              <div className="experience-dot"></div>
              <span className="period">2025.04 ~ 2025.07</span>
              <span className="company-name">GoodSen</span>
              <span className="position">Full-stack Developer</span>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default ExperienceWidget

