import Icon from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { THEME, THEME_ICONS } from '@/utils/constants';
import { useTheme } from '@/hooks/useTheme';
import React from 'react';

export const ThemeSwitcher = () => {
  const { theme, toggleTheme, colors } = useTheme();

  return (
    <TouchableOpacity style={styles.container} onPress={toggleTheme}>
      <Icon
        name={theme === THEME.LIGHT ? THEME_ICONS.MOON : THEME_ICONS.SUN}
        size={24}
        color={colors.text}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
  },
});
