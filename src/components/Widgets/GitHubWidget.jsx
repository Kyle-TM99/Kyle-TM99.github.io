import { useState, useEffect } from 'react'

const GITHUB_USER = 'Kyle-TM99'
const CONTRIB_CHART_URL = `https://ghchart.rshah.org/${GITHUB_USER}`

function GitHubWidget() {
  const [pinnedRepos, setPinnedRepos] = useState([])

  useEffect(() => {
    fetchPinnedRepos()
  }, [])

  const fetchPinnedRepos = async () => {
    try {
      const res = await fetch(
        `https://api.github.com/users/${GITHUB_USER}/repos?sort=updated&per_page=30`
      )
      const repos = await res.json()
      if (!Array.isArray(repos)) return
      const publicRepos = repos.filter((r) => !r.private)
      const sorted = [...publicRepos].sort(
        (a, b) => (b.stargazers_count || 0) - (a.stargazers_count || 0)
      )
      const top = sorted.slice(0, 3).map((r) => ({
        name: r.name,
        url: r.html_url,
        language: r.language || '—',
        description: r.description || ''
      }))
      setPinnedRepos(top)
    } catch (e) {
      console.error('GitHub pinned repos:', e)
    }
  }

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div className="widget-header">
        <i className="fab fa-github" aria-hidden></i>
        <span>GitHub</span>
      </div>
      <div className="widget-content github-widget-content">
        <div className="github-contrib">
          <a
            href={`https://github.com/${GITHUB_USER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="github-chart-link"
          >
            <img
              src={CONTRIB_CHART_URL}
              alt="GitHub contribution chart"
              className="github-chart-img"
            />
          </a>
        </div>
        <div className="github-pinned">
          <p className="github-pinned-label">Pinned Repos</p>
          <ul className="github-pinned-list">
            {pinnedRepos.length === 0 ? (
              <li className="github-pinned-item">Loading...</li>
            ) : (
              pinnedRepos.map((repo, i) => (
                <li key={i} className="github-pinned-item">
                  <a
                    href={repo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="github-pinned-name"
                  >
                    {repo.name}
                  </a>
                  <span className="github-pinned-stack">{repo.language}</span>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default GitHubWidget

