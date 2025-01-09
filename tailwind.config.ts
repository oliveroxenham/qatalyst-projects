import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  // theme: {
  //   animation: {
  //     savingSpinner: 'savingSpinner 1.5s linear infinite',
  //   },
  //   extend: {
  //     backgroundImage: {
  //       'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
  //       'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
  //     },
  //     borderRadius: {
  //       lg: 'var(--radius)',
  //       md: 'calc(var(--radius) - 2px)',
  //       sm: 'calc(var(--radius) - 4px)',
  //     },
  //     borderWidth: {
  //       '1.5': '1.5px',
  //     },
  //     boxShadow: {
  //       base: '0px 1px 3px 0px rgba(0, 0, 0, 0.10), 0px 1px 2px 0px rgba(0, 0, 0, 0.06);',
  //     },
  //     colors: {
  //       alert: '#EDA15B',
  //       background: {
  //         disabled: '#E5E7EB',
  //         hovered: '#F3F4F6',
  //         primary: '#E0E7FF',
  //       },
  //       black: '#000000 ',
  //       blaze: {
  //         orange: {
  //           '50': '#FFF8EC',
  //           '100': '#F86501',
  //           '100.2': '#FFF0D3',
  //           '200': '#FFDDA6',
  //           '300': '#FFC36D',
  //           '500': '#FF800B',
  //           '600': '#F86501',
  //           '700': '#CB4A03',
  //         },
  //       },
  //       blue: {
  //         '100': '#2B62A9',
  //         '200': '#B1E3ED',
  //         '500': '#7AD0E0',
  //       },
  //       border: {
  //         default: '#D1D5DB',
  //         disabled: '#D1D5DB',
  //         secondary: '#E6E6E6',
  //       },
  //       branding: {
  //         green: {
  //           '50': '#EDF9F5',
  //           '100': '#D2F3EB',
  //           '200': '#B0EADD',
  //           '300': '#90E5D6',
  //           '400': '#5EDFCF',
  //           '500': '#32C1B3',
  //           '600': '#00938C',
  //           '700': '#116861',
  //           '800': '#0A6059',
  //         },
  //       },
  //       caution: '#EDA15B',
  //       current: 'currentColor',
  //       disabled: '#9CA3AF',
  //       emerald: {
  //         '50': '#e6f4ef',
  //         '100': '#d4f5ed',
  //         '200': '#b5f4e7',
  //         '300': '#92ecdc',
  //         '400': '#5edfcf',
  //         '500': '#32c1b3',
  //         '600': '#0d938c',
  //         '700': '#116861',
  //         '800': '#0a6059',
  //         '900': '#1b4542',
  //         '950': '#022c21',
  //       },
  //       error: '#DC2626',
  //       glacier: {
  //         '400': '#589CB8',
  //         '500': '#3D809D',
  //       },
  //       gray: {
  //         '200': '#E5E7EB',
  //         '500': '#888888',
  //         '700': '#374151',
  //         '800': '#1F2937',
  //       },
  //       green: {
  //         '50': '#E6F4EF',
  //         '100': '#D4F5ED',
  //         '200': '#94C688',
  //         '500': '#5DA469',
  //         '600': '#16A36A',
  //         '700': '#116861',
  //         '800': '#3B7B5E',
  //         '900': '#13261D',
  //       },
  //       grey: {
  //         '50': '#F5F5F5',
  //         '100': '#F3F3F3',
  //         '200': '#DEDEDE',
  //         '250': '#D7D7D7',
  //         '300': '#C4C4C4',
  //         '400': '#C5C5C5',
  //         '500': '#999999',
  //         '600': '#666666',
  //         '700': '#4A5C6A',
  //         '800': '#333333',
  //         '900': '#20323F',
  //       },
  //       neutral: {
  //         '50': '#FAFAFA',
  //         '100': '#F5F5F5',
  //         '200': '#E5E5E5',
  //         '300': '#D4D4D4',
  //         '400': '#A3A3A3',
  //         '500': '#737373',
  //         '600': '#525252',
  //         '700': '#404040',
  //         '800': '#262626',
  //         '900': '#171717',
  //         '950': '#0A0A0A',
  //       },
  //       pending: '#038387',
  //       placeholder: '#6B7280',
  //       primary: '#20323F',
  //       question: '#20323F',
  //       rose: {
  //         '800': '#9F1239',
  //       },
  //       secondary: '#00B894',
  //       semantic: {
  //         blue: {
  //           '500': '#3B82F6',
  //         },
  //         red: {
  //           '500': '#F34062',
  //         },
  //         yellow: {
  //           '100': '#FFEECF',
  //           '500': '#F69339',
  //           '600': '#E67B1A',
  //           '700': '#CC5A13',
  //         },
  //       },
  //       sidebar: 'hsl(var(--sidebar-background))',
  //       'sidebar-foreground': 'hsl(var(--sidebar-foreground))',
  //       slate: {
  //         '50': '#F8FAFC',
  //         '100': '#F1F5F9',
  //         '400': '#94A3B8',
  //         '500': '#64748B',
  //         '600': '#475569',
  //       },
  //       stone: {
  //         '400': '#A8A29E',
  //         '800': '#292524',
  //       },
  //       stroke: {
  //         primary: '#116861',
  //       },
  //       text: {
  //         default: '#030712',
  //         primary: '#121212',
  //         secondary: '#636363',
  //         tertiary: '#888',
  //       },
  //       theme: {
  //         foreground: '#020617',
  //       },
  //       transparent: 'transparent',
  //       warning: '#E04A4A',
  //       white: '#FFFFFF',
  //       zinc: {
  //         '200': '#E4E4E7',
  //         '500': '#71717A',
  //         '900': '#18181B',
  //       },
  //     },
  //     ringWidth: {
  //       '10': '10px',
  //     },
  //     zIndex: {
  //       '1': '1',
  //     },
  //   },
  //   keyframes: {
  //     savingSpinner: {
  //       '0%': {
  //         transform: 'rotate(0deg)',
  //       },
  //       '100%': {
  //         transform: 'rotate(-360deg)',
  //       },
  //     },
  //   },
  //   screens: {
  //     lg: '1280px',
  //     md: '720px',
  //     sm: '320px',
  //   },
  // },
  theme: {
    extend: {
      keyframes: {
        pulse: {
          '50%': {
            opacity: '0.25',
          },
        },
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        blaze: {
          orange: {
            '50': '#FFF8EC',
            '100': '#F86501',
            '100.2': '#FFF0D3',
            '200': '#FFDDA6',
            '300': '#FFC36D',
            '500': '#FF800B',
            '600': '#F86501',
            '700': '#CB4A03',
          },
        },
        branding: {
          green: {
            '50': '#EDF9F5',
            '100': '#D2F3EB',
            '200': '#B0EADD',
            '300': '#90E5D6',
            '400': '#5EDFCF',
            '500': '#32C1B3',
            '600': '#00938C',
            '700': '#116861',
            '800': '#0A6059',
          },
        },
        emerald: {
          '50': '#e6f4ef',
          '100': '#d4f5ed',
          '200': '#b5f4e7',
          '300': '#92ecdc',
          '400': '#5edfcf',
          '500': '#32c1b3',
          '600': '#0d938c',
          '700': '#116861',
          '800': '#0a6059',
          '900': '#1b4542',
          '950': '#022c21',
        },
        glacier: {
          '400': '#589CB8',
          '500': '#3D809D',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar-background))',
          foreground: 'hsl(var(--sidebar-foreground))',
          primary: 'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent: 'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          border: 'hsl(var(--sidebar-border))',
          ring: 'hsl(var(--sidebar-ring))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
export default config;
