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
