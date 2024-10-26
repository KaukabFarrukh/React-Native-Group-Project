import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export default function SignUpScreen({ navigation }: any) {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  /* const navigation = useNavigation(); */ // Get the navigation object

  const handleSignUp = async () => {
    if (username.trim() && password.trim()) {
      try {
        // Save username and password to AsyncStorage
        await AsyncStorage.setItem('userData', JSON.stringify({ username, password }));
        Alert.alert('Sign Up Successful', 'You can now log in.');
        navigation.navigate('Login'); // Navigate back to login page
      } catch (error) {
        console.error('Error saving data:', error);
      }
    } else {
      Alert.alert('Error', 'Please enter a valid username and password.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
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
      <Button title="Sign Up" onPress={handleSignUp} />
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
});
