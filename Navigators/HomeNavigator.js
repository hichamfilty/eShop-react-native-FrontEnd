import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ProductContainer from '../Screens/Products/ProductContainer';
import SingleProduct from '../Screens/Products/SingleProduct';

const Stack = createStackNavigator();

export default function HomeNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        component={ProductContainer}
        name='home'
        options={{ headerShown: false }}
      />
      <Stack.Screen
        component={SingleProduct}
        name='Product Detail'
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
