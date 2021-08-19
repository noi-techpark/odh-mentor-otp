import i18n from "i18next";
import { reactI18nextModule } from "react-i18next";
import detector from "i18next-browser-languagedetector";
import LocalStorageBackend from "i18next-localstorage-backend";

import { TRANSLATIONS_EN } from "./en";
import { TRANSLATIONS_IT } from "./it";
import { TRANSLATIONS_DE } from "./de";

import config from '../config.yml';

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
    debug: false,
    resources,
    lng: config.language.defaultLanguage,
    fallbackLng: config.language.fallbackLanguage || "en",
    backend: {
      backends: [ LocalStorageBackend ],
      backendOptions: [
        {
          prefix: 'otp.',
          store: window.localStorage
        }
      ]
    },
  });

export default i18n;
