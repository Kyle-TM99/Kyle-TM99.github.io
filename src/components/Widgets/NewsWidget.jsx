import { newsItems } from '../../data/newsItems'

function NewsWidget() {
  return (
    <div className="news-widget-inner">
      <div className="widget-header">
        <i className="fas fa-newspaper" aria-hidden />
        <span>News</span>
      </div>
      <div className="widget-content news-widget-content">
        <div className="news-widget-list">
          {newsItems.map((item, index) => (
            <div key={index} className="news-widget-card">
              <div className={`news-widget-card-thumb ${item.image ? 'news-widget-card-thumb--white' : ''}`} aria-hidden>
                {item.image ? (
                  <img src={item.image} alt="" />
                ) : (
                  <span className="news-widget-card-placeholder"><i className="fas fa-newspaper" /></span>
                )}
              </div>
              <div className="news-widget-card-body">
                <span className="news-widget-date">{item.date}</span>
                {item.link ? (
                  <a href={item.link} target="_blank" rel="noopener noreferrer" className="news-widget-title">
                    {item.title}
                  </a>
                ) : (
                  <span className="news-widget-title">{item.title}</span>
                )}
                {item.summary && <p className="news-widget-summary">{item.summary}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default NewsWidget
