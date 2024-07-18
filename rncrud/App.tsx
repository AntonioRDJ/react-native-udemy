import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Home } from './src/Home';

export default function App() {
  return (
    <SafeAreaProvider>
      <Home />
    </SafeAreaProvider>
  );
}
