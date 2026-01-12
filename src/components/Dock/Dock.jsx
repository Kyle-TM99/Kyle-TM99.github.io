import { motion } from 'framer-motion'
import './Dock.css'

function Dock({ onOpenWindow, openWindows = [] }) {
  const dockItems = [
    { id: 'about', icon: 'fa-user-circle', tooltip: 'About Me' },
    { id: 'skills', icon: 'fa-code', tooltip: 'Skills' },
    { id: 'experience', icon: 'fa-briefcase', tooltip: 'Experience' },
    { id: 'projects', icon: 'fa-folder-open', tooltip: 'Projects' },
    { id: 'contact', icon: 'fa-envelope', tooltip: 'Contact' },
    { id: 'blog', icon: 'fa-blog', tooltip: 'Tech Blog', external: 'https://pids.tistory.com/' },
    { id: 'github', icon: 'fab fa-github', tooltip: 'GitHub', external: 'https://github.com/Kyle-TM99' },
    { id: 'terminal', icon: 'fa-terminal', tooltip: 'Terminal' }
  ]

  const handleClick = (item) => {
    if (item.external) {
      window.open(item.external, '_blank')
    } else {
      onOpenWindow(item.id)
    }
  }

  return (
    <motion.div
      className="dock"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
    >
      {dockItems.map(item => (
        <motion.div
          key={item.id}
          className="dock-item"
          onClick={() => handleClick(item)}
          whileHover={{
            scale: 1.25,
            y: -15,
            transition: { type: "spring", stiffness: 300, damping: 15 }
          }}
          whileTap={{ scale: 0.9 }}
        >
          <i className={`fas ${item.icon}`}></i>
          <div className="dock-tooltip">{item.tooltip}</div>
          {openWindows.includes(item.id) && (
            <div className="active-dot"></div>
          )}
        </motion.div>
      ))}
    </motion.div>
  )
}

export default Dock
