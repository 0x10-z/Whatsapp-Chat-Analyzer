import { useEffect, useRef } from "react";
import type { Participant } from "./chat-analyzer";

interface MessageCountChartProps {
  participants: Participant[];
}

export default function MessageCountChart({
  participants,
}: MessageCountChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || participants.length === 0) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const size = canvas.parentElement?.clientWidth || 300;
    const sizePx = size * dpr;

    canvas.width = sizePx;
    canvas.height = sizePx;
    ctx.scale(dpr, dpr);

    const centerX = size / 2;
    const centerY = size / 2;
    const radius = size * 0.3;

    ctx.clearRect(0, 0, size, size);

    const total = participants.reduce((sum, p) => sum + p.messageCount, 0);
    let startAngle = 0;

    participants.forEach((p) => {
      const portion = p.messageCount / total;
      const endAngle = startAngle + portion * 2 * Math.PI;

      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, startAngle, endAngle);
      ctx.closePath();
      ctx.fillStyle = p.color;
      ctx.fill();

      // Etiquetas si son visibles
      if (portion > 0.08) {
        const angle = startAngle + (endAngle - startAngle) / 2;
        const x = centerX + Math.cos(angle) * radius * 0.6;
        const y = centerY + Math.sin(angle) * radius * 0.6;
        ctx.fillStyle = "#fff";
        ctx.font = "bold 12px sans-serif";
        ctx.textAlign = "center";
        ctx.fillText(`${Math.round(portion * 100)}%`, x, y);
      }

      startAngle = endAngle;
    });
  }, [participants]);

  return (
    <div className="flex flex-col items-center gap-4 w-full">
      <div className="w-full max-w-[500px]">
        <canvas ref={canvasRef} className="w-full h-auto" />
      </div>
    </div>
  );
}
