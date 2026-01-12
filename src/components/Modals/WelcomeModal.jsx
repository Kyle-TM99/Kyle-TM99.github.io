import { motion, AnimatePresence } from 'framer-motion'
import './Modal.css'

function WelcomeModal({ show, onClose }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="welcome-modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="welcome-card"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
          >
            <div className="welcome-header">
              <div className="avatar-wrapper">
                <img src="/Kyle.png" alt="Kyle" className="welcome-avatar" />
                <div className="online-badge"></div>
              </div>
              <div className="welcome-title">
                <h2>Hello, I'm Kyle 👋</h2>
                <span>Full-stack Developer</span>
              </div>
            </div>

            <div className="welcome-body">
              <p>
                Welcome to <strong>Kyle Portfolio OS</strong>.<br />
                This is a spatial web experience designed to showcase my journey and skills interactively.
              </p>

              <div className="features-grid">
                <div className="feature-box">
                  <i className="fas fa-layer-group" style={{ color: '#0a84ff' }}></i>
                  <span>Spatial UI</span>
                </div>
                <div className="feature-box">
                  <i className="fas fa-bolt" style={{ color: '#30d158' }}></i>
                  <span>Interactive</span>
                </div>
                <div className="feature-box">
                  <i className="fas fa-code" style={{ color: '#bf5af2' }}></i>
                  <span>Modern Stack</span>
                </div>
              </div>
            </div>

            <button className="welcome-btn" onClick={onClose}>
              <span>Enter Portfolio</span>
              <i className="fas fa-arrow-right"></i>
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default WelcomeModal

