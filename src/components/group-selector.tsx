import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface GroupSelectorProps {
  groupName: string;
  setGroupName: (name: string) => void;
  detectedParticipants: string[];
  onCancel: () => void;
  onContinue: () => void;
}

export default function GroupSelector({
  groupName,
  setGroupName,
  detectedParticipants,
  onCancel,
  onContinue,
}: GroupSelectorProps) {
  return (
    <Card className="bg-white dark:bg-gray-800 shadow-lg">
      <CardContent className="p-6">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
            Selecciona el nombre del grupo
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-md mx-auto">
            Elige el nombre del grupo para excluirlo de las estadísticas de
            participantes
          </p>

          <div className="mt-6 max-h-60 overflow-y-auto">
            <div className="space-y-2">
              {detectedParticipants.map((name) => (
                <div
                  key={name}
                  className={`p-3 rounded-lg cursor-pointer transition-colors ${
                    groupName === name
                      ? "bg-green-100 dark:bg-green-900 border-2 border-green-500"
                      : "bg-gray-50 dark:bg-gray-700 hover:bg-green-50 dark:hover:bg-green-900/30"
                  }`}
                  onClick={() => setGroupName(name)}>
                  <p className="font-medium">{name}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 flex justify-center space-x-4">
            <Button
              variant="outline"
              onClick={onCancel}
              className="border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors">
              Cancelar
            </Button>
            <Button
              onClick={onContinue}
              disabled={!groupName}
              className="bg-green-600 hover:bg-green-700 text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
              Continuar
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
