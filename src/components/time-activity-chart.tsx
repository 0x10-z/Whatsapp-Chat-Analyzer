import { useEffect, useRef } from "react";
import type { TimeActivity } from "./chat-analyzer";
import { useTranslationContext } from "@/contexts/translation-context";

interface TimeActivityChartProps {
  timeActivity: TimeActivity[];
}

export default function TimeActivityChart({
  timeActivity,
}: TimeActivityChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { t } = useTranslationContext();

  const mostActive = timeActivity.reduce((a, b) => (a.count > b.count ? a : b));
  const leastActive = timeActivity.reduce((a, b) =>
    a.count < b.count ? a : b
  );

  useEffect(() => {
    if (!canvasRef.current || timeActivity.length === 0) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const maxCount = Math.max(...timeActivity.map((item) => item.count));
    const margin = { top: 30, right: 20, bottom: 50, left: 40 };
    const width = rect.width - margin.left - margin.right;
    const height = rect.height - margin.top - margin.bottom;
    const barWidth = width / timeActivity.length;

    ctx.beginPath();
    ctx.moveTo(margin.left, rect.height - margin.bottom);
    ctx.lineTo(rect.width - margin.right, rect.height - margin.bottom);
    ctx.strokeStyle = "#ccc";
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(margin.left, margin.top);
    ctx.lineTo(margin.left, rect.height - margin.bottom);
    ctx.stroke();

    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    ctx.fillStyle = "#1f2937";
    ctx.font = "12px Arial";

    const showEvery = rect.width < 400 ? 4 : 2;
    for (let i = 0; i < timeActivity.length; i += showEvery) {
      const x = margin.left + i * barWidth + barWidth / 2;
      ctx.fillText(
        `${timeActivity[i].hour}:00`,
        x,
        rect.height - margin.bottom + 8
      );
    }

    ctx.textAlign = "right";
    ctx.textBaseline = "middle";
    const yStep = maxCount / 5;

    for (let i = 0; i <= 5; i++) {
      const y = rect.height - margin.bottom - (i * height) / 5;
      const value = Math.round(i * yStep);
      ctx.fillText(value.toString(), margin.left - 8, y);

      ctx.beginPath();
      ctx.moveTo(margin.left, y);
      ctx.lineTo(rect.width - margin.right, y);
      ctx.strokeStyle = "#e5e7eb";
      ctx.setLineDash([4, 4]);
      ctx.stroke();
      ctx.setLineDash([]);
    }

    timeActivity.forEach((item, index) => {
      const x = margin.left + index * barWidth;
      const barHeight = (item.count / maxCount) * height;
      const y = rect.height - margin.bottom - barHeight;

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

      if (item.count === maxCount) {
        ctx.strokeStyle = "#f59e0b";
        ctx.lineWidth = 2;
        ctx.strokeRect(x + 2, y, barWidth - 4, barHeight);
        ctx.lineWidth = 1;
      }
    });

    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    ctx.font = "bold 16px Arial";
    ctx.fillStyle = "#3B82F6";
    ctx.fillText(t.activityChartTitle, rect.width / 2, margin.top / 2);
  }, [timeActivity, t]);

  return (
    <div className="w-full">
      <div className="h-[400px]">
        <canvas ref={canvasRef} className="w-full h-full" />
      </div>
      <div className="mt-6 text-center space-y-2">
        <p className="text-lg font-medium text-green-700 dark:text-green-300 italic">
          {t.activity.mostActive.replace("{hour}", mostActive.hour.toString())}
        </p>
        <p className="text-lg font-medium text-gray-600 dark:text-gray-400 italic">
          {t.activity.leastActive.replace(
            "{hour}",
            leastActive.hour.toString()
          )}
        </p>
      </div>
    </div>
  );
}
