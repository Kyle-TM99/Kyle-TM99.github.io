import { motion } from 'framer-motion'
import { dockItems } from '../../data/dockItems'
import './Dock.css'

function Dock({ onOpenWindow, openWindows = [] }) {
  const handleClick = (item) => {
    if (item.external) {
      window.open(item.external, '_blank')
    } else {
      onOpenWindow(item.id)
    }
  }

  const handleKeyDown = (e, item) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handleClick(item)
    }
  }

  return (
    <motion.nav
      className="dock"
      initial={{ x: "-50%", y: 100 }}
      animate={{ x: "-50%", y: 0 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      aria-label="주요 메뉴"
    >
      {dockItems.map(item => (
        <motion.div
          key={item.id}
          role="button"
          tabIndex={0}
          className="dock-item"
          onClick={() => handleClick(item)}
          onKeyDown={(e) => handleKeyDown(e, item)}
          aria-label={item.tooltip}
          whileHover={{
            scale: 1.25,
            y: -15,
            transition: { type: "spring", stiffness: 300, damping: 15 }
          }}
          whileTap={{ scale: 0.9 }}
        >
          <i className={item.icon} aria-hidden></i>
          <div className="dock-tooltip">{item.tooltip}</div>
          {openWindows.includes(item.id) && (
            <div className="active-dot" aria-hidden></div>
          )}
        </motion.div>
      ))}
    </motion.nav>
  )
}

export default Dock
