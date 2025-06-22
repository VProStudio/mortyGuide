// Settings screen with theme toggle and app version display
import { useResponsive } from '@/components/ResponsiveContext';
import { View, Text, StyleSheet, Switch } from 'react-native';
import { THEME, SWITCH_COLORS } from '@/utils/constants';
import { cardStyles } from '@/theme/styles';
import { useTheme } from '@/hooks/useTheme';
import packageInfo from '../package.json';
import React from 'react';

export const SettingsScreen = () => {
  const { theme, toggleTheme, colors } = useTheme();
  const isDarkMode = theme === THEME.DARK;
  const { fonts } = useResponsive();

  const responsiveSettings = {
    labelFontSize: {
      fontSize: fonts.card,
    },
    systemFontSize: {
      fontSize: fonts.system,
    },
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View
        style={[styles.settingRow, { borderBottomColor: colors.settingsRow }]}
      >
        <Text
          style={[
            cardStyles.label,
            responsiveSettings.labelFontSize,
            { color: colors.text },
          ]}
        >
          Dark theme
        </Text>
        <Switch
          value={isDarkMode}
          onValueChange={toggleTheme}
          trackColor={{
            false: SWITCH_COLORS.TRACK_FALSE,
            true: SWITCH_COLORS.TRACK_TRUE,
          }}
          thumbColor={
            isDarkMode ? SWITCH_COLORS.THUMB_DARK : SWITCH_COLORS.THUMB_LIGHT
          }
        />
      </View>

      <Text
        style={[
          cardStyles.version,
          responsiveSettings.systemFontSize,
          { color: colors.text },
        ]}
      >
        Version: {packageInfo.version}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  settingRow: {
    alignItems: 'center',
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
});
