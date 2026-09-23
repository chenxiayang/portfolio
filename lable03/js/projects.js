/* ==========================================================================
   projects.js — 项目数据（数据与视图分离）
   --------------------------------------------------------------------------
   新增项目：在数组末尾追加一条对象，layout 从以下类型中选一个：
     "cover"  封面式 | "split" 左右分栏 | "text" 文字主导
     "banner" 全宽横幅 | "offset" 图文错位
   图片使用内联 SVG 抽象假图（images[].svg），与页面配色统一，
   不使用外部图片或生成 API。无需修改 HTML / CSS。
   ========================================================================== */

const PROJECTS = [
  {
    id: "keyutong",
    title: "课语通",
    summary: "基于大语言模型的课程问答助手。",
    detail:
      "课语通是一个面向课程复习场景的 AI 问答助手。用户上传课程资料后，系统能够建立知识索引，并根据课程内容回答问题，同时提供引用出处和知识点小测，帮助学生快速复习和整理课程重点。项目亮点：结合 RAG 与课程资料，降低模型泛化回答带来的偏差；引用出处增强可信度；小测功能贴近真实复习场景。",
    tech: ["Python", "FastAPI", "RAG", "向量检索", "大语言模型 API", "Streamlit"],
    date: "2026.07",
    category: "AI 应用 / 教育工具",
    tags: ["AI 应用", "教育工具"],
    layout: "text",
    images: [
      {
        alt: "课语通抽象示意图：课程资料、知识索引与问答流程",
        svg: `
<svg viewBox="0 0 300 400" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="课语通抽象示意图">
  <rect width="300" height="400" fill="#f4f1ea"/>
  <circle cx="256" cy="52" r="104" fill="#1d3a2f"/>
  <circle cx="46" cy="344" r="78" fill="#e8442e" opacity="0.92"/>
  <rect x="48" y="58" width="150" height="192" fill="#ffffff" stroke="#d8d2c4"/>
  <rect x="66" y="82" width="92" height="8" fill="#17150f"/>
  <rect x="66" y="106" width="114" height="5" fill="#d8d2c4"/>
  <rect x="66" y="120" width="114" height="5" fill="#d8d2c4"/>
  <rect x="66" y="134" width="80" height="5" fill="#d8d2c4"/>
  <rect x="66" y="158" width="114" height="5" fill="#d8d2c4"/>
  <rect x="66" y="172" width="96" height="5" fill="#d8d2c4"/>
  <rect x="66" y="196" width="114" height="5" fill="#d8d2c4"/>
  <path d="M198 148 H242 V206" stroke="#17150f" stroke-width="2" fill="none"/>
  <circle cx="242" cy="218" r="12" fill="#e8442e"/>
  <path d="M123 250 V298 H196" stroke="#17150f" stroke-width="2" fill="none"/>
  <circle cx="208" cy="298" r="8" fill="#1d3a2f"/>
  <circle cx="240" cy="298" r="8" fill="#17150f"/>
  <circle cx="272" cy="298" r="8" fill="#e8442e"/>
</svg>`,
      },
    ],
  },
  {
    id: "city-pulse",
    title: "城市脉搏",
    summary: "城市实时交通与天气数据可视化大屏。",
    detail:
      "城市脉搏用于集中展示交通、天气和城市运行信息。项目通过多数据源轮询聚合数据，并结合 SVG 图表、Canvas 粒子地图和响应式布局实现大屏可视化展示。项目亮点：多数据源聚合、Canvas 粒子地图增强视觉表现、响应式布局适配不同屏幕、实时感与数据密度兼顾。",
    tech: ["TypeScript", "HTML/CSS", "Canvas", "SVG", "ECharts"],
    date: "2026.03",
    category: "数据可视化 / 城市大屏",
    tags: ["数据可视化"],
    layout: "cover",
    images: [
      {
        alt: "城市脉搏抽象示意图：粒子地图与数据曲线",
        svg: `
<svg viewBox="0 0 840 360" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="城市脉搏抽象示意图">
  <rect width="840" height="360" fill="#1d3a2f"/>
  <defs>
    <pattern id="pulse-dots" width="28" height="28" patternUnits="userSpaceOnUse">
      <circle cx="4" cy="4" r="2" fill="#f4f1ea" opacity="0.22"/>
    </pattern>
  </defs>
  <rect x="60" y="40" width="720" height="280" fill="url(#pulse-dots)"/>
  <rect x="60" y="40" width="180" height="10" fill="#f4f1ea" opacity="0.85"/>
  <rect x="60" y="64" width="120" height="6" fill="#f4f1ea" opacity="0.4"/>
  <path d="M60 268 C 180 188, 260 308, 380 208 S 620 128, 780 168" stroke="#e8442e" stroke-width="4" fill="none"/>
  <polyline points="560,304 600,264 640,284 680,224 720,244 760,184" stroke="#f4f1ea" stroke-width="3" fill="none"/>
  <circle cx="380" cy="208" r="10" fill="#e8442e"/>
  <circle cx="200" cy="238" r="6" fill="#f4f1ea"/>
  <circle cx="620" cy="150" r="6" fill="#f4f1ea"/>
  <circle cx="760" cy="184" r="8" fill="#f4f1ea"/>
</svg>`,
      },
    ],
  },
  {
    id: "shiguang-market",
    title: "拾光集市",
    summary: "面向校园场景的二手交易平台。",
    detail:
      "拾光集市提供商品发布、关键词检索、站内私信和信用评分等功能。从需求梳理、界面设计到主要接口开发均独立完成，上线测试后累计注册用户超过 300 人。项目亮点：完整业务闭环、真实用户测试、300+ 注册用户、从需求到上线独立推进。",
    tech: ["Java", "Spring Boot", "MySQL", "TypeScript", "Vue"],
    date: "2025.09",
    category: "校园平台 / Web 应用",
    tags: ["Web 应用", "校园平台"],
    layout: "banner",
    images: [
      {
        alt: "拾光集市抽象示意图：商品卡片网格与信用评分",
        svg: `
<svg viewBox="0 0 400 400" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="拾光集市抽象示意图">
  <rect width="400" height="400" fill="#f4f1ea"/>
  <rect x="40" y="40" width="150" height="150" fill="#1d3a2f"/>
  <rect x="210" y="40" width="150" height="90" fill="#ffffff" stroke="#d8d2c4"/>
  <rect x="228" y="62" width="80" height="7" fill="#17150f"/>
  <rect x="228" y="80" width="114" height="5" fill="#d8d2c4"/>
  <rect x="210" y="150" width="150" height="40" fill="#e8442e"/>
  <rect x="40" y="210" width="90" height="150" fill="#ffffff" stroke="#d8d2c4"/>
  <circle cx="160" cy="285" r="55" fill="#e8442e" opacity="0.9"/>
  <rect x="210" y="210" width="150" height="150" fill="#17150f"/>
  <circle cx="285" cy="285" r="34" fill="none" stroke="#f4f1ea" stroke-width="3"/>
  <path d="M285 265 V285 L301 296" stroke="#f4f1ea" stroke-width="3" fill="none"/>
</svg>`,
      },
    ],
  },
  {
    id: "light-ledger",
    title: "轻记账",
    summary: "面向日常生活场景的极简记账微信小程序。",
    detail:
      "轻记账重点解决快速记录和查看个人收支的问题，支持语音快捷记账、月度收支统计和预算提醒，并使用微信云开发完成数据存储与后端能力。项目亮点：语音记账降低记录成本、极简交互适合日常高频使用、云开发减少后端搭建成本。",
    tech: ["TypeScript", "微信小程序", "微信云开发", "ECharts"],
    date: "2025.04",
    category: "效率工具 / 微信小程序",
    tags: ["微信小程序", "效率工具"],
    layout: "split",
    images: [
      {
        alt: "轻记账抽象示意图：手机界面与月度收支统计",
        svg: `
<svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="轻记账抽象示意图">
  <rect width="400" height="300" fill="#f4f1ea"/>
  <circle cx="336" cy="52" r="72" fill="#1d3a2f"/>
  <rect x="50" y="30" width="120" height="240" rx="18" fill="#ffffff" stroke="#17150f" stroke-width="2"/>
  <rect x="66" y="52" width="60" height="8" fill="#17150f"/>
  <rect x="66" y="74" width="88" height="5" fill="#d8d2c4"/>
  <rect x="66" y="86" width="70" height="5" fill="#d8d2c4"/>
  <circle cx="110" cy="140" r="26" fill="#e8442e"/>
  <path d="M100 140 h20 M110 130 v20" stroke="#ffffff" stroke-width="3"/>
  <rect x="66" y="196" width="16" height="44" fill="#1d3a2f"/>
  <rect x="90" y="212" width="16" height="28" fill="#e8442e"/>
  <rect x="114" y="188" width="16" height="52" fill="#17150f"/>
  <rect x="138" y="222" width="16" height="18" fill="#d8d2c4"/>
  <path d="M212 130 C 250 96, 272 158, 322 116" stroke="#e8442e" stroke-width="3" fill="none"/>
  <circle cx="322" cy="116" r="6" fill="#e8442e"/>
</svg>`,
      },
    ],
  },
];
