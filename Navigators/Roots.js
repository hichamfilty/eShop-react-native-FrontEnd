import { View, Text } from 'react-native';
import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Main from './Main';

const Stack = createNativeStackNavigator();

export default function Roots() {
  return (
    <NavigationContainer>
      <Main />
    </NavigationContainer>
  );
}
