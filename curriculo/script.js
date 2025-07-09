const mockData = {        
experience: [
    {
        id: 1,
        company: "IXC Soft",
        position: "Analista de Sistema Computacional",
        duration: "2023 - Presente",
        period: "2+ anos",
        description: "Atualmente trabalho na IXC Soft, onde desenvolvi uma visão sistêmica aprimorada, compreendendo como os sistemas foram criados e como corrigir problemas via código. Além disso, evoluí significativamente minhas habilidades de comunicação e colaboração com a equipe.",
        achievements: [
            "Uso avançado de banco de dados",
            "Colaboração ativa em equipe, tanto ensinando quanto aprendendo",
            "Análise e lógica sistêmica para resolução de problemas",
            "Comunicação clara e assertiva"
        ],
        technologies: ["SQL", "Análise Sistêmica", "Suporte Técnico", "Comunicação"]
    },
    {
        id: 2,
        company: "Impreloc",
        position: "Técnico de Impressora",
        duration: "2023",
        period: "1 mês",
        description: "Atuei realizando manutenção preventiva e corretiva em impressoras e multifuncionais, prestando suporte técnico para clientes internos e externos. Desenvolvi habilidades de diagnóstico rápido, organização e atendimento ao cliente.",
        achievements: [
            "Realização de manutenção em diversos modelos de impressoras",
            "Resolução rápida de chamados técnicos",
            "Aprimoramento da comunicação com clientes",
            "Organização do setor técnico e melhoria de processos"
        ],
        technologies: ["Manutenção de Impressoras", "Atendimento ao Cliente", "Diagnóstico Técnico", "Organização"]
    },
    {
        id: 3,
        company: "Aurora Coop - FAQUI",
        position: "Jovem Aprendiz de TI",
        duration: "2021 - 2022",
        period: "1 ano e 4 meses",
        description: "Iniciei minha trajetória profissional com foco em suporte técnico, atuando na manutenção de redes e hardware. Realizei monitoramento de servidores e prestei suporte aos colaboradores em diversos dispositivos e sistemas.",
        achievements: [
            "Monitoramento e manutenção preventiva dos servidores",
            "Suporte técnico a todos os colaboradores em recursos de TI",
            "Manutenção de equipamentos de rede e computadores",
            "Responsável pelo suporte geral da unidade"
        ],
        technologies: ["Redes", "Hardware", "Suporte Técnico", "Monitoramento de Servidores"]
    }
],

    
    projects: [
        {
            id: 1,
            title: "Logistica",
            description: "Sistema de logistica com indicadores, gestão para parte financeira, de transporte e etc. Feito para trabalho de faculdade na materia de ABEX.",
            image: "projetos/logistica.png",
            technologies: ["PHP", "MySQL", "HTML", "CSS"],
            github: "https://github.com/VitorGirottto/logistica",
            status: "Concluído",
            featured: true
        },
        {
            id: 2,
            title: "Blog",
            description: "Um Blog com o objetivo de ter 3 cruds, sendo eles, de usuário, posts e comentários, podendo realizar curtidas. Feito para trabalho de faculdade na materia de Desenvolvimento WEB.",
            image: "projetos/blog.png",
            technologies: ["Next.js","Node.js + Express", "React.js", "Sequelize + MySQL", "Tailwind CSS"],
            github: "https://github.com/VitorGirottto/blog",
            status: "Concluído",
            featured: true
        },
        {
            id: 3,
            title: "Jogo do Shrek",
            description: "Um jogo na qual o objetivo é chegar a 10 pontos, pulando por cima dos adversários para chegar até a princesa.",
            image: "projetos/shrek.png",
            technologies: ["JS", "HTML5", "CSS3"],
            github: "https://github.com/VitorGirottto/shrek",
            status: "Concluído",
            featured: true
        },
        {
            id: 4,
            title: "Site PHP",
            description: "Um site na qual é documentado vários conceitos básicos sobre a linguagem PHP, sendo elas, classes, funções, exceções e etc.",
            image: "projetos/php.png",
            technologies: ["JS","HTML", "CSS"],
            github: "https://github.com/VitorGirottto/PHP",
            status: "Concluído",
            featured: true
        },
        {
            id: 5,
            title: "HR Comercio",
            description: "Um sistema para uma empresa de logistica, utilizando estrutura MVC, fazendo validações nos controllers, deixando o mais seguro possível.",
            image: "projetos/hr.png",
            technologies: ["PHP","JS", "MySQL", "HTML", "CSS", "MVC"],
            github: "https://github.com/ronye011/Projeto-HR",
            status: "Em desenvolvimento",
            featured: true
        },
        {
            id: 6,
            title: "API de Produtos",
            description: "Uma API na qual foi dado pré requisitos obrigatórios que deveria conter, feito como uma oportunidade interna para vaga de DEV. Contendo crud de produtos e outros demais requisitos.",
            image: "projetos/produtos.png",
            technologies: ["PHP", "JS", "MVC", "MySQL"],
            github: "https://github.com/VitorGirottto/api_produtos",
            status: "Concluído",
            featured: false
        },
        {
            id: 7,
            title: "Rede Social",
            description: "Uma rede social, na qual tem crud de usuários, visitação em outros perfis, curtir postagens e etc. Feito como projeto final no curso DEV Evoltion.",
            image: "projetos/social.png",
            technologies: ["PHP", "MySQL", "HTML", "CSS"],
            github: "https://github.com/VitorGirottto/social",
            status: "Concluído",
            featured: false
        },
        {
            id: 8,
            title: "Termo",
            description: "Sistema voltado a administração de palavras com seus significados, podendo criar categorias e fazer o vinculo com as palavras. Feito para trabalho de faculdade.",
            image: "projetos/termo.png",
            technologies: ["PHP", "MySQL", "HTML", "CSS"],
            github: "https://github.com/VitorGirottto/termo",
            status: "Concluído",
            featured: true
        }
    ]
};

let currentFilter = 'all';

document.addEventListener('DOMContentLoaded', function() {
    initializeEffects();
    initializeNavigation();
    renderExperienceSection();
    renderProjectsSection();
    
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
});

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

function initializeEffects() {
    initializeMatrixEffect();
    initializeParticlesEffect();
}

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
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.classList.remove('active');
    });
    
    const targetSection = document.getElementById(sectionName);
    if (targetSection) {
        targetSection.classList.add('active');
    }
    
    updateNavigation(sectionName);
    
    const mobileMenu = document.getElementById('mobileMenu');
    if (mobileMenu) {
        mobileMenu.classList.add('hidden');
    }
    
    setTimeout(() => {
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    }, 100);
}

function updateNavigation(activeSection) {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.dataset.section === activeSection) {
            link.classList.add('active');
        }
    });
    
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    mobileNavLinks.forEach(link => {
        link.classList.remove('active');
        if (link.dataset.section === activeSection) {
            link.classList.add('active');
        }
    });
}

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
                                        PONTOS DE APRENDIZADOS:
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
                        TECNOLOGIAS USADAS:
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
    
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.filter === filter) {
            btn.classList.add('active');
        }
    });
    
    const projectsGrid = document.getElementById('projectsGrid');
    if (projectsGrid) {
        projectsGrid.innerHTML = renderProjectCards();
        
        setTimeout(() => {
            if (typeof lucide !== 'undefined') {
                lucide.createIcons();
            }
        }, 100);
    }
}

function openExternalLink(url) {
    window.open(url, '_blank');
}

function smoothScrollTo(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

window.addEventListener('resize', () => {
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

document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
    } else {
    }
});