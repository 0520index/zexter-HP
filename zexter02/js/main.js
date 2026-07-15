/* ========================================
   株式会社 zexter — 共通の動き
   ・ハンバーガーメニュー
   ・スクロールで要素が浮かび上がる
   ・お問い合わせフォームの仮送信
   ======================================== */

(function () {
  // ---------- ハンバーガーメニュー（スマホ用） ----------
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav");

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      const open = nav.classList.toggle("is-open");
      toggle.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });

    // メニュー内のリンクを押したら閉じる
    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("is-open");
        toggle.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // ---------- スクロールで .reveal を表示 ----------
  const reveals = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    reveals.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    // 古いブラウザ向け：すぐ表示
    reveals.forEach(function (el) {
      el.classList.add("is-visible");
    });
  }

  // ---------- 現在のページに合わせてナビをハイライト ----------
  const page = document.body.dataset.page;
  if (page) {
    document.querySelectorAll(".nav a[data-nav]").forEach(function (link) {
      if (link.dataset.nav === page) {
        link.classList.add("is-active");
      }
    });
  }

  // ---------- お問い合わせフォーム（学習用：画面上に完了メッセージ） ----------
  const form = document.querySelector("#contact-form");
  const success = document.querySelector("#form-success");

  if (form && success) {
    form.addEventListener("submit", function (event) {
      event.preventDefault(); // 本物の送信はしない（初心者向けデモ）

      // かんたんチェック
      const name = form.querySelector("#name");
      const email = form.querySelector("#email");
      const message = form.querySelector("#message");

      if (!name.value.trim() || !email.value.trim() || !message.value.trim()) {
        alert("お名前・メールアドレス・お問い合わせ内容は必須です。");
        return;
      }

      success.classList.add("is-show");
      form.reset();

      // 本番ではここにメール送信や Peatix などの連携を入れます
    });
  }

  // ---------- ヒーローパネルのスキャンライン位置を少しランダムに ----------
  const scan = document.querySelector(".hero-scan");
  if (scan) {
    scan.style.animationDuration = 3 + Math.random() * 1.5 + "s";
  }
})();
