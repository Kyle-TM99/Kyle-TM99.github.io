function InfoWidget() {
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div className="widget-header">
        <i className="fas fa-user-circle" aria-hidden></i>
        <span>Kyle Profile</span>
      </div>
      <div className="widget-content info-widget-content">
        <div className="profile-quick">
          <div className="profile-avatar-wrap">
            <img src="/taemin.jpg" alt="Kyle" onError={(e) => { e.target.onerror = null; e.target.src = '/Kyle.png' }} />
          </div>
          <div className="status-indicator online"></div>
          <div className="status-text">현재 <strong>BARO Interactive</strong>에서 재직중</div>
          <div className="role">Full-stack Developer</div>
          <div className="location"><i className="fas fa-map-marker-alt" aria-hidden></i> Seoul, Korea</div>
          <div className="profile-contact">
            <a href="mailto:rlaxoals9977@gmail.com" className="profile-contact-link" title="Email" aria-label="Email">
              <i className="fas fa-envelope"></i>
            </a>
            <a href="https://www.linkedin.com/in/taemin-kim-353b20352/" target="_blank" rel="noopener noreferrer" className="profile-contact-link" title="LinkedIn" aria-label="LinkedIn">
              <i className="fab fa-linkedin-in"></i>
            </a>
            <a href="https://github.com/Kyle-TM99" target="_blank" rel="noopener noreferrer" className="profile-contact-link" title="GitHub" aria-label="GitHub">
              <i className="fab fa-github"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InfoWidget

