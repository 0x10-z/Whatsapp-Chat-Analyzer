import type { Participant } from "./chat-analyzer";
import { useTranslationContext } from "@/contexts/translation-context";

interface TopParticipantsProps {
  participants: Participant[];
}

export default function TopParticipants({
  participants,
}: TopParticipantsProps) {
  const { t } = useTranslationContext();

  const sortedParticipants = [...participants].sort(
    (a, b) => b.messageCount - a.messageCount
  );

  const totalMessages = participants.reduce(
    (sum, p) => sum + p.messageCount,
    0
  );

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">{t.topParticipants.title}</h3>

      {sortedParticipants.slice(0).map((participant, index) => (
        <div key={index} className="space-y-2">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: participant.color }}
              />
              <span className="font-medium">{participant.name}</span>
            </div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {participant.messageCount} {t.topParticipants.messages}
            </span>
          </div>

          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
            <div
              className="h-2.5 rounded-full"
              style={{
                width: `${(participant.messageCount / totalMessages) * 100}%`,
                backgroundColor: participant.color,
              }}
            />
          </div>

          <div className="grid grid-cols-3 gap-2 text-xs text-gray-500 dark:text-gray-400">
            <div className="bg-gray-50 dark:bg-gray-800 p-2 rounded">
              <p className="font-medium">{t.topParticipants.words}</p>
              <p>{participant.wordCount}</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 p-2 rounded">
              <p className="font-medium">{t.topParticipants.characters}</p>
              <p>{participant.characterCount}</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 p-2 rounded">
              <p className="font-medium">{t.topParticipants.media}</p>
              <p>{participant.mediaCount}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
