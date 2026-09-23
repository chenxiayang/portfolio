# 陈堯 · 软件工程作品集

一个基于原生 HTML / CSS / JavaScript 开发的个人作品集单页网站，展示项目作品、技能结构与联系方式，支持浅色 / 深色主题切换与移动端适配。

## 功能特性

- **项目作品展示**：项目数据与视图分离，卡片由 `js/projects.js` 数据自动渲染，支持 cover / split / text / banner / offset 五种布局，配图使用内联 SVG 抽象图，与页面配色统一。
- **类别筛选**：根据项目数据自动生成筛选按钮，可按类别（AI 应用、数据可视化、校园平台、微信小程序等）过滤项目卡片。
- **主题切换**：导航栏右侧按钮一键切换浅色 / 深色主题，选择保存在 `localStorage`；首次访问跟随系统 `prefers-color-scheme`；初始化脚本内联在 `<head>` 中执行，避免首屏闪烁（FOUC）。
- **响应式布局**：兼容桌面端与移动端，移动端提供汉堡菜单。
- **交互细节**：锚点平滑滚动（补偿固定头部高度）、滚动时导航高亮、基于 IntersectionObserver 的滚动显现动画，并尊重 `prefers-reduced-motion` 设置。
- **无障碍支持**：主题按钮、菜单等均带有 `aria-pressed` / `aria-expanded` / `aria-label` 等语义属性。

## 技术栈

| 类别 | 技术 |
| --- | --- |
| 结构 | 原生 HTML5 |
| 样式 | 原生 CSS3（CSS 自定义属性管理主题色，按职责拆分为 base / layout / components / projects / responsive 五个文件） |
| 逻辑 | 原生 JavaScript（ES6+，无框架、无第三方库） |

## 项目结构

```
lable04/
├── index.html          # 页面入口（含主题初始化内联脚本）
├── css/
│   ├── base.css        # Reset、设计变量、全局排版、主题色
│   ├── layout.css      # 页面布局
│   ├── components.css  # 通用组件样式
│   ├── projects.css    # 项目卡片样式
│   └── responsive.css  # 移动端适配
└── js/
    ├── projects.js     # 项目数据（新增项目只需追加数据对象）
    └── main.js         # 渲染、筛选、菜单、滚动、主题切换等交互逻辑
```

## 运行方式

纯静态站点，无需构建、无依赖：

1. 直接用浏览器打开 `index.html` 即可；
2. 或使用任意静态服务器（推荐，避免部分浏览器对本地文件的限制）：

```bash
# 方式一：Python
python -m http.server 8000

# 方式二：Node.js
npx serve .
```

然后访问 `http://localhost:8000`。

## 主要页面区块

- **介绍（#intro）**：个人简介与技能标签；
- **项目作品（#works）**：精选项目卡片 + 类别筛选（当前包含课语通、城市脉搏、拾光集市、轻记账四个项目）；
- **关于我（#about）**：技能结构与做事方式、目标；
- **联系方式（#contact）**：邮箱、GitHub、微信等。
