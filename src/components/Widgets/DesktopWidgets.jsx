import Tilt from 'react-parallax-tilt'
import InfoWidget from './InfoWidget'
import GitHubWidget from './GitHubWidget'
import NewsWidget from './NewsWidget'
import TerminalWidget from './TerminalWidget'
import ProjectsWidget from './ProjectsWidget'
import './Widgets.css'

function DesktopWidgets() {
  const tiltOptions = {
    tiltMaxAngleX: 5,
    tiltMaxAngleY: 5,
    perspective: 1000,
    scale: 1.02,
    transitionSpeed: 1500,
    glareEnable: true,
    glareMaxOpacity: 0.1,
    glareColor: '#ffffff',
    glarePosition: 'all',
    glareBorderRadius: '24px'
  }

  return (
    <div className="desktop-widgets">
      {/* Column 1: Profile & Terminal(whoami) */}
      <Tilt {...tiltOptions} className="widget info-widget">
        <InfoWidget />
      </Tilt>

      <Tilt {...tiltOptions} className="widget terminal-widget">
        <TerminalWidget />
      </Tilt>

      {/* Column 2-3: News (Spans 2 columns, 2 rows) */}
      <Tilt {...tiltOptions} className="widget news-widget">
        <NewsWidget />
      </Tilt>

      {/* Column 4: Projects & Stats */}
      <Tilt {...tiltOptions} className="widget projects-widget">
        <ProjectsWidget />
      </Tilt>

      <Tilt {...tiltOptions} className="widget github-widget">
        <GitHubWidget />
      </Tilt>

      {/* Optional: Add Baekjoon if needed, or rotate with GitHub */}
      {/* <Tilt {...tiltOptions} className="widget baekjoon-widget">
        <BaekjoonWidget />
      </Tilt> */}
    </div>
  )
}

export default DesktopWidgets

