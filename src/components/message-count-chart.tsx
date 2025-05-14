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
    if (!canvasRef.current || participants.length === 0) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Configurar el tamaño del canvas
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    // Configurar el estilo
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    // Calcular el total de mensajes
    const totalMessages = participants.reduce(
      (sum, p) => sum + p.messageCount,
      0
    );

    // Dibujar el gráfico de pastel
    let startAngle = 0;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const radius = Math.min(centerX, centerY) * 0.8;

    participants.forEach((participant, _) => {
      const portion = participant.messageCount / totalMessages;
      const endAngle = startAngle + portion * 2 * Math.PI;

      // Dibujar el sector
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, startAngle, endAngle);
      ctx.closePath();
      ctx.fillStyle = participant.color;
      ctx.fill();

      // Calcular la posición para la etiqueta
      if (portion > 0.05) {
        // Solo mostrar etiquetas para porciones grandes
        const midAngle = startAngle + (endAngle - startAngle) / 2;
        const labelRadius = radius * 0.7;
        const labelX = centerX + Math.cos(midAngle) * labelRadius;
        const labelY = centerY + Math.sin(midAngle) * labelRadius;

        // Dibujar la etiqueta
        ctx.fillStyle = "#FFFFFF";
        ctx.font = "bold 14px Arial";
        ctx.fillText(`${Math.round(portion * 100)}%`, labelX, labelY);
      }

      startAngle = endAngle;
    });

    // Dibujar la leyenda
    const legendX = 10;
    let legendY = 20;
    const legendSpacing = 25;
    const legendSize = 15;

    participants.slice(0, 5).forEach((participant) => {
      // Dibujar el cuadrado de color
      ctx.fillStyle = participant.color;
      ctx.fillRect(legendX, legendY - legendSize / 2, legendSize, legendSize);

      // Dibujar el nombre
      ctx.fillStyle =
        getComputedStyle(document.documentElement)
          .getPropertyValue("--foreground")
          .trim() || "#000000";
      ctx.font = "14px Arial";
      ctx.textAlign = "left";
      ctx.fillText(
        `${
          participant.name.length > 15
            ? participant.name.substring(0, 15) + "..."
            : participant.name
        } (${participant.messageCount})`,
        legendX + legendSize + 5,
        legendY
      );

      legendY += legendSpacing;
    });
  }, [participants]);

  return (
    <div className="h-[300px] w-full">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
}
