import { MessageSquare, Clock, BarChart3, Zap, Award } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import MessageCountChart from "@/components/message-count-chart";
import TimeActivityChart from "@/components/time-activity-chart";
import WordCloudChart from "@/components/word-cloud-chart";
import TopParticipants from "@/components/top-participants";
import FunFacts from "@/components/fun-facts";
import type { ChatData } from "./chat-analyzer";
import { useTranslationContext } from "@/contexts/translation-context";
import EmojiCloudChart from "./emoji-cloud-chart";

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
  const { t } = useTranslationContext();

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
      <TabsList className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 w-full h-full gap-2 bg-white/80 dark:bg-gray-800/80 shadow-lg rounded-lg backdrop-blur border border-border p-2">
        <TabsTrigger
          value="participants"
          className="flex flex-col items-center justify-center text-xs sm:text-sm p-2 rounded-md transition-colors hover:bg-green-50 dark:hover:bg-green-800/40 data-[state=active]:bg-green-100 dark:data-[state=active]:bg-green-900/60 data-[state=active]:text-green-800 dark:data-[state=active]:text-green-100">
          <MessageSquare className="h-5 w-5 mb-1 text-green-600 dark:text-green-400 group-data-[state=active]:text-inherit" />
          {t.tabs.participants}
        </TabsTrigger>

        <TabsTrigger
          value="time"
          className="flex flex-col items-center justify-center text-xs sm:text-sm p-2 rounded-md transition-colors hover:bg-blue-50 dark:hover:bg-blue-800/40 data-[state=active]:bg-blue-100 dark:data-[state=active]:bg-blue-900/60 data-[state=active]:text-blue-800 dark:data-[state=active]:text-blue-100">
          <Clock className="h-5 w-5 mb-1 text-blue-600 dark:text-blue-400 group-data-[state=active]:text-inherit" />
          {t.tabs.activity}
        </TabsTrigger>

        <TabsTrigger
          value="words"
          className="flex flex-col items-center justify-center text-xs sm:text-sm p-2 rounded-md transition-colors hover:bg-purple-50 dark:hover:bg-purple-800/40 data-[state=active]:bg-purple-100 dark:data-[state=active]:bg-purple-900/60 data-[state=active]:text-purple-800 dark:data-[state=active]:text-purple-100">
          <BarChart3 className="h-5 w-5 mb-1 text-purple-600 dark:text-purple-400 group-data-[state=active]:text-inherit" />
          {t.tabs.words}
        </TabsTrigger>

        <TabsTrigger
          value="stats"
          className="flex flex-col items-center justify-center text-xs sm:text-sm p-2 rounded-md transition-colors hover:bg-amber-50 dark:hover:bg-amber-800/40 data-[state=active]:bg-amber-100 dark:data-[state=active]:bg-amber-900/60 data-[state=active]:text-amber-800 dark:data-[state=active]:text-amber-100">
          <Zap className="h-5 w-5 mb-1 text-amber-600 dark:text-amber-400 group-data-[state=active]:text-inherit" />
          {t.tabs.stats}
        </TabsTrigger>

        <TabsTrigger
          value="fun"
          className="flex flex-col items-center justify-center text-xs sm:text-sm p-2 rounded-md transition-colors hover:bg-pink-50 dark:hover:bg-pink-800/40 data-[state=active]:bg-pink-100 dark:data-[state=active]:bg-pink-900/60 data-[state=active]:text-pink-800 dark:data-[state=active]:text-pink-100">
          <Award className="h-5 w-5 mb-1 text-pink-600 dark:text-pink-400 group-data-[state=active]:text-inherit" />
          {t.tabs.fun}
        </TabsTrigger>
      </TabsList>

      <TabsContent value="participants" className="mt-0">
        <Card className="bg-white dark:bg-gray-800 shadow-lg">
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold mb-4">
              {t.titles.mostTalkative}
            </h2>
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
            <h2 className="text-2xl font-bold mb-4">{t.titles.timeActivity}</h2>
            <TimeActivityChart timeActivity={chatData.timeActivity} />
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="words" className="mt-0">
        <Card className="bg-white dark:bg-gray-800 shadow-lg">
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold mb-4">{t.titles.wordCloud}</h2>
            <WordCloudChart wordFrequency={chatData.wordFrequency} />
            <EmojiCloudChart emojiFrequency={chatData.emojiFrequency} />
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="stats" className="mt-0">
        <Card className="bg-white dark:bg-gray-800 shadow-lg">
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold mb-4">{t.titles.stats}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {t.stats.period}
                  </p>
                  <p className="text-lg font-medium">
                    {chatData.dateRange.start} - {chatData.dateRange.end}
                  </p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {t.stats.mostActiveDay}
                  </p>
                  <p className="text-lg font-medium">
                    {chatData.mostActiveDay.date} (
                    {chatData.mostActiveDay.count} {t.stats.messages})
                  </p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {t.stats.avgWords}
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
                    {t.stats.totalParticipants}
                  </p>
                  <p className="text-lg font-medium">
                    {chatData.participants.length}
                  </p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {t.stats.totalMedia}
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
                    {t.stats.mostUsedWord}
                  </p>
                  <p className="text-lg font-medium">
                    {chatData.wordFrequency[0]?.text || t.na} (
                    {chatData.wordFrequency[0]?.value || 0} {t.times})
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
            <h2 className="text-2xl font-bold mb-4">{t.titles.funFacts}</h2>
            <FunFacts chatData={chatData} />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
