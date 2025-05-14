import type { ChatData } from "./chat-analyzer";
import { Card } from "@/components/ui/card";
import { Award, Coffee, Moon, Sun, Zap } from "lucide-react";

interface FunFactsProps {
  chatData: ChatData;
}

export default function FunFacts({ chatData }: FunFactsProps) {
  // Encontrar la hora más activa
  const mostActiveHour = chatData.timeActivity.reduce(
    (max, current) => (current.count > max.count ? current : max),
    {
      hour: 0,
      count: 0,
    }
  );

  // Determinar si son más activos de día o de noche
  const dayHours = chatData.timeActivity.slice(8, 20); // 8am a 8pm
  const nightHours = [
    ...chatData.timeActivity.slice(0, 8),
    ...chatData.timeActivity.slice(20),
  ]; // 8pm a 8am

  const dayMessages = dayHours.reduce((sum, hour) => sum + hour.count, 0);
  const nightMessages = nightHours.reduce((sum, hour) => sum + hour.count, 0);

  const isDayPerson = dayMessages > nightMessages;

  // Calcular la longitud promedio de los mensajes por persona
  const avgMessageLengths = chatData.participants.map((p) => ({
    name: p.name,
    avgLength: p.characterCount / p.messageCount,
  }));

  // Persona que escribe mensajes más largos
  const longMessagePerson = [...avgMessageLengths].sort(
    (a, b) => b.avgLength - a.avgLength
  )[0];

  // Persona que escribe mensajes más cortos
  const shortMessagePerson = [...avgMessageLengths].sort(
    (a, b) => a.avgLength - b.avgLength
  )[0];

  // Persona que envía más multimedia
  const multimediaPerson = [...chatData.participants].sort(
    (a, b) => b.mediaCount - a.mediaCount
  )[0];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card className="p-4 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950 dark:to-orange-950 border-amber-200 dark:border-amber-800">
        <div className="flex items-start space-x-4">
          <div className="bg-amber-100 dark:bg-amber-900 p-3 rounded-full">
            <Coffee className="h-6 w-6 text-amber-600 dark:text-amber-400" />
          </div>
          <div>
            <h3 className="font-semibold text-lg">Hora del café</h3>
            <p className="text-gray-600 dark:text-gray-300">
              La hora más activa del chat es a las{" "}
              <span className="font-bold">{mostActiveHour.hour}:00</span>, con{" "}
              <span className="font-bold">{mostActiveHour.count}</span>{" "}
              mensajes.
            </p>
          </div>
        </div>
      </Card>

      <Card className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 border-blue-200 dark:border-blue-800">
        <div className="flex items-start space-x-4">
          {isDayPerson ? (
            <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full">
              <Sun className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
          ) : (
            <div className="bg-indigo-100 dark:bg-indigo-900 p-3 rounded-full">
              <Moon className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
            </div>
          )}
          <div>
            <h3 className="font-semibold text-lg">
              {isDayPerson ? "Personas diurnas" : "Búhos nocturnos"}
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Este grupo habla más durante {isDayPerson ? "el día" : "la noche"}
              , con un{" "}
              {Math.round(
                ((isDayPerson ? dayMessages : nightMessages) /
                  (dayMessages + nightMessages)) *
                  100
              )}
              % de los mensajes.
            </p>
          </div>
        </div>
      </Card>

      <Card className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 border-green-200 dark:border-green-800">
        <div className="flex items-start space-x-4">
          <div className="bg-green-100 dark:bg-green-900 p-3 rounded-full">
            <Zap className="h-6 w-6 text-green-600 dark:text-green-400" />
          </div>
          <div>
            <h3 className="font-semibold text-lg">Escritor/a prolífico/a</h3>
            <p className="text-gray-600 dark:text-gray-300">
              <span className="font-bold">{longMessagePerson.name}</span>{" "}
              escribe los mensajes más largos, con un promedio de{" "}
              <span className="font-bold">
                {Math.round(longMessagePerson.avgLength)}
              </span>{" "}
              caracteres por mensaje.
            </p>
          </div>
        </div>
      </Card>

      <Card className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950 border-purple-200 dark:border-purple-800">
        <div className="flex items-start space-x-4">
          <div className="bg-purple-100 dark:bg-purple-900 p-3 rounded-full">
            <Award className="h-6 w-6 text-purple-600 dark:text-purple-400" />
          </div>
          <div>
            <h3 className="font-semibold text-lg">
              Rey/Reina de la multimedia
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              <span className="font-bold">{multimediaPerson.name}</span> ha
              enviado
              <span className="font-bold">
                {" "}
                {multimediaPerson.mediaCount}
              </span>{" "}
              archivos multimedia.
            </p>
          </div>
        </div>
      </Card>

      <Card className="p-4 md:col-span-2 bg-gradient-to-br from-red-50 to-rose-50 dark:from-red-950 dark:to-rose-950 border-red-200 dark:border-red-800">
        <div className="flex items-start space-x-4">
          <div className="bg-red-100 dark:bg-red-900 p-3 rounded-full">
            <Award className="h-6 w-6 text-red-600 dark:text-red-400" />
          </div>
          <div>
            <h3 className="font-semibold text-lg">Datos curiosos</h3>
            <ul className="list-disc list-inside space-y-2 mt-2 text-gray-600 dark:text-gray-300">
              <li>
                <span className="font-bold">{shortMessagePerson.name}</span> es
                quien escribe los mensajes más cortos (promedio de{" "}
                {Math.round(shortMessagePerson.avgLength)} caracteres).
              </li>
              <li>
                La palabra más usada en el chat es{" "}
                <span className="font-bold">
                  {chatData.wordFrequency[0]?.text || "N/A"}
                </span>
                , que aparece {chatData.wordFrequency[0]?.value || 0} veces.
              </li>
              <li>
                El día más activo fue el{" "}
                <span className="font-bold">{chatData.mostActiveDay.date}</span>
                , con {chatData.mostActiveDay.count} mensajes.
              </li>
              <li>
                En promedio, cada mensaje contiene{" "}
                {Math.round(
                  chatData.participants.reduce(
                    (sum, p) => sum + p.wordCount,
                    0
                  ) / chatData.totalMessages
                )}{" "}
                palabras.
              </li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
}
