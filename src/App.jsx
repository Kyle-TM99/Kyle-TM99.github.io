import { useState, useEffect } from 'react'
import Desktop from './components/Desktop/Desktop'
import MenuBar from './components/MenuBar/MenuBar'
import Dock from './components/Dock/Dock'
import WindowManager from './components/Windows/WindowManager'
import WelcomeModal from './components/Modals/WelcomeModal'
import HelpModal from './components/Modals/HelpModal'
import ParticleSystem from './components/ParticleSystem/ParticleSystem'
import SolarSystem from './components/SolarSystem/SolarSystem'
import './App.css'

function App() {
  const [openWindows, setOpenWindows] = useState([])
  const [showWelcome, setShowWelcome] = useState(true)
  const [showHelp, setShowHelp] = useState(false)
  const [zIndexCounter, setZIndexCounter] = useState(100)

  const openWindow = (windowId) => {
    if (!openWindows.includes(windowId)) {
      setOpenWindows([...openWindows, windowId])
    }
    focusWindow(windowId)
  }

  const handleWelcomeClose = () => {
    setShowWelcome(false)
    openWindow('about')
  }

  const closeWindow = (windowId) => {
    setOpenWindows(openWindows.filter(id => id !== windowId))
  }

  const focusWindow = (windowId) => {
    setZIndexCounter(prev => prev + 1)
  }

  const handleHelp = () => {
    setShowHelp(true)
  }

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setOpenWindows([])
        setShowWelcome(false)
        setShowHelp(false)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  // 모달이 열릴 때 body overflow 제어
  useEffect(() => {
    if (showWelcome || showHelp) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'hidden' // 원래 설정 유지
    }

    return () => {
      document.body.style.overflow = 'hidden'
    }
  }, [showWelcome, showHelp])

  return (
    <>
      <SolarSystem />
      <ParticleSystem />
      <Desktop>
        <MenuBar onHelpClick={handleHelp} />
        <p className="dock-hint" aria-hidden>아래 아이콘을 클릭해 소개, 뉴스, 프로젝트를 열어보세요.</p>
        <Dock onOpenWindow={openWindow} openWindows={openWindows} />
        <WindowManager
          openWindows={openWindows}
          onCloseWindow={closeWindow}
          onFocusWindow={focusWindow}
          zIndexCounter={zIndexCounter}
        />
      </Desktop>
      <WelcomeModal show={showWelcome} onClose={handleWelcomeClose} />
      <HelpModal show={showHelp} onClose={() => setShowHelp(false)} />
    </>
  )
}

export default App

