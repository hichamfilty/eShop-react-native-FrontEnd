import { Dimensions, View, TouchableOpacity } from 'react-native';
import React from 'react';
import ProductCard from './ProductCard';

const { width } = Dimensions.get('window');

const ProductList = (props) => {
  const { item } = props;
  return (
    <TouchableOpacity
      style={{ width: '50%' }}
      onPress={() => {
        return props.navigation.navigate('Product Detail', { item: item });
      }}
    >
      <View style={{ width: width / 2, backgroundColor: 'gainsboro' }}>
        <ProductCard {...item} />
      </View>
    </TouchableOpacity>
  );
};

export default ProductList;
