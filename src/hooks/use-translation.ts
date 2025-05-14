// useTranslation.ts
import { translations } from "@/i18n";

export function useTranslation(lang: keyof typeof translations) {
  return translations[lang] || translations["es"];
}
