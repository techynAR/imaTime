<div align="center">

# 今 imaTime

**A minimal, elegant time app inspired by Japanese mindfulness.**

[![Live Demo](https://img.shields.io/badge/Live%20Demo-imatime.techynar.com-4f46e5?style=for-the-badge&logo=vercel)](https://imatime.techynar.com)
[![GitHub](https://img.shields.io/badge/GitHub-techynAR%2FimaTime-181717?style=for-the-badge&logo=github)](https://github.com/techynAR/imaTime)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=for-the-badge)](CONTRIBUTING.md)

</div>

---

## About

**imaTime** is a minimal clock application that keeps you grounded in the present moment. The name comes from **今** (*ima*), the Japanese word for *"now"* — honouring the concept of **いまここ** (*ima-koko*, "here and now") and mindful presence.

Built with React + TypeScript, imaTime lets you view the current time across any timezone with a collection of handcrafted themes — from pure OLED black to aurora borealis gradients.

**Live at:** [https://imatime.techynar.com](https://imatime.techynar.com)

---

## Features

| Feature | Description |
|---|---|
| **Real-time clock** | Live time display updating every second |
| **Seconds toggle** | Click the date to toggle seconds on/off |
| **Timezone support** | Search and select any global timezone |
| **Persist timezone** | Optionally remember your custom timezone across sessions |
| **10 themes** | OLED Black, Pure Light, Ocean Blue, Sunset Glow, Aurora Borealis, Forest Night, Desert Sand, Deep Purple, Cyber Mint, Rose Gold |
| **Minimal mode** | Hide all UI chrome for a distraction-free view |
| **Fullscreen** | One-click fullscreen for desktop clock use |
| **Focus Timer** | Built-in Pomodoro-style focus timer with customisable sessions |
| **Responsive** | Works seamlessly across desktop and mobile |

---

## Screenshots

> Visit [imatime.techynar.com](https://imatime.techynar.com) to see all themes live.

---

## Tech Stack

- **[React 18](https://react.dev/)** — UI framework
- **[TypeScript](https://www.typescriptlang.org/)** — Type safety
- **[Tailwind CSS](https://tailwindcss.com/)** — Utility-first styling
- **[Lucide React](https://lucide.dev/)** — Icon library
- **[Vite](https://vitejs.dev/)** — Build tool & dev server

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- npm v9 or higher

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/techynAR/imaTime.git
cd imaTime

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

The app will be available at `http://localhost:5173`.

### Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the Vite dev server with hot reload |
| `npm run build` | Build the production bundle to `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint across all source files |

---

## Project Structure

```
imaTime/
├── public/               # Static assets (favicon, sounds)
├── src/
│   ├── components/       # Reusable UI components
│   │   ├── FocusTimer.tsx
│   │   ├── FocusTimerSettings.tsx
│   │   ├── ThemeSelect.tsx
│   │   └── TimezoneSelect.tsx
│   ├── pages/            # Page-level components
│   │   └── FocusPage.tsx
│   ├── themes.ts         # Theme definitions
│   ├── App.tsx           # Root application component
│   ├── main.tsx          # React entry point
│   └── index.css         # Global styles
├── index.html            # HTML entry point
├── vite.config.ts        # Vite configuration
├── tailwind.config.js    # Tailwind CSS configuration
└── tsconfig.json         # TypeScript configuration
```

---

## Contributing

Contributions are welcome. Whether it's a new theme, a bug fix, a feature idea, or a documentation improvement — see **[CONTRIBUTING.md](CONTRIBUTING.md)** for guidelines.

### Quick steps

1. **Fork** this repository
2. **Create** a branch: `git checkout -b feat/your-feature-name`
3. **Commit** your changes: `git commit -m 'feat: add your feature'`
4. **Push** to your branch: `git push origin feat/your-feature-name`
5. **Open** a Pull Request

---

## Reporting Issues

Found a bug or have a feature request? Please [open an issue](https://github.com/techynAR/imaTime/issues) with:

- A clear description of the problem or suggestion
- Steps to reproduce (for bugs)
- Browser/OS information (for bugs)

---

## License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

<div align="center">

Made by [techynAR](https://github.com/techynAR)

</div>