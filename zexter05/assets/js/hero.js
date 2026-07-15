/* =============================================================================
   株式会社zexter - Hero セクション JavaScript
   ============================================================================= */

class HeroSection {
  constructor() {
    this.init();
  }

  init() {
    this.createParticles();
    this.initScrollIndicator();
    this.initCounterAnimation();
    this.initParallaxEffect();
    this.initTypewriterEffect();
  }

  // パーティクル生成
  createParticles() {
    const particlesContainer = document.querySelector('.hero-particles');
    if (!particlesContainer) return;

    const particleCount = window.innerWidth < 768 ? 20 : 40;

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.classList.add('particle');
      
      // ランダムな位置
      particle.style.left = Math.random() * 100 + '%';
      particle.style.top = Math.random() * 100 + '%';
      
      // ランダムな遅延
      particle.style.animationDelay = Math.random() * 6 + 's';
      
      // ランダムなサイズ
      const size = Math.random() * 3 + 2;
      particle.style.width = size + 'px';
      particle.style.height = size + 'px';
      
      // ランダムな透明度
      particle.style.opacity = Math.random() * 0.5 + 0.3;
      
      particlesContainer.appendChild(particle);
    }
  }

  // スクロールインジケーター
  initScrollIndicator() {
    const scrollIndicator = document.querySelector('.hero-scroll');
    if (!scrollIndicator) return;

    scrollIndicator.addEventListener('click', () => {
      const nextSection = document.querySelector('#about, .section:nth-of-type(2)');
      if (nextSection) {
        nextSection.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  }

  // カウンターアニメーション
  initCounterAnimation() {
    const counters = document.querySelectorAll('.hero-stat-number');
    if (!counters.length) return;

    const observerCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.5
    });

    counters.forEach(counter => observer.observe(counter));
  }

  // 数値カウントアニメーション
  animateCounter(element) {
    const finalValue = parseInt(element.dataset.count) || 
                     parseInt(element.textContent.replace(/[^0-9]/g, '')) || 0;
    
    const duration = 2000; // 2秒
    const startTime = performance.now();
    
    const updateCounter = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // イージング関数（easeOutCubic）
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      
      const currentValue = Math.floor(easeProgress * finalValue);
      element.textContent = this.formatNumber(currentValue);
      
      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      }
    };

    requestAnimationFrame(updateCounter);
  }

  // 数値フォーマット
  formatNumber(num) {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M+';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K+';
    }
    return num.toLocaleString() + '+';
  }

  // パララックス効果
  initParallaxEffect() {
    const shapes = document.querySelectorAll('.geometric-shape');
    const orbs = document.querySelectorAll('.orb');

    if (!shapes.length && !orbs.length) return;

    const handleScroll = () => {
      const scrollY = window.pageYOffset;
      const heroHeight = document.querySelector('.hero').offsetHeight;
      
      if (scrollY > heroHeight) return;

      const scrollRatio = scrollY / heroHeight;

      shapes.forEach((shape, index) => {
        const speed = (index + 1) * 0.5;
        const rotation = scrollY * 0.1;
        shape.style.transform = `translateY(${scrollY * speed}px) rotate(${rotation}deg)`;
      });

      orbs.forEach((orb, index) => {
        const speed = (index + 1) * 0.3;
        orb.style.transform = `translateY(${scrollY * speed}px)`;
      });
    };

    // スクロールイベントをthrottle
    let ticking = false;
    const scrollListener = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', scrollListener, { passive: true });
  }

  // タイプライター効果（オプション）
  initTypewriterEffect() {
    const typewriterElement = document.querySelector('[data-typewriter]');
    if (!typewriterElement) return;

    const text = typewriterElement.textContent;
    const speed = parseInt(typewriterElement.dataset.speed) || 100;
    
    typewriterElement.textContent = '';
    typewriterElement.style.borderRight = '2px solid var(--color-gold-500)';
    
    let i = 0;
    const typeWriter = () => {
      if (i < text.length) {
        typewriterElement.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, speed);
      } else {
        // カーソル点滅効果
        setTimeout(() => {
          typewriterElement.style.borderRight = 'none';
        }, 1000);
      }
    };

    // 少し遅延してからスタート
    setTimeout(typeWriter, 1000);
  }
}

// マウス追跡効果
class MouseTracker {
  constructor() {
    this.cursor = null;
    this.init();
  }

  init() {
    this.createCursor();
    this.bindEvents();
  }

  createCursor() {
    this.cursor = document.createElement('div');
    this.cursor.classList.add('hero-cursor');
    this.cursor.innerHTML = '<div class="hero-cursor-inner"></div>';
    document.body.appendChild(this.cursor);

    // カーソルスタイルを追加
    const style = document.createElement('style');
    style.textContent = `
      .hero-cursor {
        position: fixed;
        width: 20px;
        height: 20px;
        pointer-events: none;
        z-index: 9999;
        mix-blend-mode: difference;
        transition: transform 0.1s ease;
      }
      
      .hero-cursor-inner {
        width: 100%;
        height: 100%;
        background: radial-gradient(circle, var(--color-gold-500), transparent);
        border-radius: 50%;
        opacity: 0.7;
      }
      
      .hero-cursor.hover {
        transform: scale(1.5);
      }
      
      .hero-cursor.click {
        transform: scale(0.8);
      }
    `;
    document.head.appendChild(style);
  }

  bindEvents() {
    // マウス移動
    document.addEventListener('mousemove', (e) => {
      if (!this.cursor) return;
      
      this.cursor.style.left = e.clientX + 'px';
      this.cursor.style.top = e.clientY + 'px';
    });

    // ホバー効果
    const hoverElements = document.querySelectorAll('button, a, .btn, .service-card');
    hoverElements.forEach(element => {
      element.addEventListener('mouseenter', () => {
        this.cursor?.classList.add('hover');
      });
      
      element.addEventListener('mouseleave', () => {
        this.cursor?.classList.remove('hover');
      });
    });

    // クリック効果
    document.addEventListener('mousedown', () => {
      this.cursor?.classList.add('click');
    });

    document.addEventListener('mouseup', () => {
      this.cursor?.classList.remove('click');
    });
  }
}

// 初期化
document.addEventListener('DOMContentLoaded', () => {
  new HeroSection();
  
  // デスクトップのみマウストラッカーを有効化
  if (window.innerWidth > 768) {
    new MouseTracker();
  }
});

// リサイズ時の処理
window.addEventListener('resize', () => {
  // パーティクルの数を調整
  const particlesContainer = document.querySelector('.hero-particles');
  if (particlesContainer) {
    // 既存のパーティクルをクリア
    particlesContainer.innerHTML = '';
    
    // 新しいHeroSectionインスタンスでパーティクルを再生成
    const heroSection = new HeroSection();
  }
});

// パフォーマンス最適化：visibility changeでアニメーションを制御
document.addEventListener('visibilitychange', () => {
  const particles = document.querySelectorAll('.particle');
  const shapes = document.querySelectorAll('.geometric-shape');
  
  if (document.hidden) {
    // ページが非表示の時はアニメーションを停止
    particles.forEach(p => p.style.animationPlayState = 'paused');
    shapes.forEach(s => s.style.animationPlayState = 'paused');
  } else {
    // ページが表示されたらアニメーションを再開
    particles.forEach(p => p.style.animationPlayState = 'running');
    shapes.forEach(s => s.style.animationPlayState = 'running');
  }
});