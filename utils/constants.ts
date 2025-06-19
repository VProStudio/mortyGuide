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
