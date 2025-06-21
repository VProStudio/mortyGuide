import { CharacterStatus, CharacterSpecies } from './constants';

export type Character = {
  id: number;
  name: string;
  status: CharacterStatus | string;
  species: CharacterSpecies | string;
  type: string;
  gender: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
  url: string;
  created: string;
};

export type Filter = {
  status: CharacterStatus | '';
  species: CharacterSpecies | '';
};

export type Theme = 'light' | 'dark';

