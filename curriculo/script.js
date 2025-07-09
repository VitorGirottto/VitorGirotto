// Currículo Cyberpunk - JavaScript Vanilla

// Mock Data
const mockData = {        
    experience: [
        {
            id: 1,
            company: "IXC Soft",
            position: "Analista de Sistema Computacional",
            duration: "2023 - Presente",
            period: "2+ anos",
            description: "Lidero o desenvolvimento de plataformas de IA para análise preditiva. Implementei sistemas de machine learning que aumentaram a eficiência em 340%.",
            achievements: [
                "Desenvolveu sistema de IA que processa 1M+ dados/dia",
                "Reduziu tempo de resposta de APIs em 75%",
                "Liderou equipe de 8 desenvolvedores",
                "Implementou arquitetura microservices escalável"
            ],
            technologies: ["React", "Python", "TensorFlow", "Kubernetes", "AWS"]
        },
        {
            id: 2,
            company: "CyberSoft Solutions",
            position: "Full Stack Developer",
            duration: "2022 - 2023",
            period: "1 ano e 2 meses",
            description: "Desenvolvi aplicações web de alta performance para clientes enterprise. Especializei-me em soluções de cybersecurity e blockchain.",
            achievements: [
                "Criou 12+ aplicações web complexas",
                "Implementou sistemas de segurança avançados",
                "Otimizou performance de aplicações em 60%",
                "Mentoreou 5 desenvolvedores júniores"
            ],
            technologies: ["Vue.js", "Node.js", "PostgreSQL", "Docker", "Redis"]
        },
        {
            id: 3,
            company: "Digital Innovations Hub",
            position: "Junior Developer",
            duration: "2021 - 2022",
            period: "1 ano",
            description: "Início da carreira focado em desenvolvimento frontend e backend. Aprendi fundamentos sólidos e metodologias ágeis.",
            achievements: [
                "Desenvolveu 20+ componentes reutilizáveis",
                "Participou de 8 projetos diferentes",
                "Implementou testes automatizados",
                "Contribuiu para código open source"
            ],
            technologies: ["JavaScript", "React", "Express.js", "MongoDB", "Jest"]
        }
    ],
    
    projects: [
        {
            id: 1,
            title: "NeuroChat AI",
            description: "Sistema de chat inteligente com processamento de linguagem natural avançado e interface cyberpunk.",
            image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop",
            technologies: ["React", "OpenAI API", "Node.js", "Socket.io", "MongoDB"],
            github: "https://github.com/alexcyber/neurochat",
            demo: "https://neurochat.cybernet.future",
            status: "Concluído",
            featured: true
        },
        {
            id: 2,
            title: "CyberWallet DApp",
            description: "Carteira descentralizada para criptomoedas com interface futurística e recursos avançados de segurança.",
            image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=600&h=400&fit=crop",
            technologies: ["React", "Web3.js", "Solidity", "MetaMask", "IPFS"],
            github: "https://github.com/alexcyber/cyberwallet",
            demo: "https://cyberwallet.decentralized.app",
            status: "Em desenvolvimento",
            featured: true
        },
        {
            id: 3,
            title: "Quantum Task Manager",
            description: "Gerenciador de tarefas com IA preditiva e design inspirado em interfaces de ficção científica.",
            image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=600&h=400&fit=crop",
            technologies: ["Vue.js", "Python", "FastAPI", "PostgreSQL", "TensorFlow"],
            github: "https://github.com/alexcyber/quantum-tasks",
            demo: "https://quantum-tasks.future.app",
            status: "Concluído",
            featured: false
        },
        {
            id: 4,
            title: "HoloDisplay Dashboard",
            description: "Dashboard analítico 3D com visualizações holográficas para dados empresariais complexos.",
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
            technologies: ["Three.js", "React", "D3.js", "WebGL", "Node.js"],
            github: "https://github.com/alexcyber/holodisplay",
            demo: "https://holodisplay.cybernet.future",
            status: "Concluído",
            featured: true
        }
    ]
};

// Global Variables
let currentFilter = 'all';

// Initialization
document.addEventListener('DOMContentLoaded', function() {
    initializeEffects();
    initializeNavigation();
    renderExperienceSection();
    renderProjectsSection();
    
    // Initialize Lucide icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
});

// Matrix Rain Effect
function initializeMatrixEffect() {
    const canvas = document.getElementById('matrixCanvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    const resizeCanvas = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()';
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = [];

    for (let i = 0; i < columns; i++) {
        drops[i] = 1;
    }

    const drawMatrix = () => {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#00ffff';
        ctx.font = `${fontSize}px monospace`;
        
        for (let i = 0; i < drops.length; i++) {
            const text = chars[Math.floor(Math.random() * chars.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    };

    setInterval(drawMatrix, 35);
}

// Particles Effect
function initializeParticlesEffect() {
    const canvas = document.getElementById('particlesCanvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    const resizeCanvas = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const particles = [];
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            size: Math.random() * 2 + 1,
            opacity: Math.random() * 0.5 + 0.2
        });
    }

    const drawParticles = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach((particle) => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;
            
            ctx.save();
            ctx.globalAlpha = particle.opacity;
            ctx.fillStyle = '#00ffff';
            ctx.shadowBlur = 10;
            ctx.shadowColor = '#00ffff';
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        });
    };

    setInterval(drawParticles, 16);
}

// Initialize all effects
function initializeEffects() {
    initializeMatrixEffect();
    initializeParticlesEffect();
}

// Navigation
function initializeNavigation() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }
}

function showSection(sectionName) {
    // Hide all sections
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.classList.remove('active');
    });
    
    // Show target section
    const targetSection = document.getElementById(sectionName);
    if (targetSection) {
        targetSection.classList.add('active');
    }
    
    // Update navigation active state
    updateNavigation(sectionName);
    
    // Close mobile menu
    const mobileMenu = document.getElementById('mobileMenu');
    if (mobileMenu) {
        mobileMenu.classList.add('hidden');
    }
    
    // Re-initialize Lucide icons for dynamic content
    setTimeout(() => {
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    }, 100);
}

function updateNavigation(activeSection) {
    // Desktop navigation
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.dataset.section === activeSection) {
            link.classList.add('active');
        }
    });
    
    // Mobile navigation
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    mobileNavLinks.forEach(link => {
        link.classList.remove('active');
        if (link.dataset.section === activeSection) {
            link.classList.add('active');
        }
    });
}

// Render Experience Section
function renderExperienceSection() {
    const experienceSection = document.getElementById('experiencias');
    if (!experienceSection) return;
    
    const experienceHTML = `
        <div class="max-w-5xl mx-auto space-y-8">
            <!-- Header -->
            <div class="text-center space-y-4">
                <h1 class="text-4xl lg:text-5xl font-bold text-white font-mono tracking-wider cyber-glow">
                    &lt;EXPERIÊNCIAS/&gt;
                </h1>
                <p class="text-xl text-gray-300 max-w-3xl mx-auto">
                    Jornada através de empresas voltado a área de TI
                </p>
            </div>

            <!-- Timeline -->
            <div class="relative">
                <div class="timeline-line"></div>
                
                <div class="space-y-12">
                    ${mockData.experience.map((exp, index) => `
                        <div class="timeline-item">
                            <div class="timeline-dot"></div>
                            
                            <div class="cyber-card p-8 hover-glow">
                                <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
                                    <div class="space-y-2">
                                        <h3 class="text-2xl text-white font-mono cyber-glow">
                                            ${exp.position}
                                        </h3>
                                        <p class="text-cyan-400 font-mono flex items-center gap-2">
                                            <i data-lucide="building" class="w-4 h-4"></i>
                                            ${exp.company}
                                        </p>
                                    </div>
                                    
                                    <div class="flex flex-wrap gap-3">
                                        <span class="cyber-badge bg-green-400/20 text-green-400 border-green-400/40">
                                            <i data-lucide="calendar" class="mr-1 w-3 h-3"></i>
                                            ${exp.duration}
                                        </span>
                                        <span class="cyber-badge border-blue-400/40 text-blue-400">
                                            <i data-lucide="clock" class="mr-1 w-3 h-3"></i>
                                            ${exp.period}
                                        </span>
                                    </div>
                                </div>
                                
                                <p class="text-gray-300 leading-relaxed mb-6">
                                    ${exp.description}
                                </p>
                                
                                <div class="space-y-3 mb-6">
                                    <h4 class="text-lg font-semibold text-white font-mono flex items-center gap-2">
                                        <i data-lucide="trending-up" class="text-cyan-400 w-4 h-4"></i>
                                        SKILLS:
                                    </h4>
                                    <ul class="space-y-2">
                                        ${exp.achievements.map(achievement => `
                                            <li class="text-gray-300 flex items-start gap-3">
                                                <span class="text-cyan-400 font-mono text-sm mt-1">▶</span>
                                                <span>${achievement}</span>
                                            </li>
                                        `).join('')}
                                    </ul>
                                </div>
                                
                                <div class="space-y-3 mb-6">
                                    <h4 class="text-lg font-semibold text-white font-mono">
                                        TECNOLOGIAS UTILIZADAS:
                                    </h4>
                                    <div class="flex flex-wrap gap-2">
                                        ${exp.technologies.map(tech => `
                                            <span class="tech-badge">${tech}</span>
                                        `).join('')}
                                    </div>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>

            <!-- Experience Summary -->
            <div class="cyber-card p-8">
                <h3 class="text-2xl font-bold text-white font-mono mb-6 text-center cyber-glow">
                    RESUMO DA EXPERIÊNCIA
                </h3>
                
                <div class="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
                    <div class="space-y-2">
                        <div class="text-3xl font-bold text-cyan-400 font-mono cyber-glow">3+</div>
                        <div class="text-gray-300 font-mono text-sm">ANOS DE EXPERIÊNCIA</div>
                    </div>
                    <div class="space-y-2">
                        <div class="text-3xl font-bold text-cyan-400 font-mono cyber-glow">${mockData.experience.length}</div>
                        <div class="text-gray-300 font-mono text-sm">EMPRESAS</div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    experienceSection.innerHTML = experienceHTML;
}

// Render Projects Section
function renderProjectsSection() {
    const projectsSection = document.getElementById('projetos');
    if (!projectsSection) return;
    
    const projectsHTML = `
        <div class="max-w-6xl mx-auto space-y-8">
            
            <!-- Header -->
            <div class="text-center space-y-4">
                <h1 class="text-4xl lg:text-5xl font-bold text-white font-mono tracking-wider cyber-glow">
                    &lt;PROJETOS/&gt;
                </h1>
                <p class="text-xl text-gray-300 max-w-3xl mx-auto">
                    Criações que demonstram expertise em tecnologias emergentes e design futurístico
                </p>
            </div>

            <!-- Filters -->
            <div class="cyber-card p-6">
                <div class="flex flex-wrap gap-3 justify-center">
                    <button onclick="filterProjects('all')" class="filter-btn ${currentFilter === 'all' ? 'active' : ''}" data-filter="all">
                        TODOS (${mockData.projects.length})
                    </button>
                    <button onclick="filterProjects('Concluído')" class="filter-btn ${currentFilter === 'Concluído' ? 'active' : ''}" data-filter="Concluído">
                        CONCLUÍDOS (${mockData.projects.filter(p => p.status === 'Concluído').length})
                    </button>
                    <button onclick="filterProjects('Em desenvolvimento')" class="filter-btn ${currentFilter === 'Em desenvolvimento' ? 'active' : ''}" data-filter="Em desenvolvimento">
                        EM DESENVOLVIMENTO (${mockData.projects.filter(p => p.status === 'Em desenvolvimento').length})
                    </button>
                </div>
            </div>

            <!-- Projects Grid -->
            <div id="projectsGrid" class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                ${renderProjectCards()}
            </div>

            <!-- Project Stats -->
            <div class="cyber-card p-8">
                <h3 class="text-2xl font-bold text-white font-mono mb-6 text-center cyber-glow">
                    ESTATÍSTICAS DOS PROJETOS
                </h3>
                
                <div class="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                    <div class="space-y-2">
                        <div class="text-3xl font-bold text-cyan-400 font-mono cyber-glow">${mockData.projects.length}</div>
                        <div class="text-gray-300 font-mono text-sm">PROJETOS TOTAIS</div>
                    </div>
                    <div class="space-y-2">
                        <div class="text-3xl font-bold text-cyan-400 font-mono cyber-glow">${mockData.projects.filter(p => p.status === 'Concluído').length}</div>
                        <div class="text-gray-300 font-mono text-sm">CONCLUÍDOS</div>
                    </div>
                    <div class="space-y-2">
                        <div class="text-3xl font-bold text-cyan-400 font-mono cyber-glow">${new Set(mockData.projects.flatMap(p => p.technologies)).size}</div>
                        <div class="text-gray-300 font-mono text-sm">TECNOLOGIAS</div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    projectsSection.innerHTML = projectsHTML;
}

function renderProjectCards() {
    const filteredProjects = getFilteredProjects();
    
    return filteredProjects.map(project => `
        <div class="project-card">
            <!-- Project Image -->
            <div class="relative h-48 overflow-hidden">
                <img src="${project.image}" alt="${project.title}" class="project-image">
                <div class="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                
                <!-- Featured Badge -->
                ${project.featured ? `
                ` : ''}
                
                <!-- Status Badge -->
                <div class="absolute top-4 left-4">
                    <span class="cyber-badge ${project.status === 'Concluído' ? 'status-completed' : 'status-development'}">
                        <i data-lucide="zap" class="mr-1 w-3 h-3"></i>
                        ${project.status.toUpperCase()}
                    </span>
                </div>
            </div>
            
            <div class="project-content">
                <h3 class="text-xl text-white font-mono cyber-glow mb-3">
                    ${project.title}
                </h3>
                <p class="text-gray-300 leading-relaxed mb-6">
                    ${project.description}
                </p>
                
                <!-- Technologies -->
                <div class="space-y-3 mb-6">
                    <h4 class="text-lg font-semibold text-white font-mono flex items-center gap-2">
                        <i data-lucide="code" class="text-cyan-400 w-4 h-4"></i>
                        STACK TECNOLÓGICO:
                    </h4>
                    <div class="flex flex-wrap gap-2">
                        ${project.technologies.map(tech => `
                            <span class="tech-badge">${tech}</span>
                        `).join('')}
                    </div>
                </div>
                
                <!-- Action Buttons -->
                <div class="flex flex-wrap gap-3">
                    <button onclick="window.open('${project.github}', '_blank')" class="cyber-button-outline flex-1 min-w-[120px]">
                        <i data-lucide="github" class="mr-2 w-4 h-4"></i>
                        CÓDIGO
                    </button>
                    <button onclick="window.open('${project.demo}', '_blank')" class="cyber-button flex-1 min-w-[120px]">
                        <i data-lucide="external-link" class="mr-2 w-4 h-4"></i>
                        DEMO LIVE
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

function getFilteredProjects() {
    if (currentFilter === 'all') {
        return mockData.projects;
    } else if (currentFilter === 'featured') {
        return mockData.projects.filter(project => project.featured);
    } else {
        return mockData.projects.filter(project => project.status === currentFilter);
    }
}

function filterProjects(filter) {
    currentFilter = filter;
    
    // Update filter buttons
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.filter === filter) {
            btn.classList.add('active');
        }
    });
    
    // Update projects grid
    const projectsGrid = document.getElementById('projectsGrid');
    if (projectsGrid) {
        projectsGrid.innerHTML = renderProjectCards();
        
        // Re-initialize Lucide icons
        setTimeout(() => {
            if (typeof lucide !== 'undefined') {
                lucide.createIcons();
            }
        }, 100);
    }
}

// Utility Functions
function openExternalLink(url) {
    window.open(url, '_blank');
}

// Smooth scroll behavior
function smoothScrollTo(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

// Handle window resize
window.addEventListener('resize', () => {
    // Reinitialize effects on resize if needed
    const matrixCanvas = document.getElementById('matrixCanvas');
    const particlesCanvas = document.getElementById('particlesCanvas');
    
    if (matrixCanvas) {
        matrixCanvas.width = window.innerWidth;
        matrixCanvas.height = window.innerHeight;
    }
    
    if (particlesCanvas) {
        particlesCanvas.width = window.innerWidth;
        particlesCanvas.height = window.innerHeight;
    }
});

// Performance optimization
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Pause animations when tab is not visible
        // This helps with performance
    } else {
        // Resume animations when tab becomes visible
    }
});