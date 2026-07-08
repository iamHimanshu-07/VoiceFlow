# VoiceFlow 🎤

<div align="center">

[![Next.js](https://img.shields.io/badge/Next.js-16.2.6-black?style=flat-square&logo=next.js)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.2-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

**AI-Powered Speech Recognition Web Application**

</div>

---

## 📋 Overview

VoiceFlow is a modern, AI-powered speech recognition application built with Next.js and React. It provides real-time voice-to-text conversion with an intuitive user interface and support for multiple languages. Perfect for transcription, note-taking, accessibility, and voice command applications.

### Key Highlights
- ⚡ Real-time speech recognition with Web Speech API
- 🎨 Modern, responsive UI with light/dark mode support
- 🔧 Built with Next.js 16 and React 19
- 📱 Fully responsive design for mobile and desktop
- 🌙 Dark mode theme by default
- 🎯 Easy-to-use and accessible interface
- 🚀 Deployed on Vercel with analytics

---

## ✨ Features

### Core Functionality
- **Real-time Speech Recognition** - Converts spoken words to text instantly
- **Multiple Language Support** - Recognizes various languages and accents
- **Theme Toggle** - Switch between dark and light modes
- **Text Export** - Copy and export recognized text
- **Clear History** - Reset and clear previous recordings
- **Visual Feedback** - Real-time recording indicators and status updates
- **Error Handling** - User-friendly error messages and recovery options

### Technical Features
- Built with Next.js 16 (latest App Router)
- React 19 with modern hooks and patterns
- Tailwind CSS v4 for responsive styling
- TypeScript for type safety
- shadcn/ui components for consistency
- Lucide React icons
- Vercel Analytics integration
- Mobile-first responsive design

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** 18.17 or later
- **npm**, **yarn**, **pnpm**, or **bun** package manager

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/voiceflow.git
cd voiceflow
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

3. **Run the development server**
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

4. **Open in your browser**
Visit [http://localhost:3000](http://localhost:3000) to see your application running.

### Build for Production

```bash
npm run build
npm start
```

---

## 📁 Project Structure

```
voiceflow/
├── app/                          # Next.js app directory
│   ├── layout.tsx               # Root layout with metadata
│   ├── page.tsx                 # Main page component
│   └── globals.css              # Global styles
├── components/                   # React components
│   └── ui/                       # shadcn/ui components
│       └── button.tsx           # Button component
├── lib/                          # Utility functions
│   └── utils.ts                 # Helper functions
├── public/                       # Static assets
│   ├── icon.svg
│   ├── icon-dark-32x32.png
│   ├── icon-light-32x32.png
│   └── apple-icon.png
├── next.config.mjs              # Next.js configuration
├── tailwind.config.ts           # Tailwind CSS configuration
├── tsconfig.json                # TypeScript configuration
├── postcss.config.mjs           # PostCSS configuration
├── package.json                 # Project dependencies
├── README.md                    # This file
├── LICENSE                      # MIT License
└── .gitignore                   # Git ignore rules
```

---

## 🛠️ Technology Stack

| Technology | Purpose | Version |
|-----------|---------|---------|
| **Next.js** | React Framework | 16.2.6 |
| **React** | UI Library | 19 |
| **TypeScript** | Type Safety | 5.7 |
| **Tailwind CSS** | Styling | 4.2 |
| **shadcn/ui** | UI Components | Latest |
| **Lucide React** | Icons | 1.16.0 |
| **Vercel Analytics** | Analytics | 1.6.1 |

---

## 📖 Usage

### Basic Usage

1. Click the microphone icon or "Start Recording" button
2. Speak clearly into your microphone
3. The app converts your speech to text in real-time
4. Click "Stop Recording" when done
5. Copy the text or export it as needed

### Keyboard Shortcuts (Optional)
- `Space` - Start/Stop recording
- `Ctrl+C` / `Cmd+C` - Copy text
- `Ctrl+X` / `Cmd+X` - Clear text

### Theme Switching
- Click the theme toggle button in the header to switch between light and dark modes
- Your preference is saved in browser storage

---

## 🧪 Testing & Quality Assurance

### Run Linting
```bash
npm run lint
```

### Code Quality
- TypeScript strict mode enabled for type safety
- ESLint configuration for code consistency
- Prettier formatting (recommended)

---
