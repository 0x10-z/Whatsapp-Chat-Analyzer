import { createContext, useContext, useState } from "react";
import { useTranslation, translations } from "@/i18n";

// 1. Define los códigos de idioma
export type LanguageCode = "es" | "en" | "eu" | "ca";

export const LANGUAGES: { code: LanguageCode; label: string; flag: string }[] =
  [
    { code: "es", label: "Español", flag: "🇪🇸" },
    { code: "en", label: "English", flag: "🇬🇧" },
    { code: "eu", label: "Euskera", flag: "🇪🇺" },
    { code: "ca", label: "Català", flag: "🇦🇩" },
  ];

// 2. Extrae el tipo exacto de las traducciones
export type TranslationStrings = (typeof translations)["es"]; // o "en"

// 3. Define el tipo del contexto
interface TranslationContextValue {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  t: TranslationStrings;
}

// 4. Crea el contexto
const TranslationContext = createContext<TranslationContextValue | undefined>(
  undefined
);

// 5. Proveedor del contexto
export const TranslationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [language, setLanguage] = useState<LanguageCode>("es");
  const t = useTranslation(language);

  return (
    <TranslationContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </TranslationContext.Provider>
  );
};

// 6. Hook personalizado para usar el contexto
export const useTranslationContext = () => {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error(
      "useTranslationContext must be used within a TranslationProvider"
    );
  }
  return context;
};
