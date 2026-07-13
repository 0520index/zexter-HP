/**
 * About Section Module
 * Handles about section animations and interactions
 */

export class AboutModule {
    constructor() {
        this.aboutSection = document.querySelector('#about');
        this.valueItems = document.querySelectorAll('.value-item');
        this.statCards = document.querySelectorAll('.stat-card');
        this.missionCard = document.querySelector('.mission-card');
        
        this.init();
    }

    init() {
        if (!this.aboutSection) return;
        
        this.initScrollAnimations();
        this.initInteractiveElements();
        this.initCounterAnimations();
    }

    initScrollAnimations() {
        if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

        // Initialize text splitting
        if (typeof Splitting !== 'undefined') {
            Splitting({
                target: '.about-title[data-splitting]',
                by: 'chars'
            });
            
            Splitting({
                target: '.about-subtitle[data-splitting]',
                by: 'lines'
            });
        }

        // Section badge animation
        gsap.fromTo('.section-badge', 
            { opacity: 0, y: 30 },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: '.section-badge',
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                }
            }
        );

        // Title character animation
        gsap.fromTo('.about-title .char', 
            { opacity: 0, y: 50, rotateX: -45 },
            {
                opacity: 1,
                y: 0,
                rotateX: 0,
                duration: 0.8,
                ease: 'back.out(1.7)',
                stagger: 0.03,
                scrollTrigger: {
                    trigger: '.about-title',
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                }
            }
        );

        // Subtitle lines animation
        gsap.fromTo('.about-subtitle .line', 
            { opacity: 0, y: 30 },
            {
                opacity: 1,
                y: 0,
                duration: 0.6,
                ease: 'power2.out',
                stagger: 0.1,
                scrollTrigger: {
                    trigger: '.about-subtitle',
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                }
            }
        );

        // Story section animation
        gsap.fromTo('.about-story', 
            { opacity: 0, x: -50 },
            {
                opacity: 1,
                x: 0,
                duration: 0.8,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: '.about-story',
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                }
            }
        );

        // Values animation
        gsap.fromTo('.value-item', 
            { opacity: 0, y: 30, scale: 0.95 },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.6,
                ease: 'back.out(1.7)',
                stagger: 0.1,
                scrollTrigger: {
                    trigger: '.values-grid',
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                }
            }
        );

        // Image container animation
        gsap.fromTo('.about-image-container', 
            { opacity: 0, scale: 0.9, rotateY: 15 },
            {
                opacity: 1,
                scale: 1,
                rotateY: 0,
                duration: 1,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: '.about-image-container',
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                }
            }
        );

        // Stat cards animation
        gsap.fromTo('.stat-card', 
            { opacity: 0, y: 40 },
            {
                opacity: 1,
                y: 0,
                duration: 0.6,
                ease: 'back.out(1.7)',
                stagger: 0.15,
                scrollTrigger: {
                    trigger: '.about-stats',
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                }
            }
        );

        // Mission card animation
        gsap.fromTo('.mission-card', 
            { opacity: 0, y: 50, scale: 0.95 },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.8,
                ease: 'back.out(1.7)',
                scrollTrigger: {
                    trigger: '.mission-card',
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                }
            }
        );

        // Decorative elements animation
        gsap.fromTo('.decoration-circle', 
            { scale: 0, rotation: -180 },
            {
                scale: 1,
                rotation: 0,
                duration: 1,
                ease: 'back.out(1.7)',
                stagger: 0.2,
                scrollTrigger: {
                    trigger: '.about-decorations',
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                }
            }
        );

        gsap.fromTo('.decoration-line', 
            { scaleX: 0 },
            {
                scaleX: 1,
                duration: 1,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: '.about-decorations',
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    }

    initInteractiveElements() {
        // Value items hover effects
        this.valueItems.forEach((item, index) => {
            const icon = item.querySelector('.value-icon');
            
            item.addEventListener('mouseenter', () => {
                if (typeof gsap !== 'undefined') {
                    gsap.to(icon, {
                        scale: 1.1,
                        rotation: 5,
                        duration: 0.3,
                        ease: 'back.out(1.7)'
                    });
                }
            });

            item.addEventListener('mouseleave', () => {
                if (typeof gsap !== 'undefined') {
                    gsap.to(icon, {
                        scale: 1,
                        rotation: 0,
                        duration: 0.3,
                        ease: 'power2.out'
                    });
                }
            });
        });

        // Stat cards hover effects
        this.statCards.forEach((card, index) => {
            const icon = card.querySelector('.stat-icon');
            const number = card.querySelector('.stat-number');
            
            card.addEventListener('mouseenter', () => {
                if (typeof gsap !== 'undefined') {
                    gsap.to(icon, {
                        scale: 1.1,
                        rotation: 10,
                        duration: 0.3,
                        ease: 'back.out(1.7)'
                    });
                    
                    gsap.to(number, {
                        scale: 1.05,
                        duration: 0.3,
                        ease: 'power2.out'
                    });
                }
            });

            card.addEventListener('mouseleave', () => {
                if (typeof gsap !== 'undefined') {
                    gsap.to(icon, {
                        scale: 1,
                        rotation: 0,
                        duration: 0.3,
                        ease: 'power2.out'
                    });
                    
                    gsap.to(number, {
                        scale: 1,
                        duration: 0.3,
                        ease: 'power2.out'
                    });
                }
            });
        });

        // Mission card hover effect
        if (this.missionCard) {
            const missionIcon = this.missionCard.querySelector('.mission-icon');
            
            this.missionCard.addEventListener('mouseenter', () => {
                if (typeof gsap !== 'undefined') {
                    gsap.to(missionIcon, {
                        scale: 1.1,
                        rotation: -5,
                        duration: 0.4,
                        ease: 'back.out(1.7)'
                    });
                }
            });

            this.missionCard.addEventListener('mouseleave', () => {
                if (typeof gsap !== 'undefined') {
                    gsap.to(missionIcon, {
                        scale: 1,
                        rotation: 0,
                        duration: 0.4,
                        ease: 'power2.out'
                    });
                }
            });
        }
    }

    initCounterAnimations() {
        // Animate stat numbers when they come into view
        const statNumbers = document.querySelectorAll('.about-stats .stat-number');
        
        statNumbers.forEach(statNumber => {
            if (typeof gsap !== 'undefined') {
                const finalText = statNumber.textContent;
                const hasPercent = finalText.includes('%');
                const hasPlus = finalText.includes('+');
                const numericValue = parseInt(finalText.replace(/[^\d]/g, ''));
                
                // Reset to 0
                statNumber.textContent = '0';
                
                ScrollTrigger.create({
                    trigger: statNumber,
                    start: 'top 80%',
                    onEnter: () => {
                        const counter = { value: 0 };
                        
                        gsap.to(counter, {
                            value: numericValue,
                            duration: 2,
                            ease: 'power2.out',
                            onUpdate: () => {
                                let displayValue = Math.round(counter.value);
                                
                                if (hasPercent) {
                                    displayValue += '%';
                                } else if (hasPlus) {
                                    displayValue += '+';
                                }
                                
                                statNumber.textContent = displayValue;
                            },
                            onComplete: () => {
                                statNumber.textContent = finalText;
                            }
                        });
                    }
                });
            }
        });
    }

    // Method to trigger animations programmatically
    triggerAnimations() {
        if (typeof ScrollTrigger !== 'undefined') {
            ScrollTrigger.refresh();
        }
    }

    // Cleanup method
    destroy() {
        if (typeof ScrollTrigger !== 'undefined') {
            ScrollTrigger.getAll().forEach(trigger => {
                if (trigger.trigger && trigger.trigger.closest('#about')) {
                    trigger.kill();
                }
            });
        }
    }
}