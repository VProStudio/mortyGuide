import { Platform } from 'react-native';

export const isWeb = Platform.OS === 'web';
export const isMobile = !isWeb;
