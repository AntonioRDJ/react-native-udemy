import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Router } from './src/routes';

export default function App() {
  return (
    <SafeAreaProvider>
      <Router />
    </SafeAreaProvider>
  );
}
