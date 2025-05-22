import { StyleSheet, View, Text } from 'react-native';
import { Button } from '../../components/ui/Button';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { useAuthStore } from '../../store/auth';
import { SafeAreaView } from 'react-native-safe-area-context';

export const LoginScreen = () => {
  const { setUser } = useAuthStore();

  const handleGoogleLogin = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      await GoogleSignin.signIn();
      const { accessToken } = await GoogleSignin.getTokens();
      const credential = auth.GoogleAuthProvider.credential(null, accessToken);
      const userCredential = await auth().signInWithCredential(credential);
      
      setUser({
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        displayName: userCredential.user.displayName,
        photoURL: userCredential.user.photoURL,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>FUNDIVE</Text>
        <Text style={styles.subtitle}>アイデアを形に、仲間と共に</Text>
        <Button
          title="Googleでログイン"
          onPress={handleGoogleLogin}
          style={styles.button}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 32,
    textAlign: 'center',
  },
  button: {
    width: '100%',
    maxWidth: 300,
  },
}); 