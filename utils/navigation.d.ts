import type { Character } from '@/utils/types';

export type RootStackParamList = {
  Main: undefined;
  Details: { character: Character };
  Settings: undefined;
};

declare global {
  namespace ReactNavigation {
    type RootParamList = RootStackParamList;
  }
}
