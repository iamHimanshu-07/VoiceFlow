'use client';

import { useEffect, useRef, useState } from 'react';

export default function Page() {
  // State for transcript and interim results
  const [transcript, setTranscript] = useState('');
  const [interimTranscript, setInterimTranscript] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [lang, setLang] = useState('en-US');
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const [isStopping, setIsStopping] = useState(false);
  const [lastFinalTime, setLastFinalTime] = useState(0);
  const lastStartTimeRef = useRef(0);
  const watchdogIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const [debugInfo, setDebugInfo] = useState('');

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
          setTranscript(prev => prev + final.trim() + ' ');
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

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-4">VoiceFlow</h1>
      <div className="mb-4">
        <label className="mr-2">Language:</label>
        <select value={lang} onChange={(e) => setLang(e.target.value)} className="border rounded px-2 py-1">
          <option value="en-US">English (US)</option>
          <option value="es-ES">Español</option>
          <option value="fr-FR">Français</option>
          <option value="de-DE">Deutsch</option>
        </select>
      </div>
      <div className="flex space-x-3">
        <button
          onClick={startListening}
          disabled={isListening}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Start Listening
        </button>
        <button
          onClick={stopListening}
          disabled={!isListening}
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
        >
          Stop
        </button>
      </div>
      <div className="mt-6 w-full max-w-xl">
        <p className="mb-2 font-medium">Transcript:</p>
        <div className="bg-gray-800 rounded p-4 min-h-[100px] whitespace-pre-wrap break-words">
          {transcript}
          {/* Show interim results with different styling for real-time feedback */}
          {interimTranscript && <span className="text-gray-400 italic">{' ' + interimTranscript}</span>}
        </div>
      </div>
      <div className="mt-4 p-2 bg-gray-900 rounded text-xs">
        <p className="font-medium">Debug Info:</p>
        <p className="break-all">{debugInfo}</p>
      </div>
      <p className="mt-4 text-sm text-gray-400">
        Status: {isListening ? 'Listening...' : 'Ready'}
      </p>
    </div>
  );
}