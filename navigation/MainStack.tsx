import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CharactersDetailsScreen } from '@/screens/CharDetailsScreen';
import { useResponsive } from '@/components/ResponsiveContext';
import { CharactersListScreen } from '@/screens/CharListScreen';
import { useTheme } from '@/hooks/useTheme';
import React from 'react';
import type { Character } from '@/utils/types';
import { cardStyles } from '@/theme/styles';

type DetailsScreenParams = {
  character: Character;
};

const Stack = createNativeStackNavigator();

export const MainStack = () => {
  const { colors } = useTheme();
  const { fonts } = useResponsive();
  const responsiveName = {
    charNameDetails: {
      fontSize: fonts.name,
    },
  }
  return (
    <Stack.Navigator initialRouteName="Characters">
      <Stack.Screen
        name="Characters"
        component={CharactersListScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Details"
        component={CharactersDetailsScreen}
        options={{
          header: ({ navigation, route }) => {
            const params = route.params as DetailsScreenParams | undefined;

            return (
              <View
                style={[
                  styles.cardTitle,
                  { backgroundColor: colors.background },
                ]}
              >
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <Image
                    // eslint-disable-next-line @typescript-eslint/no-require-imports
                    source={require('@/resources/icons/backButton.png')}
                    style={styles.backButton}
                  />
                </TouchableOpacity>
                <Text
                  style={[
                    cardStyles.charName,
                    responsiveName.charNameDetails,
                    styles.charNameLocal,
                    { color: colors.text },
                  ]}
                >
                  {params?.character?.name || 'Details'}
                </Text>
              </View>
            );
          },
        }}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  backButton: {
    height: 24,
    marginLeft: 7,
    width: 24,
  },
  cardTitle: {
    alignItems: 'center',
    flexDirection: 'row',
    height: 50,
    paddingHorizontal: 10,
  },
  charNameLocal: {
    marginBottom: 0,
    marginLeft: 14,
  },
});
