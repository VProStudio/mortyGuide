import React from 'react';
import { THEME, SWITCH_COLORS } from '@/utils/constants';
import { View, Text, StyleSheet, Switch } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import packageInfo from '../package.json';

export const SettingsScreen = () => {
  const { theme, toggleTheme, colors } = useTheme();
  const isDarkMode = theme === THEME.DARK;

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View
        style={[styles.settingRow, { borderBottomColor: colors.settingsRow }]}
      >
        <Text style={[styles.settingText, { color: colors.text }]}>
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

      <Text style={[styles.version, { color: colors.text }]}>
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
  settingText: {
    fontSize: 16,
  },
  version: {
    fontSize: 12,
    marginTop: 'auto',
    padding: 16,
    textAlign: 'center',
  },
});
