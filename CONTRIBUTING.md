# Contributing to VoiceFlow

Thank you for your interest in contributing to VoiceFlow! We're excited to have you join our community. This document provides guidelines and instructions for contributing to the project.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Making Changes](#making-changes)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)
- [Reporting Bugs](#reporting-bugs)
- [Suggesting Features](#suggesting-features)
- [Style Guide](#style-guide)

## Code of Conduct

### Our Pledge

We are committed to providing a welcoming and inspiring community for all. We expect all contributors to:

- Use welcoming and inclusive language
- Be respectful of differing opinions and experiences
- Gracefully accept constructive criticism
- Focus on what is best for the community
- Show empathy towards other community members

### Expected Behavior

- Participate authentically and actively
- Exercise consideration and respect in your speech and actions
- Attempt collaboration before conflict
- Refrain from demeaning, discriminatory, or harassing behavior and speech
- Report unacceptable behavior to the project maintainers

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm, yarn, pnpm, or bun
- Git
- Basic knowledge of React, TypeScript, and Next.js

### Fork and Clone

1. Fork the repository on GitHub
2. Clone your fork locally:
   ```bash
   git clone https://github.com/yourusername/voiceflow.git
   cd voiceflow
   ```
3. Add upstream remote:
   ```bash
   git remote add upstream https://github.com/original-owner/voiceflow.git
   ```

## Development Setup

### Install Dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### Run Development Server

```bash
npm run dev
```

Navigate to [http://localhost:3000](http://localhost:3000) to see your changes.

### Build for Production

```bash
npm run build
npm start
```

### Run Linting

```bash
npm run lint
```

## Making Changes

### Create a Feature Branch

Always create a new branch for your work:

```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/bug-name
# or
git checkout -b docs/documentation-update
```

### Branch Naming Convention

- `feature/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation updates
- `refactor/` - Code refactoring
- `test/` - Adding or updating tests
- `chore/` - Maintenance tasks

### Make Your Changes

1. Edit the necessary files
2. Test your changes locally:
   ```bash
   npm run dev
   ```
3. Run linting to ensure code quality:
   ```bash
   npm run lint
   ```
4. Build to check for any production errors:
   ```bash
   npm run build
   ```

## Commit Guidelines

### Commit Message Format

We follow the Conventional Commits specification:

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Type

Must be one of the following:

- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation only changes
- `style`: Changes that do not affect the meaning of the code (formatting, etc.)
- `refactor`: A code change that neither fixes a bug nor adds a feature
- `perf`: A code change that improves performance
- `test`: Adding missing tests or correcting existing tests
- `chore`: Changes to build process, dependencies, or other development tools

### Scope

Optional but recommended. Examples:
- `speech-recognition`
- `ui`
- `components`
- `styling`
- `config`

### Subject

- Use imperative mood: "add" instead of "added" or "adds"
- Don't capitalize first letter
- No period at the end
- Limit to 50 characters

### Body

- Wrap at 72 characters
- Explain **what** and **why**, not how
- Use bullet points for multiple items

### Footer

- Reference issues: `Fixes #123`, `Closes #456`
- Breaking changes: `BREAKING CHANGE: description`

### Example Commit Messages

```
feat(ui): add dark mode toggle button

- Implement theme switching functionality
- Add localStorage persistence for theme preference
- Update component styling for both themes

Fixes #42
```

```
fix(speech-recognition): prevent memory leaks on cleanup

Previously, the audio context was not being properly
released when the component unmounted, causing memory
leaks in long-running sessions.

Closes #89
```

## Pull Request Process

### Before Submitting

1. Update your local main branch:
   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

2. Push to your fork:
   ```bash
   git push origin your-branch-name
   ```

3. Ensure all tests pass and code is properly formatted

### Creating a Pull Request

1. Go to the original repository on GitHub
2. Click "New Pull Request"
3. Select your fork and branch
4. Fill in the PR template with:
   - Clear description of changes
   - Motivation and context
   - Type of change (bug fix, feature, etc.)
   - How to test the changes
   - Screenshots (if UI changes)
   - Checklist items

### PR Title Format

Follow the same conventions as commit messages:
```
feat(scope): short description
fix(scope): short description
docs: update contributing guide
```

### What Happens Next

- Maintainers will review your PR
- You may be asked to make changes
- Once approved, your PR will be merged
- Your contribution will be credited

### PR Checklist

Before submitting, ensure:

- [ ] Code follows the style guidelines
- [ ] All tests pass (`npm run lint`)
- [ ] No console errors or warnings
- [ ] Changes are well-documented
- [ ] Commit messages are clear and descriptive
- [ ] PR description is comprehensive
- [ ] No breaking changes (or clearly documented)
- [ ] Updated README.md if needed
- [ ] Added comments for complex logic

## Reporting Bugs

### Before Submitting a Bug Report

- Check the issue tracker for existing reports
- Check documentation and FAQs
- Try reproducing with the latest version
- Gather as much information as possible

### How to Submit a Good Bug Report

Use the bug report template and include:

1. **Title**: Clear, descriptive summary
2. **Description**: What is the bug? How does it manifest?
3. **Steps to Reproduce**: Exact steps to reproduce the issue
4. **Expected Behavior**: What you expected to happen
5. **Actual Behavior**: What actually happened
6. **Environment**:
   - OS and version
   - Browser and version
   - Node.js version
   - Package versions
7. **Screenshots/Videos**: Visual documentation if applicable
8. **Additional Context**: Any other relevant information

### Example Bug Report

```markdown
## Title
Speech recognition stops working after 5 minutes

## Description
When using the speech recognition feature, it automatically stops after
approximately 5 minutes and doesn't resume without reloading the page.

## Steps to Reproduce
1. Open the application
2. Click "Start Recording"
3. Speak for 5+ minutes
4. Observe the behavior

## Expected Behavior
Speech recognition should continue indefinitely until manually stopped

## Actual Behavior
Speech recognition stops automatically after ~5 minutes

## Environment
- OS: macOS 13.2
- Browser: Chrome 120.0.6099.129
- Node.js: 18.19.0
```

## Suggesting Features

### Before Submitting a Feature Suggestion

- Check if the feature already exists
- Search the issue tracker for similar requests
- Think about the use case and benefits

### How to Submit a Feature Suggestion

Use the feature request template and include:

1. **Title**: Clear, descriptive summary
2. **Description**: Detailed explanation of the feature
3. **Motivation**: Why would this feature be useful?
4. **Expected Behavior**: How should it work?
5. **Alternatives**: Any alternative approaches you've considered
6. **Screenshots/Mockups**: Visual mockups if applicable
7. **Additional Context**: Any other relevant information

### Example Feature Request

```markdown
## Title
Add ability to export transcriptions as PDF

## Description
Users should be able to export their speech-to-text transcriptions
as PDF files for sharing and archival purposes.

## Motivation
Currently, the only export option is copying to clipboard. A PDF
export would be useful for creating shareable documents and
maintaining archives of important transcriptions.

## Expected Behavior
- Add an "Export as PDF" button in the export menu
- Generate a formatted PDF with timestamp and metadata
- Allow customization of PDF styling (font, colors)

## Alternatives
- DOCX export
- Save as markdown file
```

## Style Guide

### Code Style

We follow these conventions:

#### File Naming

- Components: PascalCase (e.g., `SpeechRecognition.tsx`)
- Utilities: camelCase (e.g., `speechUtils.ts`)
- Types/Interfaces: PascalCase (e.g., `SpeechConfig.ts`)
- Folders: kebab-case (e.g., `speech-recognition/`)

#### TypeScript

```typescript
// Use interfaces for objects
interface Props {
  onStart: () => void
  isActive: boolean
}

// Use explicit types
const handleRecord = (duration: number): void => {
  // ...
}

// Use strict mode
// enable in tsconfig.json
```

#### React Components

```typescript
// Functional components with TypeScript
export interface ComponentProps {
  title: string
  onClick: () => void
}

export default function Component({ title, onClick }: ComponentProps) {
  return <button onClick={onClick}>{title}</button>
}
```

#### CSS/Tailwind

- Use Tailwind CSS classes
- Follow mobile-first responsive design
- Use semantic class names

```typescript
<div className="flex items-center justify-between gap-4 p-4 rounded-lg bg-background">
  <h1 className="text-xl font-bold text-foreground">Title</h1>
  <button className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90">
    Action
  </button>
</div>
```

#### Comments

```typescript
// Use meaningful comments
// DON'T: This function adds 1
// DO: Increment the counter for tracking user interactions

// For complex logic, explain the WHY
// The timeout is set to 5000ms because the API requires
// a minimum request interval of 5 seconds to avoid rate limiting
```

### Documentation Style

- Use clear, simple language
- Write in active voice
- Use examples when helpful
- Keep lines under 80 characters

## Questions?

- Open an issue for questions about contributing
- Mention `@maintainers` for quick response
- Check existing discussions for similar questions
- Visit our discussions page for general questions

---

Thank you for contributing to VoiceFlow! Together, we're building something amazing. 🎤
