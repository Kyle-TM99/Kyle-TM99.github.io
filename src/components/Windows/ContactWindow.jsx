import Window from './Window'
import './ContactWindow.css'

const contacts = [
  { icon: 'fas fa-envelope', label: 'Email', text: 'rlaxoals9977@gmail.com', link: 'mailto:rlaxoals9977@gmail.com' },
  { icon: 'fab fa-linkedin', label: 'LinkedIn', text: 'Taemin Kim', link: 'https://www.linkedin.com/in/taemin-kim-353b20352/' }
]

function ContactWindow({ onClose, onFocus, zIndex }) {
  const handleClick = (link) => {
    if (link) window.open(link, '_blank')
  }

  return (
    <Window
      id="contact-window"
      title="Contact"
      icon="fa-envelope"
      onClose={onClose}
      onFocus={onFocus}
      zIndex={zIndex}
      width="520px"
      height="480px"
      minWidth="380px"
      minHeight="360px"
    >
      <div className="contact-window-inner">
        <div className="contact-hero">
          <h2 className="contact-headline">함께 일하고 싶으시다면</h2>
          <p className="contact-sub">편한 방법으로 연락해 주세요.</p>
        </div>
        <ul className="contact-list">
          {contacts.map((item, index) => (
            <li key={index}>
              <button
                type="button"
                className="contact-card"
                onClick={() => handleClick(item.link)}
              >
                <span className="contact-card-icon" aria-hidden>
                  <i className={item.icon} />
                </span>
                <div className="contact-card-body">
                  <span className="contact-card-label">{item.label}</span>
                  <span className="contact-card-text">{item.text}</span>
                </div>
                <i className="fas fa-chevron-right contact-card-arrow" aria-hidden />
              </button>
            </li>
          ))}
        </ul>
        <p className="contact-footer">이메일로 포지션·협업 문의를 보내주시면 빠르게 답변드리겠습니다.</p>
      </div>
    </Window>
  )
}

export default ContactWindow
