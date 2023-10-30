import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Login from '../Screens/User/Login';
import Register from '../Screens/User/Register';
import UserProfile from '../Screens/User/UserProfile';

const Stack = createStackNavigator();

export default function UserNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        component={Login}
        name='Login'
        options={{ headerShowen: false }}
      />
      <Stack.Screen
        component={Register}
        name='Register'
        options={{ headershowen: false }}
      />
      <Stack.Screen
        component={UserProfile}
        name='User Profile'
        options={{ headerShowen: false }}
      />
    </Stack.Navigator>
  );
}
