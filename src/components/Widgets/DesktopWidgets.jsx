import InfoWidget from './InfoWidget'
import GitHubWidget from './GitHubWidget'
import BaekjoonWidget from './BaekjoonWidget'
import ExperienceWidget from './ExperienceWidget'
import ClockWidget from './ClockWidget'
import './Widgets.css'

function DesktopWidgets() {
  return (
    <div className="desktop-widgets">
      <InfoWidget />
      <GitHubWidget />
      <BaekjoonWidget />
      <ExperienceWidget />
      <ClockWidget />
    </div>
  )
}

export default DesktopWidgets

