import i18n from "i18next";
import { reactI18nextModule } from "react-i18next";
import detector from "i18next-browser-languagedetector";

import { TRANSLATIONS_EN } from "./en";
import { TRANSLATIONS_IT } from "./it";
import { TRANSLATIONS_DE } from "./de";

import config from '../config.yml';

const I18N_LANGUAGE = 'i18n_otp'

const resources = {
  en: {
    translation: TRANSLATIONS_EN
  },
  it: {
    translation: TRANSLATIONS_IT
  },
  de: {
    translation: TRANSLATIONS_DE
  }
};

if (!config.language.defaultLanguage) {
  i18n.use(detector)
}

i18n
  .use(reactI18nextModule)  
  .init({
    resources,
    lng: localStorage.getItem(I18N_LANGUAGE) || config.language.defaultLanguage,
    fallbackLng: config.language.fallbackLanguage || "en",
    debug: false,
    detection: {
      order: ["localStorage", "navigator"],
      lookupQuerystring: "lng",
      lookupLocalStorage: I18N_LANGUAGE,
      caches: ["localStorage"]
    }
  });

i18n.on('languageChanged', lng => localStorage.setItem(I18N_LANGUAGE, lng));

export default i18n;
