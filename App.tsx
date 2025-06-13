import { NavigationContainer } from '@react-navigation/native';
import { AppNavigator } from '@/navigation/AppNavigator';
import { FontLoader } from '@/components/FontLoader';
import { ThemeProvider } from '@/theme/ThemeContext';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import { store } from '@/store/store';
export default function App() {

  return (
    <Provider store={store}>
      <ThemeProvider>
        <FontLoader>
          <NavigationContainer>
            <StatusBar style="auto" />
            <AppNavigator>
            </AppNavigator>
          </NavigationContainer >
        </FontLoader>
      </ThemeProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
