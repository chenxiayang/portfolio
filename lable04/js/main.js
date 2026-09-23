/* ==========================================================================
   main.js — 渲染项目、移动菜单、平滑滚动、导航高亮、类别筛选、滚动显现
   ========================================================================== */

(function () {
  "use strict";

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- 1. 渲染项目 ---------- */
  const worksGrid = document.getElementById("works-grid");

  function esc(str) {
    return String(str).replace(/[&<>"']/g, (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c])
    );
  }

  function metaHTML(p, index) {
    return `
      <div class="project-meta">
        <span class="project-index">${String(index + 1).padStart(2, "0")}</span>
        <span class="project-category">${esc(p.category)}</span>
        <span class="project-date">${esc(p.date)}</span>
      </div>`;
  }

  function infoHTML(p) {
    const links = [];
    if (p.links && p.links.demo) links.push(`<a class="link-arrow" href="${esc(p.links.demo)}" target="_blank" rel="noopener">在线演示 ↗</a>`);
    if (p.links && p.links.repo) links.push(`<a class="link-arrow" href="${esc(p.links.repo)}" target="_blank" rel="noopener">源代码 ↗</a>`);

    return `
      <div class="project-info">
        <h3 class="project-title">${esc(p.title)}</h3>
        ${p.tags && p.tags.length
          ? `<ul class="tech-tags project-tags">${p.tags.map((t) => `<li>${esc(t)}</li>`).join("")}</ul>`
          : ""}
        ${p.layout === "text" ? `
          <div class="project-body">
            <p class="project-summary">${esc(p.summary)}</p>
            <p class="project-detail">${esc(p.detail)}</p>
          </div>` : `
          <p class="project-summary">${esc(p.summary)}</p>
          <p class="project-detail">${esc(p.detail)}</p>`}
        <hr class="rule">
        <ul class="tech-tags">${p.tech.map((t) => `<li>${esc(t)}</li>`).join("")}</ul>
        ${links.length ? `<div class="project-links">${links.join("")}</div>` : ""}
      </div>`;
  }

  function mediaHTML(img, cls = "project-media") {
    if (!img) return "";
    // 内联 SVG 抽象图（数据中的 svg 字段），否则回退到外部图片
    const media = img.svg
      ? img.svg.trim()
      : `<img src="${esc(img.src)}" alt="${esc(img.alt)}" loading="lazy">`;
    return `
      <figure class="${cls}">
        ${media}
      </figure>`;
  }

  function projectHTML(p, index) {
    const main = p.images && p.images[0];
    const secondary = p.layout === "offset" && p.images && p.images[1] ? p.images[1] : null;

    let inner;
    switch (p.layout) {
      case "cover":
        inner = `${mediaHTML(main)}${metaHTML(p, index)}${infoHTML(p)}`;
        break;
      case "banner":
        inner = `${metaHTML(p, index)}${infoHTML(p)}${mediaHTML(main)}`;
        break;
      case "offset":
        inner = `${metaHTML(p, index)}${mediaHTML(main)}${secondary ? mediaHTML(secondary, "project-media-secondary") : ""}${infoHTML(p)}`;
        break;
      default: // split / text
        inner = `${metaHTML(p, index)}${mediaHTML(main)}${infoHTML(p)}`;
    }

    return `<article class="project project--${esc(p.layout)}" data-category="${esc(p.category)}">${inner}</article>`;
  }

  function render() {
    if (!worksGrid || !Array.isArray(PROJECTS)) return;
    worksGrid.innerHTML = PROJECTS.map(projectHTML).join("");

    // split 布局奇偶交替镜像，形成杂志节奏
    const splits = worksGrid.querySelectorAll(".project--split");
    splits.forEach((el, i) => {
      if (i % 2 === 1) el.classList.add("is-mirrored");
    });

    // 新渲染的 .reveal 元素需要重新观察
    observeReveals();
  }

  /* ---------- 2. 类别筛选 ---------- */
  const filterBar = document.getElementById("filter-bar");

  function buildFilters() {
    if (!filterBar || !Array.isArray(PROJECTS)) return;
    const categories = ["全部", ...new Set(PROJECTS.map((p) => p.category))];
    filterBar.innerHTML = categories
      .map(
        (c, i) =>
          `<button class="filter-btn${i === 0 ? " is-active" : ""}" data-filter="${esc(c)}">${esc(c)}</button>`
      )
      .join("");

    filterBar.addEventListener("click", (e) => {
      const btn = e.target.closest(".filter-btn");
      if (!btn) return;
      filterBar.querySelectorAll(".filter-btn").forEach((b) => b.classList.remove("is-active"));
      btn.classList.add("is-active");
      const target = btn.dataset.filter;
      worksGrid.querySelectorAll(".project").forEach((card) => {
        card.hidden = target !== "全部" && card.dataset.category !== target;
      });
    });
  }

  /* ---------- 3. 移动端菜单 ---------- */
  const menuToggle = document.getElementById("menu-toggle");
  const siteNav = document.getElementById("site-nav");

  function closeMenu() {
    if (!menuToggle || !siteNav) return;
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "打开菜单");
    siteNav.classList.remove("is-open");
    document.body.style.overflow = "";
  }

  if (menuToggle && siteNav) {
    menuToggle.addEventListener("click", () => {
      const open = menuToggle.getAttribute("aria-expanded") === "true";
      menuToggle.setAttribute("aria-expanded", String(!open));
      menuToggle.setAttribute("aria-label", open ? "打开菜单" : "关闭菜单");
      siteNav.classList.toggle("is-open", !open);
      document.body.style.overflow = open ? "" : "hidden";
    });

    siteNav.addEventListener("click", (e) => {
      if (e.target.closest("a")) closeMenu();
    });
  }

  /* ---------- 4. 平滑滚动（补偿固定头部高度） ---------- */
  document.addEventListener("click", (e) => {
    const link = e.target.closest('a[href^="#"]');
    if (!link) return;
    const id = link.getAttribute("href").slice(1);
    const target = id && document.getElementById(id);
    if (!target) return;

    e.preventDefault();
    const headerH = parseFloat(
      getComputedStyle(document.documentElement).getPropertyValue("--header-h")
    ) * 16 || 72;
    const top = target.getBoundingClientRect().top + window.scrollY - headerH;

    window.scrollTo({
      top: id === "intro" ? 0 : top,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
    history.replaceState(null, "", "#" + id);
  });

  /* ---------- 5. 导航高亮 + 头部滚动状态 ---------- */
  const header = document.getElementById("site-header");
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = ["intro", "works", "about", "contact"]
    .map((id) => document.getElementById(id))
    .filter(Boolean);

  function syncNav() {
    if (header) header.classList.toggle("is-scrolled", window.scrollY > 8);
    if (!sections.length || !navLinks.length) return;

    const probe = window.scrollY + window.innerHeight * 0.35;
    let currentId = sections[0].id;
    for (const sec of sections) {
      if (sec.offsetTop <= probe) currentId = sec.id;
    }
    navLinks.forEach((l) =>
      l.classList.toggle("is-active", l.dataset.section === currentId)
    );
  }

  let ticking = false;
  window.addEventListener("scroll", () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      syncNav();
      ticking = false;
    });
  }, { passive: true });

  /* ---------- 6. 滚动显现 ---------- */
  let revealObserver = null;

  function observeReveals() {
    const items = document.querySelectorAll(".reveal:not(.is-visible)");
    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
      items.forEach((el) => el.classList.add("is-visible"));
      return;
    }
    if (!revealObserver) {
      revealObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              revealObserver.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.15 }
      );
    }
    items.forEach((el) => revealObserver.observe(el));
  }

  /* ---------- 7. 主题切换 ---------- */
  const themeToggle = document.getElementById("theme-toggle");
  const root = document.documentElement;

  function syncThemeButton(theme) {
    if (!themeToggle) return;
    const isDark = theme === "dark";
    themeToggle.setAttribute("aria-pressed", String(isDark));
    themeToggle.setAttribute("aria-label", isDark ? "切换为浅色主题" : "切换为深色主题");
  }

  syncThemeButton(root.getAttribute("data-theme") === "dark" ? "dark" : "light");

  if (themeToggle) {
    let transitionTimer = null;

    themeToggle.addEventListener("click", () => {
      const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";

      // 切换瞬间启用过渡类，结束后移除，避免长期 transition 影响性能
      root.classList.add("theme-transition");
      root.setAttribute("data-theme", next);

      try { localStorage.setItem("theme", next); } catch (e) {}
      syncThemeButton(next);

      clearTimeout(transitionTimer);
      transitionTimer = setTimeout(() => {
        root.classList.remove("theme-transition");
      }, 300);
    });
  }

  /* ---------- 启动 ---------- */
  render();
  buildFilters();
  syncNav();
})();
