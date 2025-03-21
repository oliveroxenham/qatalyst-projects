'use client';

import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import ReactCountryFlag from 'react-country-flag';

const languageToFlag: Record<string, string> = {
  en: 'US',
  id: 'ID',
  ja: 'JP',
};

export const LanguageSwitcher = () => {
  const { i18n, t } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const currentLanguage = i18n.language || 'en';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8 relative">
          <Globe className="h-4 w-4" />
          <span className="absolute -bottom-1 -right-1">
            <ReactCountryFlag
              countryCode={languageToFlag[currentLanguage]}
              svg
              style={{
                width: '14px',
                height: '14px',
              }}
            />
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => changeLanguage('en')}>
          <ReactCountryFlag countryCode="US" svg className="mr-2" style={{width: '16px', height: '16px'}}/>
          {t('languages.en')}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => changeLanguage('id')}>
          <ReactCountryFlag countryCode="ID" svg className="mr-2" style={{width: '16px', height: '16px'}}/>
          {t('languages.id')}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => changeLanguage('ja')}>
          <ReactCountryFlag countryCode="JP" svg className="mr-2" style={{width: '16px', height: '16px'}}/>
          {t('languages.ja')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};