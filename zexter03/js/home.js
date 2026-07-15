/* Home-only: intro + orbit parallax */

(() => {
  const intro = document.querySelector(".intro");
  if (intro) {
    const seen = sessionStorage.getItem("zexter-intro");
    if (seen) {
      intro.classList.add("is-done");
    } else {
      setTimeout(() => {
        intro.classList.add("is-done");
        sessionStorage.setItem("zexter-intro", "1");
      }, 2400);
    }
  }

  const constellation = document.querySelector(".constellation");
  if (!constellation) return;
  if (matchMedia("(hover: none), (pointer: coarse)").matches) return;
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const nodes = constellation.querySelectorAll(".orbit-node");
  constellation.addEventListener("mousemove", (e) => {
    const rect = constellation.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    nodes.forEach((node, i) => {
      const depth = (i % 3) * 6 + 8;
      const base = getComputedStyle(node).getPropertyValue("--a") || "0deg";
      node.style.transform = `rotate(${base}) translateY(calc(min(210px, 39vw) * -1)) rotate(calc(${base} * -1)) translate(${nx * depth}px, ${ny * depth}px)`;
    });
  });

  constellation.addEventListener("mouseleave", () => {
    nodes.forEach((node) => {
      node.style.transform = "";
    });
  });
})();
