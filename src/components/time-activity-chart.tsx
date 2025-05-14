import { useEffect, useRef } from "react";
import type { TimeActivity } from "./chat-analyzer";

interface TimeActivityChartProps {
  timeActivity: TimeActivity[];
}

export default function TimeActivityChart({
  timeActivity,
}: TimeActivityChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current || timeActivity.length === 0) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Configurar el tamaño del canvas
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    // Encontrar el valor máximo para escalar el gráfico
    const maxCount = Math.max(...timeActivity.map((item) => item.count));

    // Configurar márgenes y dimensiones
    const margin = { top: 20, right: 20, bottom: 40, left: 50 };
    const width = rect.width - margin.left - margin.right;
    const height = rect.height - margin.top - margin.bottom;

    // Calcular el ancho de cada barra
    const barWidth = width / timeActivity.length;

    // Dibujar el eje X
    ctx.beginPath();
    ctx.moveTo(margin.left, rect.height - margin.bottom);
    ctx.lineTo(rect.width - margin.right, rect.height - margin.bottom);
    ctx.strokeStyle =
      getComputedStyle(document.documentElement)
        .getPropertyValue("--border")
        .trim() || "#E5E7EB";
    ctx.stroke();

    // Dibujar el eje Y
    ctx.beginPath();
    ctx.moveTo(margin.left, margin.top);
    ctx.lineTo(margin.left, rect.height - margin.bottom);
    ctx.stroke();

    // Dibujar las etiquetas del eje X (horas)
    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    ctx.fillStyle =
      getComputedStyle(document.documentElement)
        .getPropertyValue("--foreground")
        .trim() || "#000000";
    ctx.font = "12px Arial";

    for (let i = 0; i < timeActivity.length; i += 2) {
      // Mostrar cada 2 horas para evitar aglomeración
      const x = margin.left + i * barWidth + barWidth / 2;
      ctx.fillText(
        `${timeActivity[i].hour}:00`,
        x,
        rect.height - margin.bottom + 10
      );
    }

    // Dibujar las etiquetas del eje Y (conteo)
    ctx.textAlign = "right";
    ctx.textBaseline = "middle";

    const yStep = maxCount / 5;
    for (let i = 0; i <= 5; i++) {
      const y = rect.height - margin.bottom - (i * height) / 5;
      const value = Math.round(i * yStep);
      ctx.fillText(value.toString(), margin.left - 10, y);

      // Dibujar líneas de cuadrícula horizontales
      ctx.beginPath();
      ctx.moveTo(margin.left, y);
      ctx.lineTo(rect.width - margin.right, y);
      ctx.strokeStyle =
        getComputedStyle(document.documentElement)
          .getPropertyValue("--border")
          .trim() || "#E5E7EB";
      ctx.setLineDash([5, 5]);
      ctx.stroke();
      ctx.setLineDash([]);
    }

    // Dibujar las barras
    timeActivity.forEach((item, index) => {
      const x = margin.left + index * barWidth;
      const barHeight = (item.count / maxCount) * height;
      const y = rect.height - margin.bottom - barHeight;

      // Gradiente para las barras
      const gradient = ctx.createLinearGradient(
        0,
        y,
        0,
        rect.height - margin.bottom
      );
      gradient.addColorStop(0, "#3B82F6");
      gradient.addColorStop(1, "#93C5FD");

      ctx.fillStyle = gradient;
      ctx.fillRect(x + 2, y, barWidth - 4, barHeight);

      // Resaltar la hora más activa
      if (item.count === maxCount) {
        ctx.strokeStyle = "#EF4444";
        ctx.lineWidth = 2;
        ctx.strokeRect(x + 2, y, barWidth - 4, barHeight);
        ctx.lineWidth = 1;
      }
    });

    // Título del gráfico
    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    ctx.font = "bold 16px Arial";
    ctx.fillStyle =
      getComputedStyle(document.documentElement)
        .getPropertyValue("--foreground")
        .trim() || "#000000";
    ctx.fillText("Actividad por hora del día", rect.width / 2, margin.top / 2);
  }, [timeActivity]);

  return (
    <div className="h-[400px] w-full">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
}
