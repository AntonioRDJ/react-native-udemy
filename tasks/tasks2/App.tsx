import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback } from 'react';
import "moment/locale/pt-br";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Navigator } from './src/Navigator';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    'Lato': require('./assets/fonts/Lato.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <SafeAreaProvider style={{flex: 1}} onLayout={onLayoutRootView}>
      <Navigator />
    </SafeAreaProvider>
  );
}
