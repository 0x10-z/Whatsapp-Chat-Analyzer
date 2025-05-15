import { useEffect, useRef } from "react";
import type { WordFrequency } from "./chat-analyzer";

interface WordCloudChartProps {
  wordFrequency: WordFrequency[];
}

export default function WordCloudChart({ wordFrequency }: WordCloudChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current || wordFrequency.length === 0) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const isMobile = rect.width < 400;
    const maxWords = isMobile ? 30 : 50;

    const topWords = wordFrequency.slice(0, maxWords);
    const maxValue = Math.max(...topWords.map((item) => item.value));
    const minValue = Math.min(...topWords.map((item) => item.value));

    const colors = [
      "#EF4444",
      "#F59E0B",
      "#10B981",
      "#3B82F6",
      "#8B5CF6",
      "#EC4899",
      "#F97316",
      "#14B8A6",
      "#6366F1",
      "#A855F7",
    ];

    const occupiedSpaces: {
      x: number;
      y: number;
      width: number;
      height: number;
    }[] = [];

    const isPositionAvailable = (
      x: number,
      y: number,
      width: number,
      height: number
    ) => {
      if (x < 0 || y < 0 || x + width > rect.width || y + height > rect.height)
        return false;
      return !occupiedSpaces.some(
        (space) =>
          x < space.x + space.width &&
          x + width > space.x &&
          y < space.y + space.height &&
          y + height > space.y
      );
    };

    const findAvailablePosition = (width: number, height: number) => {
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      for (
        let radius = 0;
        radius < Math.max(rect.width, rect.height);
        radius += 8
      ) {
        for (let angle = 0; angle < 360; angle += 15) {
          const rad = angle * (Math.PI / 180);
          const x = centerX + radius * Math.cos(rad) - width / 2;
          const y = centerY + radius * Math.sin(rad) - height / 2;
          if (isPositionAvailable(x, y, width, height)) return { x, y };
        }
      }
      return {
        x: Math.random() * (rect.width - width),
        y: Math.random() * (rect.height - height),
      };
    };

    topWords.forEach((word, i) => {
      const fontSize = isMobile
        ? 10 + ((word.value - minValue) / (maxValue - minValue)) * 20
        : 14 + ((word.value - minValue) / (maxValue - minValue)) * 36;

      ctx.font = `${Math.round(fontSize)}px Arial`;
      ctx.fillStyle = colors[i % colors.length];

      const metrics = ctx.measureText(word.text);
      const width = metrics.width;
      const height = fontSize;

      const { x, y } = findAvailablePosition(width, height);
      ctx.fillText(word.text, x, y + height / 2);

      occupiedSpaces.push({ x, y, width, height });
    });
  }, [wordFrequency]);

  return (
    <div className="h-[400px] w-full">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
}
