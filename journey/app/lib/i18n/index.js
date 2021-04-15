import i18n from "i18next";
import { reactI18nextModule } from "react-i18next";
import detector from "i18next-browser-languagedetector";

import { TRANSLATIONS_EN } from "./en/translations";
import { TRANSLATIONS_IT } from "./it/translations";
import { TRANSLATIONS_DE } from "./de/translations";

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

i18n
  .use(detector)
  .use(reactI18nextModule)
  .init({
    resources,
    fallbackLng: "en",
    debug: false,
  });

export default i18n;
