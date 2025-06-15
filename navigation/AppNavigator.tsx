import { Image, Animated, Easing, ImageSourcePropType } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { SettingsScreen } from '@/screens/SettingsScreen';
import { ThemeContext } from '@/theme/ThemeContext';
import { MainStack } from '@/navigation/MainStack';
import { useEffect, useRef, FC, useContext } from 'react';
import React from 'react';

const Tab = createBottomTabNavigator();

interface RotatingIconProps {
    source: ImageSourcePropType;
    size: number;
    isActive: boolean;
}

const RotatingIcon: FC<RotatingIconProps> = ({ source, size, isActive }) => {
    const rotateAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (isActive) {
            Animated.loop(
                Animated.timing(rotateAnim, {
                    toValue: 1,
                    duration: 3000,
                    easing: Easing.linear,
                    useNativeDriver: true,
                })
            ).start();
        } else {
            rotateAnim.setValue(0);
        }
    }, [isActive]);

    const rotate = rotateAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    return (
        <Animated.View style={{ transform: [{ rotate }] }}>
            <Image
                source={source}
                style={{
                    width: size,
                    height: size,
                    resizeMode: 'contain'
                }}
            />
        </Animated.View>
    );
};

export const AppNavigator = () => {
    const { colors } = useContext(ThemeContext);
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarStyle: {
                    backgroundColor: colors.tabBar,
                },
                headerStyle: {
                    height: 80,
                    backgroundColor: colors.header,

                    shadowColor: colors.text,
                    elevation: 3,
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.2,
                    shadowRadius: 2,
                },
                headerTintColor: colors.text,
                tabBarLabelStyle: {
                    fontSize: 14,
                    marginBottom: 5,
                },
                tabBarActiveTintColor: colors.text,
                tabBarInactiveTintColor: colors.text,
            }}
        >
            <Tab.Screen name="Main"
                component={MainStack}
                options={({ route }) => ({
                    title: getFocusedRouteNameFromRoute(route) === 'Details' ? 'Details' : 'Main',
                    tabBarIcon: ({ focused, size }) => (
                        <Image
                            source={focused
                                ? require('@/resources/icons/bookOpened.png')
                                : require('@/resources/icons/bookClosed.png')}
                            style={{
                                width: size,
                                height: size,
                                resizeMode: 'contain',

                            }}
                        />
                    ),
                })}
            />
            <Tab.Screen
                name="Settings"
                component={SettingsScreen}
                options={{
                    tabBarIcon: ({ focused, size }) => (
                        <RotatingIcon
                            source={require('@/resources/icons/gear.png')}
                            size={size}
                            isActive={focused}
                        />
                    ),
                }}
            />
        </Tab.Navigator>
    );
};