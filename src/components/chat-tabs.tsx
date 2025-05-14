import { MessageSquare, Clock, BarChart3, Zap, Award } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import MessageCountChart from "@/components/message-count-chart";
import TimeActivityChart from "@/components/time-activity-chart";
import WordCloudChart from "@/components/word-cloud-chart";
import TopParticipants from "@/components/top-participants";
import FunFacts from "@/components/fun-facts";
import type { ChatData } from "./chat-analyzer";

interface ChatTabsProps {
  chatData: ChatData;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function ChatTabs({
  chatData,
  activeTab,
  setActiveTab,
}: ChatTabsProps) {
  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
      <TabsList className="grid grid-cols-2 md:grid-cols-5 w-full bg-white dark:bg-gray-800 shadow-md">
        <TabsTrigger
          value="participants"
          className="data-[state=active]:bg-green-100 dark:data-[state=active]:bg-green-900/50">
          <MessageSquare className="h-4 w-4 mr-2" /> Participantes
        </TabsTrigger>
        <TabsTrigger
          value="time"
          className="data-[state=active]:bg-blue-100 dark:data-[state=active]:bg-blue-900/50">
          <Clock className="h-4 w-4 mr-2" /> Actividad
        </TabsTrigger>
        <TabsTrigger
          value="words"
          className="data-[state=active]:bg-purple-100 dark:data-[state=active]:bg-purple-900/50">
          <BarChart3 className="h-4 w-4 mr-2" /> Palabras
        </TabsTrigger>
        <TabsTrigger
          value="stats"
          className="data-[state=active]:bg-amber-100 dark:data-[state=active]:bg-amber-900/50">
          <Zap className="h-4 w-4 mr-2" /> Estadísticas
        </TabsTrigger>
        <TabsTrigger
          value="fun"
          className="data-[state=active]:bg-pink-100 dark:data-[state=active]:bg-pink-900/50">
          <Award className="h-4 w-4 mr-2" /> Curiosidades
        </TabsTrigger>
      </TabsList>

      <TabsContent value="participants" className="mt-0">
        <Card className="bg-white dark:bg-gray-800 shadow-lg">
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold mb-4">¿Quién habla más?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <MessageCountChart participants={chatData.participants} />
              <TopParticipants participants={chatData.participants} />
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="time" className="mt-0">
        <Card className="bg-white dark:bg-gray-800 shadow-lg">
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold mb-4">¿Cuándo hablan más?</h2>
            <TimeActivityChart timeActivity={chatData.timeActivity} />
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="words" className="mt-0">
        <Card className="bg-white dark:bg-gray-800 shadow-lg">
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold mb-4">Palabras más usadas</h2>
            <WordCloudChart wordFrequency={chatData.wordFrequency} />
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="stats" className="mt-0">
        <Card className="bg-white dark:bg-gray-800 shadow-lg">
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold mb-4">Estadísticas generales</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Periodo del chat
                  </p>
                  <p className="text-lg font-medium">
                    {chatData.dateRange.start} - {chatData.dateRange.end}
                  </p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Día más activo
                  </p>
                  <p className="text-lg font-medium">
                    {chatData.mostActiveDay.date} (
                    {chatData.mostActiveDay.count} mensajes)
                  </p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Promedio de palabras por mensaje
                  </p>
                  <p className="text-lg font-medium">
                    {Math.round(
                      chatData.participants.reduce(
                        (sum, p) => sum + p.wordCount,
                        0
                      ) / chatData.totalMessages
                    )}
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Total de participantes
                  </p>
                  <p className="text-lg font-medium">
                    {chatData.participants.length}
                  </p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Total de multimedia
                  </p>
                  <p className="text-lg font-medium">
                    {chatData.participants.reduce(
                      (sum, p) => sum + p.mediaCount,
                      0
                    )}
                  </p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Palabra más usada
                  </p>
                  <p className="text-lg font-medium">
                    {chatData.wordFrequency[0]?.text || "N/A"} (
                    {chatData.wordFrequency[0]?.value || 0} veces)
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="fun" className="mt-0">
        <Card className="bg-white dark:bg-gray-800 shadow-lg">
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold mb-4">Curiosidades del chat</h2>
            <FunFacts chatData={chatData} />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
