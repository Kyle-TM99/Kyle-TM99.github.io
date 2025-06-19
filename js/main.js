// Portfolio OS - Main JavaScript
class PortfolioOS {
    constructor() {
        this.windows = new Map();
        this.zIndex = 100;
        this.terminalCommands = {
            'help': 'Available commands: help, about, skills, projects, experience, contact, clear, date, whoami',
            'about': 'Full Stack Developer passionate about creating innovative web solutions.',
            'skills': 'Frontend: HTML, CSS, JavaScript, React, Vue.js\nBackend: Node.js, Python, Express, Django',
            'projects': 'Portfolio OS - Creative OS-style portfolio website\nReact Native App - Cross-platform mobile application',
            'experience': '2023-Present: Senior Frontend Developer at Tech Company\n2021-2023: Full Stack Developer at Startup Inc.',
            'contact': 'Email: your.email@example.com\nGitHub: github.com/yourusername\nLinkedIn: linkedin.com/in/yourprofile',
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
        
        // Update time every second
        setInterval(() => this.updateTime(), 1000);
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
        // Desktop icon double-click
        document.querySelectorAll('.desktop-icon').forEach(icon => {
            let clickCount = 0;
            icon.addEventListener('click', (e) => {
                clickCount++;
                setTimeout(() => {
                    if (clickCount === 2) {
                        this.openWindow(icon.dataset.app);
                    }
                    clickCount = 0;
                }, 300);
            });
        });

        // Dock icon click
        document.querySelectorAll('.dock-item').forEach(item => {
            item.addEventListener('click', (e) => {
                this.openWindow(item.dataset.app);
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
            const window = e.target.closest('.window');
            if (window && window.style.display !== 'none') {
                this.focusWindow(window);
            }
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                // Close all windows
                document.querySelectorAll('.window.show').forEach(window => {
                    this.closeWindow(window);
                });
            }
        });
    }

    openWindow(appName) {
        const windowId = `${appName}-window`;
        const window = document.getElementById(windowId);
        
        if (!window) return;

        // If window is already open, just focus it
        if (window.classList.contains('show')) {
            this.focusWindow(window);
            return;
        }

        // Position window
        const centerX = (window.innerWidth - 400) / 2;
        const centerY = (window.innerHeight - 300) / 2;
        const offset = document.querySelectorAll('.window.show').length * 30;

        window.style.left = `${centerX + offset}px`;
        window.style.top = `${centerY + offset}px`;
        window.style.display = 'block';
        
        // Animate window opening
        setTimeout(() => {
            window.classList.add('show');
            this.focusWindow(window);
        }, 10);

        // Store window reference
        this.windows.set(windowId, window);

        // Special handling for terminal
        if (appName === 'terminal') {
            const terminalInput = window.querySelector('.terminal-input');
            if (terminalInput) {
                setTimeout(() => terminalInput.focus(), 300);
            }
        }
    }

    closeWindow(window) {
        window.classList.remove('show');
        setTimeout(() => {
            window.style.display = 'none';
        }, 300);

        // Remove from windows map
        this.windows.delete(window.id);
    }

    minimizeWindow(window) {
        window.style.transform = 'scale(0.1) translateY(100vh)';
        window.style.opacity = '0';
        setTimeout(() => {
            window.style.display = 'none';
            window.style.transform = '';
            window.style.opacity = '';
        }, 300);
    }

    maximizeWindow(window) {
        if (window.dataset.maximized === 'true') {
            // Restore
            window.style.width = '';
            window.style.height = '';
            window.style.left = window.dataset.originalLeft;
            window.style.top = window.dataset.originalTop;
            window.dataset.maximized = 'false';
        } else {
            // Maximize
            window.dataset.originalLeft = window.style.left;
            window.dataset.originalTop = window.style.top;
            window.style.left = '0px';
            window.style.top = '30px';
            window.style.width = '100vw';
            window.style.height = 'calc(100vh - 30px)';
            window.dataset.maximized = 'true';
        }
    }

    focusWindow(window) {
        // Bring window to front
        this.zIndex++;
        window.style.zIndex = this.zIndex;

        // Update visual focus
        document.querySelectorAll('.window').forEach(w => {
            w.classList.remove('focused');
        });
        window.classList.add('focused');
    }

    makeDraggable() {
        document.querySelectorAll('.window').forEach(window => {
            const header = window.querySelector('.window-header');
            let isDragging = false;
            let currentX = 0;
            let currentY = 0;
            let initialX = 0;
            let initialY = 0;

            header.addEventListener('mousedown', (e) => {
                if (e.target.classList.contains('control-btn')) return;
                
                isDragging = true;
                initialX = e.clientX - window.offsetLeft;
                initialY = e.clientY - window.offsetTop;
                header.style.cursor = 'grabbing';
            });

            document.addEventListener('mousemove', (e) => {
                if (!isDragging) return;

                e.preventDefault();
                currentX = e.clientX - initialX;
                currentY = e.clientY - initialY;

                // Keep window within viewport
                currentX = Math.max(0, Math.min(currentX, window.innerWidth - window.offsetWidth));
                currentY = Math.max(30, Math.min(currentY, window.innerHeight - window.offsetHeight));

                window.style.left = `${currentX}px`;
                window.style.top = `${currentY}px`;
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
}

// Global function for welcome button
function closeWelcome() {
    portfolioOS.closeWelcome();
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