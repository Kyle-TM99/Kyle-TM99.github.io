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
            className="welcome-card welcome-card--wide"
            initial={{ scale: 0.96, opacity: 0, y: 16 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.96, opacity: 0, y: 16 }}
            transition={{ type: 'spring', duration: 0.45 }}
          >
            <div className="welcome-header">
              <div className="avatar-wrapper">
                <img src="/Kyle.png" alt="김태민(Kyle)" className="welcome-avatar" />
                <div className="online-badge"></div>
              </div>
              <h2 className="welcome-name">김태민 (Kyle)</h2>
              <p className="welcome-role">풀스택 개발자 · BARO Interactive</p>
            </div>

            <div className="welcome-body">
              <p className="welcome-desc">
                이 사이트는 <strong>비즈니스 가치를 생각하는 End-to-End 프로덕트 빌더</strong> 포트폴리오입니다.<br />
                소개, 뉴스, 프로젝트, 연락처를 한곳에서 확인하실 수 있어요.
              </p>

              <div className="welcome-how">
                <p className="welcome-how-title">어떻게 보나요?</p>
                <p className="welcome-how-desc">화면 <strong>하단 Dock</strong>의 아이콘을 클릭해 보세요. <strong>경력·스킬</strong>은 About(소개) 창 안의 탭에서 볼 수 있습니다.</p>
                <ul className="welcome-steps">
                  <li><i className="fas fa-user-circle"></i> <span>About</span> — 소개, 경력, 스킬</li>
                  <li><i className="fas fa-newspaper"></i> <span>News</span> — 최신 소식</li>
                  <li><i className="fas fa-folder-open"></i> <span>Projects</span> — 프로젝트</li>
                  <li><i className="fas fa-envelope"></i> <span>Contact</span> — 연락처</li>
                  <li><i className="fas fa-terminal"></i> <span>Terminal</span> — 명령어 둘러보기</li>
                </ul>
              </div>
            </div>

            <button className="welcome-btn" onClick={onClose} type="button">
              <span>About에서 시작하기</span>
              <i className="fas fa-arrow-right"></i>
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default WelcomeModal
