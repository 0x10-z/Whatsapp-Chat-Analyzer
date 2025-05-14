import { Upload } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import FileUploader from "@/components/file-uploader";
import type { ChatData } from "@/components/chat-analyzer";

interface UploadSectionProps {
  handleFileUpload: (file: File) => void;
  generateFakeData: () => ChatData;
  setChatData: (data: ChatData) => void;
  setIsLoading: (loading: boolean) => void;
  setGroupName: (name: string) => void;
}

export default function UploadSection({
  handleFileUpload,
  generateFakeData,
  setChatData,
  setIsLoading,
  setGroupName,
}: UploadSectionProps) {
  return (
    <Card className="bg-white dark:bg-gray-800 shadow-lg">
      <CardContent className="p-6">
        <div className="text-center space-y-4">
          <div className="bg-green-100 dark:bg-green-900 p-4 rounded-full w-20 h-20 mx-auto flex items-center justify-center">
            <Upload className="h-10 w-10 text-green-600 dark:text-green-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
            Sube tu chat de WhatsApp
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-md mx-auto">
            Exporta un chat desde WhatsApp y súbelo aquí para descubrir
            estadísticas interesantes
          </p>

          <div className="mt-6">
            <FileUploader onFileUpload={handleFileUpload} />
          </div>

          <div className="mt-4">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-300 dark:border-gray-600" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                  o
                </span>
              </div>
            </div>
            <Button
              onClick={() => {
                setIsLoading(true);
                setTimeout(() => {
                  setGroupName("Amigos del instituto");
                  setChatData(generateFakeData());
                  setIsLoading(false);
                }, 800);
              }}
              variant="outline"
              className="mt-4 w-full transition-all duration-200 ease-in-out border-gray-300 dark:border-gray-600 hover:bg-green-100 dark:hover:bg-green-800 hover:text-green-900 dark:hover:text-green-100 hover:shadow-md">
              Usar datos de ejemplo
            </Button>
          </div>

          <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
            <p>
              Tus datos no se almacenan en ningún servidor. Todo el análisis se
              realiza en tu navegador.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
