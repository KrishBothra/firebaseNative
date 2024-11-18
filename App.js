
import React, { useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'YOUR_API_KEY',
  authDomain: 'YOUR_AUTH_DOMAIN',
  projectId: 'YOUR_PROJECT_ID',
  storageBucket: 'YOUR_STORAGE_BUCKET',
  messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
  appId: 'YOUR_APP_ID',
};



const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default function App() {
  const [count, setCount] = useState(0);

  const handlePress = async () => {
    try {
      const docRef = await addDoc(collection(db, 'counters'), {
        number: count + 1,
      });
      console.log('Document written with ID: ', docRef.id);
      setCount(count + 1);
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Current Count: {count}</Text>
      <Button title="Increment Counter" onPress={handlePress} />
    </View>
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

