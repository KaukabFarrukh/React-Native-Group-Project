import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { router } from 'expo-router'; 
export default function LoginScreen({ navigation }: any) {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  /* const navigation = useNavigation(); */ // Get the navigation object

  useEffect(() => {
    // Check if the user is already logged in
    // const checkLoginStatus = async () => {
    //   const storedUserData = await AsyncStorage.getItem('userData');
    //   if (storedUserData) {
    //     router.navigate('/'); // Redirect to Home if already logged in
    //   }
    // };

    // checkLoginStatus();
  }, []);

  const handleLogin = async () => {
    try {
      const storedUserData = await AsyncStorage.getItem('userData');
      const parsedUserData = storedUserData ? JSON.parse(storedUserData) : null;

      if (parsedUserData && parsedUserData.username === username && parsedUserData.password === password) {
        await AsyncStorage.setItem('isLoggedIn', 'true');
        Alert.alert('Login Successful', 'Welcome to the app!');
        router.navigate('/'); // Navigate to Home Screen after successful login
      } else {
        Alert.alert('Error', 'Invalid username or password.');
      }
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Login" onPress={handleLogin} />

      {/* Link to SignUpScreen */}
      <TouchableOpacity onPress={() => router.navigate('/SignUpScreen')}>
        <Text style={styles.signUpLink}>New here? Sign up</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
  signUpLink: {
    marginTop: 20,
    color: '#007bff',
    textAlign: 'center',
  },
});
