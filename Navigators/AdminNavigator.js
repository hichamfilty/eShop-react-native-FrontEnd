import { View, Text } from 'react-native';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Products from '../Screens/Admin/Products';
import Orders from '../Screens/Admin/Orders';
import ProductForm from '../Screens/Admin/ProductForm';
import Categories from '../Screens/Admin/Categories';

const Stack = createStackNavigator();

export default function AdminNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name='Products'
        component={Products}
        options={{ title: Products }}
      />
      <Stack.Screen name='Orders' component={Orders} />
      <Stack.Screen name='ProductForm' component={ProductForm} />
      <Stack.Screen name='Categories' component={Categories} />
    </Stack.Navigator>
  );
}
