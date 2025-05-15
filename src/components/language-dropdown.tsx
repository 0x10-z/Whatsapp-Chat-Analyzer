import { useState } from "react";
import { ChevronDown, Check } from "lucide-react";
import clsx from "clsx";
import { LANGUAGES, type LanguageCode } from "@/contexts/translation-context";

export default function LanguageDropdown({
  language,
  setLanguage,
}: {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
}) {
  const [open, setOpen] = useState(false);
  const selected = LANGUAGES.find((l) => l.code === language);

  return (
    <div className="relative w-44 text-sm">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-4 py-2 rounded-lg shadow-sm hover:shadow-md transition">
        <div className="flex items-center gap-2">
          <img
            src={`/flags/${selected?.flag}.svg`}
            className="w-5 h-4 object-cover"
            alt=""
          />
          {selected?.label}
        </div>
        <ChevronDown className="w-4 h-4 text-gray-400" />
      </button>

      {open && (
        <ul className="absolute mt-2 w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50">
          {LANGUAGES.map((lang) => (
            <li
              key={lang.code}
              onClick={() => {
                setLanguage(lang.code);
                setOpen(false);
              }}
              className={clsx(
                "flex items-center justify-between px-4 py-2 cursor-pointer hover:bg-green-100 dark:hover:bg-green-800 transition-colors",
                lang.code === language && "bg-green-100 dark:bg-green-800"
              )}>
              <div className="flex items-center gap-2">
                <img
                  src={`/flags/${lang.flag}.svg`}
                  className="w-5 h-4 object-cover"
                  alt=""
                />
                {lang.label}
              </div>
              {lang.code === language && (
                <Check className="w-4 h-4 text-green-500" />
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
