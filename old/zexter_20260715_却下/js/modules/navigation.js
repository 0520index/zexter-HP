/**
 * Navigation Module
 * Handles header navigation and mobile menu
 */

export class NavigationModule {
    constructor() {
        this.header = document.querySelector('.header');
        this.mobileToggle = document.querySelector('.mobile-menu-toggle');
        this.mobileMenu = document.querySelector('.mobile-menu');
        this.navLinks = document.querySelectorAll('.nav-link, .mobile-menu-link');
        this.isMenuOpen = false;
        
        this.init();
    }

    init() {
        if (!this.header) return;
        
        this.initMobileMenu();
        this.initScrollEffects();
        this.initSmoothScroll();
        this.initActiveStates();
    }

    initMobileMenu() {
        if (!this.mobileToggle || !this.mobileMenu) return;

        // Toggle mobile menu
        this.mobileToggle.addEventListener('click', () => {
            this.toggleMobileMenu();
        });

        // Close menu when clicking on links
        this.navLinks.forEach(link => {
            if (link.classList.contains('mobile-menu-link')) {
                link.addEventListener('click', () => {
                    this.closeMobileMenu();
                });
            }
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (this.isMenuOpen && 
                !this.mobileMenu.contains(e.target) && 
                !this.mobileToggle.contains(e.target)) {
                this.closeMobileMenu();
            }
        });

        // Handle escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isMenuOpen) {
                this.closeMobileMenu();
            }
        });
    }

    toggleMobileMenu() {
        if (this.isMenuOpen) {
            this.closeMobileMenu();
        } else {
            this.openMobileMenu();
        }
    }

    openMobileMenu() {
        this.isMenuOpen = true;
        this.mobileToggle.classList.add('active');
        this.mobileMenu.classList.add('active');
        this.mobileToggle.setAttribute('aria-expanded', 'true');
        this.mobileToggle.setAttribute('aria-label', 'メニューを閉じる');
        
        // Prevent body scroll
        document.body.style.overflow = 'hidden';

        // Animate menu items
        if (typeof gsap !== 'undefined') {
            gsap.fromTo('.mobile-menu-link', 
                { x: 50, opacity: 0 },
                { 
                    x: 0, 
                    opacity: 1, 
                    duration: 0.3, 
                    stagger: 0.05,
                    ease: 'power2.out' 
                }
            );
        }
    }

    closeMobileMenu() {
        this.isMenuOpen = false;
        this.mobileToggle.classList.remove('active');
        this.mobileMenu.classList.remove('active');
        this.mobileToggle.setAttribute('aria-expanded', 'false');
        this.mobileToggle.setAttribute('aria-label', 'メニューを開く');
        
        // Restore body scroll
        document.body.style.overflow = '';
    }

    initScrollEffects() {
        let lastScrollY = window.scrollY;

        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            
            // Add scrolled class for background effect
            if (currentScrollY > 50) {
                this.header.classList.add('scrolled');
            } else {
                this.header.classList.remove('scrolled');
            }

            // Hide/show header on scroll (optional)
            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                // Scrolling down
                this.header.style.transform = 'translateY(-100%)';
            } else {
                // Scrolling up
                this.header.style.transform = 'translateY(0)';
            }

            lastScrollY = currentScrollY;
        };

        // Throttle scroll events for performance
        let ticking = false;
        const scrollHandler = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    handleScroll();
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener('scroll', scrollHandler, { passive: true });
    }

    initSmoothScroll() {
        // Smooth scroll for anchor links
        this.navLinks.forEach(link => {
            const href = link.getAttribute('href');
            
            if (href && href.startsWith('#')) {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    
                    const targetId = href.substring(1);
                    const targetElement = document.getElementById(targetId);
                    
                    if (targetElement) {
                        const headerHeight = this.header.offsetHeight;
                        const targetPosition = targetElement.offsetTop - headerHeight;
                        
                        window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                        });
                    }
                });
            }
        });
    }

    initActiveStates() {
        // Update active nav states based on scroll position
        const sections = document.querySelectorAll('section[id]');
        
        if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
            sections.forEach(section => {
                ScrollTrigger.create({
                    trigger: section,
                    start: 'top 20%',
                    end: 'bottom 20%',
                    onEnter: () => this.setActiveLink(section.id),
                    onEnterBack: () => this.setActiveLink(section.id),
                });
            });
        } else {
            // Fallback for scroll spy without GSAP
            const handleScroll = () => {
                const scrollPos = window.scrollY + this.header.offsetHeight + 50;
                
                sections.forEach(section => {
                    const sectionTop = section.offsetTop;
                    const sectionBottom = sectionTop + section.offsetHeight;
                    
                    if (scrollPos >= sectionTop && scrollPos < sectionBottom) {
                        this.setActiveLink(section.id);
                    }
                });
            };

            let ticking = false;
            const scrollHandler = () => {
                if (!ticking) {
                    requestAnimationFrame(() => {
                        handleScroll();
                        ticking = false;
                    });
                    ticking = true;
                }
            };

            window.addEventListener('scroll', scrollHandler, { passive: true });
        }
    }

    setActiveLink(sectionId) {
        // Remove active class from all links
        this.navLinks.forEach(link => {
            link.classList.remove('active');
        });

        // Add active class to current section link
        const activeLinks = document.querySelectorAll(`[href="#${sectionId}"]`);
        activeLinks.forEach(link => {
            if (link.classList.contains('nav-link') || link.classList.contains('mobile-menu-link')) {
                link.classList.add('active');
            }
        });
    }
}