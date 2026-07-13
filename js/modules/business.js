/**
 * Business Section Module
 * Handles business section animations and interactions
 */

export class BusinessModule {
    constructor() {
        this.businessSection = document.querySelector('#business');
        this.businessCards = document.querySelectorAll('.business-card');
        this.processSteps = document.querySelectorAll('.process-step');
        this.featureTags = document.querySelectorAll('.feature-tag');
        
        this.init();
    }

    init() {
        if (!this.businessSection) return;
        
        this.initScrollAnimations();
        this.initInteractiveElements();
        this.initFilterFunctionality();
    }

    initScrollAnimations() {
        if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

        // Initialize text splitting
        if (typeof Splitting !== 'undefined') {
            Splitting({
                target: '.business-title[data-splitting]',
                by: 'chars'
            });
            
            Splitting({
                target: '.business-subtitle[data-splitting]',
                by: 'lines'
            });
        }

        // Section badge animation
        gsap.fromTo('.business .section-badge', 
            { opacity: 0, scale: 0.8, rotateX: -45 },
            {
                opacity: 1,
                scale: 1,
                rotateX: 0,
                duration: 0.8,
                ease: 'back.out(1.7)',
                scrollTrigger: {
                    trigger: '.business .section-badge',
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                }
            }
        );

        // Title character animation
        gsap.fromTo('.business-title .char', 
            { opacity: 0, y: 60, rotateY: -45 },
            {
                opacity: 1,
                y: 0,
                rotateY: 0,
                duration: 0.8,
                ease: 'back.out(1.7)',
                stagger: 0.04,
                scrollTrigger: {
                    trigger: '.business-title',
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                }
            }
        );

        // Subtitle lines animation
        gsap.fromTo('.business-subtitle .line', 
            { opacity: 0, y: 30 },
            {
                opacity: 1,
                y: 0,
                duration: 0.6,
                ease: 'power2.out',
                stagger: 0.15,
                scrollTrigger: {
                    trigger: '.business-subtitle',
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                }
            }
        );

        // Business cards staggered animation (for both overview and detail)
        gsap.fromTo('.business-card, .business-overview-card', 
            { opacity: 0, y: 50, scale: 0.9, rotateX: -15 },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                rotateX: 0,
                duration: 0.8,
                ease: 'back.out(1.7)',
                stagger: {
                    amount: 0.6,
                    from: 'start'
                },
                scrollTrigger: {
                    trigger: '.business-grid, .business-overview-grid',
                    start: 'top 70%',
                    toggleActions: 'play none none reverse'
                }
            }
        );

        // Featured card special animation
        gsap.fromTo('.business-card-featured', 
            { opacity: 0, scale: 0.8, y: 60 },
            {
                opacity: 1,
                scale: 1,
                y: 0,
                duration: 1,
                ease: 'back.out(1.7)',
                delay: 0.8,
                scrollTrigger: {
                    trigger: '.business-card-featured',
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                }
            }
        );

        // Process section animation
        gsap.fromTo('.business-process', 
            { opacity: 0, y: 40 },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: '.business-process',
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                }
            }
        );

        // Process steps animation
        gsap.fromTo('.process-step', 
            { opacity: 0, y: 30, scale: 0.95 },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.6,
                ease: 'back.out(1.7)',
                stagger: 0.2,
                scrollTrigger: {
                    trigger: '.process-steps',
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                }
            }
        );

        // Process arrows animation
        gsap.fromTo('.process-arrow', 
            { opacity: 0, scale: 0.5, rotation: -45 },
            {
                opacity: 1,
                scale: 1,
                rotation: 0,
                duration: 0.5,
                ease: 'back.out(1.7)',
                stagger: 0.1,
                delay: 0.3,
                scrollTrigger: {
                    trigger: '.process-steps',
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    }

    initInteractiveElements() {
        // Get both business cards and overview cards
        const allCards = document.querySelectorAll('.business-card, .business-overview-card');
        
        // Business cards hover effects
        allCards.forEach((card, index) => {
            const icon = card.querySelector('.business-card-icon, .business-overview-icon');
            const features = card.querySelectorAll('.feature-tag');
            const button = card.querySelector('.btn');
            
            card.addEventListener('mouseenter', () => {
                if (typeof gsap !== 'undefined') {
                    // Icon animation
                    gsap.to(icon, {
                        scale: 1.1,
                        rotation: 5,
                        duration: 0.3,
                        ease: 'back.out(1.7)'
                    });
                    
                    // Feature tags animation
                    gsap.to(features, {
                        y: -2,
                        duration: 0.3,
                        ease: 'power2.out',
                        stagger: 0.05
                    });
                    
                    // Button animation
                    if (button) {
                        gsap.to(button, {
                            scale: 1.05,
                            duration: 0.3,
                            ease: 'power2.out'
                        });
                    }
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
                    
                    gsap.to(features, {
                        y: 0,
                        duration: 0.3,
                        ease: 'power2.out'
                    });
                    
                    if (button) {
                        gsap.to(button, {
                            scale: 1,
                            duration: 0.3,
                            ease: 'power2.out'
                        });
                    }
                }
            });
        });

        // Process steps interaction
        this.processSteps.forEach((step, index) => {
            const stepNumber = step.querySelector('.step-number');
            
            step.addEventListener('mouseenter', () => {
                if (typeof gsap !== 'undefined') {
                    gsap.to(stepNumber, {
                        scale: 1.2,
                        rotation: 10,
                        duration: 0.3,
                        ease: 'back.out(1.7)'
                    });
                    
                    // Highlight connected arrows
                    const arrows = document.querySelectorAll('.process-arrow');
                    if (index < arrows.length) {
                        gsap.to(arrows[index], {
                            scale: 1.2,
                            opacity: 1,
                            duration: 0.3,
                            ease: 'power2.out'
                        });
                    }
                    if (index > 0 && arrows[index - 1]) {
                        gsap.to(arrows[index - 1], {
                            scale: 1.2,
                            opacity: 1,
                            duration: 0.3,
                            ease: 'power2.out'
                        });
                    }
                }
            });

            step.addEventListener('mouseleave', () => {
                if (typeof gsap !== 'undefined') {
                    gsap.to(stepNumber, {
                        scale: 1,
                        rotation: 0,
                        duration: 0.3,
                        ease: 'power2.out'
                    });
                    
                    // Reset arrows
                    const arrows = document.querySelectorAll('.process-arrow');
                    gsap.to(arrows, {
                        scale: 1,
                        opacity: 0.6,
                        duration: 0.3,
                        ease: 'power2.out'
                    });
                }
            });
        });

        // Feature tags individual hover
        this.featureTags.forEach((tag, index) => {
            tag.addEventListener('mouseenter', () => {
                if (typeof gsap !== 'undefined') {
                    gsap.to(tag, {
                        scale: 1.05,
                        duration: 0.2,
                        ease: 'power2.out'
                    });
                }
            });

            tag.addEventListener('mouseleave', () => {
                if (typeof gsap !== 'undefined') {
                    gsap.to(tag, {
                        scale: 1,
                        duration: 0.2,
                        ease: 'power2.out'
                    });
                }
            });
        });
    }

    initFilterFunctionality() {
        // Add category-based highlighting (for future enhancement)
        this.businessCards.forEach(card => {
            const category = card.dataset.category;
            card.setAttribute('data-category', category);
        });

        // Intersection observer for advanced animations
        if ('IntersectionObserver' in window) {
            const cardObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('in-view');
                        
                        // Add staggered glow effect for featured card
                        if (entry.target.classList.contains('business-card-featured')) {
                            setTimeout(() => {
                                entry.target.style.animation = 'glow 2s ease-in-out infinite alternate';
                            }, 1000);
                        }
                    }
                });
            }, {
                threshold: 0.3,
                rootMargin: '0px 0px -50px 0px'
            });

            this.businessCards.forEach(card => {
                cardObserver.observe(card);
            });
        }
    }

    // Method to highlight specific service categories
    highlightCategory(category) {
        this.businessCards.forEach(card => {
            const cardCategory = card.dataset.category;
            
            if (typeof gsap !== 'undefined') {
                if (category === 'all' || cardCategory === category) {
                    gsap.to(card, {
                        opacity: 1,
                        scale: 1,
                        duration: 0.3,
                        ease: 'power2.out'
                    });
                } else {
                    gsap.to(card, {
                        opacity: 0.3,
                        scale: 0.95,
                        duration: 0.3,
                        ease: 'power2.out'
                    });
                }
            }
        });
    }

    // Reset all highlights
    resetHighlights() {
        if (typeof gsap !== 'undefined') {
            gsap.to(this.businessCards, {
                opacity: 1,
                scale: 1,
                duration: 0.3,
                ease: 'power2.out'
            });
        }
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
                if (trigger.trigger && trigger.trigger.closest('#business')) {
                    trigger.kill();
                }
            });
        }
    }
}