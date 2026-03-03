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

  return (
    <motion.div
      className="dock"
      initial={{ x: "-50%", y: 100 }}
      animate={{ x: "-50%", y: 0 }}
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
          <i className={item.icon}></i>
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
