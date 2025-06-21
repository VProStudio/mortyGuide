import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { SettingsScreen } from '@/screens/SettingsScreen';
import { RotatingIcon } from '@/components/RotationIcon';
import { MainStack } from '@/navigation/MainStack';
import { Image, Platform } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import React from 'react';

const Tab = createBottomTabNavigator();

export const AppNavigator = () => {
  const { colors } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: colors.tabBar,
        },
        headerStyle: {
          height: Platform.OS === 'ios' ? 88 : 80,
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
      <Tab.Screen
        name="Main"
        component={MainStack}
        options={({ route }) => ({
          title:
            getFocusedRouteNameFromRoute(route) === 'Details'
              ? 'Details'
              : 'Main',
          tabBarIcon: ({ focused, size }) => (
            <Image
              source={
                focused
                  ? // eslint-disable-next-line @typescript-eslint/no-require-imports
                  require('@/resources/icons/bookOpened.png')
                  : // eslint-disable-next-line @typescript-eslint/no-require-imports
                  require('@/resources/icons/bookClosed.png')
              }
              style={{
                width: size,
                height: size,
              }}
              resizeMode="contain"
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
              // eslint-disable-next-line @typescript-eslint/no-require-imports
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
