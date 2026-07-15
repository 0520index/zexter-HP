/* =============================================================================
   株式会社zexter - About セクション JavaScript
   ============================================================================= */

class AboutSection {
  constructor() {
    this.init();
  }

  init() {
    this.initScrollAnimations();
    this.initCounterAnimations();
    this.initTimelineAnimations();
    this.initFeatureAnimations();
  }

  // スクロールアニメーション
  initScrollAnimations() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          
          // カウンターアニメーションのトリガー
          if (entry.target.classList.contains('about-stat-number')) {
            this.animateCounter(entry.target);
          }
        }
      });
    }, observerOptions);

    // 監視する要素
    const elementsToAnimate = document.querySelectorAll(
      '.fade-in-left, .fade-in-right, .scale-in, .slide-up, .about-stat-number, .mission-card, .timeline-item'
    );

    elementsToAnimate.forEach(el => {
      observer.observe(el);
    });
  }

  // カウンターアニメーション
  initCounterAnimations() {
    // 統計数値にdata-count属性を設定
    const stats = [
      { element: document.querySelector('.stat-experience'), value: 2026, suffix: '年設立' },
      { element: document.querySelector('.stat-services'), value: 5, suffix: '事業分野' },
      { element: document.querySelector('.stat-coverage'), value: 100, suffix: '%対応' },
      { element: document.querySelector('.stat-hours'), value: 24, suffix: '時間' }
    ];

    stats.forEach(stat => {
      if (stat.element) {
        stat.element.dataset.count = stat.value;
        stat.element.dataset.suffix = stat.suffix;
      }
    });
  }

  // 数値カウントアニメーション
  animateCounter(element) {
    if (element.dataset.animated) return; // 既にアニメーション済み
    
    const finalValue = parseInt(element.dataset.count) || 0;
    const suffix = element.dataset.suffix || '';
    const duration = 2000;
    const startTime = performance.now();
    
    const updateCounter = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // イージング関数
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      
      const currentValue = Math.floor(easeProgress * finalValue);
      element.textContent = currentValue + (suffix.includes('%') ? '%' : '');
      
      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        element.textContent = finalValue + (suffix.includes('%') ? '%' : '');
        element.dataset.animated = 'true';
      }
    };

    requestAnimationFrame(updateCounter);
  }

  // タイムラインアニメーション
  initTimelineAnimations() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    timelineItems.forEach((item, index) => {
      // 順次表示のための遅延
      const delay = index * 200;
      item.style.transitionDelay = `${delay}ms`;
      
      // 初期状態を設定
      item.classList.add('slide-up');
    });
  }

  // 特徴項目のホバーアニメーション
  initFeatureAnimations() {
    const features = document.querySelectorAll('.about-feature');
    
    features.forEach(feature => {
      const icon = feature.querySelector('.about-feature-icon');
      
      feature.addEventListener('mouseenter', () => {
        icon.style.transform = 'scale(1.2) rotate(10deg)';
        icon.style.background = 'linear-gradient(135deg, var(--color-gold-400), var(--color-gold-600))';
        icon.style.color = 'var(--color-white)';
      });
      
      feature.addEventListener('mouseleave', () => {
        icon.style.transform = 'scale(1) rotate(0deg)';
        icon.style.background = 'linear-gradient(135deg, var(--color-gold-100), var(--color-gold-200))';
        icon.style.color = 'var(--color-gold-600)';
      });
    });
  }
}

// パララックス効果
class AboutParallax {
  constructor() {
    this.init();
  }

  init() {
    this.bindScrollEvents();
  }

  bindScrollEvents() {
    let ticking = false;
    
    const handleScroll = () => {
      const scrollY = window.pageYOffset;
      const aboutSection = document.querySelector('.about');
      
      if (!aboutSection) return;
      
      const sectionTop = aboutSection.offsetTop;
      const sectionHeight = aboutSection.offsetHeight;
      const windowHeight = window.innerHeight;
      
      // セクションが表示範囲内にある場合のみ処理
      if (scrollY + windowHeight > sectionTop && scrollY < sectionTop + sectionHeight) {
        const relativeScroll = scrollY - sectionTop;
        const scrollRatio = relativeScroll / sectionHeight;
        
        // 背景パターンのパララックス
        const patterns = document.querySelectorAll('.about-pattern');
        patterns.forEach((pattern, index) => {
          const speed = (index + 1) * 0.3;
          pattern.style.transform = `translateY(${relativeScroll * speed}px)`;
        });
        
        // 装飾的な円のパララックス
        const circles = document.querySelectorAll('.decorative-circle');
        circles.forEach((circle, index) => {
          const speed = (index + 1) * 0.2;
          const rotation = relativeScroll * 0.1;
          circle.style.transform = `translateY(${relativeScroll * speed}px) rotate(${rotation}deg)`;
        });
      }
    };

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
}

// タイプライター効果（オプション）
class TypeWriter {
  constructor(element, text, options = {}) {
    this.element = element;
    this.text = text;
    this.speed = options.speed || 50;
    this.delay = options.delay || 0;
    this.cursor = options.cursor || true;
    
    this.init();
  }

  init() {
    setTimeout(() => {
      this.type();
    }, this.delay);
  }

  type() {
    this.element.textContent = '';
    
    if (this.cursor) {
      this.element.style.borderRight = '2px solid var(--color-gold-500)';
    }
    
    let i = 0;
    const typeChar = () => {
      if (i < this.text.length) {
        this.element.textContent += this.text.charAt(i);
        i++;
        setTimeout(typeChar, this.speed);
      } else if (this.cursor) {
        // カーソル点滅効果
        setTimeout(() => {
          this.element.style.borderRight = 'none';
        }, 1000);
      }
    };
    
    typeChar();
  }
}

// 初期化
document.addEventListener('DOMContentLoaded', () => {
  new AboutSection();
  new AboutParallax();
  
  // タイプライター効果の例（必要に応じて使用）
  const typewriterElement = document.querySelector('[data-typewriter]');
  if (typewriterElement) {
    const text = typewriterElement.textContent;
    const speed = parseInt(typewriterElement.dataset.speed) || 100;
    
    new TypeWriter(typewriterElement, text, { speed });
  }
});

// リサイズ時の処理
window.addEventListener('resize', () => {
  // レスポンシブ対応の調整があれば追加
});

// パフォーマンス最適化
document.addEventListener('visibilitychange', () => {
  const animations = document.querySelectorAll('.about-pattern, .decorative-circle');
  
  if (document.hidden) {
    animations.forEach(el => {
      el.style.animationPlayState = 'paused';
    });
  } else {
    animations.forEach(el => {
      el.style.animationPlayState = 'running';
    });
  }
});