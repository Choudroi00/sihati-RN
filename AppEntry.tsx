/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet, Text, useColorScheme, View } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import './global.css';




function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode? Colors.lighter : Colors.lighter,
  }

  return (
    <SafeAreaView style={[ { backgroundColor: "#FFF",width: '100%', height: '100%'}]} >
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />

      <View className='flex-1 justify-center items-center' >
        <Text className='text-black text-lg font-semibold' >ChiboEra!</Text>

      </View>
      
    </SafeAreaView>
  );
}


export default App;
