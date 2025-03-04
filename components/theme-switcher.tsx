'use client';

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/qbutton';
import { Moon, Sun, SunMoon } from 'lucide-react';

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
    // setTheme('light');
  }, []);
  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  };
  return isMounted ? (
    <Button onClick={() => toggleTheme()} variant="ghost" size="sm">
      {theme === 'light' && <Sun />}
      {theme === 'dark' && <Moon />}
      {theme === 'system' && <SunMoon />}
    </Button>
  ) : null;
}
