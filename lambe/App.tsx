import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { useCallback } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import storeConfig from "./src/store/storeConfig";
import axios from "axios";
import { Home } from "./src/Home";

axios.defaults.baseURL = "https://lambe-e3d7e-default-rtdb.firebaseio.com/";

SplashScreen.preventAutoHideAsync();

const store = storeConfig();

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    shelter: require("./assets/fonts/shelter.otf"),
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
    <Provider store={store}>
      <SafeAreaProvider style={{ flex: 1 }} onLayout={onLayoutRootView}>
        <Home />
      </SafeAreaProvider>
    </Provider>
  );
}