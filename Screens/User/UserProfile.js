import { StyleSheet, Text, View, ScrollView, Button } from 'react-native';
import React, { useContext, useState, useEffect, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import baseURL from '../../assets/common/baseUrl';
import AuthGlobal from '../../Context/store/AuthGlobal';

import { logoutUser } from '../../Context/actions/Auth.actions';
import OrderCard from '../../Shared/OrderCard';

const UserProfile = (props) => {
  const context = useContext(AuthGlobal);
  console.log(context);
  const [userProfile, setUserProfile] = useState(null);
  const [orders, setOrders] = useState();

  useFocusEffect(
    useCallback(() => {
      if (
        context.stateUser.isAuthenticated === false ||
        context.stateUser.isAuthenticated === null
      ) {
        props.navigation.navigate('Login');
      } else {
        AsyncStorage.getItem('jwt')
          .then((res) => {
            axios
              .get(`${baseURL}users/${context.stateUser.user.userId}`, {
                headers: { Authorization: `Bearer ${res}` },
              })
              .then((user) => {
                console.log('user' + user.data);
                return setUserProfile(user.data);
              });
          })
          .catch((error) => console.log(error));

        axios
          .get(`${baseURL}orders`)
          .then((x) => {
            const data = x.data;

            const userOrders = data.filter(
              (order) => order.user._id === context.stateUser.user.userId
            );
            setOrders(userOrders);
          })
          .catch((error) => console.log(error));
      }

      return () => {
        setUserProfile();
        setOrders();
      };
    }, [context.stateUser.isAuthenticated])
  );

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.subContainer}>
        <Text style={{ fontSize: 30 }}>
          Name: {userProfile ? userProfile.name : ''}
        </Text>
        <View style={{ marginTop: 20 }}>
          <Text style={{ margin: 10 }}>
            Email: {userProfile ? userProfile.email : ''}
          </Text>
          <Text style={{ margin: 10 }}>
            Phone: {userProfile ? userProfile.phone : ''}
          </Text>
        </View>
        <View style={{ marginTop: 80 }}>
          <Button
            title={'Sign Out'}
            onPress={() => [
              AsyncStorage.removeItem('jwt'),
              logoutUser(context.dispatch),
            ]}
          />
        </View>
        <View style={styles.order}>
          <Text style={{ fontSize: 20 }}>MyOrders</Text>
          <View>
            {orders ? (
              orders.map((x) => {
                return <OrderCard key={x.id} {...x} />;
              })
            ) : (
              <View style={styles.order}>
                <Text>You have no Orders</Text>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default UserProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  subContainer: {
    alignItems: 'center',
    marginTop: 60,
  },
  order: {
    marginTop: 20,
    alignItems: 'center',
    marginBottom: 60,
  },
});
