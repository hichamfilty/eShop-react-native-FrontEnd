import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Cart from '../Screens/Cart/Cart';
import CheckoutNavigator from './ChechoutNavigator';

const Stack = createStackNavigator();

export default function CartNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name='CartScreen'
        component={Cart}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name='Checkout'
        component={CheckoutNavigator}
        options={{
          title: 'Checkout',
        }}
      />
    </Stack.Navigator>
  );
}
