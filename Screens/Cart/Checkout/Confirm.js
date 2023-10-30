import {
  Dimensions,
  StyleSheet,
  ScrollView,
  Text,
  View,
  Button,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { ListItem, Avatar } from '@rneui/themed';
import * as actions from '../../../Redux/Actions/cartActions';
import { connect } from 'react-redux';

import Toast from 'react-native-toast-message';
import axios from 'axios';
import baseURL from '../../../assets/common/baseUrl';

const { height, width } = Dimensions.get('window');

const Confirm = (props) => {
  const finalOrder = props.route.params;

  const confirmOrder = () => {
    const order = finalOrder.order.order;
    axios
      .post(`${baseURL}orders`, order)
      .then((res) => {
        if (res.status == 200 || res.status == 201) {
          Toast.show({
            topOffset: 60,
            type: 'success',
            text1: 'Order completed',
            text2: '',
          });
          setTimeout(() => {
            props.clearCart();
            props.navigation.navigate('CartScreen');
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
    <ScrollView>
      <View style={styles.titleContainer}>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Confirm Order</Text>
        {props.route.params ? (
          <View style={{ borderWidth: 1, borderColor: 'orange' }}>
            <Text style={styles.title}>Shipping to: </Text>
            <View style={{ padding: 8 }}>
              <Text>Address: {finalOrder.order.order.shippingAddress1}</Text>
              <Text>Address2: {finalOrder.order.order.shippingAddress2}</Text>
              <Text>City: {finalOrder.order.order.city}</Text>
              <Text>Zip Code: {finalOrder.order.order.zip}</Text>
              <Text>Country: {finalOrder.order.order.country}</Text>
            </View>
            <Text style={styles.title}>Items: </Text>
            {finalOrder.order.order.orderItems.map((data) => {
              return (
                <ListItem key={Math.random()} bottomDivider>
                  <Avatar
                    source={{
                      uri: data.product.image
                        ? data.product.image
                        : 'https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png',
                    }}
                  />
                  <ListItem.Content>
                    <ListItem.Title>{data.product.name}</ListItem.Title>
                    <ListItem.Subtitle>
                      $ {data.product.price}
                    </ListItem.Subtitle>
                  </ListItem.Content>
                </ListItem>
              );
            })}
          </View>
        ) : null}

        <View style={{ alignItems: 'center', margin: 20 }}>
          <Button title={'Place order'} onPress={confirmOrder} />
        </View>
      </View>
    </ScrollView>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    clearCart: () => dispatch(actions.clearCart()),
  };
};

export default connect(null, mapDispatchToProps)(Confirm);

const styles = StyleSheet.create({
  container: {
    height: height,
    padding: 8,
    alignContent: 'center',
    backgroundColor: 'white',
  },
  titleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 8,
  },
  title: {
    alignSelf: 'center',
    margin: 8,
    fontSize: 16,
    fontWeight: 'bold',
  },
  listItem: {
    alignItems: 'center',
    backgroundColor: 'white',
    justifyContent: 'center',
    width: width / 1.2,
  },
  body: {
    margin: 10,
    alignItems: 'center',
    flexDirection: 'row',
  },
});
