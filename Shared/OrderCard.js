import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import EasyButton from './StyledComponents/EasyButton';
import TrafficLight from './StyledComponents/TraficLight';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import baseURL from '../assets/common/baseUrl';
import { Picker } from '@react-native-picker/picker';

const codes = [
  { name: 'pending', code: '3' },
  { name: 'shipped', code: '2' },
  { name: 'delivered', code: '1' },
];

const OrderCard = (props) => {
  const [orderStatus, setOrderStatus] = useState();
  const [statusText, setStatusText] = useState();
  const [statusChange, setStatusChange] = useState();
  const [token, setToken] = useState();
  const [cardColor, setCardColor] = useState();

  useEffect(() => {
    if (props.editMode) {
      AsyncStorage.getItem('jwt')
        .then((res) => {
          setToken(res);
        })
        .catch((error) => console.log(error));
    }

    if (props.status == '3') {
      setOrderStatus(<TrafficLight unavailable></TrafficLight>);
      setStatusText('pending');
      setCardColor('#E74C3C');
    } else if (props.status == '2') {
      setOrderStatus(<TrafficLight limited></TrafficLight>);
      setStatusText('shipped');
      setCardColor('#F1C40F');
    } else {
      setOrderStatus(<TrafficLight available></TrafficLight>);
      setStatusText('delivered');
      setCardColor('#2ECC71');
    }

    return () => {
      setOrderStatus();
      setStatusText();
      setCardColor();
    };
  }, []);

  const updateOrder = () => {
    const config = {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    const order = {
      city: props.city,
      country: props.country,
      dateOrdered: props.dateOrdered,
      id: props.id,
      orderItems: props.orderItems,
      phone: props.phone,
      shippingAddress1: props.shippingAddress1,
      shippingAddress2: props.shippingAddress2,
      status: statusChange,
      totalPrice: props.totalPrice,
      user: props.user,
      zip: props.zip,
    };

    axios
      .put(`${baseURL}orders/${props.id}`, order, config)
      .then((res) => {
        if (res.status == 200 || res.status == 201) {
          Toast.show({
            topOffset: 60,
            type: 'success',
            text1: 'Order Edited',
            text2: '',
          });
          setTimeout(() => {
            props.navigation.navigate('Products');
          }, 500);
        }
      })
      .catch((error) => {
        Toast.show({
          topOffset: 60,
          type: 'error',
          text1: 'Something went wrong',
          text2: 'Please try again',
        });
      });
  };

  return (
    <View style={[{ backgroundColor: cardColor }, styles.container]}>
      <View style={styles.title}>
        <Text>Order Number: #{props.id}</Text>
      </View>
      <View style={{ marginTop: 10 }}>
        <Text>
          Status: {statusText} {orderStatus}
        </Text>
        <Text>
          Address: {props.shippingAddress1} {props.shippingAddress2}
        </Text>
        <Text>City: {props.city}</Text>
        <Text>Country: {props.country}</Text>
        <Text>Date Ordered: {props.dateOrdered} </Text>
        <View style={styles.pricContainer}>
          <Text>Price: </Text>
          <Text style={styles.price}>$ {props.totalPrice}</Text>
        </View>
        {props.editMode ? (
          <View>
            <Picker
              mode='dropdown'
              style={{ width: undefined }}
              selectedValue={statusChange}
              onValueChange={(e) => setStatusChange(e)}
            >
              {codes.map((c) => {
                return (
                  <Picker.Item key={c.code} label={c.name} value={c.code} />
                );
              })}
            </Picker>
            <EasyButton secondary large onPress={() => updateOrder()}>
              <Text style={{ color: 'white' }}>Update</Text>
            </EasyButton>
          </View>
        ) : null}
      </View>
    </View>
  );
};

export default OrderCard;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    margin: 10,
    borderRadius: 10,
  },
  title: {
    backgroundColor: '#62b1f6',
    padding: 5,
  },
  pricContainer: {
    marginTop: 10,
    alignSelf: 'flex-end',
    flexDirection: 'row',
  },
  price: {
    color: 'white',
    fontWeight: 'bold',
  },
});
