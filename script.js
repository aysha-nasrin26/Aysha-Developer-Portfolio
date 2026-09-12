/**
 * AYSHA NASRIN - DEVELOPER PORTFOLIO
 * Vanilla JavaScript Logic
 * - Custom Cursor Follower
 * - Preloader Logic
 * - Sticky Navbar & ScrollSpy
 * - Typing Text Effect
 * - Scroll Reveal Animations
 * - Animated Counters
 * - Project Filter System
 * - Dynamic Project Modal Popup
 * - Interactive Resume Modal & Download
 * - Service Inquiry Triggering
 * - Form Validation & Toast Notification System
 * - Back to Top Button
 */

document.addEventListener('DOMContentLoaded', () => {
    
    /* ==========================================
       1. PRELOADER ANIMATION
       ========================================== */
    const preloader = document.getElementById('preloader');
    const loaderBar = document.getElementById('loaderBar');
    const loaderPercent = document.getElementById('loaderPercent');

    let progress = 0;
    const progressInterval = setInterval(() => {
        progress += Math.floor(Math.random() * 15) + 10;
        if (progress >= 100) {
            progress = 100;
            clearInterval(progressInterval);
            setTimeout(() => {
                if (preloader) {
                    preloader.classList.add('fade-out');
                }
            }, 300);
        }
        if (loaderBar) loaderBar.style.width = `${progress}%`;
        if (loaderPercent) loaderPercent.textContent = `${progress}%`;
    }, 60);


    /* ==========================================
       2. CUSTOM INTERACTIVE CURSOR
       ========================================== */
    const cursorDot = document.getElementById('cursorDot');
    const cursorRing = document.getElementById('cursorRing');

    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;

    if (cursorDot && cursorRing) {
        window.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            cursorDot.style.left = `${mouseX}px`;
            cursorDot.style.top = `${mouseY}px`;
        });

        function renderCursor() {
            ringX += (mouseX - ringX) * 0.15;
            ringY += (mouseY - ringY) * 0.15;
            cursorRing.style.left = `${ringX}px`;
            cursorRing.style.top = `${ringY}px`;
            requestAnimationFrame(renderCursor);
        }
        requestAnimationFrame(renderCursor);

        // Hover Effect on Interactive Elements
        const interactiveElements = document.querySelectorAll('a, button, input, select, textarea, .glass-card, .project-card, .filter-btn');
        interactiveElements.forEach((el) => {
            el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
            el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
        });
    }


    /* ==========================================
       3. STICKY NAVBAR & MOBILE NAVIGATION
       ========================================== */
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Sticky Navbar on Scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile Menu Toggle
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('open');
            navMenu.classList.toggle('open');
        });

        // Close menu on link click
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('open');
                navMenu.classList.remove('open');
            });
        });
    }

    // ScrollSpy - Active Navigation Link Highlight
    const sections = document.querySelectorAll('section[id]');
    function scrollSpy() {
        const scrollY = window.pageYOffset;
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 120;
            const sectionId = current.getAttribute('id');
            const targetLink = document.querySelector(`.nav-link[href*="#${sectionId}"]`);

            if (targetLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    navLinks.forEach(l => l.classList.remove('active'));
                    targetLink.classList.add('active');
                }
            }
        });
    }
    window.addEventListener('scroll', scrollSpy);


    /* ==========================================
       4. TYPING TEXT ANIMATION
       ========================================== */
    const typingTextElement = document.getElementById('typingText');
    const roles = [
        'Backend Developer',
        'FastAPI & Python Specialist',
        'Frontend UI Engineer',
        'BCA Rank 1 Gold Medalist',
        'Full-Stack Freelancer'
    ];

    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingSpeed = 100;
    const deletingSpeed = 50;
    const delayBetweenRoles = 2000;

    function typeEffect() {
        if (!typingTextElement) return;

        const currentRole = roles[roleIndex];

        if (isDeleting) {
            typingTextElement.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingTextElement.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
        }

        let currentSpeed = isDeleting ? deletingSpeed : typingSpeed;

        if (!isDeleting && charIndex === currentRole.length) {
            currentSpeed = delayBetweenRoles;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            currentSpeed = 400;
        }

        setTimeout(typeEffect, currentSpeed);
    }

    setTimeout(typeEffect, 800);


    /* ==========================================
       5. SCROLL REVEAL ANIMATION (IntersectionObserver)
       ========================================== */
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(element => revealObserver.observe(element));


    /* ==========================================
       6. ANIMATED COUNTERS
       ========================================== */
    const statNumbers = document.querySelectorAll('.stat-number');
    let countersStarted = false;

    function startCounters() {
        statNumbers.forEach(stat => {
            const target = parseFloat(stat.getAttribute('data-target'));
            const isDecimal = stat.getAttribute('data-decimal') === '1';
            const duration = 2000; // ms
            const stepTime = 30;
            const steps = duration / stepTime;
            const increment = target / steps;
            let current = 0;

            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                stat.textContent = isDecimal ? current.toFixed(1) : Math.floor(current);
            }, stepTime);
        });
    }

    const statsSection = document.querySelector('.about-stats-wrapper');
    if (statsSection) {
        const statsObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !countersStarted) {
                countersStarted = true;
                startCounters();
            }
        }, { threshold: 0.3 });
        statsObserver.observe(statsSection);
    }


    /* ==========================================
       7. PROJECT FILTERING SYSTEM
       ========================================== */
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filterValue === 'all' || category === filterValue) {
                    card.classList.remove('hide');
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        card.classList.add('hide');
                    }, 300);
                }
            });
        });
    });


    /* ==========================================
       8. PROJECT DETAILS MODAL
       ========================================== */
    const projectModal = document.getElementById('projectModal');
    const closeProjectModalBtn = document.getElementById('closeProjectModal');
    const projectModalDynamic = document.getElementById('projectModalDynamic');
    const projectTriggers = document.querySelectorAll('.open-project-modal');

    // Projects Database
    const projectsData = {
        '1': {
            title: 'AI Chatbot for College Management',
            category: 'Frontend & Backend',
            tech: ['Python', 'Flask', 'JavaScript', 'MySQL'],
            description: 'A Flask and MySQL-based student chatbot that provides automated responses and secure user authentication. Includes persistent chat history and an admin dashboard for managing chatbot responses and usage data.',
            highlights: [
                'Automated chatbot responses for student queries.',
                'Secure user authentication with persistent chat history.',
                'MySQL database for storing and retrieving chat sessions and responses.',
                'Responsive admin dashboard for managing chatbot responses and usage data.'
            ],
            demoUrl: '#',
            githubUrl: 'https://github.com/aysha-nasrin26'
        },
        '2': {
            title: 'TaskFlow Productivity Platform',
            category: 'Full-Stack Web App',
            tech: ['Python', 'FastAPI', 'React', 'MySQL', 'SQLAlchemy', 'JWT Authentication', 'Pytest'],
            description: 'A full-stack task management application built with FastAPI, React, MySQL, and SQLAlchemy. Features JWT authentication, CRUD operations, task filtering, pagination, priority management, due-date tracking, Swagger API documentation, and Pytest testing.',
            highlights: [
                'JWT-based authentication with protected API routes.',
                'Complete CRUD operations with filtering and pagination.',
                'Priority management and due-date tracking for tasks.',
                'Swagger API documentation and Pytest testing for API validation.'
            ],
            demoUrl: '#',
            githubUrl: 'https://github.com/aysha-nasrin26/TaskFlow'
        },
        '3': {
            title: 'Student Management System',
            category: 'Full-Stack Web App',
            tech: ['Python', 'Flask', 'MySQL', 'HTML5', 'CSS3', 'Bootstrap', 'Jinja2'],
            description: 'A responsive web-based Student Management System built with Flask and MySQL to efficiently manage student records with complete CRUD operations, search functionality, and user feedback.',
            highlights: [
                'Complete CRUD operations for student record management.',
                'MySQL database integration for storing student information.',
                'Search functionality for efficiently finding student records.',
                'Flask flash messages for real-time user feedback.'
            ],
            demoUrl: '#',
            githubUrl: 'https://github.com/aysha-nasrin26/student-management-system'
        },
        '4': {
            title: 'AnimeWear – Premium Anime Fashion Store',
            category: 'Frontend E-Commerce',
            tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Lucide React'],
            description: 'A modern anime-inspired e-commerce website built with Next.js, TypeScript, Tailwind CSS, and Framer Motion, featuring product collections, shopping cart, wishlist functionality, responsive navigation, and smooth animations.',
            highlights: [
                'Premium responsive UI designed for anime fashion products.',
                'Product collections including hoodies, jackets, joggers, and streetwear.',
                'Shopping cart and wishlist functionality.',
                'Smooth Framer Motion animations with mobile-friendly navigation.'
            ],
            demoUrl: 'https://e-commerce-website-silk-gamma.vercel.app/',
            githubUrl: 'https://github.com/aysha-nasrin26/E-commerce-website'
        },
        '5': {
            title: 'Speech Assistant',
            category: 'Python Project',
            tech: ['Python', 'Speech Recognition', 'Google API', 'Text-to-Speech', 'Tkinter'],
            description: 'A Python-based Speech Assistant that listens to voice commands and responds using speech output. It supports basic voice interaction, command execution, and optional GUI functionality.',
            highlights: [
                'Voice input using a microphone for user interaction.',
                'Speech recognition using Google API.',
                'Text-to-speech responses for voice-based interaction.',
                'Optional GUI support with basic command execution.'
            ],
            demoUrl: '#',
            githubUrl: 'https://github.com/aysha-nasrin26/astra_assistant'
        },
        '6': {
            title: 'Poll Editor - Django Project',
            category: 'Django Web App',
            tech: ['Python', 'Django', 'SQLite3', 'HTML', 'Bootstrap 5'],
            description: 'A simple Poll Voting Web Application built with Django and Bootstrap where users can view polls, vote for choices, see results, and manage polls using the Django Admin panel.',
            highlights: [
                'Poll listing and voting system for users.',
                'Result display after submitting votes.',
                'Django ORM for database operations with SQLite3.',
                'Django Admin dashboard for managing polls and choices.'
            ],
            demoUrl: '#',
            githubUrl: 'https://github.com/aysha-nasrin26/Poll_Editor'
        }
    };

    projectTriggers.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const projectId = btn.getAttribute('data-project');
            const data = projectsData[projectId];

            if (data && projectModalDynamic && projectModal) {
                projectModalDynamic.innerHTML = `
                    <span class="project-type-badge" style="position:static; display:inline-flex; margin-bottom:1rem;">
                        <i class="fa-solid fa-layer-group"></i> ${data.category}
                    </span>
                    <h2 style="font-family: var(--font-heading); font-size: 2rem; margin-bottom: 1rem;">${data.title}</h2>
                    <p style="color: var(--text-muted); font-size: 1rem; margin-bottom: 1.5rem; line-height: 1.6;">${data.description}</p>
                    
                    <div style="margin-bottom: 1.5rem;">
                        <h4 style="font-size: 0.95rem; margin-bottom: 0.5rem; color: var(--color-primary);">Key Technical Highlights:</h4>
                        <ul style="list-style: none; display: flex; flex-direction: column; gap: 0.5rem;">
                            ${data.highlights.map(h => `<li style="font-size: 0.9rem; color: var(--text-main); display:flex; gap:0.5rem; align-items:flex-start;"><i class="fa-solid fa-circle-check text-accent" style="margin-top:4px;"></i> <span>${h}</span></li>`).join('')}
                        </ul>
                    </div>

                    <div style="margin-bottom: 2rem;">
                        <h4 style="font-size: 0.95rem; margin-bottom: 0.5rem; color: var(--text-subtle);">Technologies Used:</h4>
                        <div style="display:flex; flex-wrap:wrap; gap:0.5rem;">
                            ${data.tech.map(t => `<span style="padding:0.3rem 0.75rem; background:rgba(250,204,21,0.1); border:1px solid rgba(250,204,21,0.3); border-radius:var(--radius-md); font-family:var(--font-mono); font-size:0.8rem; color:var(--color-primary);">${t}</span>`).join('')}
                        </div>
                    </div>

                    <div style="display:flex; gap:1rem; flex-wrap:wrap;">
                        <a href="${data.githubUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm">
                            <i class="fa-brands fa-github"></i> View Source Code
                        </a>
                        <button class="btn btn-secondary btn-sm" onclick="showToast('Demo preview simulation active!', 'info')">
                            <i class="fa-solid fa-globe"></i> Live Preview
                        </button>
                    </div>
                `;
                projectModal.classList.add('active');
            }
        });
    });

    if (closeProjectModalBtn && projectModal) {
        closeProjectModalBtn.addEventListener('click', () => {
            projectModal.classList.remove('active');
        });
        projectModal.addEventListener('click', (e) => {
            if (e.target === projectModal) projectModal.classList.remove('active');
        });
    }


    /* ==========================================
       9. RESUME MODAL & DOWNLOAD
       ========================================== */
    const resumeModal = document.getElementById('resumeModal');
    const closeResumeModalBtn = document.getElementById('closeResumeModal');
    const openResumeBtns = document.querySelectorAll('.open-resume-btn');
    const downloadResumeBtn = document.getElementById('downloadResumeBtn');

    openResumeBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            if (resumeModal) resumeModal.classList.add('active');
        });
    });

    if (closeResumeModalBtn && resumeModal) {
        closeResumeModalBtn.addEventListener('click', () => {
            resumeModal.classList.remove('active');
        });
        resumeModal.addEventListener('click', (e) => {
            if (e.target === resumeModal) resumeModal.classList.remove('active');
        });
    }

    if (downloadResumeBtn) {
        downloadResumeBtn.addEventListener('click', () => {
            showToast('Downloading Aysha Nasrin Resume...', 'success');
            
            const link = document.createElement('a');
            link.href = 'assets/Aysha_Nasrin_Resume.pdf';
            link.download = 'Aysha_Nasrin_Resume.pdf';

            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        });
    }


    /* ==========================================
       10. SERVICE INQUIRY TRIGGER
       ========================================== */
    const requestServiceBtns = document.querySelectorAll('.request-service-btn');
    const userSubjectSelect = document.getElementById('userSubject');

    requestServiceBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const serviceName = btn.getAttribute('data-service');
            if (userSubjectSelect) {
                userSubjectSelect.value = serviceName;
            }
            const contactSection = document.getElementById('contact');
            if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
            }
            showToast(`Selected service: ${serviceName}`, 'info');
        });
    });


    /* ==========================================
       11. CONTACT FORM VALIDATION & TOAST SYSTEM
       ========================================== */
    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');

    if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const nameInput = document.getElementById('userName');
        const emailInput = document.getElementById('userEmail');
        const subjectInput = document.getElementById('userSubject');
        const messageInput = document.getElementById('userMessage');

        let isValid = true;

        // Name validation
        if (!nameInput.value.trim()) {
            nameInput.parentElement.classList.add('error');
            isValid = false;
        } else {
            nameInput.parentElement.classList.remove('error');
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailInput.value.trim() || !emailRegex.test(emailInput.value)) {
            emailInput.parentElement.classList.add('error');
            isValid = false;
        } else {
            emailInput.parentElement.classList.remove('error');
        }

        // Subject validation
        if (!subjectInput.value) {
            subjectInput.parentElement.classList.add('error');
            isValid = false;
        } else {
            subjectInput.parentElement.classList.remove('error');
        }

        // Message validation
        if (!messageInput.value.trim()) {
            messageInput.parentElement.classList.add('error');
            isValid = false;
        } else {
            messageInput.parentElement.classList.remove('error');
        }

        if (isValid) {
            // Button Loading State
            const originalBtnHtml = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Sending...`;

            try {
                const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {  // ← Replace YOUR_FORM_ID
                    method: 'POST',
                    body: new FormData(contactForm),
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    contactForm.reset();
                    showToast('Message sent successfully! Aysha will reply soon.', 'success');
                } else {
                    showToast('Something went wrong. Please try again later.', 'error');
                }
            } catch (error) {
                showToast('Network error. Please try again.', 'error');
            } finally {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnHtml;
            }
        } else {
            showToast('Please fill in all required fields correctly.', 'error');
        }
    });
}

    // Global Toast Notification Helper
    window.showToast = function(message, type = 'info') {
        const toastContainer = document.getElementById('toastContainer');
        if (!toastContainer) return;

        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        
        let icon = '<i class="fa-solid fa-info-circle text-accent"></i>';
        if (type === 'success') icon = '<i class="fa-solid fa-circle-check text-green"></i>';
        if (type === 'error') icon = '<i class="fa-solid fa-triangle-exclamation" style="color:var(--color-error)"></i>';

        toast.innerHTML = `${icon} <span>${message}</span>`;
        toastContainer.appendChild(toast);

        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateX(100%)';
            toast.style.transition = 'all 0.3s ease';
            setTimeout(() => toast.remove(), 300);
        }, 4000);
    };


    /* ==========================================
       12. BACK TO TOP BUTTON
       ========================================== */
    const backToTopBtn = document.getElementById('backToTop');
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 400) {
                backToTopBtn.style.opacity = '1';
                backToTopBtn.style.pointerEvents = 'auto';
            } else {
                backToTopBtn.style.opacity = '0';
                backToTopBtn.style.pointerEvents = 'none';
            }
        });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

});
