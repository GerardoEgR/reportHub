// tailwind.config.ts
import type { Config } from 'tailwindcss';
import primeui from 'tailwindcss-primeui';

export default {
  content: ['./src/**/*.{html,ts}'],
  plugins: [primeui],
} satisfies Config;
