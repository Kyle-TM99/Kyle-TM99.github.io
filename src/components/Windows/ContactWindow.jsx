import Window from './Window'

function ContactWindow({ onClose, onFocus, zIndex }) {
  const contacts = [
    { icon: 'fa-envelope', text: 'rlaxoals9977@gmail.com', link: 'mailto:rlaxoals9977@gmail.com' },
    { icon: 'fab fa-github', text: 'GitHub', link: 'https://github.com/Kyle-TM99' },
    { icon: 'fa-blog', text: 'Kyle Developer Story', link: 'https://pids.tistory.com' },
    { icon: 'fab fa-linkedin', text: 'Linkedin', link: 'https://www.linkedin.com/in/taemin-kim-353b20352/' }
  ]

  const handleClick = (link) => {
    window.open(link, '_blank')
  }

  return (
    <Window
      id="contact-window"
      title="Contact"
      icon="fa-envelope"
      onClose={onClose}
      onFocus={onFocus}
      zIndex={zIndex}
    >
      <div className="contact-info">
        {contacts.map((contact, index) => (
          <div 
            key={index} 
            className="contact-item" 
            onClick={() => handleClick(contact.link)}
          >
            <i className={`fas ${contact.icon}`}></i>
            <span>{contact.text}</span>
          </div>
        ))}
      </div>
    </Window>
  )
}

export default ContactWindow

