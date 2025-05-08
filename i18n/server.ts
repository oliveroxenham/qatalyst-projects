// Server-side translations
import enTranslation from './locales/en.json';
import idTranslation from './locales/id.json';
import jaTranslation from './locales/ja.json';

type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

type TranslationType = DeepPartial<typeof enTranslation>;

const translations: Record<string, TranslationType> = {
  en: enTranslation,
  id: idTranslation,
  ja: jaTranslation
};

// For use in API routes and server components
export const getServerTranslation = (key: string, defaultValue: string = '', language: string = 'en') => {
  // Split the key by dots to access nested properties
  const keys = key.split('.');
  
  // Get the language translations, fallback to English
  const langTranslations = translations[language] || translations.en;
  
  // Navigate through the nested structure using the key parts
  let result: any = langTranslations;
  for (const k of keys) {
    if (result && typeof result === 'object' && k in result) {
      result = result[k];
    } else {
      return defaultValue;
    }
  }
  
  // Return the translation or default value
  return typeof result === 'string' ? result : defaultValue;
};