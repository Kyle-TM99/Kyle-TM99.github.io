import { useState, useEffect } from 'react'
import './MenuBar.css'

function MenuBar({ onHelpClick }) {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const formatTime = (date) => {
    return date.toLocaleTimeString('ko-KR', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    })
  }

  return (
    <div className="menu-bar">
      <div className="menu-left">
        <span className="apple-logo">
          <img src="image/Kyle.png" alt="Kyle" id="Kyle" />
        </span>
        <span className="menu-item active">Kyle Portfolio [KIM TAEMIN]</span>
        <span className="menu-item" onClick={onHelpClick}>도움말</span>
      </div>
      <div className="menu-right">
        <span className="time">{formatTime(time)}</span>
      </div>
    </div>
  )
}

export default MenuBar

