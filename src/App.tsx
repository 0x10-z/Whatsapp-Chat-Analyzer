import { useState, useEffect } from "react";
import ChatAnalyzer from "@/components/chat-analyzer";
import { useTranslation } from "@/hooks/use-translation";

type LanguageCode = "es" | "en" | "eu" | "ca";

const LANGUAGES: { code: LanguageCode; label: string; flag: string }[] = [
  { code: "es", label: "Español", flag: "🇪🇸" },
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "eu", label: "Euskera", flag: "🇪🇺" },
  { code: "ca", label: "Català", flag: "🇦🇩" },
];

export default function App() {
  const [language, setLanguage] = useState<LanguageCode>("es");
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const t = useTranslation(language);

  useEffect(() => {
    const stored = localStorage.getItem("theme") as "light" | "dark" | null;
    const system = window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
    const activeTheme = stored || system;
    setTheme(activeTheme);
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(activeTheme);
  }, []);

  return (
    <main className="relative min-h-screen bg-gradient-to-br from-green-50 to-teal-100 dark:from-green-950 dark:to-teal-900 px-4 py-10 md:px-8 overflow-hidden">
      {/* 🎨 Fondo Parallax */}
      <div
        className="absolute inset-0 bg-[url('/bg-pattern.jpg')] dark:bg-[url('/bg-pattern-dark.svg')] bg-fixed bg-cover bg-center opacity-20 pointer-events-none z-0"
        aria-hidden
      />

      {/* 📱 Logo WhatsApp esquina */}
      <img
        src="/whatsapp-logo.webp"
        alt="WhatsApp logo"
        className="fixed bottom-4 right-4 w-10 h-10 opacity-60 hover:opacity-100 hover:scale-110 transition-transform z-40"
      />

      {/* 🔧 Controles */}
      <div className="absolute top-4 right-4 flex items-center gap-3 z-50">
        <div className="relative inline-block text-left">
          <div className="group">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as LanguageCode)}
              className="appearance-none w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 pr-10 text-sm shadow-sm transition-all duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-500 hover:shadow-lg cursor-pointer">
              {LANGUAGES.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.flag} {lang.label}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 transition-transform duration-150 group-hover:rotate-180">
              ▼
            </div>
          </div>
        </div>
      </div>

      {/* 📄 Contenido */}
      <div className="relative z-10 max-w-5xl mx-auto">
        <header className="text-center mb-10">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-foreground transition-colors">
            {t.title}
          </h1>
          <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {t.description}
          </p>
        </header>

        <section className="animate-in fade-in duration-500">
          <ChatAnalyzer />
        </section>
      </div>
    </main>
  );
}
