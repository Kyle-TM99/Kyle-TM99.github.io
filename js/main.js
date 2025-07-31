// Portfolio OS - Main JavaScript
class PortfolioOS {
    constructor() {
        this.windows = new Map();
        this.zIndex = 100;
        this.terminalCommands = {
            'help': 'Available commands: help, about, skills, projects, experience, contact, blog, github, baekjoon, clear, date, whoami',
            'about': 'Full Stack Developer passionate about creating innovative web solutions. Currently working at GoodSen as a 1-person full-stack developer.',
            'skills': 'Frontend: HTML, CSS, JavaScript\nBackend: Java, Spring Boot, Spring Security\nDatabase: MySQL, MyBatis, JPA\nCloud & DevOps: AWS, Docker, Jenkins\nTools: Git, Confluence, Notion',
            'projects': 'OneStack - IT 전문가 매칭 플랫폼 (팀장)\nKyleTalk - 실시간 채팅 기반 소셜 네트워크 서비스\nKyleMall - 남성 의류 쇼핑몰\nOne Develop - 개발 전문 커뮤니티 플랫폼 (팀장)',
            'experience': '2025.04-Present: Full Stack Developer & DevOps Engineer at GoodSen\n- 온라인 교육 플랫폼 백엔드 시스템 설계 및 구축\n- 사내 Python 업무 자동화 시스템 설계 및 구축',
            'contact': 'Email: rlaxoals9977@gmail.com\nGitHub: github.com/Kyle-TM99\nBlog: pids.tistory.com\nLinkedIn: linkedin.com/in/taemin-kim-353b20352',
            'blog': 'Kyle Developer Story - Tech Blog\nURL: https://pids.tistory.com/\nTopics: Vue.js, Unity, Java, QueryDSL, AI, Algorithm, Web Development',
            'github': 'Kyle GitHub Profile\nURL: https://github.com/Kyle-TM99\nRepositories: OneStack, KyleTalk, KyleMall, OneDevelop, OnClass and more...',
            'baekjoon': 'Baekjoon Online Judge Profile\nHandle: pids\nURL: https://solved.ac/profile/pids\nCheck the Baekjoon widget for live stats!',
            'clear': 'clear',
            'date': new Date().toLocaleString(),
            'whoami': 'Full Stack Developer | GoodSen | Team Leader | Problem Solver'
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
        
        // Update clock widget every second
        setInterval(() => this.updateClockWidget(), 1000);
        
        // Update other widgets every 5 seconds
        setInterval(() => this.updateWidgets(), 5000);
        
        // Update GitHub data every 5 minutes
        setInterval(() => this.fetchGitHubData(), 300000);
        
        // Update Baekjoon data every 10 minutes
        setInterval(() => this.fetchBaekjoonData(), 600000);
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
        // Menu bar items click
        document.querySelectorAll('.menu-item').forEach((item, index) => {
            item.addEventListener('click', () => {
                if (item.textContent === '도움말') {
                    this.openHelp();
                } else if (item.textContent === '후원') {
                    window.open('https://coff.ee/kyle99', '_blank');
                }
            });
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

        // If window is already open and visible, just focus it
        if (windowElement.classList.contains('show') && windowElement.style.display !== 'none') {
            this.focusWindow(windowElement);
            return;
        }

        // Check if mobile device
        const isMobile = window.innerWidth <= 768;
        
        if (isMobile) {
            // 모바일에서는 전체화면으로 설정
            windowElement.style.position = 'fixed';
            windowElement.style.top = '0';
            windowElement.style.left = '0';
            windowElement.style.right = '0';
            windowElement.style.bottom = '0';
            windowElement.style.width = '100vw';
            windowElement.style.height = '100vh';
            windowElement.style.minWidth = '100vw';
            windowElement.style.minHeight = '100vh';
            windowElement.style.maxWidth = '100vw';
            windowElement.style.maxHeight = '100vh';
            windowElement.style.transform = 'none';
            windowElement.style.borderRadius = '0';
            windowElement.style.margin = '0';
        } else {
            // 데스크톱에서는 기존 방식 유지
            // Reset any previous positioning
            windowElement.style.left = '';
            windowElement.style.top = '';
            windowElement.style.transform = '';
        }
        
        // Show window
        windowElement.style.display = 'block';
        
        // Animate window opening
        setTimeout(() => {
            windowElement.classList.add('show');
            this.focusWindow(windowElement);
            
            // 모바일에서는 윈도우 내용을 맨 위로 스크롤
            if (isMobile) {
                const windowContent = windowElement.querySelector('.window-content');
                if (windowContent) {
                    windowContent.scrollTop = 0;
                }
                
                // 특정 컨테이너들도 스크롤 초기화
                const containers = windowElement.querySelectorAll('.about-content, .projects-container, .experience-container, .help-body');
                containers.forEach(container => {
                    container.scrollTop = 0;
                });
            }
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
            let startX = 0;
            let startY = 0;
            let startLeft = 0;
            let startTop = 0;

            // Check if mobile device
            const isMobile = window.innerWidth <= 768;

            // Mouse events (데스크톱에서만)
            if (!isMobile) {
                header.addEventListener('mousedown', (e) => {
                    if (e.target.classList.contains('control-btn')) return;
                    
                    isDragging = true;
                    
                    // Get current position
                    const rect = windowElement.getBoundingClientRect();
                    startLeft = rect.left;
                    startTop = rect.top;
                    startX = e.clientX;
                    startY = e.clientY;
                    
                    // Remove transform and set absolute position
                    windowElement.style.transform = 'none';
                    windowElement.style.left = startLeft + 'px';
                    windowElement.style.top = startTop + 'px';
                    windowElement.classList.add('dragging');
                    
                    header.style.cursor = 'grabbing';
                    e.preventDefault();
                });

                // Mouse move
                document.addEventListener('mousemove', (e) => {
                    if (!isDragging) return;
                    
                    e.preventDefault();
                    
                    const deltaX = e.clientX - startX;
                    const deltaY = e.clientY - startY;
                    
                    let newLeft = startLeft + deltaX;
                    let newTop = startTop + deltaY;
                    
                    // Keep window within viewport
                    const maxX = window.innerWidth - windowElement.offsetWidth;
                    const maxY = window.innerHeight - windowElement.offsetHeight;
                    
                    newLeft = Math.max(0, Math.min(newLeft, maxX));
                    newTop = Math.max(30, Math.min(newTop, maxY));
                    
                    windowElement.style.left = newLeft + 'px';
                    windowElement.style.top = newTop + 'px';
                });

                // Mouse up
                document.addEventListener('mouseup', () => {
                    if (isDragging) {
                        isDragging = false;
                        header.style.cursor = 'move';
                        windowElement.classList.remove('dragging');
                    }
                });
            }

            // Touch events for mobile (전체화면이 아닐 때만)
            header.addEventListener('touchstart', (e) => {
                if (e.target.classList.contains('control-btn')) return;
                if (isMobile) return; // 모바일에서는 드래그 비활성화
                
                isDragging = true;
                
                // Get current position
                const rect = windowElement.getBoundingClientRect();
                startLeft = rect.left;
                startTop = rect.top;
                startX = e.touches[0].clientX;
                startY = e.touches[0].clientY;
                
                // Remove transform and set absolute position
                windowElement.style.transform = 'none';
                windowElement.style.left = startLeft + 'px';
                windowElement.style.top = startTop + 'px';
                windowElement.classList.add('dragging');
                
                e.preventDefault();
            });

            // Touch move
            document.addEventListener('touchmove', (e) => {
                if (!isDragging) return;
                if (isMobile) return; // 모바일에서는 드래그 비활성화
                
                e.preventDefault();
                
                const deltaX = e.touches[0].clientX - startX;
                const deltaY = e.touches[0].clientY - startY;
                
                let newLeft = startLeft + deltaX;
                let newTop = startTop + deltaY;
                
                // Keep window within viewport
                const maxX = window.innerWidth - windowElement.offsetWidth;
                const maxY = window.innerHeight - windowElement.offsetHeight;
                
                newLeft = Math.max(0, Math.min(newLeft, maxX));
                newTop = Math.max(30, Math.min(newTop, maxY));
                
                windowElement.style.left = newLeft + 'px';
                windowElement.style.top = newTop + 'px';
            });

            // Touch end
            document.addEventListener('touchend', () => {
                if (isDragging) {
                    isDragging = false;
                    windowElement.classList.remove('dragging');
                }
            });

            // Prevent drag when clicking on controls
            header.addEventListener('click', (e) => {
                if (e.target.classList.contains('control-btn')) {
                    isDragging = false;
                }
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

        // Mobile touch support for terminal
        document.addEventListener('touchstart', (e) => {
            const terminalWindow = e.target.closest('#terminal-window');
            if (terminalWindow && terminalWindow.classList.contains('show')) {
                terminalInput.focus();
            }
        });

        // Prevent zoom on double tap for mobile
        let lastTouchEnd = 0;
        document.addEventListener('touchend', (e) => {
            const now = (new Date()).getTime();
            if (now - lastTouchEnd <= 300) {
                e.preventDefault();
            }
            lastTouchEnd = now;
        }, false);
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
        
        // Auto-close welcome after 5 seconds - REMOVED
        // setTimeout(() => {
        //     this.closeWelcome();
        // }, 5000);
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
        this.fetchBaekjoonData();
        this.startUptime = Date.now();
    }

    updateWidgets() {
        this.updateSystemWidget();
        this.updateExperienceWidget();
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

    updateExperienceWidget() {
        const totalExperienceElement = document.getElementById('total-experience');
        if (totalExperienceElement) {
            // 2025.04 기준으로 경력 계산
            const startDate = new Date('2025-04-21');
            const currentDate = new Date();
            
            const diffTime = currentDate.getTime() - startDate.getTime();
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            
            const months = Math.floor(diffDays / 30);
            const remainingDays = diffDays % 30;
            
            let experienceText = '';
            if (months > 0) {
                experienceText = `${months}개월`;
                if (remainingDays > 0) {
                    experienceText += ` ${remainingDays}일`;
                }
            } else {
                experienceText = `${remainingDays}일`;
            }
            
            totalExperienceElement.textContent = experienceText;
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

    async fetchBaekjoonData() {
        try {
            console.log('Fetching Baekjoon data for user: pids');
            
            // Simple fetch without extra headers
            const userResponse = await fetch('https://solved.ac/api/v3/user/show?handle=pids');
            
            console.log('Baekjoon API Response Status:', userResponse.status);
            
            if (userResponse.ok) {
                const userData = await userResponse.json();
                console.log('Baekjoon API Response Data:', userData);
                this.updateBaekjoonWidget(userData);
            } else {
                console.error('Baekjoon API Error:', userResponse.status, userResponse.statusText);
                // Use sample data for testing
                this.updateBaekjoonWidget({
                    handle: "pids",
                    rating: 1425,
                    tier: 9,
                    rank: 15000,
                    solvedCount: 456
                });
            }
        } catch (error) {
            console.error('Failed to fetch Baekjoon data:', error);
            // Use sample data for testing
            this.updateBaekjoonWidget({
                handle: "pids",
                rating: 1425,
                tier: 9,
                rank: 15000,
                solvedCount: 456
            });
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

    updateBaekjoonWidget(userData) {
        if (userData) {
            // Get tier information
            const tier = userData.tier || 0;
            const tierName = this.getTierName(tier);
            const tierColor = this.getTierColor(tier);
            
            // Get solved count (handle different possible field names)
            const solvedCount = userData.solvedCount || userData.solved || 0;
            const rating = userData.rating || 0;
            const rank = userData.rank || 'N/A';
            
            console.log('Baekjoon API Response:', userData); // Debug log
            
            // Update Baekjoon widget with dynamic content
            const baekjoonWidget = document.querySelector('.baekjoon-stats');
            if (baekjoonWidget) {
                baekjoonWidget.innerHTML = `
                    <div class="stat-row">
                        <i class="fas fa-trophy stat-icon"></i>
                        <span class="stat-text">Tier: <span class="tier-text" style="color: ${tierColor}">${tierName}</span></span>
                    </div>
                    <div class="stat-row">
                        <i class="fas fa-code stat-icon"></i>
                        <span class="stat-text">Solved: <span class="solved-count">${solvedCount}</span></span>
                    </div>
                    <div class="stat-row">
                        <i class="fas fa-chart-line stat-icon"></i>
                        <span class="stat-text">Rank: <span class="rank-text">${rank}</span></span>
                    </div>
                    <div class="stat-row">
                        <i class="fas fa-star stat-icon"></i>
                        <span class="stat-text">Rating: <span class="rating-text">${rating}</span></span>
                    </div>
                `;
            }
        } else {
            // Fallback to static data if API fails
            const baekjoonWidget = document.querySelector('.baekjoon-stats');
            if (baekjoonWidget) {
                baekjoonWidget.innerHTML = `
                    <div class="stat-row">
                        <i class="fas fa-trophy stat-icon"></i>
                        <span class="stat-text">Tier: <span class="tier-text">Bronze</span></span>
                    </div>
                    <div class="stat-row">
                        <i class="fas fa-code stat-icon"></i>
                        <span class="stat-text">Solved: <span class="solved-count">0</span></span>
                    </div>
                    <div class="stat-row">
                        <i class="fas fa-chart-line stat-icon"></i>
                        <span class="stat-text">Rank: <span class="rank-text">N/A</span></span>
                    </div>
                    <div class="stat-row">
                        <i class="fas fa-star stat-icon"></i>
                        <span class="stat-text">Rating: <span class="rating-text">0</span></span>
                    </div>
                `;
            }
        }
    }

    getTierName(tier) {
        const tiers = {
            1: 'Bronze V', 2: 'Bronze IV', 3: 'Bronze III', 4: 'Bronze II', 5: 'Bronze I',
            6: 'Silver V', 7: 'Silver IV', 8: 'Silver III', 9: 'Silver II', 10: 'Silver I',
            11: 'Gold V', 12: 'Gold IV', 13: 'Gold III', 14: 'Gold II', 15: 'Gold I',
            16: 'Platinum V', 17: 'Platinum IV', 18: 'Platinum III', 19: 'Platinum II', 20: 'Platinum I',
            21: 'Diamond V', 22: 'Diamond IV', 23: 'Diamond III', 24: 'Diamond II', 25: 'Diamond I',
            26: 'Ruby V', 27: 'Ruby IV', 28: 'Ruby III', 29: 'Ruby II', 30: 'Ruby I',
            31: 'Master'
        };
        return tiers[tier] || 'Unrated';
    }

    getTierColor(tier) {
        if (tier <= 5) return '#ad5600'; // Bronze
        if (tier <= 10) return '#435f7a'; // Silver
        if (tier <= 15) return '#ec9a00'; // Gold
        if (tier <= 20) return '#27e2a4'; // Platinum
        if (tier <= 25) return '#00b4fc'; // Diamond
        if (tier <= 30) return '#ff0062'; // Ruby
        return '#ff0000'; // Master
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

// Experience accordion function
function toggleExperience(header) {
    const details = header.nextElementSibling;
    const isExpanded = header.classList.contains('expanded');
    
    // Close all other experience cards
    document.querySelectorAll('.experience-header').forEach(otherHeader => {
        if (otherHeader !== header) {
            otherHeader.classList.remove('expanded');
            otherHeader.nextElementSibling.classList.remove('expanded');
        }
    });
    
    // Toggle current card
    if (isExpanded) {
        header.classList.remove('expanded');
        details.classList.remove('expanded');
    } else {
        header.classList.add('expanded');
        details.classList.add('expanded');
    }
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