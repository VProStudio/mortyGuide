import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SettingsScreen } from '@/screens/SettingsScreen';
import { MainStack } from '@/navigation/MainStack';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

const Tab = createBottomTabNavigator();

export const AppNavigator = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Main"
                component={MainStack}
                options={({ route }) => ({
                    title: getFocusedRouteNameFromRoute(route) === 'Details' ? 'Details' : 'Main',
                })}
            />
            <Tab.Screen name="Settings" component={SettingsScreen} />
        </Tab.Navigator>
    );
};