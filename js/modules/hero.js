/**
 * Hero Section Module
 * Handles hero animations and interactions
 */

export class HeroModule {
    constructor() {
        this.heroElement = document.querySelector('#hero');
        this.heroTitle = document.querySelector('.hero-title');
        this.heroSubtitle = document.querySelector('.hero-subtitle');
        this.heroStats = document.querySelectorAll('.hero-stat-number');
        this.canvasContainer = document.querySelector('#hero-canvas-container');
        
        this.init();
    }

    init() {
        if (!this.heroElement) return;
        
        this.initTextAnimations();
        this.initStatsCounter();
        this.init3DScene();
        this.initScrollIndicator();
    }

    initTextAnimations() {
        // Initialize Splitting.js for text animations
        if (typeof Splitting !== 'undefined') {
            Splitting({
                target: '[data-splitting]',
                by: 'chars',
                key: null
            });
        }

        // GSAP Timeline for hero entrance
        if (typeof gsap !== 'undefined') {
            const tl = gsap.timeline({ delay: 0.5 });
            
            // Badge animation
            tl.fromTo('.hero-badge', 
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }
            );
            
            // Title character animation
            tl.fromTo('.hero-title .char', 
                { opacity: 0, y: 100, rotateX: -90 },
                { 
                    opacity: 1, 
                    y: 0, 
                    rotateX: 0,
                    duration: 0.8,
                    ease: 'back.out(1.7)',
                    stagger: 0.02
                },
                '-=0.4'
            );
            
            // Subtitle line animation
            tl.fromTo('.hero-subtitle .line', 
                { opacity: 0, y: 50 },
                { 
                    opacity: 1, 
                    y: 0, 
                    duration: 0.6,
                    ease: 'power2.out',
                    stagger: 0.1
                },
                '-=0.2'
            );
            
            // CTA buttons
            tl.fromTo('.hero-cta .btn', 
                { opacity: 0, y: 30, scale: 0.9 },
                { 
                    opacity: 1, 
                    y: 0, 
                    scale: 1,
                    duration: 0.6,
                    ease: 'back.out(1.7)',
                    stagger: 0.1
                },
                '-=0.3'
            );
            
            // Stats
            tl.fromTo('.hero-stat', 
                { opacity: 0, y: 30 },
                { 
                    opacity: 1, 
                    y: 0, 
                    duration: 0.6,
                    ease: 'power2.out',
                    stagger: 0.1
                },
                '-=0.2'
            );
            
            // Hero cards
            tl.fromTo('.hero-card', 
                { opacity: 0, y: 50, rotateX: -15 },
                { 
                    opacity: 1, 
                    y: 0, 
                    rotateX: 0,
                    duration: 0.8,
                    ease: 'power2.out',
                    stagger: 0.2
                },
                '-=0.4'
            );
        }
    }

    initStatsCounter() {
        // Animate counter numbers
        this.heroStats.forEach(stat => {
            const target = parseInt(stat.dataset.count);
            const duration = 2000;
            
            const counter = { value: 0 };
            
            if (typeof gsap !== 'undefined') {
                gsap.to(counter, {
                    value: target,
                    duration: duration / 1000,
                    ease: 'power2.out',
                    delay: 1.5,
                    onUpdate: () => {
                        stat.textContent = Math.round(counter.value);
                    },
                    onComplete: () => {
                        // Add suffix back
                        if (stat.textContent === '98') {
                            stat.innerHTML = '98<span style="font-size: 0.6em;">%</span>';
                        } else if (stat.textContent === '1000') {
                            stat.innerHTML = '1000<span style="font-size: 0.6em;">+</span>';
                        } else if (stat.textContent === '10') {
                            stat.innerHTML = '10<span style="font-size: 0.6em;">+</span>';
                        }
                    }
                });
            }
        });
    }

    init3DScene() {
        // Three.js 3D scene for hero background
        if (typeof THREE === 'undefined' || !this.canvasContainer) return;

        // Scene setup
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ 
            alpha: true, 
            antialias: true,
            powerPreference: 'high-performance'
        });
        
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setClearColor(0x000000, 0);
        this.canvasContainer.appendChild(renderer.domElement);

        // Create floating geometric shapes
        const geometries = [
            new THREE.OctahedronGeometry(0.5),
            new THREE.TetrahedronGeometry(0.8),
            new THREE.BoxGeometry(0.6, 0.6, 0.6)
        ];

        const materials = [
            new THREE.MeshBasicMaterial({ 
                color: 0xd4af37, 
                wireframe: true,
                transparent: true,
                opacity: 0.3
            }),
            new THREE.MeshBasicMaterial({ 
                color: 0x00f5ff, 
                wireframe: true,
                transparent: true,
                opacity: 0.2
            }),
            new THREE.MeshBasicMaterial({ 
                color: 0x8b5cf6, 
                wireframe: true,
                transparent: true,
                opacity: 0.25
            })
        ];

        const meshes = [];
        
        // Create multiple floating objects
        for (let i = 0; i < 15; i++) {
            const geometry = geometries[Math.floor(Math.random() * geometries.length)];
            const material = materials[Math.floor(Math.random() * materials.length)];
            const mesh = new THREE.Mesh(geometry, material);
            
            // Random positioning
            mesh.position.x = (Math.random() - 0.5) * 20;
            mesh.position.y = (Math.random() - 0.5) * 10;
            mesh.position.z = (Math.random() - 0.5) * 10;
            
            // Random rotation
            mesh.rotation.x = Math.random() * Math.PI;
            mesh.rotation.y = Math.random() * Math.PI;
            mesh.rotation.z = Math.random() * Math.PI;
            
            scene.add(mesh);
            meshes.push(mesh);
        }

        camera.position.z = 8;

        // Animation loop
        const animate = () => {
            requestAnimationFrame(animate);

            // Rotate meshes
            meshes.forEach((mesh, index) => {
                mesh.rotation.x += 0.005 + index * 0.0001;
                mesh.rotation.y += 0.005 + index * 0.0001;
                
                // Floating movement
                mesh.position.y += Math.sin(Date.now() * 0.001 + index) * 0.002;
                mesh.position.x += Math.cos(Date.now() * 0.0008 + index) * 0.001;
            });

            renderer.render(scene, camera);
        };

        animate();

        // Handle resize
        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };

        window.addEventListener('resize', handleResize);
        
        // Store references for cleanup
        this.threeScene = { scene, camera, renderer, meshes, handleResize };
    }

    initScrollIndicator() {
        const scrollIndicator = document.querySelector('.hero-scroll-indicator');
        if (!scrollIndicator) return;

        // Add click handler for smooth scroll
        scrollIndicator.addEventListener('click', () => {
            const aboutSection = document.querySelector('#about');
            if (aboutSection) {
                aboutSection.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });

        // Hide scroll indicator on scroll
        if (typeof gsap !== 'undefined') {
            gsap.to(scrollIndicator, {
                opacity: 0,
                scrollTrigger: {
                    trigger: scrollIndicator,
                    start: 'top 80%',
                    end: 'top 20%',
                    scrub: true
                }
            });
        }
    }

    // Cleanup method for performance
    destroy() {
        if (this.threeScene) {
            window.removeEventListener('resize', this.threeScene.handleResize);
            
            // Dispose of Three.js objects
            this.threeScene.meshes.forEach(mesh => {
                mesh.geometry.dispose();
                mesh.material.dispose();
            });
            
            this.threeScene.renderer.dispose();
            this.canvasContainer.removeChild(this.threeScene.renderer.domElement);
        }
    }
}