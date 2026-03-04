import Window from './Window'
import { newsItems } from '../../data/newsItems'
import './NewsWindow.css'

function NewsWindow({ onClose, onFocus, zIndex }) {
  return (
    <Window
      id="news-window"
      title="News"
      icon="fa-newspaper"
      onClose={onClose}
      onFocus={onFocus}
      zIndex={zIndex}
      width="720px"
      height="680px"
      minWidth="480px"
      minHeight="400px"
    >
      <div className="news-container">
        <p className="news-intro">김태민(Kyle) 관련 최신 소식입니다.</p>
        {newsItems.length === 0 ? (
          <p className="news-empty">아직 소식이 없습니다.</p>
        ) : (
        <ul className="news-list">
          {newsItems.map((item, index) => (
            <li key={index} className="news-item">
              <div className={`news-item-thumb ${item.image ? 'news-item-thumb--white' : ''}`} aria-hidden>
                {item.image ? (
                  <img src={item.image} alt="" />
                ) : (
                  <span className="news-item-placeholder"><i className="fas fa-newspaper" /></span>
                )}
              </div>
              <div className="news-body">
                <span className="news-date">{item.date}</span>
                <h3 className="news-title">
                  {item.link ? (
                    <a href={item.link} target="_blank" rel="noopener noreferrer">{item.title}</a>
                  ) : (
                    item.title
                  )}
                </h3>
                {item.summary && <p className="news-summary">{item.summary}</p>}
                {item.detail && <p className="news-detail">{item.detail}</p>}
              </div>
            </li>
          ))}
        </ul>
        )}
      </div>
    </Window>
  )
}

export default NewsWindow
