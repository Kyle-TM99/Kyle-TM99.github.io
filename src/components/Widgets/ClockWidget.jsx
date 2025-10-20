import { useState, useEffect } from 'react'

function ClockWidget() {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const formatTime = (date) => {
    return date.toLocaleTimeString('ko-KR', { 
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit',
      hour12: false 
    })
  }

  const formatDate = (date) => {
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long'
    })
  }

  return (
    <div className="widget clock-widget">
      <div className="widget-header">
        <i className="fas fa-clock"></i>
        <span>시계</span>
      </div>
      <div className="widget-content">
        <div className="time-display">
          <div className="current-time">{formatTime(time)}</div>
          <div className="current-date">{formatDate(time)}</div>
        </div>
      </div>
    </div>
  )
}

export default ClockWidget

