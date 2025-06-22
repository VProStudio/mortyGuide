// Custom hook for accessing theme context with error handling
import { ThemeContext } from '@/theme/ThemeContext';
import { useContext } from 'react';

export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme must be used within a ThemeContext');
  }

  return context;
};
