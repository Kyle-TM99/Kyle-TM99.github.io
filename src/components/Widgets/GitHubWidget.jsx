import { useState, useEffect } from 'react'

function GitHubWidget() {
  const [githubData, setGithubData] = useState(null)

  useEffect(() => {
    fetchGitHubData()
    const interval = setInterval(fetchGitHubData, 300000) // 5분마다 업데이트
    return () => clearInterval(interval)
  }, [])

  const fetchGitHubData = async () => {
    try {
      const userResponse = await fetch('https://api.github.com/users/Kyle-TM99')
      const userData = await userResponse.json()

      const reposResponse = await fetch('https://api.github.com/users/Kyle-TM99/repos?sort=updated&per_page=100')
      const reposData = await reposResponse.json()

      if (userResponse.ok && reposResponse.ok) {
        const totalStars = reposData.reduce((sum, repo) => sum + repo.stargazers_count, 0)
        const totalForks = reposData.reduce((sum, repo) => sum + repo.forks_count, 0)
        const languages = [...new Set(reposData.map(repo => repo.language).filter(lang => lang))]
        const publicRepos = reposData.filter(repo => !repo.private).length

        setGithubData({
          publicRepos,
          totalStars,
          totalForks,
          followers: userData.followers,
          languages: languages.length,
          since: new Date(userData.created_at)
        })
      }
    } catch (error) {
      console.error('Failed to fetch GitHub data:', error)
      setGithubData({
        publicRepos: 8,
        followers: 1,
        since: new Date('2024-04-01')
      })
    }
  }

  if (!githubData) {
    return (
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <div className="widget-header">
          <i className="fab fa-github"></i>
          <span>GitHub Stats</span>
        </div>
        <div className="widget-content">
          <div className="github-stats">
            <div className="stat-row">
              <span className="stat-icon">📊</span>
              <span className="stat-text">Loading...</span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div className="widget-header">
        <i className="fab fa-github"></i>
        <span>GitHub Stats</span>
      </div>
      <div className="widget-content">
        <div className="github-stats">
          <div className="stat-row">
            <i className="fas fa-folder-open stat-icon"></i>
            <span className="stat-text">Public Repos: {githubData.publicRepos}</span>
          </div>
          {githubData.totalStars !== undefined && (
            <div className="stat-row">
              <i className="fas fa-star stat-icon"></i>
              <span className="stat-text">Total Stars: {githubData.totalStars}</span>
            </div>
          )}
          {githubData.totalForks !== undefined && (
            <div className="stat-row">
              <i className="fas fa-code-branch stat-icon"></i>
              <span className="stat-text">Total Forks: {githubData.totalForks}</span>
            </div>
          )}
          <div className="stat-row">
            <i className="fas fa-users stat-icon"></i>
            <span className="stat-text">Followers: {githubData.followers}</span>
          </div>
          {githubData.languages !== undefined && (
            <div className="stat-row">
              <i className="fas fa-code stat-icon"></i>
              <span className="stat-text">Languages: {Math.min(githubData.languages, 8)}+</span>
            </div>
          )}
          <div className="stat-row">
            <i className="fas fa-calendar-alt stat-icon"></i>
            <span className="stat-text">Since: {githubData.since.getFullYear()}.{String(githubData.since.getMonth() + 1).padStart(2, '0')}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GitHubWidget

