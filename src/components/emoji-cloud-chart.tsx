import { useEffect, useRef } from "react";
import type { EmojiFrequency } from "@/components/chat-analyzer";

interface EmojiCloudChartProps {
  emojiFrequency: EmojiFrequency[];
}

export default function EmojiCloudChart({
  emojiFrequency,
}: EmojiCloudChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current || !emojiFrequency || emojiFrequency.length === 0)
      return;

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
    const maxEmojis = isMobile ? 20 : 40;

    const topEmojis = emojiFrequency.slice(0, maxEmojis);
    const maxValue = Math.max(...topEmojis.map((e) => e.value));
    const minValue = Math.min(...topEmojis.map((e) => e.value));

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

    topEmojis.forEach((emoji) => {
      const fontSize = isMobile
        ? 18 + ((emoji.value - minValue) / (maxValue - minValue)) * 20
        : 24 + ((emoji.value - minValue) / (maxValue - minValue)) * 40;

      ctx.font = `${Math.round(fontSize)}px Arial`;
      ctx.fillStyle = "#000";

      const metrics = ctx.measureText(emoji.text);
      const width = metrics.width;
      const height = fontSize;

      const { x, y } = findAvailablePosition(width, height);
      ctx.fillText(emoji.text, x, y + height / 2);

      occupiedSpaces.push({ x, y, width, height });
    });
  }, [emojiFrequency]);

  return (
    <div className="h-[400px] w-full">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
}
