// React Context for theme management with default light theme configuration
import { createContext } from 'react';
import { colors } from '@/theme/styles';
import type { Theme } from '@/utils/types';

export const ThemeContext = createContext({
  theme: 'light' as Theme,
  toggleTheme: () => {},
  colors: colors.light,
});
