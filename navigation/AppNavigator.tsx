import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { CharactersListScreen } from '@/screens/CharListScreen';
import { SettingsScreen } from '@/screens/SettingsScreen';
import { MainStack } from '@/navigation/MainStack';


const Tab = createBottomTabNavigator();

export const AppNavigator = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Main" component={MainStack} />
            <Tab.Screen name="Settings" component={SettingsScreen} />
        </Tab.Navigator>
    );
};