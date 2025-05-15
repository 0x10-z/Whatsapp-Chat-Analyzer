import ChatAnalyzer from "@/components/chat-analyzer";
import { useTranslationContext } from "@/contexts/translation-context";
import LanguageDropdown from "./components/language-dropdown";

export default function App() {
  const { t, language, setLanguage } = useTranslationContext();

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
      <div className="absolute top-1 right-4 flex items-center gap-3 z-50">
        <LanguageDropdown language={language} setLanguage={setLanguage} />
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
