function InfoWidget() {
  return (
    <div className="widget info-widget">
      <div className="widget-header">
        <i className="fas fa-user-circle"></i>
        <span>Kyle Profile</span>
      </div>
      <div className="widget-content">
        <div className="profile-quick">
          <div className="status-indicator online"></div>
          <div className="status-text">현재 <strong>베오</strong>에서 재직중</div>
          <div className="role">Education PM & Full-stack Developer</div>
          <div className="location"><i className="fas fa-map-marker-alt"></i> Seoul, Korea</div>
        </div>
      </div>
    </div>
  )
}

export default InfoWidget

