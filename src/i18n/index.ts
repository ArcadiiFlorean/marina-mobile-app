// src/i18n/index.ts
// -----------------------------------------------------------------------------
// MOTORUL DE TRADUCERI (i18n)
// Aici pornim i18next: încărcăm fișierele RO și EN, setăm limba implicită
// (română) și detectăm automat limba telefonului la prima deschidere.
//
// În ecrane vei folosi: const { t } = useTranslation();  apoi  t("tabs.home")
// -----------------------------------------------------------------------------

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { getLocales } from "expo-localization";

import ro from "./ro.json";
import en from "./en.json";

// Limbile disponibile în aplicație.
export const resources = {
  ro: { translation: ro },
  en: { translation: en },
} as const;

// Limba implicită a aplicației (din brief: română default).
export const DEFAULT_LANGUAGE = "ro";

// Detectăm limba telefonului. Dacă e engleză → pornim în EN; altfel → RO.
function getInitialLanguage(): string {
  try {
    const deviceLang = getLocales()[0]?.languageCode;
    if (deviceLang && deviceLang in resources) {
      return deviceLang;
    }
  } catch {
    // dacă detectarea eșuează, folosim limba implicită
  }
  return DEFAULT_LANGUAGE;
}

i18n.use(initReactI18next).init({
  resources,
  lng: getInitialLanguage(),
  fallbackLng: DEFAULT_LANGUAGE, // dacă un text lipsește într-o limbă, cade pe RO
  interpolation: {
    escapeValue: false, // React se ocupă deja de securitate
  },
});

export default i18n;