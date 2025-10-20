import Window from './Window'

function SkillsWindow({ onClose, onFocus, zIndex }) {
  const skills = [
    {
      category: '💻 Programming Languages & Frameworks',
      items: ['Java', 'JavaScript', 'HTML', 'CSS']
    },
    {
      category: '🌱 Spring Ecosystem',
      items: ['Spring Boot', 'Spring Security', 'Spring Data JDBC', 'JPA', 'MyBatis']
    },
    {
      category: '⚛️ Frontend Frameworks & Libraries',
      items: ['Vue.js 3', 'Vite', 'Vue Router', 'Pinia', 'Tailwind CSS', 'Chart.js', 'SASS', 'Thymeleaf']
    },
    {
      category: '🗄️ Database & Caching',
      items: ['MySQL', 'Redis', 'H2', 'QueryDSL']
    },
    {
      category: '☁️ Cloud & DevOps',
      items: ['AWS S3', 'AWS EC2', 'Docker', 'Jenkins', 'Linux']
    },
    {
      category: '🔐 Security & Authentication',
      items: ['JWT', 'OAuth2', 'Spring Security']
    },
    {
      category: '🛠️ Tools & Collaboration',
      items: ['Git', 'GitHub', 'Confluence', 'Notion', 'Swagger/OpenAPI']
    },
    {
      category: '⚡ Web Technologies & APIs',
      items: ['WebSocket', 'AJAX', 'Axios', 'jQuery', 'RESTful API']
    },
    {
      category: '🧩 Browser Extensions & Automation',
      items: ['Chrome Extension', 'Manifest v3', 'ExcelJS', 'API Interception']
    },
    {
      category: '📧 External Services Integration',
      items: ['Gmail SMTP', 'ALIGO SMS API', 'PortOne', 'Coupang Open API']
    }
  ]

  return (
    <Window
      id="skills-window"
      title="Skills"
      icon="fa-code"
      onClose={onClose}
      onFocus={onFocus}
      zIndex={zIndex}
    >
      <div className="skills-grid">
        {skills.map((skillGroup, index) => (
          <div key={index} className="skill-category">
            <h3>{skillGroup.category}</h3>
            <div className="skill-items">
              {skillGroup.items.map((item, itemIndex) => (
                <span key={itemIndex} className="skill-tag">{item}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Window>
  )
}

export default SkillsWindow

