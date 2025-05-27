# Maybe Toolbox

[English](README.md) | [中文](README.cn.md)

A toolbox application built with React + TypeScript + Vite, providing various utility tools.

## Features

- 🎨 Modern UI design based on shadcn/ui
- 🌓 Light/Dark theme support
- 🌐 Internationalization (i18n) support
- 🧩 Modular design, easy to extend
- 🚀 Fast development experience with Vite

## Implemented Tools

### Jiugongge Solver
- Custom initial and target state support
- Custom image puzzle support
- Real-time solution steps and state information
- Automatic solvability check and step estimation
- Step replay and navigation support

## Tech Stack

- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **UI Components**: shadcn/ui
- **State Management**: Zustand
- **Routing**: React Router
- **Internationalization**: i18next
- **Styling**: Tailwind CSS
- **Theming**: next-themes

## Development Setup

1. Clone the repository
```bash
git clone https://github.com/yourusername/toolbox.git
cd toolbox
```

2. Install dependencies
```bash
npm install
```

3. Start development server
```bash
npm run dev
```

4. Build for production
```bash
npm run build
```

## Project Structure

```
src/
├── components/     # Shared components
│   └── ui/        # UI component library
├── contexts/      # React contexts
├── i18n/          # Internationalization config
├── lib/           # Utility functions
├── pages/         # Page components
│   └── JiugongSolver/  # Jiugongge Solver
│       ├── components/ # Components
│       ├── store/     # State management
│       ├── types/     # Type definitions
│       └── utils/     # Utility functions
└── App.tsx        # Application entry
```

## Development Guide

### Adding New Tools

1. Create a new tool directory under `src/pages`
2. Add corresponding translations in `src/i18n/locales`
3. Add tool card in `src/pages/Home.tsx`
4. Add tool route in routing configuration

### Theme Customization

The project uses shadcn/ui's theming system. You can customize the theme by modifying components under `src/components/ui`.

### Internationalization

- Translation files are located in `src/i18n/locales`
- Use `useTranslation` hook for translations
- Support dynamic language switching

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

MIT License - see [LICENSE](LICENSE) file for details

## Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) - Excellent UI component library
- [Vite](https://vitejs.dev/) - Modern frontend build tool
- [React](https://reactjs.org/) - JavaScript library for building user interfaces
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
