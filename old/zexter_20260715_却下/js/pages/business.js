/**
 * Business Page JavaScript
 * Page-specific functionality for business detail page
 */

import { NavigationModule } from '../modules/navigation.js';
import { BusinessModule } from '../modules/business.js';

class BusinessPageModule {
    constructor() {
        this.init();
    }

    init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setup());
        } else {
            this.setup();
        }
    }

    setup() {
        console.log('🚀 Business Page Initializing...');
        
        // Initialize core functionality
        this.initCore();
        
        // Initialize modules
        this.initModules();
        
        // Initialize smooth scrolling
        this.initSmoothScroll();
        
        // Initialize page-specific features
        this.initPageHero();
        
        console.log('✅ Business Page Ready!');
    }

    initCore() {
        // Register GSAP plugins
        if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
            gsap.registerPlugin(ScrollTrigger);
        }
    }

    initModules() {
        // Initialize navigation
        this.navigation = new NavigationModule();
        
        // Initialize business section
        this.business = new BusinessModule();
    }

    initSmoothScroll() {
        // Initialize Lenis smooth scroll
        if (typeof Lenis !== 'undefined') {
            const lenis = new Lenis({
                duration: 1.2,
                easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                direction: 'vertical',
                gestureDirection: 'vertical',
                smooth: true,
                mouseMultiplier: 1,
                smoothTouch: false,
                touchMultiplier: 2,
                infinite: false,
            });

            // Connect Lenis to GSAP ScrollTrigger
            if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
                lenis.on('scroll', ScrollTrigger.update);
                
                gsap.ticker.add((time) => {
                    lenis.raf(time * 1000);
                });
                
                gsap.ticker.lagSmoothing(0);
            }

            // Store reference
            this.lenis = lenis;
        }
    }

    initPageHero() {
        if (typeof gsap === 'undefined') return;

        // Initialize text splitting for page hero
        if (typeof Splitting !== 'undefined') {
            Splitting({
                target: '.page-hero-title[data-splitting]',
                by: 'chars'
            });
        }

        // Page hero animations
        const tl = gsap.timeline({ delay: 0.3 });
        
        // Breadcrumb animation
        tl.fromTo('.breadcrumb', 
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
        );
        
        // Title character animation
        tl.fromTo('.page-hero-title .char', 
            { opacity: 0, y: 60, rotateX: -45 },
            { 
                opacity: 1, 
                y: 0, 
                rotateX: 0,
                duration: 0.8,
                ease: 'back.out(1.7)',
                stagger: 0.03
            },
            '-=0.3'
        );
        
        // Description animation
        tl.fromTo('.page-hero-description', 
            { opacity: 0, y: 30 },
            { 
                opacity: 1, 
                y: 0, 
                duration: 0.6,
                ease: 'power2.out'
            },
            '-=0.4'
        );
    }

    // Hash navigation for service sections
    initHashNavigation() {
        // Handle hash navigation to specific services
        const handleHashNavigation = () => {
            const hash = window.location.hash;
            if (hash) {
                const targetElement = document.querySelector(hash);
                if (targetElement) {
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = targetElement.offsetTop - headerHeight - 20;
                    
                    if (this.lenis) {
                        this.lenis.scrollTo(targetPosition, {
                            duration: 1.2,
                            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
                        });
                    } else {
                        window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                        });
                    }
                }
            }
        };

        // Handle hash navigation on load
        window.addEventListener('load', handleHashNavigation);
        
        // Handle hash navigation on hash change
        window.addEventListener('hashchange', handleHashNavigation);
    }
}

// Initialize the business page
const businessPage = new BusinessPageModule();