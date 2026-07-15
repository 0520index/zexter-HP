// DOM要素の取得
const loadingScreen = document.getElementById('loading-screen');
const header = document.querySelector('.header');
const navItems = document.querySelectorAll('.nav-item');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const heroTitle = document.querySelector('.hero-title');
const ctaButtons = document.querySelectorAll('.cta-button');
const serviceCards = document.querySelectorAll('.service-card');
const contactForm = document.getElementById('contactForm');
const particleContainer = document.querySelector('.particle-container');

// ローディング画面の制御
window.addEventListener('load', () => {
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
        document.body.style.overflow = 'visible';
        
        // ヒーロータイトルのアニメーション開始
        setTimeout(() => {
            heroTitle.style.opacity = '1';
            heroTitle.style.transform = 'translateY(0)';
        }, 500);
    }, 2000);
});

// 初期設定
document.addEventListener('DOMContentLoaded', () => {
    heroTitle.style.opacity = '0';
    heroTitle.style.transform = 'translateY(50px)';
    heroTitle.style.transition = 'all 1s ease';
    
    createParticles();
    initScrollAnimations();
    initServiceCardAnimations();
});

// パーティクル生成
function createParticles() {
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // ランダムな位置に配置
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        
        // ランダムな遅延時間
        particle.style.animationDelay = Math.random() * 6 + 's';
        
        // ランダムなサイズ
        const size = Math.random() * 3 + 1;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        
        particleContainer.appendChild(particle);
    }
}

// スクロールイベント
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    
    // ヘッダーの背景変更
    if (scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    // パララックス効果
    const shapes = document.querySelectorAll('.shape');
    shapes.forEach((shape, index) => {
        const speed = (index + 1) * 0.5;
        shape.style.transform = `translateY(${scrollY * speed}px) rotate(${scrollY * 0.1}deg)`;
    });
});

// スムーズスクロール
navItems.forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = item.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ハンバーガーメニュー
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// CTAボタンのアニメーション
ctaButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        // リップル効果
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        button.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
        
        // ボタンのアクション
        if (button.textContent.includes('サービス')) {
            document.getElementById('services').scrollIntoView({
                behavior: 'smooth'
            });
        } else if (button.textContent.includes('お問い合わせ')) {
            document.getElementById('contact').scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// リップルエフェクトのCSS
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: rippleEffect 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes rippleEffect {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .cta-button {
        position: relative;
        overflow: hidden;
    }
`;
document.head.appendChild(rippleStyle);

// スクロールアニメーション
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // 監視する要素を追加
    const elementsToAnimate = document.querySelectorAll('.service-card, .section-title, .about-description, .contact-item');
    elementsToAnimate.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
}

// サービスカードのホバー効果強化
function initServiceCardAnimations() {
    serviceCards.forEach((card, index) => {
        // カードの入場アニメーション
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        card.style.transition = 'all 0.6s ease';
        
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 200 * (index + 1));
        
        // マウスムーブメント効果
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
        });
        
        // クリック効果
        card.addEventListener('click', () => {
            card.style.transform = 'scale(0.95)';
            setTimeout(() => {
                card.style.transform = '';
            }, 150);
        });
    });
}

// フォーム送信処理
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const submitButton = contactForm.querySelector('.submit-button');
    const originalText = submitButton.innerHTML;
    
    // ローディング状態
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 送信中...';
    submitButton.disabled = true;
    
    // 2秒後に完了メッセージ
    setTimeout(() => {
        submitButton.innerHTML = '<i class="fas fa-check"></i> 送信完了';
        submitButton.style.background = 'linear-gradient(45deg, #4CAF50, #66BB6A)';
        
        // さらに2秒後に元に戻す
        setTimeout(() => {
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;
            submitButton.style.background = '';
            contactForm.reset();
        }, 2000);
    }, 2000);
});

// タイピングエフェクト
function typeWriter(element, text, speed = 100) {
    element.textContent = '';
    let i = 0;
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// 数値カウントアニメーション
function animateNumber(element, start, end, duration = 2000) {
    const startTime = performance.now();
    
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const current = Math.floor(progress * (end - start) + start);
        element.textContent = current.toLocaleString();
        
        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }
    
    requestAnimationFrame(update);
}

// カーソル追跡効果
document.addEventListener('mousemove', (e) => {
    const cursor = document.querySelector('.custom-cursor');
    if (!cursor) {
        const newCursor = document.createElement('div');
        newCursor.classList.add('custom-cursor');
        document.body.appendChild(newCursor);
    }
    
    const cursorElement = document.querySelector('.custom-cursor');
    cursorElement.style.left = e.clientX + 'px';
    cursorElement.style.top = e.clientY + 'px';
});

// カスタムカーソルのスタイル
const cursorStyle = document.createElement('style');
cursorStyle.textContent = `
    .custom-cursor {
        position: fixed;
        width: 20px;
        height: 20px;
        background: radial-gradient(circle, rgba(255, 215, 0, 0.8) 0%, transparent 70%);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        mix-blend-mode: difference;
        transition: transform 0.1s ease;
    }
    
    .custom-cursor.hover {
        transform: scale(1.5);
        background: radial-gradient(circle, rgba(255, 215, 0, 1) 0%, transparent 70%);
    }
`;
document.head.appendChild(cursorStyle);

// ホバー可能要素でのカーソル効果
const hoverElements = document.querySelectorAll('a, button, .service-card, .contact-item');
hoverElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
        const cursor = document.querySelector('.custom-cursor');
        if (cursor) {
            cursor.classList.add('hover');
        }
    });
    
    element.addEventListener('mouseleave', () => {
        const cursor = document.querySelector('.custom-cursor');
        if (cursor) {
            cursor.classList.remove('hover');
        }
    });
});

// パフォーマンス最適化のためのデバウンス関数
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// スクロールイベントのデバウンス
const debouncedScroll = debounce(() => {
    // 重い処理をここに書く場合
}, 10);

window.addEventListener('scroll', debouncedScroll);

// ページ遷移時のアニメーション
window.addEventListener('beforeunload', () => {
    document.body.style.opacity = '0';
    document.body.style.transform = 'scale(0.95)';
});

// エラーハンドリング
window.addEventListener('error', (e) => {
    console.warn('JavaScript error detected:', e.error);
});

// レスポンシブデザインの調整
function handleResize() {
    const width = window.innerWidth;
    
    if (width <= 768) {
        // モバイル向けの調整
        serviceCards.forEach(card => {
            card.style.transform = '';
        });
    }
}

window.addEventListener('resize', debounce(handleResize, 250));
handleResize(); // 初期実行

console.log('株式会社zexter ホームページが正常に読み込まれました！');