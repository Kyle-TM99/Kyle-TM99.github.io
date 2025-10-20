import { useState, useRef, useEffect } from 'react'
import Window from './Window'

function TerminalWindow({ onClose, onFocus, zIndex }) {
  const [output, setOutput] = useState([
    'Portfolio OS Terminal v1.0',
    'Type \'help\' for available commands',
    ''
  ])
  const [input, setInput] = useState('')
  const [history, setHistory] = useState([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const outputRef = useRef(null)
  const inputRef = useRef(null)

  const commands = {
    'help': 'Available commands: help, about, skills, projects, experience, contact, blog, github, baekjoon, clear, date, whoami',
    'about': 'Full Stack Developer passionate about creating innovative web solutions. Currently working at BEO as Education PM & Full-stack Developer.',
    'skills': 'Frontend: Vue.js 3, Vite, Tailwind CSS, Chart.js, HTML, CSS, JavaScript\nBackend: Java 17, Spring Boot 3.2.0, Spring Security, MyBatis, JPA\nDatabase: MySQL, Redis\nCloud & DevOps: AWS S3, AWS EC2, Docker, Jenkins\nBrowser Extensions: Chrome Extension, Manifest v3, ExcelJS\nTools: Git, Swagger/OpenAPI, Notion',
    'projects': 'SellerKit - 쿠팡 셀러 어시스턴트 솔루션 (2025.07~현재, 1인 풀스택)\n쿠팡 광고 캠페인 추출기 - Chrome Extension (2025.09)\n쿠팡 인기상품 검색어 추출기 - Chrome Extension (2025.08)\n쿠팡 판매량 추적기 - Chrome Extension (2025.10)\nOnClass - 온라인 교육 플랫폼 (2025.04~2025.07)\nOneStack - IT 전문가 매칭 플랫폼 (2024.12~2025.02, 팀장)\nKyleTalk - 실시간 채팅 기반 소셜 네트워크 서비스 (2024.11~2024.12)\nKyleMall - 남성 의류 쇼핑몰 (2024.10~2024.11)\nOne Develop - 개발 전문 커뮤니티 플랫폼 (2024.09~2024.10, 팀장)',
    'experience': '2025.07-Present: Education PM & Full-stack Developer at BEO\n- 교육 플랫폼 프로젝트 총괄 매니징\n- SellerKit (쿠팡 셀러 어시스턴트 솔루션) 1인 풀스택 개발 (Vue.js 3, Spring Boot, Redis, MySQL)\n- 쿠팡 API 연동 및 데이터 수집 자동화 시스템 구축\n- Chrome Extension 개발 (광고 캠페인 추출기, 인기상품 검색어 추출기, 판매량 추적기)\n\n2025.04-2025.07: Backend Developer at GoodSen\n- 온라인 교육 플랫폼 백엔드 시스템 설계 및 구축\n- 사내 Python 업무 자동화 시스템 설계 및 구축',
    'contact': 'Email: rlaxoals9977@gmail.com\nGitHub: github.com/Kyle-TM99\nBlog: pids.tistory.com\nLinkedIn: linkedin.com/in/taemin-kim-353b20352',
    'blog': 'Kyle Developer Story - Tech Blog\nURL: https://pids.tistory.com/\nTopics: Vue.js, Unity, Java, QueryDSL, AI, Algorithm, Web Development',
    'github': 'Kyle GitHub Profile\nURL: https://github.com/Kyle-TM99\nRepositories: OneStack, KyleTalk, KyleMall, OneDevelop, OnClass and more...',
    'baekjoon': 'Baekjoon Online Judge Profile\nHandle: pids\nURL: https://solved.ac/profile/pids\nCheck the Baekjoon widget for live stats!',
    'clear': 'clear',
    'date': new Date().toLocaleString(),
    'whoami': 'Full Stack Developer | BEO | Education PM | 1-Person Full-stack Developer'
  }

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight
    }
  }, [output])

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  const addOutput = (text) => {
    setOutput(prev => [...prev, text])
  }

  const handleCommand = (cmd) => {
    const trimmedCmd = cmd.trim().toLowerCase()
    
    // Add command to history
    if (trimmedCmd) {
      setHistory(prev => [...prev, trimmedCmd])
      setHistoryIndex(-1)
    }
    
    // Add command to output
    addOutput(`user@portfolio:~$ ${cmd}`)
    
    if (trimmedCmd === 'clear') {
      setOutput([
        'Portfolio OS Terminal v1.0',
        'Type \'help\' for available commands',
        ''
      ])
    } else if (commands[trimmedCmd]) {
      const response = commands[trimmedCmd]
      response.split('\n').forEach(line => addOutput(line))
      addOutput('')
    } else if (trimmedCmd) {
      addOutput(`Command not found: ${trimmedCmd}. Type 'help' for available commands.`)
      addOutput('')
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleCommand(input)
      setInput('')
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (history.length > 0 && historyIndex < history.length - 1) {
        const newIndex = historyIndex + 1
        setHistoryIndex(newIndex)
        setInput(history[history.length - 1 - newIndex])
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1
        setHistoryIndex(newIndex)
        setInput(history[history.length - 1 - newIndex])
      } else if (historyIndex === 0) {
        setHistoryIndex(-1)
        setInput('')
      }
    } else if (e.key === 'Tab') {
      e.preventDefault()
      const matches = Object.keys(commands).filter(cmd => cmd.startsWith(input.toLowerCase()))
      if (matches.length === 1) {
        setInput(matches[0])
      }
    }
  }

  return (
    <Window
      id="terminal-window"
      title="Terminal"
      icon="fa-terminal"
      onClose={onClose}
      onFocus={onFocus}
      zIndex={zIndex}
      width="600px"
      height="400px"
      minWidth="600px"
      minHeight="400px"
    >
      <div className="terminal-window-content">
        <div className="terminal-output" ref={outputRef}>
          {output.map((line, index) => (
            <div key={index} className="terminal-line">{line}</div>
          ))}
        </div>
        <div className="terminal-input-line">
          <span className="terminal-prompt">user@portfolio:~$ </span>
          <input
            ref={inputRef}
            type="text"
            className="terminal-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            autoComplete="off"
          />
        </div>
      </div>
    </Window>
  )
}

export default TerminalWindow

