import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={{
      padding: 50,
      flexDirection: 'row',
      width: '80%',
      height: 300,
      justifyContent: 'space-around',
      alignItems: 'stretch'
    }}>
      <View style={{
        backgroundColor: 'red',
        flex: 3,
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <Text>Texto 1</Text>
      </View >
      <View
      style={{
        backgroundColor: 'blue',
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <Text>Texto 2</Text>
      </View>
      <View 
      style={{
        backgroundColor: 'green',
        justifyContent: 'center',
        flex:1,
        alignItems: 'center'
      }}>
        <Text>Texto 3</Text>
      </View>
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
