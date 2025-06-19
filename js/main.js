// Portfolio OS - Main JavaScript
class PortfolioOS {
    constructor() {
        this.windows = new Map();
        this.zIndex = 100;
        this.terminalCommands = {
            'help': 'Available commands: help, about, skills, projects, experience, contact, blog, github, clear, date, whoami',
            'about': 'Full Stack Developer passionate about creating innovative web solutions.',
            'skills': 'Frontend: HTML, CSS, JavaScript, React, Vue.js\nBackend: Node.js, Python, Express, Django',
            'projects': 'Portfolio OS - Creative OS-style portfolio website\nReact Native App - Cross-platform mobile application',
            'experience': '2023-Present: Senior Frontend Developer at Tech Company\n2021-2023: Full Stack Developer at Startup Inc.',
            'contact': 'Email: your.email@example.com\nGitHub: github.com/yourusername\nLinkedIn: linkedin.com/in/yourprofile',
            'blog': 'Kyle Developer Story - Tech Blog\nURL: https://pids.tistory.com/\nTopics: Vue.js, Unity, Java, QueryDSL, AI, Algorithm, Web Development',
            'github': 'Kyle GitHub Profile\nURL: https://github.com/Kyle-TM99\nRepositories: OneStack, KyleTalk, KyleMall, OneDevelop, OnClass and more...',
            'clear': 'clear',
            'date': new Date().toLocaleString(),
            'whoami': 'Full Stack Developer | Creative Problem Solver | Tech Enthusiast'
        };
        this.init();
    }

    init() {
        this.updateTime();
        this.setupEventListeners();
        this.initializeWelcome();
        this.initializeWidgets();
        
        // Update time every second
        setInterval(() => this.updateTime(), 1000);
        
        // Update widgets every 5 seconds
        setInterval(() => this.updateWidgets(), 5000);
        
        // Update GitHub data every 5 minutes
        setInterval(() => this.fetchGitHubData(), 300000);
    }

    updateTime() {
        const now = new Date();
        const timeString = now.toLocaleTimeString('ko-KR', { 
            hour: '2-digit', 
            minute: '2-digit',
            hour12: false 
        });
        const timeElement = document.querySelector('.time');
        if (timeElement) {
            timeElement.textContent = timeString;
        }
    }

    setupEventListeners() {
        // Menu bar help click
        document.querySelector('.menu-item:last-child').addEventListener('click', () => {
            this.openHelp();
        });

        // Dock icon click
        document.querySelectorAll('.dock-item').forEach(item => {
            item.addEventListener('click', (e) => {
                if (item.dataset.app === 'blog') {
                    // 블로그는 새 창에서 열기
                    window.open('https://pids.tistory.com/', '_blank');
                } else if (item.dataset.app === 'github') {
                    // GitHub은 새 창에서 열기
                    window.open('https://github.com/Kyle-TM99', '_blank');
                } else {
                    this.openWindow(item.dataset.app);
                }
            });
        });

        // Window controls
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('close')) {
                this.closeWindow(e.target.closest('.window'));
            } else if (e.target.classList.contains('minimize')) {
                this.minimizeWindow(e.target.closest('.window'));
            } else if (e.target.classList.contains('maximize')) {
                this.maximizeWindow(e.target.closest('.window'));
            }
        });

        // Make windows draggable
        this.makeDraggable();

        // Terminal input
        this.setupTerminal();

        // Window focus management
        document.addEventListener('mousedown', (e) => {
            const windowElement = e.target.closest('.window');
            if (windowElement && windowElement.style.display !== 'none') {
                this.focusWindow(windowElement);
            }
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                // Close all windows
                document.querySelectorAll('.window.show').forEach(windowElement => {
                    this.closeWindow(windowElement);
                });
            }
        });
    }

    openWindow(appName) {
        const windowId = `${appName}-window`;
        const windowElement = document.getElementById(windowId);
        
        if (!windowElement) return;

        // If window is already open, just focus it
        if (windowElement.classList.contains('show')) {
            this.focusWindow(windowElement);
            return;
        }

        // Position window
        const centerX = (globalThis.innerWidth - 400) / 2;
        const centerY = (globalThis.innerHeight - 300) / 2;
        const offset = document.querySelectorAll('.window.show').length * 30;

        windowElement.style.left = `${centerX + offset}px`;
        windowElement.style.top = `${centerY + offset}px`;
        windowElement.style.display = 'block';
        
        // Animate window opening
        setTimeout(() => {
            windowElement.classList.add('show');
            this.focusWindow(windowElement);
        }, 10);

        // Store window reference
        this.windows.set(windowId, windowElement);

        // Special handling for terminal
        if (appName === 'terminal') {
            const terminalInput = windowElement.querySelector('.terminal-input');
            if (terminalInput) {
                setTimeout(() => terminalInput.focus(), 300);
            }
        }
    }

    closeWindow(windowElement) {
        windowElement.classList.remove('show');
        setTimeout(() => {
            windowElement.style.display = 'none';
        }, 300);

        // Remove from windows map
        this.windows.delete(windowElement.id);
    }

    minimizeWindow(windowElement) {
        windowElement.style.transform = 'scale(0.1) translateY(100vh)';
        windowElement.style.opacity = '0';
        setTimeout(() => {
            windowElement.style.display = 'none';
            windowElement.style.transform = '';
            windowElement.style.opacity = '';
        }, 300);
    }

    maximizeWindow(windowElement) {
        if (windowElement.dataset.maximized === 'true') {
            // Restore
            windowElement.style.width = '';
            windowElement.style.height = '';
            windowElement.style.left = windowElement.dataset.originalLeft;
            windowElement.style.top = windowElement.dataset.originalTop;
            windowElement.dataset.maximized = 'false';
        } else {
            // Maximize
            windowElement.dataset.originalLeft = windowElement.style.left;
            windowElement.dataset.originalTop = windowElement.style.top;
            windowElement.style.left = '0px';
            windowElement.style.top = '30px';
            windowElement.style.width = '100vw';
            windowElement.style.height = 'calc(100vh - 30px)';
            windowElement.dataset.maximized = 'true';
        }
    }

    focusWindow(windowElement) {
        // Bring window to front
        this.zIndex++;
        windowElement.style.zIndex = this.zIndex;

        // Update visual focus
        document.querySelectorAll('.window').forEach(w => {
            w.classList.remove('focused');
        });
        windowElement.classList.add('focused');
    }

    makeDraggable() {
        document.querySelectorAll('.window').forEach(windowElement => {
            const header = windowElement.querySelector('.window-header');
            let isDragging = false;
            let currentX = 0;
            let currentY = 0;
            let initialX = 0;
            let initialY = 0;

            header.addEventListener('mousedown', (e) => {
                if (e.target.classList.contains('control-btn')) return;
                
                isDragging = true;
                initialX = e.clientX - windowElement.offsetLeft;
                initialY = e.clientY - windowElement.offsetTop;
                header.style.cursor = 'grabbing';
            });

            document.addEventListener('mousemove', (e) => {
                if (!isDragging) return;

                e.preventDefault();
                currentX = e.clientX - initialX;
                currentY = e.clientY - initialY;

                // Keep window within viewport
                currentX = Math.max(0, Math.min(currentX, globalThis.innerWidth - windowElement.offsetWidth));
                currentY = Math.max(30, Math.min(currentY, globalThis.innerHeight - windowElement.offsetHeight));

                windowElement.style.left = `${currentX}px`;
                windowElement.style.top = `${currentY}px`;
            });

            document.addEventListener('mouseup', () => {
                isDragging = false;
                header.style.cursor = 'move';
            });
        });
    }

    setupTerminal() {
        const terminalInput = document.querySelector('.terminal-input');
        const terminalOutput = document.querySelector('.terminal-output');

        if (!terminalInput || !terminalOutput) return;

        terminalInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const command = terminalInput.value.trim().toLowerCase();
                const prompt = `user@portfolio:~$ ${terminalInput.value}`;
                
                // Add command to output
                this.addTerminalLine(prompt);

                // Process command
                this.processTerminalCommand(command);

                // Clear input
                terminalInput.value = '';
            } else if (e.key === 'Tab') {
                e.preventDefault();
                // Simple autocomplete
                const input = terminalInput.value.toLowerCase();
                const commands = Object.keys(this.terminalCommands);
                const matches = commands.filter(cmd => cmd.startsWith(input));
                if (matches.length === 1) {
                    terminalInput.value = matches[0];
                }
            }
        });

        // Focus terminal input when terminal window is clicked
        document.addEventListener('click', (e) => {
            const terminalWindow = e.target.closest('#terminal-window');
            if (terminalWindow && terminalWindow.classList.contains('show')) {
                terminalInput.focus();
            }
        });
    }

    processTerminalCommand(command) {
        if (command === 'clear') {
            document.querySelector('.terminal-output').innerHTML = `
                <div class="terminal-line">Portfolio OS Terminal v1.0</div>
                <div class="terminal-line">Type 'help' for available commands</div>
                <div class="terminal-line"></div>
            `;
            return;
        }

        const response = this.terminalCommands[command];
        if (response) {
            if (response.includes('\n')) {
                response.split('\n').forEach(line => {
                    this.addTerminalLine(line);
                });
            } else {
                this.addTerminalLine(response);
            }
        } else {
            this.addTerminalLine(`Command not found: ${command}. Type 'help' for available commands.`);
        }

        this.addTerminalLine(''); // Empty line for spacing
    }

    addTerminalLine(text) {
        const terminalOutput = document.querySelector('.terminal-output');
        const line = document.createElement('div');
        line.className = 'terminal-line';
        line.textContent = text;
        terminalOutput.appendChild(line);

        // Scroll to bottom
        const terminalContent = document.querySelector('.terminal-content');
        terminalContent.scrollTop = terminalContent.scrollHeight;
    }

    initializeWelcome() {
        const welcomeModal = document.getElementById('welcome-modal');
        
        // Auto-close welcome after 5 seconds
        setTimeout(() => {
            this.closeWelcome();
        }, 5000);
    }

    closeWelcome() {
        const welcomeModal = document.getElementById('welcome-modal');
        welcomeModal.classList.add('hidden');
        setTimeout(() => {
            welcomeModal.style.display = 'none';
        }, 500);
    }

    openHelp() {
        const helpModal = document.getElementById('help-modal');
        helpModal.style.display = 'flex';
        setTimeout(() => {
            helpModal.classList.remove('hidden');
        }, 10);
    }

    closeHelp() {
        const helpModal = document.getElementById('help-modal');
        helpModal.classList.add('hidden');
        setTimeout(() => {
            helpModal.style.display = 'none';
        }, 300);
    }

    initializeWidgets() {
        this.updateClockWidget();
        this.updateSystemWidget();
        this.fetchGitHubData();
        this.startUptime = Date.now();
    }

    updateWidgets() {
        this.updateClockWidget();
        this.updateSystemWidget();
    }

    updateClockWidget() {
        const now = new Date();
        const timeElement = document.querySelector('.current-time');
        const dateElement = document.querySelector('.current-date');
        
        if (timeElement) {
            const timeString = now.toLocaleTimeString('ko-KR', { 
                hour: '2-digit', 
                minute: '2-digit',
                second: '2-digit',
                hour12: false 
            });
            timeElement.textContent = timeString;
        }
        
        if (dateElement) {
            const dateString = now.toLocaleDateString('ko-KR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                weekday: 'long'
            });
            dateElement.textContent = dateString;
        }
    }

    updateSystemWidget() {
        // Update uptime
        const uptimeElement = document.getElementById('uptime');
        if (uptimeElement && this.startUptime) {
            const uptime = Date.now() - this.startUptime;
            const hours = Math.floor(uptime / (1000 * 60 * 60));
            const minutes = Math.floor((uptime % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((uptime % (1000 * 60)) / 1000);
            uptimeElement.textContent = `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }

        // Simulate CPU and Memory usage
        const cpuElement = document.querySelector('.system-stats .stat-item:nth-child(1) .stat-value');
        const memoryElement = document.querySelector('.system-stats .stat-item:nth-child(2) .stat-value');
        
        if (cpuElement) {
            const cpu = Math.floor(Math.random() * 20) + 30; // 30-50%
            cpuElement.textContent = `${cpu}%`;
        }
        
        if (memoryElement) {
            const memory = (Math.random() * 1 + 1.5).toFixed(1); // 1.5-2.5GB
            memoryElement.textContent = `${memory}GB`;
        }
    }

    async fetchGitHubData() {
        try {
            // Fetch user data
            const userResponse = await fetch('https://api.github.com/users/Kyle-TM99');
            const userData = await userResponse.json();
            
            // Fetch repositories data
            const reposResponse = await fetch('https://api.github.com/users/Kyle-TM99/repos?sort=updated&per_page=100');
            const reposData = await reposResponse.json();
            
            if (userResponse.ok && reposResponse.ok) {
                this.updateGitHubWidget(userData, reposData);
            } else {
                console.error('GitHub API Error');
                this.updateGitHubWidget(null, null);
            }
        } catch (error) {
            console.error('Failed to fetch GitHub data:', error);
            this.updateGitHubWidget(null, null);
        }
    }

    updateGitHubWidget(userData, reposData) {
        if (userData && reposData) {
            // Calculate additional stats from repositories
            const totalStars = reposData.reduce((sum, repo) => sum + repo.stargazers_count, 0);
            const totalForks = reposData.reduce((sum, repo) => sum + repo.forks_count, 0);
            const languages = [...new Set(reposData.map(repo => repo.language).filter(lang => lang))];
            const publicRepos = reposData.filter(repo => !repo.private).length;
            
            // Find most recent commit
            const recentRepo = reposData.find(repo => repo.pushed_at);
            const lastActivity = recentRepo ? new Date(recentRepo.pushed_at) : null;
            
                         // Update GitHub widget with dynamic content
             const githubWidget = document.querySelector('.github-stats');
             if (githubWidget) {
                 githubWidget.innerHTML = `
                     <div class="stat-row">
                         <i class="fas fa-folder-open stat-icon"></i>
                         <span class="stat-text">Public Repos: ${publicRepos}</span>
                     </div>
                     <div class="stat-row">
                         <i class="fas fa-star stat-icon"></i>
                         <span class="stat-text">Total Stars: ${totalStars}</span>
                     </div>
                     <div class="stat-row">
                         <i class="fas fa-code-branch stat-icon"></i>
                         <span class="stat-text">Total Forks: ${totalForks}</span>
                     </div>
                     <div class="stat-row">
                         <i class="fas fa-users stat-icon"></i>
                         <span class="stat-text">Followers: ${userData.followers}</span>
                     </div>
                     <div class="stat-row">
                         <i class="fas fa-code stat-icon"></i>
                         <span class="stat-text">Languages: ${Math.min(languages.length, 8)}+</span>
                     </div>
                     <div class="stat-row">
                         <i class="fas fa-calendar-alt stat-icon"></i>
                         <span class="stat-text">Since: ${new Date(userData.created_at).getFullYear()}.${String(new Date(userData.created_at).getMonth() + 1).padStart(2, '0')}</span>
                     </div>
                 `;
             }
            
            // Update projects widget with real repository data
            this.updateProjectsWidget(reposData);
                 } else {
             // Fallback to static data if API fails
             const githubWidget = document.querySelector('.github-stats');
             if (githubWidget) {
                 githubWidget.innerHTML = `
                     <div class="stat-row">
                         <i class="fas fa-folder-open stat-icon"></i>
                         <span class="stat-text">Public Repos: 8</span>
                     </div>
                     <div class="stat-row">
                         <i class="fas fa-users stat-icon"></i>
                         <span class="stat-text">Followers: 1</span>
                     </div>
                     <div class="stat-row">
                         <i class="fas fa-calendar-alt stat-icon"></i>
                         <span class="stat-text">Since: 2024.04</span>
                     </div>
                 `;
             }
         }
    }

    updateProjectsWidget(reposData) {
        if (!reposData || reposData.length === 0) return;
        
        // Sort by stars and recent activity, filter out forks
        const featuredRepos = reposData
            .filter(repo => !repo.fork && repo.name !== 'Kyle-TM99')  // Exclude forks and profile repo
            .sort((a, b) => {
                // Sort by stars first, then by recent updates
                if (b.stargazers_count !== a.stargazers_count) {
                    return b.stargazers_count - a.stargazers_count;
                }
                return new Date(b.pushed_at) - new Date(a.pushed_at);
            })
            .slice(0, 3);  // Take top 3
        
        const projectsList = document.querySelector('.project-list');
        if (projectsList && featuredRepos.length > 0) {
            projectsList.innerHTML = featuredRepos.map((repo, index) => `
                <div class="project-item-mini">
                    <div class="project-dot ${index === 0 ? 'active' : ''}"></div>
                    <span title="${repo.description || 'No description'}">${repo.name}</span>
                </div>
            `).join('');
        }
    }

    getTimeAgo(date) {
        const now = new Date();
        const diffMs = now - date;
        const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
        const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
        const diffMinutes = Math.floor(diffMs / (1000 * 60));
        
        if (diffDays > 0) {
            return `${diffDays}일 전`;
        } else if (diffHours > 0) {
            return `${diffHours}시간 전`;
        } else if (diffMinutes > 0) {
            return `${diffMinutes}분 전`;
        } else {
            return '방금 전';
        }
    }
}

// Global functions for modal buttons
function closeWelcome() {
    portfolioOS.closeWelcome();
}

function closeHelp() {
    portfolioOS.closeHelp();
}

// Dock hover effects
document.addEventListener('DOMContentLoaded', () => {
    const dockItems = document.querySelectorAll('.dock-item');
    
    dockItems.forEach((item, index) => {
        item.addEventListener('mouseenter', () => {
            // Scale up hovered item and neighbors
            dockItems.forEach((otherItem, otherIndex) => {
                const distance = Math.abs(index - otherIndex);
                let scale = 1;
                
                if (distance === 0) scale = 1.2;
                else if (distance === 1) scale = 1.1;
                else if (distance === 2) scale = 1.05;
                
                otherItem.style.transform = `translateY(-8px) scale(${scale})`;
            });
        });

        item.addEventListener('mouseleave', () => {
            // Reset all items after a delay
            setTimeout(() => {
                if (!document.querySelector('.dock-item:hover')) {
                    dockItems.forEach(otherItem => {
                        otherItem.style.transform = '';
                    });
                }
            }, 100);
        });
    });
});

// Add some particle effects for extra flair
class ParticleSystem {
    constructor() {
        this.particles = [];
        this.canvas = null;
        this.ctx = null;
        this.init();
    }

    init() {
        this.canvas = document.createElement('canvas');
        this.canvas.style.position = 'fixed';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.pointerEvents = 'none';
        this.canvas.style.zIndex = '1';
        this.canvas.style.opacity = '0.6';
        document.body.appendChild(this.canvas);

        this.ctx = this.canvas.getContext('2d');
        this.resize();

        window.addEventListener('resize', () => this.resize());

        // Create initial particles
        for (let i = 0; i < 50; i++) {
            this.particles.push(this.createParticle());
        }

        this.animate();
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    createParticle() {
        return {
            x: Math.random() * this.canvas.width,
            y: Math.random() * this.canvas.height,
            size: Math.random() * 2 + 1,
            speedX: (Math.random() - 0.5) * 0.5,
            speedY: (Math.random() - 0.5) * 0.5,
            opacity: Math.random() * 0.5 + 0.2,
            hue: Math.random() * 60 + 200 // Blue to purple range
        };
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.particles.forEach((particle, index) => {
            // Update position
            particle.x += particle.speedX;
            particle.y += particle.speedY;

            // Wrap around edges
            if (particle.x < 0) particle.x = this.canvas.width;
            if (particle.x > this.canvas.width) particle.x = 0;
            if (particle.y < 0) particle.y = this.canvas.height;
            if (particle.y > this.canvas.height) particle.y = 0;

            // Draw particle
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fillStyle = `hsla(${particle.hue}, 70%, 70%, ${particle.opacity})`;
            this.ctx.fill();

            // Connect nearby particles
            this.particles.forEach((otherParticle, otherIndex) => {
                if (index !== otherIndex) {
                    const dx = particle.x - otherParticle.x;
                    const dy = particle.y - otherParticle.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 100) {
                        this.ctx.beginPath();
                        this.ctx.moveTo(particle.x, particle.y);
                        this.ctx.lineTo(otherParticle.x, otherParticle.y);
                        this.ctx.strokeStyle = `hsla(${particle.hue}, 70%, 70%, ${0.1 * (1 - distance / 100)})`;
                        this.ctx.lineWidth = 0.5;
                        this.ctx.stroke();
                    }
                }
            });
        });

        requestAnimationFrame(() => this.animate());
    }
}

// Initialize the Portfolio OS
let portfolioOS;
let particleSystem;

document.addEventListener('DOMContentLoaded', () => {
    portfolioOS = new PortfolioOS();
    particleSystem = new ParticleSystem();
});

// Easter eggs and fun interactions
document.addEventListener('keydown', (e) => {
    // Konami code or other easter eggs can be added here
    if (e.ctrlKey && e.shiftKey && e.key === 'I') {
        console.log(`
        ██████╗  ██████╗ ██████╗ ████████╗███████╗ ██████╗ ██╗     ██╗ ██████╗      ██████╗ ███████╗
        ██╔══██╗██╔═══██╗██╔══██╗╚══██╔══╝██╔════╝██╔═══██╗██║     ██║██╔═══██╗    ██╔═══██╗██╔════╝
        ██████╔╝██║   ██║██████╔╝   ██║   █████╗  ██║   ██║██║     ██║██║   ██║    ██║   ██║███████╗
        ██╔═══╝ ██║   ██║██╔══██╗   ██║   ██╔══╝  ██║   ██║██║     ██║██║   ██║    ██║   ██║╚════██║
        ██║     ╚██████╔╝██║  ██║   ██║   ██║     ╚██████╔╝███████╗██║╚██████╔╝    ╚██████╔╝███████║
        ╚═╝      ╚═════╝ ╚═╝  ╚═╝   ╚═╝   ╚═╝      ╚═════╝ ╚══════╝╚═╝ ╚═════╝      ╚═════╝ ╚══════╝
        
        Welcome to Portfolio OS! 
        Created with ❤️ using HTML, CSS, and JavaScript
        `);
    }
}); 