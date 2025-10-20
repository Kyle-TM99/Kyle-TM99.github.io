import { useState, useRef, useEffect } from 'react'
import './Window.css'

function Window({ 
  id,
  title, 
  icon, 
  children, 
  onClose, 
  onFocus,
  zIndex,
  width = '800px',
  height = '600px',
  minWidth = '400px',
  minHeight = '300px'
}) {
  const [show, setShow] = useState(false)
  const [position, setPosition] = useState({ x: 50, y: 50 }) // 초기 위치를 화면 중앙으로 설정
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const windowRef = useRef(null)
  const isMobile = window.innerWidth <= 768

  useEffect(() => {
    // Center window on desktop first
    if (!isMobile) {
      // 윈도우 크기를 미리 계산하여 중앙 정렬
      const windowWidth = parseInt(width) || 800
      const windowHeight = parseInt(height) || 600
      
      // 메뉴바 높이(30px)를 고려한 중앙 정렬
      const centerX = Math.max(20, (window.innerWidth - windowWidth) / 2)
      const centerY = Math.max(40, (window.innerHeight - windowHeight) / 2)
      
      setPosition({
        x: centerX,
        y: centerY
      })
    }
    
    // Then animate window opening
    setTimeout(() => setShow(true), 50)
  }, [width, height, isMobile])

  const handleMouseDown = (e) => {
    if (e.target.classList.contains('control-btn')) return
    if (isMobile) return
    
    onFocus()
    setIsDragging(true)
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    })
  }

  const handleMouseMove = (e) => {
    if (!isDragging || isMobile) return
    
    const newX = e.clientX - dragStart.x
    const newY = e.clientY - dragStart.y
    
    // Keep window within viewport
    const maxX = window.innerWidth - windowRef.current.offsetWidth
    const maxY = window.innerHeight - windowRef.current.offsetHeight
    
    setPosition({
      x: Math.max(0, Math.min(newX, maxX)),
      y: Math.max(30, Math.min(newY, maxY))
    })
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
      }
    }
  }, [isDragging, dragStart, position])

  const handleClose = () => {
    setShow(false)
    setTimeout(onClose, 300)
  }

  const style = isMobile ? {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100vw',
    height: '100vh',
    minWidth: '100vw',
    minHeight: '100vh',
    maxWidth: '100vw',
    maxHeight: '100vh',
    transform: 'none',
    borderRadius: 0,
    zIndex
  } : {
    left: `${position.x}px`,
    top: `${position.y}px`,
    width,
    height,
    minWidth,
    minHeight,
    zIndex
  }

  return (
    <div
      ref={windowRef}
      className={`window ${show ? 'show' : ''} ${isDragging ? 'dragging' : ''}`}
      style={style}
      onMouseDown={onFocus}
    >
      <div className="window-header" onMouseDown={handleMouseDown}>
        <div className="window-title">
          <i className={`fas ${icon}`}></i>
          {title}
        </div>
        <div className="window-controls">
          <button className="control-btn close" onClick={handleClose}>×</button>
        </div>
      </div>
      <div className="window-content">
        {children}
      </div>
    </div>
  )
}

export default Window

