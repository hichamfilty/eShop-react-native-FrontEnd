import { StyleSheet, Text, View, Dimensions } from 'react-native';
import React from 'react';
import { Avatar, ListItem } from '@rneui/themed';

var { width } = Dimensions.get('window');

const SearchedProducts = (props) => {
  const { productsFiltered } = props;
  return (
    <View style={{ width: width }}>
      {productsFiltered ? (
        productsFiltered.map((item) => {
          return (
            <ListItem
              onPress={() => {
                props.navigation.navigate('Product Detail', { item: item });
              }}
              key={item._id.$oid}
              bottomDivider
            >
              <Avatar
                source={{
                  uri: item.image
                    ? item.image
                    : 'https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png',
                }}
              />
              <ListItem.Content>
                <ListItem.Title>{item.name}</ListItem.Title>
                <ListItem.Subtitle>{item.description}</ListItem.Subtitle>
              </ListItem.Content>
            </ListItem>
          );
        })
      ) : (
        <View style={styles.center}>
          <Text style={{ alignSelf: 'center' }}>
            No products match the selected criteria
          </Text>
        </View>
      )}
    </View>
  );
};

export default SearchedProducts;

const styles = StyleSheet.create({
  center: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
  },
});
