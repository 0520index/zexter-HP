/**
 * ZEXTER Corporate Site
 * Main JavaScript Entry Point
 */

import { NavigationModule } from './modules/navigation.js';
import { HeroModule } from './modules/hero.js';

class ZexterSite {
    constructor() {
        this.isLoaded = false;
        this.modules = {};
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

    async setup() {
        console.log('🚀 ZEXTER Site Initializing...');
        
        // Initialize core functionality
        this.initCore();
        
        // Initialize modules
        this.initModules();
        
        // Initialize smooth scrolling
        this.initSmoothScroll();
        
        this.isLoaded = true;
        console.log('✅ ZEXTER Site Ready!');
        
        // Dispatch ready event
        window.dispatchEvent(new CustomEvent('zexterSiteReady'));
    }

    initCore() {
        // Register GSAP plugins
        if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
            gsap.registerPlugin(ScrollTrigger);
            
            // Set default ScrollTrigger settings
            ScrollTrigger.defaults({
                toggleActions: 'play none none reverse',
                markers: false
            });
        }

        // Basic performance optimizations
        this.optimizeImages();
        this.handleResize();
        this.initPreloader();
    }

    initModules() {
        try {
            // Initialize navigation
            this.modules.navigation = new NavigationModule();
            
            // Initialize hero section
            this.modules.hero = new HeroModule();
            
            console.log('📦 Modules initialized successfully');
        } catch (error) {
            console.error('❌ Error initializing modules:', error);
        }
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
            
            console.log('🎯 Smooth scroll initialized');
        }
    }

    initPreloader() {
        // Simple preloader to ensure smooth animations
        const preloader = document.createElement('div');
        preloader.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, #ffffff 0%, #f5f5f5 100%);
            z-index: 9999;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: opacity 0.5s ease-out, visibility 0.5s ease-out;
        `;
        
        preloader.innerHTML = `
            <div style="text-align: center;">
                <div style="width: 60px; height: 60px; border: 3px solid #d4af37; border-top: 3px solid transparent; border-radius: 50%; animation: spin 1s linear infinite; margin-bottom: 20px;"></div>
                <div style="font-family: 'Noto Sans JP', sans-serif; font-size: 18px; font-weight: 700; color: #d4af37;">ZEXTER</div>
            </div>
        `;
        
        document.body.appendChild(preloader);
        
        // Remove preloader after a short delay
        setTimeout(() => {
            preloader.style.opacity = '0';
            preloader.style.visibility = 'hidden';
            
            setTimeout(() => {
                document.body.removeChild(preloader);
            }, 500);
        }, 1500);
    }

    optimizeImages() {
        // Lazy loading implementation
        const images = document.querySelectorAll('img[data-src]');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        img.classList.add('loaded');
                        observer.unobserve(img);
                    }
                });
            }, {
                rootMargin: '50px 0px',
                threshold: 0.01
            });

            images.forEach(img => {
                img.classList.add('lazy');
                imageObserver.observe(img);
            });
        }
    }

    handleResize() {
        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                // Trigger resize events for animations
                window.dispatchEvent(new CustomEvent('optimizedResize'));
                
                // Update ScrollTrigger
                if (typeof ScrollTrigger !== 'undefined') {
                    ScrollTrigger.refresh();
                }
            }, 250);
        });
    }

    // Cleanup method for SPA transitions or performance
    destroy() {
        // Destroy modules
        Object.values(this.modules).forEach(module => {
            if (module.destroy) {
                module.destroy();
            }
        });

        // Destroy Lenis
        if (this.lenis) {
            this.lenis.destroy();
        }

        // Kill all GSAP animations and ScrollTriggers
        if (typeof gsap !== 'undefined') {
            gsap.killTweensOf('*');
        }
        
        if (typeof ScrollTrigger !== 'undefined') {
            ScrollTrigger.killAll();
        }
    }
}

// Add spin animation for preloader
const style = document.createElement('style');
style.textContent = `
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`;
document.head.appendChild(style);

// Initialize the site
const zexterSite = new ZexterSite();

// Export for global access if needed
window.ZexterSite = zexterSite;