/* ========================================
   株式会社zexter - メインスクリプト
   ======================================== */

document.addEventListener("DOMContentLoaded", () => {
  initPreloader();
  initHeader();
  initMenu();
  initScrollReveal();
  initInteractiveLogo();
  initContactForm();
  setActiveNav();
});

/* ---- プリローダー ---- */
function initPreloader() {
  const preloader = document.querySelector(".preloader");
  if (!preloader) return;

  const bar = preloader.querySelector(".preloader__bar");
  const percent = preloader.querySelector(".preloader__percent");
  let progress = 0;

  const interval = setInterval(() => {
    progress += Math.random() * 15 + 5;
    if (progress >= 100) {
      progress = 100;
      clearInterval(interval);
      setTimeout(() => {
        preloader.classList.add("hidden");
        document.body.style.overflow = "";
      }, 400);
    }
    if (bar) bar.style.width = progress + "%";
    if (percent) percent.textContent = Math.floor(progress) + "%";
  }, 100);

  document.body.style.overflow = "hidden";
}

/* ---- ヘッダースクロール ---- */
function initHeader() {
  const header = document.querySelector(".header");
  if (!header) return;

  window.addEventListener("scroll", () => {
    header.classList.toggle("scrolled", window.scrollY > 50);
  });
}

/* ---- フルスクリーンメニュー ---- */
function initMenu() {
  const menuBtn = document.querySelector(".menu-btn");
  const navOverlay = document.querySelector(".nav-overlay");
  const closeBtn = document.querySelector(".nav-overlay__close-btn");
  if (!menuBtn || !navOverlay) return;

  const toggle = () => {
    const isOpen = navOverlay.classList.toggle("open");
    menuBtn.classList.toggle("active", isOpen);
    document.body.classList.toggle("menu-open", isOpen);
    menuBtn.setAttribute("aria-label", isOpen ? "メニューを閉じる" : "メニューを開く");
  };

  menuBtn.addEventListener("click", toggle);

  if (closeBtn) {
    closeBtn.addEventListener("click", toggle);
  }

  navOverlay.addEventListener("click", (e) => {
    if (e.target === navOverlay) toggle();
  });

  navOverlay.querySelectorAll(".nav-overlay__link").forEach((link) => {
    link.addEventListener("click", () => {
      if (navOverlay.classList.contains("open")) toggle();
    });
  });
}

/* ---- スクロール表示アニメーション ---- */
function initScrollReveal() {
  const reveals = document.querySelectorAll(".reveal");
  if (!reveals.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -50px 0px" }
  );

  reveals.forEach((el) => observer.observe(el));
}

/* ---- インタラクティブロゴ ---- */
function initInteractiveLogo() {
  const logo = document.querySelector(".interactive-logo");
  if (!logo) return;

  const text = logo.querySelector(".interactive-logo__text");
  let clickCount = 0;
  const colors = ["#c9a227", "#e8d48b", "#9a7b1a", "#0a0a0a"];

  logo.addEventListener("click", () => {
    clickCount++;
    const span = text.querySelector("span");
    const scale = 1 + clickCount * 0.02;
    const limitBreak = clickCount >= 5;

    if (span) {
      span.style.color = colors[clickCount % colors.length];
      span.style.transform = `rotate(${clickCount * 15}deg) scale(1.2)`;
    }

    // transform のみ使用（letter-spacing はレイアウト幅を変えてヘッダーがずれる原因になる）
    text.style.transform = limitBreak
      ? `scale(${scale}) scaleX(1.15)`
      : `scale(${scale})`;

    if (limitBreak) {
      const hint = logo.querySelector(".interactive-logo__hint");
      if (hint) hint.textContent = "LIMIT BREAK!";
    }
  });
}

/* ---- お問い合わせフォーム ---- */
function initContactForm() {
  const form = document.querySelector(".contact-form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const originalText = btn.innerHTML;
    btn.innerHTML = "送信中...";
    btn.disabled = true;

    setTimeout(() => {
      btn.innerHTML = "送信完了 ✓";
      btn.style.background = "#c9a227";
      form.reset();

      setTimeout(() => {
        btn.innerHTML = originalText;
        btn.disabled = false;
        btn.style.background = "";
      }, 3000);
    }, 1500);
  });
}

/* ---- 現在のページをナビに反映 ---- */
function setActiveNav() {
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-overlay__link, .footer__nav-list a").forEach((link) => {
    const href = link.getAttribute("href");
    if (href === currentPage || (currentPage === "" && href === "index.html")) {
      link.classList.add("active");
    }
  });
}
