import { useState, useEffect } from 'react'

const PROMPT_LINE = 'user@portfolio:~$ whoami'
const WHOAMI_LINE = '단순한 코더가 아닌, 기획부터 배포까지 A to Z를 직접 완결 짓는 프로덕트 메이커입니다.'
const STACK_LINE = 'React · Node · Spring · Vue · TypeScript'
const TYPING_SPEED = 45
const DELAY_BEFORE_STACK = 800

function TerminalWidget() {
  const [promptDone, setPromptDone] = useState(false)
  const [whoamiLength, setWhoamiLength] = useState(0)
  const [showStack, setShowStack] = useState(false)
  const [stackLength, setStackLength] = useState(0)
  const [cursorVisible, setCursorVisible] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setPromptDone(true), 100)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    if (!promptDone) return
    if (whoamiLength > WHOAMI_LINE.length) return
    const id = setInterval(() => setWhoamiLength((n) => n + 1), TYPING_SPEED)
    return () => clearInterval(id)
  }, [promptDone, whoamiLength])

  useEffect(() => {
    if (whoamiLength < WHOAMI_LINE.length) return
    const t = setTimeout(() => setShowStack(true), DELAY_BEFORE_STACK)
    return () => clearTimeout(t)
  }, [whoamiLength])

  useEffect(() => {
    if (!showStack) return
    if (stackLength > STACK_LINE.length) return
    const id = setInterval(() => setStackLength((n) => n + 1), 35)
    return () => clearInterval(id)
  }, [showStack, stackLength])

  useEffect(() => {
    const blink = setInterval(() => setCursorVisible((v) => !v), 530)
    return () => clearInterval(blink)
  }, [])

  const whoamiText = WHOAMI_LINE.slice(0, whoamiLength)
  const stackText = STACK_LINE.slice(0, stackLength)

  return (
    <div className="terminal-widget-inner">
      <div className="widget-header">
        <i className="fas fa-terminal" aria-hidden />
        <span>whoami</span>
      </div>
      <div className="terminal-widget-content">
        <pre className="terminal-widget-output">
          {PROMPT_LINE}
          {'\n'}
          {whoamiText}
          <span className={`terminal-cursor ${cursorVisible ? 'visible' : ''}`} aria-hidden>|</span>
          {showStack ? (
            <>
              {'\n\n'}
              user@portfolio:~$ echo $STACK
              {'\n'}
              {stackText}
              <span className={`terminal-cursor ${cursorVisible ? 'visible' : ''}`} aria-hidden>|</span>
            </>
          ) : null}
        </pre>
      </div>
    </div>
  )
}

export default TerminalWidget
