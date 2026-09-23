(() => {
  'use strict';

  /* ---------- 数据 ---------- */
  const projects = [
    { emoji: '🛒', title: '云商城前端', desc: '高度复用的组件化电商前端，含购物车、状态管理与响应式布局，移动端体验流畅。', tags: ['React', 'TypeScript', 'Redux'] },
    { emoji: '📊', title: '数据可视化仪表盘', desc: '实时数据看板，丰富的图表与酷炫动效，帮助团队一眼掌握业务关键指标。', tags: ['Vue', 'ECharts', 'Node'] },
    { emoji: '🤖', title: 'AI 写作助手', desc: '接入大语言模型的写作增强工具，支持大纲生成、风格改写与一键润色。', tags: ['Next.js', 'OpenAI', 'Tailwind'] },
    { emoji: '📱', title: '全栈打卡应用', desc: '从数据库到前端的完整闭环应用，含用户系统、日程管理与推送提醒。', tags: ['React', 'Express', 'MongoDB'] },
    { emoji: '🌿', title: '组件库 Kit', desc: '自研轻量 UI 组件库，开箱即用、主题可定制，已在多个内部项目落地。', tags: ['TypeScript', 'CSS'] },
    { emoji: '⏱️', title: '番茄工作法工具', desc: '极简专注计时器，兼顾设计美学与效率，支持统计与目标追踪。', tags: ['Vue', 'LocalStorage'] },
  ];

  const skills = [
    { icon: '🟨', name: 'JavaScript / TS' },
    { icon: '⚛️', name: 'React / Vue' },
    { icon: '🎨', name: 'CSS / 动效' },
    { icon: '🟩', name: 'Node.js' },
    { icon: '🗄️', name: '数据库' },
    { icon: '🚀', name: '构建优化' },
    { icon: '🐙', name: 'Git / CI' },
    { icon: '🪜', name: 'UI 设计' },
  ];

  /* ---------- 渲染项目与技能 ---------- */
  const projectsGrid = document.getElementById('projectsGrid');
  projectsGrid.innerHTML = projects.map(p => `
    <article class="project-card" data-reveal>
      <span class="project-emoji">${p.emoji}</span>
      <h3>${p.title}</h3>
      <p>${p.desc}</p>
      <div class="project-tags">${p.tags.map(t => `<span>${t}</span>`).join('')}</div>
      <a class="project-link" href="#projects">查看案例 <span class="arrow">→</span></a>
    </article>
  `).join('');

  const skillsList = document.getElementById('skillsList');
  skillsList.innerHTML = skills.map(s => `
    <div class="skill-item" data-reveal>
      <span class="skill-icon">${s.icon}</span>
      <span class="skill-name">${s.name}</span>
    </div>
  `).join('');

  /* ---------- 导航滚动样式 ---------- */
  const nav = document.getElementById('nav');
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 40);
  window.addEventListener('scroll', onScroll);
  onScroll();

  /* ---------- 移动端菜单 ---------- */
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  navToggle.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    navToggle.classList.toggle('open', open);
    navToggle.setAttribute('aria-expanded', open);
  });
  navLinks.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navToggle.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    })
  );

  /* ---------- 滚动区块高亮 ---------- */
  const sections = ['home', 'projects', 'skills', 'about', 'contact']
    .map(id => document.getElementById(id));
  onScroll; // no-op guard
  const linkEls = document.querySelectorAll('.nav-link[data-section]');
  const highlight = () => {
    const pos = window.scrollY + 120;
    let current = 'home';
    sections.forEach(sec => { if (sec.offsetTop <= pos) current = sec.id; });
    linkEls.forEach(l => l.classList.toggle('active', l.dataset.section === current));
  };
  window.addEventListener('scroll', highlight);
  highlight();

  /* ---------- 滚动入场动效 ---------- */
  const revealEls = document.querySelectorAll('[data-reveal]');
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in-view'); io.unobserve(e.target); } });
  }, { threshold: 0.12 });
  revealEls.forEach(el => io.observe(el));

  /* ---------- 联系表单 ---------- */
  const form = document.getElementById('contactForm');
  const note = document.getElementById('formNote');
  form.addEventListener('submit', e => {
    e.preventDefault();
    // 静态站点：模拟提交成功反馈
    const name = form.name.value.trim();
    note.textContent = `谢谢 ${name || '你'} 的留言，我会尽快回复你！🎉`;
    note.className = 'form-note ok';
    form.reset();
    setTimeout(() => { note.textContent = ''; note.className = 'form-note'; }, 4800);
  });

  /* ---------- 页脚年份 ---------- */
  document.getElementById('year').textContent = new Date().getFullYear();
})();