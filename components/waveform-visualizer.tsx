'use client';

import { useEffect, useRef } from 'react';

interface WaveformVisualizerProps {
  isListening: boolean;
  audioLevel: number;
  height?: number;
  width?: number;
  color?: string;
}

export const WaveformVisualizer = ({
  isListening,
  audioLevel = 0,
  height = 100,
  width = 300,
  color = 'voiceflow-400'
}: WaveformVisualizerProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = width;
    canvas.height = height;

    const drawWaveform = () => {
      if (!ctx) return;

      // Clear canvas
      ctx.clearRect(0, 0, width, height);

      // Draw waveform bars
      const barCount = 50;
      const barWidth = width / barCount - 2;
      const maxHeight = height * 0.8;
      const centerY = height / 2;

      for (let i = 0; i < barCount; i++) {
        // Generate random-ish height based on audio level and position
        const noise = Math.sin(Date.now() * 0.002 + i * 0.5) * 0.5 + 0.5;
        const baseHeight = Math.random() * 0.3 + 0.2; // 0.2 to 0.5
        const levelFactor = isListening ? audioLevel : 0;
        const height = (baseHeight + noise * 0.3 + levelFactor * 0.5) * maxHeight;

        const x = i * (barWidth + 2);
        const y = centerY - height / 2;

        // Gradient
        const gradient = ctx.createLinearGradient(x, y, x, y + height);
        gradient.addColorStop(0, `hsl(var(--${color}))`);
        gradient.addColorStop(1, `hsl(var(--${color}))/0.5`);

        ctx.fillStyle = gradient;
        ctx.fillRect(x, y, barWidth, height);

        // Glow effect
        ctx.shadowColor = `hsl(var(--${color}))/0.3`;
        ctx.shadowBlur = 4;
      }
    };

    const animate = () => {
      drawWaveform();
      if (isListening) {
        requestAnimationFrame(animate);
      }
    };

    if (isListening) {
      animate();
    } else {
      drawWaveform();
    }

    return () => {
      // Cleanup
    };
  }, [isListening, audioLevel, height, width, color]);

  return (
    <div className="relative w-[300px] h-[100px]">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
};