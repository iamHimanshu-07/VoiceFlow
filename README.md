# VoiceFlow - Real-Time Speech Recognition

A modern, responsive single-page web application for real-time speech recognition using HTML, Tailwind CSS, and vanilla JavaScript (leveraging the Web Speech API).

## Features

- **Real-time Speech Recognition**: Powered by the Web Speech API
- **Ultra-Dark Theme**: Sophisticated dark mode with vibrant accent colors
- **Responsive Design**: Works seamlessly on mobile and desktop devices
- **Voice Control**: Control the application using voice commands
- **Live Transcript**: See your words appear instantly as you speak
- **Metrics Dashboard**: Track word count, character count, confidence, and duration
- **Audio Visualizer**: Real-time waveform visualization of your speech
- **Export & Utility**: Copy to clipboard or download as .txt file
- **Multi-Language Support**: Supports multiple languages (English, Spanish, French, German, Italian, Portuguese, Japanese, Korean, Chinese, Russian, Arabic, Hindi)
- **Light/Dark Mode Toggle**: Easily switch between themes
- **Confetti Celebration**: Fun visual reward for substantial transcriptions

## Design & Theme

- **Theme**: Ultra-dark theme (background: #090d16 / near-black, card containers: #111827 / slate-900)
- **Accent Colors**: 
  - Vibrant neon cyan (#06b6d4 / #00d2ff) for titles, active highlights, and primary buttons
  - Muted crimson/burgundy (#991b1b) for the Stop button
- **Typography**: Clean sans-serif (Inter or system font)

## Layout

### Top Navigation Bar
- Left: Logo icon + "VoiceFlow" brand name
- Right: "Light Mode" / "Dark Mode" toggle button

### Main Dashboard (2-Column Grid on desktop, 1-Column on mobile)

#### Left Column (Controls & Settings)
- Header: Glowing cyan heading + descriptive subtitle
- Control Card:
  - LANGUAGE: Dropdown select menu
  - OPTIONS: Checkboxes for "Live Preview" and "Continuous" listening
  - Action Buttons: "Start Listening" (cyan) and "Stop" (crimson)
  - Status Indicator: Badge showing current status
  - Live Audio Visualizer: Waveform bars showing audio levels

#### Right Column (Transcript & Analytics)
- Live Transcript Card:
  - Label: "LIVE TRANSCRIPT"
  - Large transcript display area with auto-scroll
  - Character and word counters
- Statistics Card:
  - Label: "STATISTICS"
  - 2x2 Metric Grid: WORDS, CHARACTERS, DURATION, CONFIDENCE
  - Action Buttons: Copy, Download, and Clear All

## Functional Features

1. **Web Speech API Integration**: Implements `window.SpeechRecognition` or `window.webkitSpeechRecognition`
2. **Dynamic Metrics**: Updates word count, character count, confidence score, and elapsed recording duration in real time
3. **Fallback Handling**: Shows user-friendly messages if browser doesn't support Web Speech API or microphone access is denied
4. **Export & Utility**: Full functionality for copying to clipboard and downloading text files
5. **Voice Commands**: Control the application hands-free with voice commands like:
   - "Start listening" / "Hey VoiceFlow start"
   - "Stop listening" / "Hey VoiceFlow stop"
   - "Clear transcript" / "Hey VoiceFlow clear"
   - "Copy text" / "Hey VoiceFlow copy"
   - "Download transcript" / "Hey VoiceFlow download"
   - Language switching: "Switch to Spanish", "Switch to English", etc.

## Browser Support

VoiceFlow works best in browsers that support the Web Speech API:
- Google Chrome (recommended)
- Microsoft Edge
- Safari (with limited support)

## Installation & Usage

1. Clone or download this repository
2. Open `index.html` in your preferred browser (Chrome or Edge recommended)
3. Click the "Start Listening" button and allow microphone access when prompted
4. Begin speaking to see real-time transcription
5. Use voice commands or UI controls to manage the application

## Customization

To modify the application:
- Edit the languages in the `<select id="language-select">` element
- Adjust colors by modifying the CSS variables in the `:root` section
- Modify voice commands in the `processVoiceCommand()` method
- Adjust confetti effects in the `showConfetti()` method

## Credits

Built with:
- [Tailwind CSS](https://tailwindcss.com/) (via CDN)
- [Inter Font](https://fonts.google.com/specimen/Inter) (via Google Fonts)
- [Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API)

## License

MIT License - feel free to use and modify this project as needed.