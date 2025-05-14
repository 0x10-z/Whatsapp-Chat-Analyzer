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

    // Configurar el tamaño del canvas
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    // Limpiar el canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Encontrar el valor máximo para escalar los tamaños de fuente
    const maxValue = Math.max(...wordFrequency.map((item) => item.value));
    const minValue = Math.min(...wordFrequency.map((item) => item.value));

    // Limitar a las 50 palabras más frecuentes para evitar aglomeración
    const topWords = wordFrequency.slice(0, 50);

    // Colores para las palabras
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

    // Posiciones ocupadas para evitar superposiciones
    const occupiedSpaces: {
      x: number;
      y: number;
      width: number;
      height: number;
    }[] = [];

    // Función para verificar si una posición está disponible
    const isPositionAvailable = (
      x: number,
      y: number,
      width: number,
      height: number
    ) => {
      // Verificar límites del canvas
      if (
        x < 0 ||
        y < 0 ||
        x + width > rect.width ||
        y + height > rect.height
      ) {
        return false;
      }

      // Verificar superposición con otras palabras
      for (const space of occupiedSpaces) {
        if (
          x < space.x + space.width &&
          x + width > space.x &&
          y < space.y + space.height &&
          y + height > space.y
        ) {
          return false;
        }
      }

      return true;
    };

    // Función para encontrar una posición disponible
    const findAvailablePosition = (width: number, height: number) => {
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Intentar en espiral desde el centro
      for (
        let radius = 0;
        radius < Math.max(rect.width, rect.height);
        radius += 10
      ) {
        for (let angle = 0; angle < 360; angle += 15) {
          const radian = (angle * Math.PI) / 180;
          const x = centerX + radius * Math.cos(radian) - width / 2;
          const y = centerY + radius * Math.sin(radian) - height / 2;

          if (isPositionAvailable(x, y, width, height)) {
            return { x, y };
          }
        }
      }

      // Si no se encuentra posición, devolver una posición aleatoria
      return {
        x: Math.random() * (rect.width - width),
        y: Math.random() * (rect.height - height),
      };
    };

    // Dibujar las palabras
    topWords.forEach((word, index) => {
      // Calcular el tamaño de la fuente basado en la frecuencia
      const fontSize =
        12 + ((word.value - minValue) / (maxValue - minValue)) * 36;

      ctx.font = `${Math.round(fontSize)}px Arial`;
      ctx.fillStyle = colors[index % colors.length];

      // Medir el tamaño del texto
      const metrics = ctx.measureText(word.text);
      const width = metrics.width;
      const height = fontSize;

      // Encontrar una posición disponible
      const position = findAvailablePosition(width, height);

      // Dibujar el texto
      ctx.fillText(word.text, position.x, position.y + height / 2);

      // Marcar el espacio como ocupado
      occupiedSpaces.push({
        x: position.x,
        y: position.y,
        width,
        height,
      });
    });
  }, [wordFrequency]);

  return (
    <div className="h-[400px] w-full">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
}
