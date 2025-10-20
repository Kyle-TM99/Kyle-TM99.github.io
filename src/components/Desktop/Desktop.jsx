import DesktopWidgets from '../Widgets/DesktopWidgets'
import './Desktop.css'

function Desktop({ children }) {
  return (
    <div className="desktop">
      {children}
      <DesktopWidgets />
    </div>
  )
}

export default Desktop

