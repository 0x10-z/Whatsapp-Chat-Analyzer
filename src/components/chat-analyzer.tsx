import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import ChatTabs from "@/components/chat-tabs";
import GroupAnalysisHeader from "@/components/chat-header";
import UploadSection from "@/components/upload-secton";
import GroupSelector from "@/components/group-selector";
import { generateFakeData } from "@/fakeData";
import { detectParticipants, parseWhatsAppChat } from "@/utils";
import { useTranslationContext } from "@/contexts/translation-context";

export type Participant = {
  name: string;
  messageCount: number;
  wordCount: number;
  characterCount: number;
  mediaCount: number;
  color: string;
};

export type TimeActivity = {
  hour: number;
  count: number;
};

export type WordFrequency = {
  text: string;
  value: number;
};

export type EmojiFrequency = {
  text: string;
  value: number;
};

export type ChatData = {
  participants: Participant[];
  timeActivity: TimeActivity[];
  wordFrequency: WordFrequency[];
  emojiFrequency: EmojiFrequency[];
  totalMessages: number;
  dateRange: { start: string; end: string };
  mostActiveDay: { date: string; count: number };
  groupName?: string;
};

export default function ChatAnalyzer() {
  const [groupName, setGroupName] = useState<string>("");
  const [isSelectingGroup, setIsSelectingGroup] = useState<boolean>(false);
  const [detectedParticipants, setDetectedParticipants] = useState<string[]>(
    []
  );
  const [chatData, setChatData] = useState<ChatData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("participants");
  const [chatText, setChatText] = useState<string>("");

  const { t } = useTranslationContext();

  const handleFileUpload = async (file: File) => {
    setIsLoading(true);
    try {
      const text = await file.text();
      setChatText(text);
      const participants = detectParticipants(text);
      setDetectedParticipants(participants);
      setIsSelectingGroup(true);
    } catch (error) {
      console.error("Error parsing chat:", error);
      alert(t.alertInvalid);
      setIsLoading(false);
    }
  };

  const processChat = () => {
    setIsLoading(true);
    try {
      const parsedData = parseWhatsAppChat(chatText, groupName);
      setChatData(parsedData);
    } catch (error) {
      console.error("Error parsing chat:", error);
      alert(t.alertInvalid);
    } finally {
      setIsLoading(false);
      setIsSelectingGroup(false);
    }
  };

  return (
    <div className="space-y-6">
      {!chatData ? (
        isSelectingGroup ? (
          <GroupSelector
            groupName={groupName}
            setGroupName={setGroupName}
            detectedParticipants={detectedParticipants}
            onCancel={() => {
              setIsSelectingGroup(false);
              setIsLoading(false);
            }}
            onContinue={() => {
              if (groupName) {
                processChat();
              } else {
                alert(t.alertNoGroup);
              }
            }}
          />
        ) : (
          <UploadSection
            handleFileUpload={handleFileUpload}
            generateFakeData={generateFakeData}
            setChatData={setChatData}
            setIsLoading={setIsLoading}
            setGroupName={setGroupName}
          />
        )
      ) : isLoading ? (
        <Card className="bg-white dark:bg-gray-800 shadow-lg p-8">
          <div className="text-center space-y-4">
            <h2 className="text-xl font-semibold">{t.analyzing}</h2>
            <Progress value={45} className="w-full" />
          </div>
        </Card>
      ) : (
        <>
          <GroupAnalysisHeader chatData={chatData} />
          <ChatTabs
            chatData={chatData}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
          <div className="text-center mt-8">
            <Button
              variant="outline"
              onClick={() => {
                setChatData(null);
                setActiveTab("participants");
                setGroupName("");
                setChatText("");
              }}
              className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 hover:bg-green-100 dark:hover:bg-green-800 hover:text-green-900 dark:hover:text-green-100 transition-colors shadow-sm hover:shadow-md">
              {t.analyzeAnother}
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
