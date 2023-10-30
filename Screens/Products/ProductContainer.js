import { StyleSheet, Dimensions, Text, View, ScrollView } from 'react-native';
import React, { useState, useCallback } from 'react';
import { SearchBar } from '@rneui/themed';
import { useFocusEffect } from '@react-navigation/native';
import ProductList from './ProductList';
import axios from 'axios';

import Banner from '../../Shared/Banner';
import CategoryFilter from './CategoryFilter';
import SearchedProducts from './SearchedProducts';
import baseURL from '../../assets/common/baseUrl';
import { ActivityIndicator } from 'react-native';

// // const data = require('../../assets/data/products.json');
// const productCategories = require('../../assets/data/categories.json');

var { height } = Dimensions.get('window');

const ProductContainer = (props) => {
  const [products, setProducts] = useState([]);
  const [productsFiltered, setProductsFiltered] = useState([]);
  const [focus, setFocus] = useState();
  const [categories, setCategories] = useState([]);
  const [productsCtg, setProductsCtg] = useState([]);
  const [active, setActive] = useState();
  const [initialState, setInitialState] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState();

  useFocusEffect(
    useCallback(() => {
      setFocus(false);
      setActive(-1);

      // Products
      axios
        .get(`${baseURL}products`)
        .then((res) => {
          setProducts(res.data);
          setProductsFiltered(res.data);
          setProductsCtg(res.data);
          setInitialState(res.data);
          setLoading(false);
        })
        .catch((error) => {
          console.log('Api call error');
        });

      // Categories
      axios
        .get(`${baseURL}categories`)
        .then((res) => {
          setCategories(res.data);
        })
        .catch((error) => {
          console.log('Api call error');
        });

      return () => {
        setProducts([]);
        setProductsFiltered([]);
        setFocus();
        setCategories([]);
        setActive();
        setInitialState();
      };
    }, [])
  );

  // Product Methods
  const searchProduct = (text) => {
    setProductsFiltered(
      products.filter((i) => i.name.toLowerCase().includes(text.toLowerCase()))
    );
  };

  const openList = () => {
    setFocus(true);
  };

  const onBlur = () => {
    setFocus(false);
  };

  // Categories
  const changeCtg = (ctg) => {
    {
      ctg === 'all'
        ? [setProductsCtg(initialState), setActive(true)]
        : [
            setProductsCtg(
              products.filter((i) => i.category._id === ctg),
              setActive(true)
            ),
          ];
    }
  };

  return (
    <>
      {loading == false ? (
        <View style={styles.view}>
          <SearchBar
            placeholder='Search'
            onChangeText={(text) => searchProduct(text)}
            onFocus={openList}
            lightTheme
            round
          />
          {focus == true ? (
            <SearchedProducts
              navigation={props.navigation}
              productsFiltered={productsFiltered}
            />
          ) : (
            <ScrollView>
              <View>
                <View>
                  <Banner />
                </View>
                <View>
                  <CategoryFilter
                    categories={categories}
                    categoryFilter={changeCtg}
                    productsCtg={productsCtg}
                    active={active}
                    setActive={setActive}
                  />
                </View>
                {productsCtg.length > 0 ? (
                  <View style={styles.container}>
                    {productsCtg.map((item) => {
                      return (
                        <ProductList
                          navigation={props.navigation}
                          // key={item._id.$oid}
                          key={item.name}
                          item={item}
                        />
                      );
                    })}
                  </View>
                ) : (
                  <View style={[styles.center, { height: height / 2 }]}>
                    <Text>No products found</Text>
                  </View>
                )}
              </View>
            </ScrollView>
          )}
        </View>
      ) : (
        // loading
        <View style={[styles.center, { backgroundColor: '#f2f2f2' }]}>
          <ActivityIndicator size='large' color='red'></ActivityIndicator>
        </View>
      )}
    </>
  );
};

export default ProductContainer;

const styles = StyleSheet.create({
  view: {
    margin: 10,
  },
});
