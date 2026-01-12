function InfoWidget() {
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div className="widget-header">
        <i className="fas fa-user-circle"></i>
        <span>Kyle Profile</span>
      </div>
      <div className="widget-content">
        <div className="profile-quick">
          <div className="status-indicator online"></div>
          <div className="status-text">현재 <strong>BARO interactive</strong>에서 재직중</div>
          <div className="role">Full-stack Developer</div>
          <div className="location"><i className="fas fa-map-marker-alt"></i> Seoul, Korea</div>
        </div>
      </div>
    </div>
  )
}

export default InfoWidget

