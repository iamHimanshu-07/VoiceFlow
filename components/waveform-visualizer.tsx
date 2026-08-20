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

        // Get the color value from CSS variable (should be a hex color like #0ea5e9)
      const colorValue = getComputedStyle(document.documentElement).getPropertyValue(`--${color}`).trim();

      // Handle potential empty or invalid color value
      if (!colorValue) {
        // Fallback to a default color if CSS variable is not found
        const gradient = ctx.createLinearGradient(x, y, x, y + height);
        gradient.addColorStop(0, '#0ea5e9'); // voiceflow-500
        gradient.addColorStop(1, '#0ea5e980'); // 50% opacity
        ctx.fillStyle = gradient;
        ctx.fillRect(x, y, barWidth, height);
        ctx.shadowColor = '#0ea5e94d'; // 30% opacity
        ctx.shadowBlur = 4;
        return;
      }

      // Gradient
      const gradient = ctx.createLinearGradient(x, y, x, y + height);
      gradient.addColorStop(0, colorValue); // Full opacity

      // Create color with 50% opacity for second gradient stop
      // Convert hex to rgba for proper opacity handling
      const hexToRgba = (hex: string, opacity: number) => {
        // Remove # if present
        const cleanHex = hex.startsWith('#') ? hex.substring(1) : hex;

        // Handle 3-digit hex format
        if (cleanHex.length === 3) {
          const r = parseInt(cleanHex.charAt(0) + cleanHex.charAt(0), 16);
          const g = parseInt(cleanHex.charAt(1) + cleanHex.charAt(1), 16);
          const b = parseInt(cleanHex.charAt(2) + cleanHex.charAt(2), 16);
          return `rgba(${r}, ${g}, ${b}, ${opacity})`;
        }

        // Handle 6-digit hex format
        const r = parseInt(cleanHex.substring(0, 2), 16);
        const g = parseInt(cleanHex.substring(2, 4), 16);
        const b = parseInt(cleanHex.substring(4, 6), 16);
        return `rgba(${r}, ${g}, ${b}, ${opacity})`;
      };

      gradient.addColorStop(1, hexToRgba(colorValue, 0.5));

      ctx.fillStyle = gradient;
      ctx.fillRect(x, y, barWidth, height);

      // Glow effect
      ctx.shadowColor = hexToRgba(colorValue, 0.3);
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