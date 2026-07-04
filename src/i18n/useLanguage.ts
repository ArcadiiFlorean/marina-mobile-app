// src/i18n/useLanguage.ts
// -----------------------------------------------------------------------------
// HOOK PENTRU LIMBĂ — un mic ajutor care îți dă limba curentă și o funcție
// prin care o schimbi. Îl folosești în orice ecran care are buton de limbă.
//
// Exemplu:
//   const { language, toggleLanguage } = useLanguage();
//   <Button title={language.toUpperCase()} onPress={toggleLanguage} />
// -----------------------------------------------------------------------------

import { useTranslation } from "react-i18next";

export function useLanguage() {
  const { i18n } = useTranslation();

  // Limba curentă ("ro" sau "en").
  const language = i18n.language;

  // Schimbă la o limbă anume.
  const setLanguage = (lang: "ro" | "en") => {
    i18n.changeLanguage(lang);
  };

  // Comută rapid între RO și EN (pentru un buton simplu de test).
  const toggleLanguage = () => {
    i18n.changeLanguage(language === "ro" ? "en" : "ro");
  };

  return { language, setLanguage, toggleLanguage };
}
