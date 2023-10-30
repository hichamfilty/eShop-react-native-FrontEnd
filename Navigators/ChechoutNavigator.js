import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import Checkout from '../Screens/Cart/Checkout/Checkout';
import Confirm from '../Screens/Cart/Checkout/Confirm';
import Payment from '../Screens/Cart/Checkout/Payment';

const Tab = createMaterialTopTabNavigator();

export default function ChechoutNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen name='Checkout' component={Checkout} />
      <Tab.Screen name='Payment' component={Payment} />
      <Tab.Screen name='Confirm' component={Confirm} />
    </Tab.Navigator>
  );
}
