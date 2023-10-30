import { View } from 'react-native';
import React, { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome5';
import HomeNavigator from './HomeNavigator';
import CartIcon from '../Shared/CartIcon';
import Cart from '../Screens/Cart/Cart';
import CartNavigator from './CartNavigator';
import UserNavigator from './UserNavigator';
import AdminNavigator from './AdminNavigator';
import AuthGlobal from '../Context/store/AuthGlobal';

const Tab = createBottomTabNavigator();
export default function Main() {
  const context = useContext(AuthGlobal);
  return (
    <Tab.Navigator
      initialRouteName='Home'
      screenOptions={{
        keyboardHidesTabBar: true,
        showLabel: false,
        activeTintColor: '#e91e63',
        headerShown: false,
      }}
    >
      <Tab.Screen
        name='Home'
        component={HomeNavigator}
        options={{
          tabBarIcon: ({ color }) => {
            return <Icon name='home' color={color} size={30} />;
          },
        }}
      />
      <Tab.Screen
        name='Cart'
        component={CartNavigator}
        options={{
          tabBarIcon: ({ color }) => {
            return (
              <View>
                <Icon name='shopping-cart' color={color} size={30} />
                <CartIcon />
              </View>
            );
          },
        }}
      />
      {context.stateUser.user.isAdmin == true ? (
        <Tab.Screen
          name='Admin'
          component={AdminNavigator}
          options={{
            tabBarIcon: ({ color }) => {
              return <Icon name='cog' color={color} size={30} />;
            },
          }}
        />
      ) : null}

      <Tab.Screen
        name='User'
        component={UserNavigator}
        options={{
          tabBarIcon: ({ color }) => {
            return (
              <View>
                <Icon name='user' color={color} size={30} />
              </View>
            );
          },
        }}
      />
    </Tab.Navigator>
  );
}
