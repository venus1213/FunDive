import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthStack } from './src/navigation/AuthStack';
import { MainStack } from './src/navigation/MainStack';
import { useAuthStore } from './src/store/auth';
import { View, Text } from 'react-native';

const Stack = createNativeStackNavigator();

export default function App() {
  const { isAuthenticated } = useAuthStore();

  console.log('App rendered, isAuthenticated:', isAuthenticated);

  try {
    return (
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            {!isAuthenticated ? (
              <Stack.Screen name="Auth" component={AuthStack} />
            ) : (
              <Stack.Screen name="Main" component={MainStack} />
            )}
          </Stack.Navigator>
        </NavigationContainer>
        <StatusBar style="auto" />
      </SafeAreaProvider>
    );
  } catch (error: unknown) {
    console.error('App render error:', error);
    const errorMessage = error instanceof Error ? error.message : '不明なエラーが発生しました';
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
        <Text>エラーが発生しました</Text>
        <Text>{errorMessage}</Text>
      </View>
    );
  }
} 