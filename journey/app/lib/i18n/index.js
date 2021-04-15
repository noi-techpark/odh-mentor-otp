import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import { TRANSLATIONS_EN } from "./en/translations";
import { TRANSLATIONS_IT } from "./it/translations";
import { TRANSLATIONS_DE } from "./de/translations";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    resources: {
      en: {
        translation: TRANSLATIONS_EN
      },
      it: {
        translation: TRANSLATIONS_IT
      },
      de: {
        translation: TRANSLATIONS_DE
      }
    }
  });
