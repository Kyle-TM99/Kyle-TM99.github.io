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
                이 사이트는 <strong>제 포트폴리오</strong>입니다.<br />
                경력, 보유 기술, 프로젝트, 연락처를 한곳에서 확인하실 수 있어요.
              </p>

              <div className="welcome-how">
                <p className="welcome-how-title">어떻게 보나요?</p>
                <p className="welcome-how-desc">화면 <strong>하단의 아이콘(독)</strong>을 <strong>왼쪽부터 순서대로</strong> 눌러보세요.</p>
                <ul className="welcome-steps">
                  <li><i className="fas fa-user-circle"></i> <span>소개</span> — 저에 대한 간단한 소개</li>
                  <li><i className="fas fa-briefcase"></i> <span>경력</span> — 회사별 경력과 프로젝트</li>
                  <li><i className="fas fa-code"></i> <span>스킬</span> — 사용 기술 스택</li>
                  <li><i className="fas fa-folder-open"></i> <span>프로젝트</span> — 진행한 프로젝트 목록</li>
                  <li><i className="fas fa-envelope"></i> <span>연락처</span> — 이메일, GitHub, 블로그 등</li>
                </ul>
              </div>
            </div>

            <button className="welcome-btn" onClick={onClose} type="button">
              <span>소개부터 보기</span>
              <i className="fas fa-arrow-right"></i>
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default WelcomeModal
