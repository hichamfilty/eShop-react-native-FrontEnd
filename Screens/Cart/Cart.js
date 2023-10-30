import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';
import React, { useState, useEffect, useContext } from 'react';

import CartItem from './CartItem';
import * as actions from '../../Redux/Actions/cartActions';
import { connect } from 'react-redux';
import { SwipeListView } from 'react-native-swipe-list-view';

import Icon from 'react-native-vector-icons/FontAwesome5';
import EasyButton from '../../Shared/StyledComponents/EasyButton';
import AuthGlobal from '../../Context/store/AuthGlobal';

const { height, width } = Dimensions.get('window');

const Cart = (props) => {
  const context = useContext(AuthGlobal);
  var total = 0;
  props.cartItems.forEach((cart) => {
    return (total += cart.product.price);
  });

  return (
    <>
      {props.cartItems.length ? (
        <View style={{ marginTop: 40 }}>
          <Text style={{ alignSelf: 'center', color: 'green' }}>Cart</Text>
          <SwipeListView
            data={props.cartItems}
            renderItem={(data) => {
              return <CartItem item={data} />;
            }}
            renderHiddenItem={(data) => {
              return (
                <View style={styles.hiddenContainer}>
                  <TouchableOpacity
                    style={styles.hiddenButton}
                    onPress={() => {
                      return props.removeFromCart(data.item);
                    }}
                  >
                    <Icon name='trash-alt' color='white' size={30} />
                  </TouchableOpacity>
                </View>
              );
            }}
            disableRightSwipe={true}
            previewOpenDelay={3000}
            friction={1000}
            tension={40}
            leftOpenValue={75}
            stopLeftSwipe={75}
            rightOpenValue={-75}
            keyExtractor={(data, index) => index.toString()}
          />
          <View style={styles.bottomContainer}>
            <View>
              <Text style={styles.price}>$ {total}</Text>
            </View>
            <View>
              <EasyButton
                danger
                medium
                onPress={() => {
                  return props.clearCart();
                }}
              >
                <Text style={{ color: 'white' }}>Clear</Text>
              </EasyButton>
            </View>
            {context.stateUser.isAuthenticated ? (
              <View>
                <EasyButton
                  primary
                  meduim
                  onPress={() => props.navigation.navigate('Checkout')}
                >
                  <Text>Checkout</Text>
                </EasyButton>
              </View>
            ) : (
              <View>
                <EasyButton
                  secondary
                  meduim
                  onPress={() => props.navigation.navigate('Login')}
                >
                  <Text>Login</Text>
                </EasyButton>
              </View>
            )}
          </View>
        </View>
      ) : (
        <View style={styles.emptyContainer}>
          <Text>Looks like your cart is empty</Text>
          <Text>Add products to your cart to get started</Text>
        </View>
      )}
    </>
  );
};
const mapStateToProps = (state) => {
  const { cartItems } = state;
  return {
    cartItems: cartItems,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    clearCart: () => dispatch(actions.clearCart()),
    removeFromCart: (item) => dispatch(actions.removeFromCart(item)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);

const styles = StyleSheet.create({
  emptyContainer: {
    height: height,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomContainer: {
    flexDirection: 'row',

    bottom: 0,
    left: 0,
    backgroundColor: 'white',
  },
  price: {
    fontSize: 18,
    margin: 20,
    color: 'red',
  },
  hiddenContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
  hiddenButton: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 25,
    height: 70,
    width: width / 1.2,
  },
});
