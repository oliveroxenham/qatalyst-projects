'use client';

import i18n from 'i18next';
import { initReactI18next, useTranslation as useReactTranslation } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translations
import enTranslation from './locales/en.json';
import idTranslation from './locales/id.json';
import jaTranslation from './locales/ja.json';

// Initialize i18next
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: enTranslation,
      },
      id: {
        translation: idTranslation,
      },
      ja: {
        translation: jaTranslation,
      },
    },
    fallbackLng: 'en',
    debug: process.env.NODE_ENV === 'development',
    interpolation: {
      escapeValue: false, // React already escapes values
    },
    detection: {
      order: ['localStorage', 'navigator'],
      lookupLocalStorage: 'i18nextLng',
      caches: ['localStorage'],
    },
  });

// For use in components (client-side)
export const useTranslation = useReactTranslation;

// For use in API routes (server-side)
export const getTranslation = (key: string, defaultValue: string = '', language: string = 'en') => {
  // Set language temporarily for this translation
  const currentLang = i18n.language;
  i18n.changeLanguage(language);
  
  // Get translation
  const translated = i18n.t(key, { defaultValue });
  
  // Reset language
  i18n.changeLanguage(currentLang);
  
  return translated !== key ? translated : defaultValue;
};

export default i18n;