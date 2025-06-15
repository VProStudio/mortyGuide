import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CharactersDetailsScreen } from '@/screens/CharDetailsScreen';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { CharactersListScreen } from '@/screens/CharListScreen';
import { ThemeContext } from '@/theme/ThemeContext';
import React from 'react';
import type { Character } from '@/utils/types';

type DetailsScreenParams = {
    character: Character;
};

const Stack = createNativeStackNavigator();

export const MainStack = () => {
    const { colors } = React.useContext(ThemeContext);
    return (
        <Stack.Navigator initialRouteName='Characters'>
            <Stack.Screen name="Characters"
                component={CharactersListScreen}
                options={{ headerShown: false }} />
            <Stack.Screen name="Details"
                component={CharactersDetailsScreen}
                options={{
                    header: ({ navigation, route }) => {
                        const params = route.params as DetailsScreenParams | undefined;

                        return (
                            <View style={{
                                height: 50,
                                flexDirection: 'row',
                                alignItems: 'center',
                                backgroundColor: colors.background,
                                paddingHorizontal: 10,
                                opacity: 0.9,
                            }}>
                                <TouchableOpacity onPress={() => navigation.goBack()}>
                                    <Image
                                        source={require('@/resources/icons/backButton.png')}
                                        style={{
                                            width: 24,
                                            height: 24,
                                            resizeMode: 'contain',
                                            marginLeft: 7,
                                        }}
                                    />
                                </TouchableOpacity>
                                <Text style={{
                                    fontFamily: 'CustomTitleFont',
                                    fontSize: 24,
                                    marginBottom: 4,
                                    color: colors.text,
                                    marginLeft: 15
                                }}>
                                    {params?.character?.name || 'Details'}
                                </Text>
                            </View>
                        );
                    }
                }}
            />
        </Stack.Navigator >
    );
};