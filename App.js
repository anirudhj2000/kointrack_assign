/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaView } from 'react-native';
import AppNavigator from './src/utils/navigation';

function App(){
  
  return (
      <NavigationContainer>
        <AppNavigator/>
      </NavigationContainer>
  );
}

export default App;
