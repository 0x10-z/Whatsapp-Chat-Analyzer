import { Card, CardContent } from "@/components/ui/card";
import { MessageSquare, Award, Clock } from "lucide-react";
import type { ChatData } from "@/components/chat-analyzer";

interface GroupAnalysisHeaderProps {
  chatData: ChatData;
}

export default function GroupAnalysisHeader({
  chatData,
}: GroupAnalysisHeaderProps) {
  const mostActiveHour = chatData.timeActivity.reduce((max, current) =>
    current.count > max.count ? current : max
  ).hour;

  return (
    <Card className="bg-white dark:bg-gray-800 shadow-lg">
      <CardContent className="p-6">
        {chatData.groupName && (
          <div className="mb-4 text-center">
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">
              Análisis del grupo:{" "}
              <span className="text-green-600 dark:text-green-400">
                {chatData.groupName}
              </span>
            </h2>
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-green-50 dark:bg-green-900/30 p-4 rounded-lg flex items-center space-x-4">
            <div className="bg-green-100 dark:bg-green-800 p-3 rounded-full">
              <MessageSquare className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Total de mensajes
              </p>
              <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                {chatData.totalMessages.toLocaleString()}
              </p>
            </div>
          </div>

          <div className="bg-purple-50 dark:bg-purple-900/30 p-4 rounded-lg flex items-center space-x-4">
            <div className="bg-purple-100 dark:bg-purple-800 p-3 rounded-full">
              <Award className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Participante más activo
              </p>
              <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                {chatData.participants[0]?.name || "N/A"}
              </p>
            </div>
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg flex items-center space-x-4">
            <div className="bg-blue-100 dark:bg-blue-800 p-3 rounded-full">
              <Clock className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Hora más activa
              </p>
              <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                {mostActiveHour}:00
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
