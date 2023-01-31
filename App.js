/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaView } from 'react-native';
import ScreenNavigator from './src/utils/navigation';

function App(){
  
  return (
      <NavigationContainer>
        <ScreenNavigator/>
      </NavigationContainer>
  );
}

export default App;
