import AboutWindow from './AboutWindow'
import ProjectsWindow from './ProjectsWindow'
import NewsWindow from './NewsWindow'
import ContactWindow from './ContactWindow'
import TerminalWindow from './TerminalWindow'
import './Window.css'

function WindowManager({ openWindows, onCloseWindow, onFocusWindow, zIndexCounter }) {
  const windows = {
    about: AboutWindow,
    projects: ProjectsWindow,
    news: NewsWindow,
    contact: ContactWindow,
    terminal: TerminalWindow
  }

  return (
    <>
      {openWindows.map(windowId => {
        const WindowComponent = windows[windowId]
        return WindowComponent ? (
          <WindowComponent
            key={windowId}
            onClose={() => onCloseWindow(windowId)}
            onFocus={() => onFocusWindow(windowId)}
            zIndex={zIndexCounter}
          />
        ) : null
      })}
    </>
  )
}

export default WindowManager

