import { CharacterStatus } from '@/utils/constants';
import { FONT_GROUPS } from '@/utils/constants';
import { StyleSheet } from 'react-native';

export const colors = {
  light: {
    background: '#f3f5e1',
    text: '#000000',
    card: '#dddecc',
    header: '#dddecc',
    tabBar: '#E1E8D5',
    tabBarLabel: '#000000',
    pickerOption: '#9c9d90',
    pickerOverlay: 'rgba(0, 0, 0, 0.5)',
    pickerElemBorder: 'rgba(0, 0, 0, 0.1)',
    headerBottomBorder: '#cccccc',
    offlineMessage: '#ff6b6b',
    settingsRow: '#cccccc',
    status: {
      alive: '#55CC44',
      dead: '#D63D2E',
      unknown: '#9E9E9E',
    },
  },
  dark: {
    background: '#010f1c',
    text: '#FFFFFF',
    card: '#011527',
    header: '#011527',
    tabBar: '#011527',
    tabBarLabel: '#FFFFFF',
    pickerOption: '#021e37',
    pickerOverlay: 'rgba(0, 0, 0, 0.5)',
    pickerElemBorder: 'rgba(0, 0, 0, 0.1)',
    headerBottomBorder: '#cccccc',
    offlineMessage: '#ff6b6b',
    settingsRow: '#cccccc',
    status: {
      alive: '#8cc683',
      dead: '#FF6B6B',
      unknown: '#BDBDBD',
    },
  },
};

export const getStatusStyle = (status: string, theme: 'light' | 'dark') => {
  let color;
  const themeColors = theme === 'dark' ? colors.dark : colors.light;

  switch (status.toLowerCase()) {
    case CharacterStatus.ALIVE.toLowerCase():
      color = themeColors.status.alive;
      break;
    case CharacterStatus.DEAD.toLowerCase():
      color = themeColors.status.dead;
      break;
    default:
      color = themeColors.status.unknown;
      break;
  }

  const borderColor = color;
  const shadowColor = color;

  return {
    borderColor,
    shadowColor,
    elevation: 10,
    borderWidth: 2,
  };
};

export const cardStyles = StyleSheet.create({
  cardInfoContainer: {
    borderRadius: 8,
    elevation: 3,
    flexDirection: 'row',
    margin: 8,
    padding: 10,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  charName: {
    fontFamily: 'CustomTitleFont',
    fontSize: FONT_GROUPS.NORMAL.NAME,
    marginBottom: 16,
  },
  column: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    marginBottom: 8,
    paddingLeft: 15,
  },
  created: {
    fontSize: FONT_GROUPS.NORMAL.SYSTEM,
    marginTop: 16,
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  detailInfoContainer: {
    alignContent: 'center',
    borderRadius: 8,
    elevation: 3,
    flex: 1,
    marginHorizontal: 5,
    padding: 16,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  imageDetails: {
    alignSelf: 'center',
    borderRadius: 8,
    maxWidth: 730,
    marginBottom: 10,
    marginVertical: 10,
    width: '100%',
    aspectRatio: 1,
  },
  imageMain: {
    borderRadius: 5,
    borderWidth: 1,
    elevation: 5,
    height: 150,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    width: 150,
  },
  label: {
    fontSize: FONT_GROUPS.NORMAL.CARD_TEXT,
    marginRight: 8,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 8,
    maxWidth: '100%',
    minWidth: '85%',
  },
  value: {
    flex: 1,
    fontFamily: 'CustomFont',
    fontSize: FONT_GROUPS.NORMAL.CARD_TEXT,
    marginRight: 8,
  },
  detailsColumn: {
    height: 250,
    marginLeft: 30,
    justifyContent: 'center',
  }
});
