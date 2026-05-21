# Contributing to imaTime

Thank you for your interest in contributing to **imaTime**.  
All contributions — big or small — are welcome.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Code Style & Conventions](#code-style--conventions)
- [How to Contribute](#how-to-contribute)
  - [Reporting Bugs](#reporting-bugs)
  - [Suggesting Features](#suggesting-features)
  - [Adding a New Theme](#adding-a-new-theme)
  - [Submitting a Pull Request](#submitting-a-pull-request)
- [Commit Message Format](#commit-message-format)
- [License](#license)

---

## Code of Conduct

Please be respectful and considerate in all interactions. We follow a simple rule: **treat others the way you want to be treated**.

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18+
- npm v9+
- Git

### Setup

```bash
# 1. Fork the repo on GitHub, then clone your fork
git clone https://github.com/<your-username>/imaTime.git
cd imaTime

# 2. Add the upstream remote
git remote add upstream https://github.com/techynAR/imaTime.git

# 3. Install dependencies
npm install

# 4. Start the dev server
npm run dev
```

---

## Development Workflow

1. **Sync your fork** before starting work:
   ```bash
   git fetch upstream
   git checkout main
   git merge upstream/main
   ```

2. **Create a feature branch** from `main`:
   ```bash
   git checkout -b feat/your-feature-name
   # or for a bug fix:
   git checkout -b fix/issue-description
   ```

3. **Make your changes**, run the linter before committing:
   ```bash
   npm run lint
   ```

4. **Commit** with a clear message (see [Commit Message Format](#commit-message-format)).

5. **Push** your branch and open a Pull Request against `main` on the upstream repo.

---

## Code Style & Conventions

- **TypeScript**: All new files should be `.tsx` / `.ts`. Avoid `any`.
- **Components**: Use functional components with typed props interfaces.
- **Naming**: PascalCase for components, camelCase for functions/variables.
- **Tailwind CSS**: Use Tailwind utility classes. Do not introduce inline styles unless absolutely necessary.
- **Imports**: Group imports — React first, then libraries, then local modules.
- **No unused variables**: Keep code clean; ESLint will catch these.

---

## How to Contribute

### Reporting Bugs

Open an [issue](https://github.com/techynAR/imaTime/issues) and include:

- Steps to reproduce
- Expected vs actual behaviour
- Browser name & version, OS

### Suggesting Features

Open an [issue](https://github.com/techynAR/imaTime/issues) with the `enhancement` label and describe:

- The problem you're solving
- Your proposed solution
- Any alternatives you considered

### Adding a New Theme

Themes live in [`src/themes.ts`](src/themes.ts). Each theme is a simple object:

```typescript
'Your Theme Name': {
  bg: 'bg-...',          // Tailwind background class (solid or gradient)
  text: 'text-...',      // Primary text colour
  accent: 'text-...',    // Accent / highlight colour
  secondary: 'text-...', // Secondary / muted text colour
  hover: 'hover:text-...' // Hover state colour
}
```

**Guidelines for new themes:**
- Ensure sufficient contrast between `bg` and `text` for accessibility (WCAG AA minimum).
- Use a descriptive, evocative name (e.g. *Midnight Sakura*, *Arctic Dawn*).
- Test the theme across all UI elements (clock, settings panel, dropdowns).

### Submitting a Pull Request

- Keep PRs focused — one feature or fix per PR.
- Link the relevant issue in the PR description (`Closes #123`).
- Make sure `npm run lint` passes with no errors.
- Add a short description of what changed and why.
- Screenshots or screen recordings are greatly appreciated for UI changes.

---

## Commit Message Format

We follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>: <short description>
```

| Type | When to use |
|---|---|
| `feat` | A new feature |
| `fix` | A bug fix |
| `chore` | Build process, dependency updates |
| `docs` | Documentation changes only |
| `style` | Formatting, no logic changes |
| `refactor` | Code restructuring, no feature/fix |
| `perf` | Performance improvements |

**Examples:**
```
feat: add Rose Quartz theme
fix: timezone not persisting on Safari
docs: update CONTRIBUTING with theme guidelines
```

---

## License

By contributing, you agree that your contributions will be licensed under the [MIT License](LICENSE).
