import type { Config } from 'tailwindcss';

export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // FULL APPROVED DESIGN SYSTEM: NAVY + AMBER + WARM NEUTRALS
        navy: {
          DEFAULT: '#1B2A4A',
          primary: '#1B2A4A',
          secondary: '#2F4368',
          deep: '#0F1930',
          border: '#D3DAE6',
          'muted-icon': '#9AA9C4',
          'secondary-text': '#5C6F97',
          'muted-bg': '#EEF1F6',
        },
        amber: {
          DEFAULT: '#D9A62B',
          primary: '#D9A62B',
          bg: '#FDF3D9',
          hover: '#F5D98A',
          dark: '#A67C0A',
          strong: '#6E4F06',
        },
        warm: {
          DEFAULT: '#FAFAF9',
          bg: '#FAFAF9',
          border: '#E8E6E1',
          disabled: '#A8A39A',
          body: '#5F5A50',
          heading: '#2E2A24',
        },
        page: '#FAFAF9',
        surface: '#FFFFFF',
        'text-primary': '#1B2A4A',
        'text-secondary': '#5F5A50',
        nav: {
          'active-bg': '#FDF3D9',
          'active-accent': '#D9A62B',
          'active-text': '#6E4F06',
          inactive: '#5C6F97',
        },
        chart: {
          actual: '#1B2A4A',
          forecast: '#9AA9C4',
        },
        // Mapped tokens for existing utility classes across the application
        brand: {
          DEFAULT: '#1B2A4A',
          primary: '#1B2A4A',
          dark: '#0F1930',
          accent: '#D9A62B',
          success: '#A67C0A',
          neutral: '#FAFAF9',
          body: '#5F5A50',
          heading: '#1B2A4A',
          hover: '#2F4368',
          light: '#2F4368',
          subtle: '#EEF1F6',
          gold: {
            DEFAULT: '#D9A62B',
            light: '#FDF3D9',
            dark: '#A67C0A',
            subtle: '#FDF3D9',
          },
        },
        primary: {
          DEFAULT: '#1B2A4A',
          hover: '#2F4368',
          subtle: '#EEF1F6',
        },
        dark: {
          DEFAULT: '#1B2A4A',
          surface: '#2F4368',
          card: '#0F1930',
        },
        accent: {
          DEFAULT: '#D9A62B',
          hover: '#F5D98A',
          subtle: '#FDF3D9',
        },
        neutral: {
          DEFAULT: '#FAFAF9',
          surface: '#FFFFFF',
          subtle: '#EEF1F6',
          border: '#D3DAE6',
        },
        body: {
          DEFAULT: '#5F5A50',
          dark: '#2E2A24',
          light: '#5C6F97',
        },
        heading: {
          DEFAULT: '#1B2A4A',
          muted: '#2E2A24',
        },
        semantic: {
          success: '#2F6B4E',
          'success-bg': '#E3EFE7',
          warning: '#B4552C',
          'warning-bg': '#FBEAE3',
          error: '#B4552C',
          'error-bg': '#FBEAE3',
          info: '#33507A',
          'info-bg': '#E7ECF5',
        },
      },
      spacing: {
        '4.5': '1.125rem',
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        display: ['Outfit', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        heading: ['Outfit', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        subtle: '0 1px 2px 0 rgba(27, 42, 74, 0.05)',
        card: '0 1px 3px 0 rgba(27, 42, 74, 0.08), 0 1px 2px -1px rgba(27, 42, 74, 0.06)',
        elevated: '0 10px 25px -5px rgba(27, 42, 74, 0.08), 0 8px 10px -6px rgba(27, 42, 74, 0.04)',
        'elevated-navy': '0 10px 25px -5px rgba(27, 42, 74, 0.12), 0 8px 10px -6px rgba(27, 42, 74, 0.06)',
        'elevated-burgundy': '0 10px 25px -5px rgba(27, 42, 74, 0.12), 0 8px 10px -6px rgba(27, 42, 74, 0.06)',
        lift: '0 8px 24px -4px rgba(27, 42, 74, 0.10), 0 4px 8px -2px rgba(27, 42, 74, 0.04)',
      },
    },
  },
  plugins: [],
} satisfies Config;
