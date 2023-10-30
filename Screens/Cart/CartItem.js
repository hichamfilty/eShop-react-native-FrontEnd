import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { Avatar, ListItem } from '@rneui/themed';

const CartItem = (props) => {
  const data = props.item.item.product;
  const [quantity, setQuantity] = useState(props.item.item.quantity);
  console.log(data.name);
  return (
    <ListItem key={Math.random()} bottomDivider>
      <Avatar
        source={{
          uri: data.image
            ? data.image
            : 'https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png',
        }}
      />
      <ListItem.Content>
        <ListItem.Title>{data.name}</ListItem.Title>
        <ListItem.Subtitle>$ {data.price}</ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );
};

export default CartItem;

const styles = StyleSheet.create({
  listItem: {
    alignItems: 'center',
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  body: {
    margin: 10,
    alignItems: 'center',
    flexDirection: 'row',
  },
});
