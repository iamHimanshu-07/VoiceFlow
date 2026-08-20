import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface VoiceFlowState {
  // Transcript state
  transcript: string;
  interimTranscript: string;
  isListening: boolean;
  lang: string;

  // UI state
  debugInfo: string;
  lastFinalTime: number;

  // Actions
  setTranscript: (text: string) => void;
  appendTranscript: (text: string) => void;
  setInterimTranscript: (text: string) => void;
  setIsListening: (listening: boolean) => void;
  setLang: (language: string) => void;
  setDebugInfo: (info: string) => void;
  setLastFinalTime: (time: number) => void;
  clearTranscript: () => void;
  resetState: () => void;
}

// Persist certain settings across sessions
const useVoiceFlowStore = create<VoiceFlowState>()(
  devtools(
    persist(
      (set) => ({
        // Initial state
        transcript: '',
        interimTranscript: '',
        isListening: false,
        lang: 'en-US',
        debugInfo: '',
        lastFinalTime: 0,

        // Actions
        setTranscript: (text) => set({ transcript: text }),
        appendTranscript: (text) => set((state) => ({ transcript: state.transcript + text })),
        setInterimTranscript: (text) => set({ interimTranscript: text }),
        setIsListening: (listening) => set({ isListening: listening }),
        setLang: (language) => set({ lang: language }),
        setDebugInfo: (info) => set({ debugInfo: info }),
        setLastFinalTime: (time) => set({ lastFinalTime: time }),
        clearTranscript: () => set({ transcript: '', interimTranscript: '' }),
        resetState: () => set({
          transcript: '',
          interimTranscript: '',
          isListening: false,
          lang: 'en-US',
          debugInfo: '',
          lastFinalTime: 0
        })
      }),
      {
        name: 'voiceflow-storage',
        partialize: (state) => ({
          lang: state.lang,
          // Don't persist transient states like transcript, isListening, etc.
        })
      }
    )
  )
);

export default useVoiceFlowStore;