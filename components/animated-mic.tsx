'use client';

import { Mic, Activity, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

interface AnimatedMicProps {
  isListening: boolean;
  transcriptLength: number;
  onToggleListening: () => void;
}

export const AnimatedMic = ({
  isListening,
  transcriptLength,
  onToggleListening
}: AnimatedMicProps) => {
  return (
    <motion.div
      onClick={onToggleListening}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="relative flex items-center justify-center w-24 h-24 bg-white/5 backdrop-blur-sm rounded-full border border-white/10 hover:border-white/20 transition-all duration-300"
    >
      {!isListening ? (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className="absolute -top-4 -right-4 w-8 h-8 bg-voiceflow/20 rounded-full flex items-center justify-center"
        >
          <Zap className="text-voiceflow-500 size-4" />
        </motion.div>
      ) : null}

      <motion.div
        className="flex items-center justify-center space-x-2"
        animate={isListening ? { rotate: [0, 10, -10, 10, 0] } : {}}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        <Mic
          className={`h-6 w-6 transition-all duration-300 ${isListening ?
            'animate-mic-pulse text-voiceflow-500' :
            'text-white/80 hover:text-white'}`
          }
        />
        {isListening && (
          <Activity
            className="h-5 w-5 text-voiceflow-400 animate-pulse-slow"
          />
        )}
        {!isListening && transcriptLength > 0 && (
          <div className="flex flex-col items-center text-xs">
            <div className="text-white/70">{transcriptLength}</div>
            <div className="w-2 h-2 bg-voiceflow-400 rounded-full animate-pulse"></div>
          </div>
        )}
      </motion.div>

      {/* Confetti celebration when transcription is substantial */}
      {transcriptLength > 50 && !isListening && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            '--count': transcriptLength > 100 ? '50' : transcriptLength > 75 ? '30' : '15'
          }}
        >
          {[...Array(parseInt(getComputedStyle(document.documentElement).getPropertyValue('--count') || '15'))].map((_, i) => (
            <motion.span
              key={i}
              className="absolute pointer-events-none"
              style={{
                left: `${Math.random() * 100}%`,
                background: `hsl(${Math.random() * 60}, 80%, 50%)`,
                width: `${Math.random() * 4 + 2}px`,
                height: `${Math.random() * 6 + 2}px`,
                borderRadius: '50%',
                opacity: Math.random() * 0.5 + 0.5,
                animation: `confetti ${Math.random() * 2 + 2}s ${Math.random() * 0.5}s ease-out forwards`
              }}
            />
          ))}
        </motion.div>
      )}

      {/* Waveform visualization when listening */}
      {isListening && (
        <motion.div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 flex space-x-0.5 pb-2"
          style={{ '--count': '5' }}
        >
          {[...Array(parseInt(getComputedStyle(document.documentElement).getPropertyValue('--count') || '5'))].map((_, i) => (
            <motion.span
              key={i}
              className="bg-voiceflow-400/50 rounded"
              style={{
                width: '2px',
                height: `${Math.random() * 20 + 10}px`,
                borderRadius: '1px',
                animation: `waveform ${Math.random() * 0.5 + 0.3}s ${Math.random() * 0.5}s ease-in-out infinite`
              }}
            />
          ))}
        </motion.div>
      )}
    </motion.div>
  );
};