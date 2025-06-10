import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CharactersListScreen } from '@/screens/CharListScreen';
import { CharactersDetailsScreen } from '@/screens/CharDetailsScreen';

const Stack = createNativeStackNavigator();

export const MainStack = () => {
    return (
        <Stack.Navigator initialRouteName='Characters'>
            <Stack.Screen name="Characters" component={CharactersListScreen} />
            <Stack.Screen name="Details" component={CharactersDetailsScreen} />
        </Stack.Navigator>
    );
};