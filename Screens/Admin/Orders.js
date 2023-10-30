import { StyleSheet, Text, View, FlatList } from 'react-native';
import React, { useState, useCallback } from 'react';
import axios from 'axios';
import baseURL from '../../assets/common/baseUrl';
import { useFocusEffect } from '@react-navigation/native';
import OrderCard from '../../Shared/OrderCard';

const Orders = (props) => {
  const [orderList, setOrderList] = useState();
  useFocusEffect(
    useCallback(() => {
      getOrders();

      return () => {
        setOrderList();
      };
    }, [])
  );
  const getOrders = () => {
    axios
      .get(`${baseURL}orders`)
      .then((x) => setOrderList(x.data))
      .catch((error) => console.log(error));
  };

  return (
    <View>
      <FlatList
        data={orderList}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          return (
            <OrderCard
              navigation={props.navigation}
              {...item}
              editMode={true}
            />
          );
        }}
      />
    </View>
  );
};

export default Orders;

const styles = StyleSheet.create({});
