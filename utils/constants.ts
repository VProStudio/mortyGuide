export const API_URL = 'https://rickandmortyapi.com/api';

export enum CharacterStatus {
  ALIVE = 'Alive',
  DEAD = 'Dead',
  UNKNOWN = 'unknown',
}

export enum CharacterSpecies {
  ALIEN = 'Alien',
  HUMAN = 'Human',
}

export const STATUS_OPTIONS = [
  { label: 'Alive', value: CharacterStatus.ALIVE },
  { label: 'Dead', value: CharacterStatus.DEAD },
  { label: 'Unknown', value: CharacterStatus.UNKNOWN },
];

export const SPECIES_OPTIONS = [
  { label: 'Alien', value: CharacterSpecies.ALIEN },
  { label: 'Human', value: CharacterSpecies.HUMAN },
];
export const THEME = {
  LIGHT: 'light',
  DARK: 'dark',
} as const;

export const SWITCH_COLORS = {
  TRACK_FALSE: '#767577',
  TRACK_TRUE: '#81b0ff',
  THUMB_DARK: '#f5dd4b',
  THUMB_LIGHT: '#f4f3f4',
} as const;

export const THEME_ICONS = {
  MOON: 'moon-outline',
  SUN: 'sunny-outline',
} as const;

export const GEAR_ROTATION = {
  END_VALUE: 1,
  DURATION: 3000,
} as const;

export const PORTAL = {
  PULSE: {
    SCALE_UP: 1.2,
    SCALE_DOWN: 1.0,
    DURATION_UP: 800,
    DURATION_DOWN: 600,
  },
  ROTATION: {
    END_VALUE: 1,
    DURATION: 3000,
  },
} as const;

export const FONT_GROUPS = {
  NARROW: {
    NAME: 24,
    CARD_TEXT: 15,
    PICKER: 12,
    SYSTEM: 14,
    ARROW: 5,
  },
  NORMAL: {
    NAME: 24,
    CARD_TEXT: 18,
    PICKER: 14,
    SYSTEM: 14,
    ARROW: 10,
  },
  WIDE: {
    NAME: 40,
    CARD_TEXT: 28,
    PICKER: 14,
    SYSTEM: 14,
    ARROW: 10,
  },
} as const;

export const LAYOUT_GROUPS = {
  NORMAL: {
    NAME_MARGIN_LEFT: 0,
    NAME_ALIGN: 'center',
    ROW_MARGIN_TOP: 0,
    ROW: 'column',
    IMAGE_WIDTH: 150,
    IMAGE_HEIGHT: 150,
  },
  WIDE: {
    NAME_MARGIN_LEFT: 130,
    NAME_ALIGN: 'flex-start',
    ROW_MARGIN_TOP: 0,
    ROW: 'column',
    IMAGE_WIDTH: 250,
    IMAGE_HEIGHT: 250,
  },
  ULTRA_WIDE: {
    NAME_MARGIN_LEFT: 130,
    NAME_ALIGN: 'flex-start',
    ROW_MARGIN_TOP: 300,
    ROW: 'row',
    IMAGE_WIDTH: 250,
    IMAGE_HEIGHT: 250,
  },
} as const;
