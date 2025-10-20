import './Dock.css'

function Dock({ onOpenWindow }) {
  const dockItems = [
    { id: 'about', icon: 'fa-user-circle', tooltip: 'About Me' },
    { id: 'skills', icon: 'fa-code', tooltip: 'Skills' },
    { id: 'experience', icon: 'fa-briefcase', tooltip: 'Experience' },
    { id: 'projects', icon: 'fa-folder-open', tooltip: 'Projects' },
    { id: 'contact', icon: 'fa-envelope', tooltip: 'Contact' },
    { id: 'blog', icon: 'fa-blog', tooltip: 'Tech Blog', external: 'https://pids.tistory.com/' },
    { id: 'github', icon: 'fab fa-github', tooltip: 'GitHub', external: 'https://github.com/Kyle-TM99' },
    { id: 'terminal', icon: 'fa-terminal', tooltip: 'Terminal' }
  ]

  const handleClick = (item) => {
    if (item.external) {
      window.open(item.external, '_blank')
    } else {
      onOpenWindow(item.id)
    }
  }

  return (
    <div className="dock">
      {dockItems.map(item => (
        <div key={item.id} className="dock-item" onClick={() => handleClick(item)}>
          <i className={`fas ${item.icon}`}></i>
          <div className="dock-tooltip">{item.tooltip}</div>
        </div>
      ))}
    </div>
  )
}

export default Dock

