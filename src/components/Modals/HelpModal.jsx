import './Modal.css'

function HelpModal({ show, onClose }) {
  if (!show) return null

  return (
    <div className={`help-modal ${show ? '' : 'hidden'}`} role="dialog" aria-modal="true" aria-labelledby="help-title">
      <div className="help-content">
        <div className="help-header">
          <h2 id="help-title"><i className="fas fa-question-circle" aria-hidden></i> Kyle Portfolio OS 사용법 & 구현 가이드</h2>
          <button type="button" className="help-close-btn" onClick={onClose} aria-label="닫기">
            <i className="fas fa-times" aria-hidden></i>
          </button>
        </div>
        <div className="help-body">
          <div className="help-section">
            <h3><i className="fas fa-mouse-pointer"></i> 사용 방법</h3>
            <div className="help-item">
              <strong>🖱️ Dock 사용:</strong> 하단 Dock의 아이콘들을 클릭하여 각 섹션을 확인하세요
            </div>
            <div className="help-item">
              <strong>🪟 윈도우 조작:</strong> 윈도우를 드래그하여 이동하고, 우상단 버튼으로 닫기
            </div>
            <div className="help-item">
              <strong>💻 터미널:</strong> 터미널에서 <code>help</code> 명령어로 사용 가능한 명령어 확인
            </div>
            <div className="help-item">
              <strong>📊 실시간 위젯:</strong> GitHub 통계, 백준 알고리즘 통계, 현재 시간 등 실시간 정보
            </div>
            <div className="help-item">
              <strong>⌨️ 단축키:</strong> <code>ESC</code> 키로 모든 윈도우 닫기
            </div>
          </div>
          
          <div className="help-section">
            <h3><i className="fas fa-code"></i> 구현 기술</h3>
            <div className="tech-grid">
              <div className="tech-item">
                <i className="fab fa-react"></i>
                <span>React 18</span>
                <small>Modern component architecture</small>
              </div>
              <div className="tech-item">
                <i className="fab fa-css3-alt"></i>
                <span>CSS3</span>
                <small>Glassmorphism, 애니메이션</small>
              </div>
              <div className="tech-item">
                <i className="fab fa-js-square"></i>
                <span>JavaScript</span>
                <small>ES6+, Hooks</small>
              </div>
              <div className="tech-item">
                <i className="fab fa-github"></i>
                <span>GitHub API</span>
                <small>실시간 데이터 연동</small>
              </div>
              <div className="tech-item">
                <i className="fas fa-trophy"></i>
                <span>Baekjoon API</span>
                <small>백준 온라인 저지 연동</small>
              </div>
            </div>
          </div>

          <div className="help-section">
            <h3><i className="fas fa-cogs"></i> 주요 기능</h3>
            <div className="feature-list">
              <div className="feature-item">
                <i className="fas fa-desktop"></i>
                <div>
                  <strong>OS 스타일 UI</strong>
                  <p>macOS와 Windows의 장점을 결합한 인터페이스</p>
                </div>
              </div>
              <div className="feature-item">
                <i className="fas fa-window-restore"></i>
                <div>
                  <strong>멀티 윈도우</strong>
                  <p>드래그 기능을 갖춘 윈도우 시스템</p>
                </div>
              </div>
              <div className="feature-item">
                <i className="fas fa-terminal"></i>
                <div>
                  <strong>인터랙티브 터미널</strong>
                  <p>실제 작동하는 명령어와 탭 자동완성</p>
                </div>
              </div>
              <div className="feature-item">
                <i className="fab fa-github"></i>
                <div>
                  <strong>GitHub 위젯</strong>
                  <p>GitHub API 연동 및 실시간 통계</p>
                </div>
              </div>
              <div className="feature-item">
                <i className="fas fa-trophy"></i>
                <div>
                  <strong>백준 위젯</strong>
                  <p>백준 온라인 저지 API 연동 및 알고리즘 통계</p>
                </div>
              </div>
              <div className="feature-item">
                <i className="fas fa-magic"></i>
                <div>
                  <strong>파티클 애니메이션</strong>
                  <p>Canvas를 활용한 배경 파티클 시스템</p>
                </div>
              </div>
            </div>
          </div>

          <div className="help-section">
            <h3><i className="fas fa-palette"></i> 디자인 컨셉</h3>
            <div className="design-concept">
              <div className="concept-item">
                <strong>Glassmorphism:</strong> 투명한 유리 효과로 모던한 느낌 연출
              </div>
              <div className="concept-item">
                <strong>Dynamic Gradients:</strong> 시간에 따라 변화하는 그라데이션 배경
              </div>
              <div className="concept-item">
                <strong>Smooth Animations:</strong> 부드러운 전환 효과와 호버 애니메이션
              </div>
              <div className="concept-item">
                <strong>OS Metaphor:</strong> 친숙한 운영체제 인터페이스 차용
              </div>
            </div>
          </div>
        </div>
        <div className="help-footer">
          <p><i className="fas fa-heart"></i> Kyle Portfolio OS - Created with React & passion for web development</p>
        </div>
      </div>
    </div>
  )
}

export default HelpModal

