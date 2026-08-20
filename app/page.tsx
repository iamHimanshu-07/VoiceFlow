'use client';

import { useEffect, useRef, useState } from 'react';
import { Mic, Activity, Zap, RefreshCw, Copy, Trash2, Download } from 'lucide-react';
import { AnimatedMic } from '@/components/animated-mic';
import { WaveformVisualizer } from '@/components/waveform-visualizer';
import useVoiceFlowStore from '@/store/useVoiceFlowStore';

export default function Page() {
  // Using Zustand store for state management
  const {
    transcript,
    setTranscript,
    interimTranscript,
    setInterimTranscript,
    isListening,
    setIsListening,
    lang,
    setLang,
    debugInfo,
    setDebugInfo,
    lastFinalTime,
    setLastFinalTime,
    clearTranscript
  } = useVoiceFlowStore();

  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const [isStopping, setIsStopping] = useState(false);
  const lastStartTimeRef = useRef(0);
  const watchdogIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize speech recognition and set up event handlers
  useEffect(() => {
    // Clean up previous recognition object if it exists
    if (recognitionRef.current) {
      recognitionRef.current.onstart = null;
      recognitionRef.current.onend = null;
      recognitionRef.current.onerror = null;
      recognitionRef.current.onresult = null;
      try {
        recognitionRef.current.stop();
      } catch (e) {
        console.warn('Error stopping previous recognition:', e);
      }
    }

    if (typeof window === 'undefined') return;

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setDebugInfo('Speech Recognition not supported in your browser. Please try Chrome or Edge.');
      alert('Speech Recognition not supported in your browser. Please try Chrome or Edge.');
      return;
    }

    try {
      const recognition = new SpeechRecognition();

      // Set properties in order that works best across browsers
      recognition.lang = lang;
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.maxAlternatives = 1;

      recognitionRef.current = recognition;

      recognition.onstart = () => {
        console.log('Speech recognition started');
        setDebugInfo('Speech recognition started');
        setIsListening(true);
        setIsStopping(false);
        lastStartTimeRef.current = Date.now();
      };

      recognition.onend = () => {
        console.log('Speech recognition ended');
        setDebugInfo('Speech recognition ended');
        // In continuous mode, restart unless user explicitly stopped
        if (!isStopping && recognitionRef.current) {
          console.log('Restarting speech recognition (continuous mode)');
          setDebugInfo('Restarting speech recognition (continuous mode)');
          setIsListening(true);
          try {
            recognitionRef.current.start();
          } catch (e) {
            console.error('Error restarting speech recognition:', e);
            setDebugInfo(`Error restarting: ${e.message}`);
            setIsListening(false);
          }
        } else {
          setIsListening(false);
        }
      };

      recognition.onerror = (e) => {
        console.error('Speech recognition error:', e.error);
        setDebugInfo(`Speech recognition error: ${e.error}`);
        setIsListening(false);
        setIsStopping(false);
        // Don't show alert for every error as it can be annoying
        if (e.error !== 'no-speech' && e.error !== 'audio-capture' && e.error !== 'not-allowed') {
          if (e.error === 'not-allowed') {
            alert('Microphone permission denied. Please allow microphone access to use this feature.');
          } else if (e.error === 'network') {
            alert('Network error. Please check your internet connection.');
          }
        }
      };

      // Voice command detection
      const processVoiceCommand = (text: string) => {
        const command = text.toLowerCase().trim();

        // Start listening commands
        if (command.includes('start listening') || command.includes('hey voiceflow start') ||
            command.includes('voiceflow start') || command.includes('begin listening')) {
          if (!isListening) {
            startListening();
            setDebugInfo('Voice command: Started listening');
            return true;
          }
        }

        // Stop listening commands
        if (command.includes('stop listening') || command.includes('hey voiceflow stop') ||
            command.includes('voiceflow stop') || command.includes('stop listening') ||
            command.includes('pause listening')) {
          if (isListening) {
            stopListening();
            setDebugInfo('Voice command: Stopped listening');
            return true;
          }
        }

        // Clear transcript commands
        if (command.includes('clear transcript') || command.includes('hey voiceflow clear') ||
            command.includes('voiceflow clear') || command.includes('clear text') ||
            command.includes('delete everything')) {
          if (transcript.trim() || interimTranscript.trim()) {
            clearTranscript();
            setDebugInfo('Voice command: Cleared transcript');
            return true;
          }
        }

        // Copy transcript commands
        if (command.includes('copy text') || command.includes('hey voiceflow copy') ||
            command.includes('voiceflow copy') || command.includes('copy transcript') ||
            command.includes('copy that')) {
          if (transcript.trim()) {
            copyTranscript();
            setDebugInfo('Voice command: Copied transcript');
            return true;
          }
        }

        // Download transcript commands
        if (command.includes('download') || command.includes('hey voiceflow download') ||
            command.includes('voiceflow download') || command.includes('save transcript') ||
            command.includes('save as file')) {
          if (transcript.trim()) {
            downloadTranscript();
            setDebugInfo('Voice command: Downloaded transcript');
            return true;
          }
        }

        // Language change commands
        if (command.includes('switch to spanish') || command.includes('change language to spanish') ||
            command.includes('spanish language') || command.includes('español')) {
          if (lang !== 'es-ES') {
            setLang('es-ES');
            setDebugInfo('Voice command: Switched to Spanish');
            return true;
          }
        }

        if (command.includes('switch to english') || command.includes('change language to english') ||
            command.includes('english language') || command.includes('english')) {
          if (lang !== 'en-US') {
            setLang('en-US');
            setDebugInfo('Voice command: Switched to English');
            return true;
          }
        }

        if (command.includes('switch to french') || command.includes('change language to french') ||
            command.includes('french language') || command.includes('français')) {
          if (lang !== 'fr-FR') {
            setLang('fr-FR');
            setDebugInfo('Voice command: Switched to French');
            return true;
          }
        }

        if (command.includes('switch to german') || command.includes('change language to german') ||
            command.includes('german language') || command.includes('deutsch')) {
          if (lang !== 'de-DE') {
            setLang('de-DE');
            setDebugInfo('Voice command: Switched to German');
            return true;
          }
        }

        return false;
      };

      recognition.onresult = (e) => {
        console.log('Speech recognition result received:', e);
        setDebugInfo(`Result received: ${e.results.length} results`);

        let final = '';
        let interim = '';

        for (let i = e.resultIndex; i < e.results.length; i++) {
          const transcriptSegment = e.results[i][0].transcript;
          console.log(`Processing result ${i}: "${transcriptSegment}" (final: ${e.results[i].isFinal})`);

          if (e.results[i].isFinal) {
            final += transcriptSegment + ' ';
          } else {
            interim += transcriptSegment;
          }
        }

        // Update interim transcript in real-time for faster feedback
        if (interim.trim()) {
          setInterimTranscript(interim.trim());
        } else {
          setInterimTranscript('');
        }

        if (final.trim()) {
          // Check for voice commands in final transcript
          const commandRecognized = processVoiceCommand(final.trim());

          // Only add to transcript if it wasn't a command (or if it was a command we still want to show)
          if (!commandRecognized) {
            setTranscript(prev => prev + final.trim() + ' ');
          }
          setInterimTranscript(''); // Clear interim when we have final results
          setLastFinalTime(Date.now());

          // Send final transcript to backend
          try {
            fetch('/api/voiceflow', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ transcript: final.trim() })
            }).then(response => {
              console.log('Backend response:', response);
              setDebugInfo(`Backend response: ${response.status}`);
            }).catch(err => {
              console.error('Failed to send transcript to backend:', err);
              setDebugInfo(`Backend error: ${err.message}`);
            });
          } catch (err) {
            console.error('Failed to send transcript to backend:', err);
            setDebugInfo(`Backend error: ${err.message}`);
          }
        }
      };

      // Cleanup function
      return () => {
        setIsStopping(true);
        if (watchdogIntervalRef.current) {
          clearInterval(watchdogIntervalRef.current);
        }
        recognition.onstart = null;
        recognition.onend = null;
        recognition.onerror = null;
        recognition.onresult = null;
        try {
          recognition.stop();
        } catch (e) {
          console.warn('Error stopping recognition on cleanup:', e);
        }
      };
    } catch (error) {
      console.error('Error initializing SpeechRecognition:', error);
      setDebugInfo(`Initialization error: ${error.message}`);
      alert(`Error initializing speech recognition: ${error.message}`);
    }
  }, [lang]);

  // Watchdog to restart recognition if it stops unexpectedly
  useEffect(() => {
    if (watchdogIntervalRef.current) {
      clearInterval(watchdogIntervalRef.current);
    }
    watchdogIntervalRef.current = setInterval(() => {
      if (isListening && !isStopping && recognitionRef.current) {
        // If we haven't had a start event in the last 4 seconds, assume it died and restart
        if (Date.now() - lastStartTimeRef.current > 4000) {
          console.log('Watchdog: Restarting speech recognition due to timeout');
          setDebugInfo('Watchdog: Restarting due to timeout');
          setIsStopping(false);
          try {
            recognitionRef.current.stop();
            // Small delay before restart
            setTimeout(() => {
              try {
                recognitionRef.current.start();
              } catch (e) {
                console.error('Error restarting speech recognition in watchdog:', e);
                setDebugInfo(`Watchdog restart error: ${e.message}`);
                setIsListening(false);
              }
            }, 100);
          } catch (e) {
            console.error('Error stopping recognition in watchdog:', e);
            setDebugInfo(`Watchdog stop error: ${e.message}`);
          }
        }
      }
    }, 2000);
    return () => {
      if (watchdogIntervalRef.current) {
        clearInterval(watchdogIntervalRef.current);
      }
    };
  }, [isListening, isStopping]);

  const startListening = () => {
    if (!recognitionRef.current) return;
    setIsStopping(false);
    setDebugInfo('Starting recognition...');
    try {
      recognitionRef.current.lang = lang;
      recognitionRef.current.start();
    } catch (e) {
      console.error('Error starting speech recognition:', e);
      setDebugInfo(`Start error: ${e.message}`);
      setIsListening(false);
      if (e.name === 'NotAllowedError') {
        alert('Microphone permission denied. Please allow microphone access to use this feature.');
      } else if (e.name === 'NotSupportedError') {
        alert('Speech recognition not supported in your browser.');
      } else {
        alert('Error starting speech recognition: ' + e.message);
      }
    }
  };

  const stopListening = () => {
    if (!recognitionRef.current) return;
    setIsStopping(true);
    setDebugInfo('Stopping recognition...');
    try {
      recognitionRef.current.stop();
    } catch (e) {
      console.error('Error stopping speech recognition:', e);
      setDebugInfo(`Stop error: ${e.message}`);
      setIsListening(false);
    }
  };

  // clearTranscript is imported from the store, no need to redefine it here

  const copyTranscript = () => {
    navigator.clipboard.writeText(transcript).then(() => {
      setDebugInfo('Transcript copied to clipboard!');
      setTimeout(() => setDebugInfo(''), 2000);
    }).catch(err => {
      setDebugInfo(`Failed to copy: ${err.message}`);
      setTimeout(() => setDebugInfo(''), 3000);
    });
  };

  const downloadTranscript = () => {
    if (!transcript.trim()) return;
    const blob = new Blob([transcript], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `voiceflow-transcript-${new Date().toISOString().slice(0,10)}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    setDebugInfo('Transcript downloaded!');
    setTimeout(() => setDebugInfo(''), 2000);
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
      {/* Animated Header with Waveform Background */}
      <motion.div
        className="relative mb-8"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: 'out' }}
      >
        <WaveformVisualizer
          isListening={isListening}
          audioLevel={isListening ? Math.random() * 0.3 + 0.7 : 0}
          height={120}
          width={400}
          color="voiceflow-500"
          className="absolute inset-0 pointer-events-none opacity-20"
        />
        <motion.h1
          className="text-4xl font-bold bg-gradient-to-r from-voiceflow-400 to-voiceflow-600 bg-clip-text text-transparent animate-pulse-slow relative z-10"
          style={{ background: 'linear-gradient(90deg, var(--voiceflow-400), var(--voiceflow-600))' }}
        >
          VoiceFlow
        </motion.h1>
      </motion.div>

      {/* Subtitle */}
      <motion.p
        className="mb-8 text-xl text-white/70 max-w-md text-center"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2, ease: 'out' }}
      >
        AI-Powered Speech Recognition with Real-Time Animation
      </motion.p>

      {/* Language Selector */}
      <motion.div
        className="mb-6 w-full max-w-md"
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4, ease: 'out' }}
      >
        <label className="block mb-2 text-sm font-medium text-white/80">
          Language:
        </label>
        <select
          value={lang}
          onChange={(e) => setLang(e.target.value)}
          className="w-full bg-gray-800/50 backdrop-blur-sm border border-white/10 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-voiceflow-500 focus:outline-none transition-all duration-300"
        >
          <option value="en-US">English (US)</option>
          <option value="es-ES">Español</option>
          <option value="fr-FR">Français</option>
          <option value="de-DE">Deutsch</option>
        </select>
      </motion.div>

      {/* Main Controls */}
      <motion.div
        className="mb-10 w-full max-w-md space-x-4"
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.6, ease: 'out' }}
      >
        <motion.div className="flex items-center space-x-6">
          <AnimatedMic
            isListening={isListening}
            transcriptLength={transcript.length}
            onToggleListening={isListening ? stopListening : startListening}
            className="flex-shrink-0"
          />

          <motion.div className="flex-1 space-y-4">
            <div className="flex space-x-3">
              <button
                onClick={startListening}
                disabled={isListening}
                className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20 transform hover:-translate-y-0.5"
              >
                Start Listening
              </button>
              <button
                onClick={stopListening}
                disabled={!isListening}
                className="flex-1 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-red-500/20 transform hover:-translate-y-0.5"
              >
                Stop
              </button>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={clearTranscript}
                disabled={!transcript && !interimTranscript}
                className="flex-1 bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 hover:shadow-lg"
              >
                Clear
              </button>
              <button
                onClick={copyTranscript}
                disabled={!transcript}
                className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 hover:shadow-lg"
              >
                Copy
              </button>
              <button
                onClick={downloadTranscript}
                disabled={!transcript}
                className="flex-1 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 hover:shadow-lg"
              >
                Download
              </button>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Transcript Area */}
      <motion.div
        className="w-full max-w-xl"
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.8, ease: 'out' }}
      >
        <div className="mb-4 flex items-center justify-between">
          <p className="text-lg font-medium">Transcript:</p>
          <div className="flex space-x-2 text-sm">
            <span className="text-white/50">{transcript.length}</span>
            <span className="text-white/50">characters</span>
          </div>
        </div>

        <div className="relative">
          <div className="bg-gray-900/50 backdrop-blur-sm border border-white/10 rounded-xl p-6 min-h-[240px] whitespace-pre-wrap break-words transition-all duration-300 hover:border-white/20">
            {transcript}
            {/* Show interim results with different styling for real-time feedback */}
            {interimTranscript && <span className="text-gray-400 italic animate-pulse">{' ' + interimTranscript}</span>}

            {/* Animated placeholder when empty */}
            {!transcript && !interimTranscript && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <motion.div
                  className="text-white/20 text-lg"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  Speak to begin...
                </motion.div>
              </div>
            )}
          </div>

          {/* Enhanced Audio Level Indicator */}
          {isListening && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
              {[...Array(8)].map((_, i) => (
                <motion.span
                  key={i}
                  className="bg-voiceflow-400/30 rounded w-2"
                  style={{
                    height: `${Math.random() * 30 + 10}px`,
                    animation: `waveform ${Math.random() * 0.6 + 0.4}s ${Math.random() * 0.6}s ease-in-out infinite`
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </motion.div>

      {/* Debug Info */}
      <motion.div
        className="mt-6 w-full max-w-xl"
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.0, ease: 'out' }}
      >
        <div className="bg-gray-900/50 backdrop-blur-sm border border-white/10 rounded-xl p-4">
          <p className="mb-2 font-medium text-sm">Debug Info:</p>
          <p className="break-all text-xs text-white/70">{debugInfo}</p>
        </div>
      </motion.div>

      {/* Status Indicator */}
      <motion.p
        className="mt-4 text-sm text-gray-400"
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.2, ease: 'out' }}
      >
        <span>
          Status:&nbsp;
          {isListening ? (
            <>
              <motion.span
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                className="text-voiceflow-400"
              >
                ●
              </motion.span>
              <span className="ml-1">Listening...</span>
            </>
          ) : (
            <span>Ready</span>
          )}
        </span>
      </motion.p>

      {/* Enhanced Confetti Celebration */}
      {transcript.length > 30 && !isListening && (
        <motion.div
          className="fixed inset-0 pointer-events-none"
          style={{
            '--count': transcript.length > 100 ? '100' : transcript.length > 75 ? '70' : transcript.length > 50 ? '50' : '30'
          }}
        >
          {[...Array(parseInt(getComputedStyle(document.documentElement).getPropertyValue('--count') || '30'))].map((_, i) => (
            <motion.span
              key={i}
              className="absolute pointer-events-none"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                background: `hsl(${Math.random() * 60}, 80%, 50%)`,
                width: `${Math.random() * 4 + 2}px`,
                height: `${Math.random() * 6 + 2}px`,
                borderRadius: '50%',
                opacity: Math.random() * 0.6 + 0.4,
                animation: `confetti ${Math.random() * 4 + 3}s ${Math.random() * 2}s ease-out forwards`
              }}
            />
          ))}
        </motion.div>
      )}
    </div>
  );
}