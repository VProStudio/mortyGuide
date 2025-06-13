import { useFonts } from 'expo-font';
import { useCallback } from 'react';
import { View } from 'react-native';
import { ReactNode } from 'react';

type FontLoaderProps = {
    children: ReactNode;
};

export const FontLoader = ({ children }: FontLoaderProps) => {
    const [fontsLoaded] = useFonts({
        'CustomTitleFont': require('@/resources/fonts/titleFont/FredokaOne-Regular.ttf'),
        'CustomFont': require('@/resources/fonts/textFont/Comic Sans MS.ttf'),
    });

    const onLayoutRootView = useCallback(() => {
        if (fontsLoaded) {
        }
    }, [fontsLoaded]);

    if (!fontsLoaded) {
        return null;
    }

    return <View onLayout={onLayoutRootView} style={{ flex: 1 }}>{children}</View>;
};