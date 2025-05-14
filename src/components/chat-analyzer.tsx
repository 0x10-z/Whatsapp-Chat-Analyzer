import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import ChatTabs from "@/components/chat-tabs";
import GroupAnalysisHeader from "@/components/chat-header";
import UploadSection from "@/components/upload-secton";
import GroupSelector from "@/components/grouup-selector";
import { generateFakeData } from "@/fakeData";
import { detectParticipants, parseWhatsAppChat } from "@/utils";

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

// Actualizar el tipo ChatData para incluir el nombre del grupo
export type ChatData = {
  participants: Participant[];
  timeActivity: TimeActivity[];
  wordFrequency: WordFrequency[];
  totalMessages: number;
  dateRange: { start: string; end: string };
  mostActiveDay: { date: string; count: number };
  groupName?: string;
};

export default function ChatAnalyzer() {
  // Añadir un nuevo estado para el nombre del grupo y un estado para el paso de selección
  const [groupName, setGroupName] = useState<string>("");
  const [isSelectingGroup, setIsSelectingGroup] = useState<boolean>(false);
  const [detectedParticipants, setDetectedParticipants] = useState<string[]>(
    []
  );
  const [chatData, setChatData] = useState<ChatData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("participants");
  // Guardar el texto del chat para usarlo después de seleccionar el grupo
  const [chatText, setChatText] = useState<string>("");

  // Modificar la función handleFileUpload para detectar participantes primero
  const handleFileUpload = async (file: File) => {
    setIsLoading(true);

    try {
      const text = await file.text();
      // Guardar el texto del chat para usarlo después
      setChatText(text);
      // Detectar participantes primero
      const participants = detectParticipants(text);
      setDetectedParticipants(participants);
      setIsSelectingGroup(true);
    } catch (error) {
      console.error("Error parsing chat:", error);
      alert(
        "Error al analizar el chat. Por favor, asegúrate de que es un archivo de chat de WhatsApp válido."
      );
      setIsLoading(false);
    }
  };

  // Añadir función para procesar el chat después de seleccionar el grupo
  const processChat = () => {
    setIsLoading(true);
    try {
      // Usar el texto del chat guardado anteriormente
      const parsedData = parseWhatsAppChat(chatText, groupName);
      setChatData(parsedData);
    } catch (error) {
      console.error("Error parsing chat:", error);
      alert(
        "Error al analizar el chat. Por favor, asegúrate de que es un archivo de chat de WhatsApp válido."
      );
    } finally {
      setIsLoading(false);
      setIsSelectingGroup(false);
    }
  };

  // Modificar el return para incluir la selección de grupo y mostrar el nombre del grupo
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
                alert("Por favor, selecciona el nombre del grupo");
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
            <h2 className="text-xl font-semibold">Analizando tu chat...</h2>
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
              className="bg-white dark:bg-gray-800">
              Analizar otro chat
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
