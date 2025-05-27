# Maybe Toolbox

[English](README.md) | [中文](README.cn.md)

一个基于 React + TypeScript + Vite 构建的工具箱应用，提供各种实用工具。

## 功能特性

- 🎨 基于 shadcn/ui 的现代化 UI 设计
- 🌓 支持亮色/暗色主题切换
- 🌐 支持中英文国际化
- 🧩 模块化设计，易于扩展
- 🚀 基于 Vite 的快速开发体验

## 已实现工具

### 九宫格求解器 (Jiugongge Solver)
- 支持自定义初始状态和目标状态
- 支持自定义图片拼图
- 实时显示解题步骤和状态信息
- 自动计算可解性和预计步数
- 支持步骤回放和导航

## 技术栈

- **框架**: React 18 + TypeScript
- **构建工具**: Vite
- **UI 组件**: shadcn/ui
- **状态管理**: Zustand
- **路由**: React Router
- **国际化**: i18next
- **样式**: Tailwind CSS
- **主题**: next-themes

## 开发环境设置

1. 克隆仓库
```bash
git clone https://github.com/yourusername/toolbox.git
cd toolbox
```

2. 安装依赖
```bash
npm install
```

3. 启动开发服务器
```bash
npm run dev
```

4. 构建生产版本
```bash
npm run build
```

## 项目结构

```
src/
├── components/     # 共享组件
│   └── ui/        # UI 组件库
├── contexts/      # React 上下文
├── i18n/          # 国际化配置
├── lib/           # 工具函数
├── pages/         # 页面组件
│   └── JiugongSolver/  # 九宫格求解器
│       ├── components/ # 组件
│       ├── store/     # 状态管理
│       ├── types/     # 类型定义
│       └── utils/     # 工具函数
└── App.tsx        # 应用入口
```

## 开发指南

### 添加新工具

1. 在 `src/pages` 下创建新的工具目录
2. 在 `src/i18n/locales` 中添加对应的翻译
3. 在 `src/pages/Home.tsx` 中添加工具卡片
4. 在路由配置中添加新工具的路由

### 主题定制

项目使用 shadcn/ui 的主题系统，可以通过修改 `src/components/ui` 下的组件来自定义主题。

### 国际化

- 翻译文件位于 `src/i18n/locales`
- 使用 `useTranslation` hook 进行翻译
- 支持动态切换语言

## 贡献指南

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建 Pull Request

## 许可证

MIT License - 详见 [LICENSE](LICENSE) 文件

## 致谢

- [shadcn/ui](https://ui.shadcn.com/) - 优秀的 UI 组件库
- [Vite](https://vitejs.dev/) - 现代前端构建工具
- [React](https://reactjs.org/) - 用于构建用户界面的 JavaScript 库
- [Tailwind CSS](https://tailwindcss.com/) - 实用优先的 CSS 框架
