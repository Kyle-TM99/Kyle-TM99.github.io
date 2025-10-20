import './Modal.css'

function WelcomeModal({ show, onClose }) {
  if (!show) return null

  return (
    <div className={`welcome-modal ${show ? '' : 'hidden'}`}>
      <div className="welcome-content">
        <div className="welcome-header">
          <div className="welcome-avatar">
            <img src="/Kyle.png" alt="Kyle" className="welcome-photo" />
          </div>
          <h2>안녕하세요, 저는 김태민(Kyle) 입니다 👋</h2>
        </div>
        <div className="welcome-body">
          <p className="welcome-intro">제가 만든 Kyle Portfolio OS에 오신 것을 환영합니다.</p>
          <div className="welcome-message" style={{ textAlign: 'center' }}>
            <p>단순한 이력서나 리스트가 아닌, <strong>제가 직접 기획하고 개발한 경험들</strong>을 담았습니다.</p>
            <p>마치 작은 운영체제처럼 작동하는 이 공간에서, 저만의 개발 여정을 탐험해보세요.</p>
            <p>기술과 창의성이 어우러진 곳에서 <strong>저의 색깔</strong>을 느끼실 수 있기를 바랍니다.</p>
          </div>
          <div className="welcome-features">
            <div className="feature-item">
              <i className="fas fa-heart"></i>
              <span>개발 가치관</span>
            </div>
            <div className="feature-item">
              <i className="fas fa-rocket"></i>
              <span>프로젝트 경험</span>
            </div>
            <div className="feature-item">
              <i className="fas fa-code"></i>
              <span>기술 스택 소개</span>
            </div>
          </div>
        </div>
        <button className="welcome-btn" onClick={onClose}>
          <i className="fas fa-play"></i>
          포트폴리오 탐험하기
        </button>
      </div>
    </div>
  )
}

export default WelcomeModal

