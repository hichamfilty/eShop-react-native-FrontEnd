import { ScrollView, StyleSheet, Image, Text, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import Toast from 'react-native-toast-message';
import EasyButton from '../../Shared/StyledComponents/EasyButton';
import * as actions from '../../Redux/Actions/cartActions';
import { connect } from 'react-redux';
import TrafficLight from '../../Shared/StyledComponents/TraficLight';
import { Center } from 'native-base';

const SingleProduct = (props) => {
  const [item, setItem] = useState(props.route.params.item);
  const [availability, setAvailability] = useState('');
  const [availabilityText, setAvailabilityText] = useState('');

  useEffect(() => {
    if (props.route.params.item.countInStock == 0) {
      setAvailability(<TrafficLight unavailable></TrafficLight>);
      setAvailabilityText('Unvailable');
    } else if (props.route.params.item.countInStock <= 5) {
      setAvailability(<TrafficLight limited></TrafficLight>);
      setAvailabilityText('Limited Stock');
    } else {
      setAvailability(<TrafficLight available></TrafficLight>);
      setAvailabilityText('Available');
    }
    return () => {
      setAvailability(null);
      setAvailabilityText('');
    };
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView>
        <View>
          <Image
            source={{
              uri: item.image
                ? item.image
                : 'https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png',
            }}
            // resizeMethod='contain'
            style={styles.image}
          />
        </View>
        <View style={styles.contentContainer}>
          <Text style={styles.contentHeader}>{item.name}</Text>
          <Text style={styles.contentText}>{item.brand}</Text>
          <Text>$ {item.price}</Text>
        </View>
        <View style={styles.availabilityContainer}>
          <View style={styles.availability}>
            <Text style={{ marginRight: 10 }}>
              Availabiliyty: {availabilityText}
            </Text>
            {availability}
          </View>
        </View>
        <View style={styles.bottomContainer}>
          <View style={{ alignContent: 'center' }}>
            <Text style={styles.price}>$ {item.price}</Text>
          </View>
          <View>
            <EasyButton
              primary
              medium
              onPress={() => {
                props.addItemToCart(item),
                  Toast.show({
                    topOffset: 60,
                    type: 'success',
                    text1: `${item.name} is added to cart`,
                    text2: 'Go to your cart to complete order',
                  });
              }}
            >
              <Text style={{ color: 'white' }}>Add</Text>
            </EasyButton>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    addItemToCart: (product) =>
      dispatch(actions.addToCart({ quantity: 1, product })),
  };
};

export default connect(null, mapDispatchToProps)(SingleProduct);

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    height: '100%',
  },
  imageContainer: {
    backgroundColor: 'white',
    padding: 0,
    margin: 0,
  },
  image: {
    width: '100%',
    height: 250,
  },
  contentContainer: {
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentHeader: {
    fontWeight: 'bold',
    marginBottom: 20,
  },
  contentText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  bottomContainer: {
    flexDirection: 'row',

    bottom: 0,
    left: 0,
    backgroundColor: 'white',
  },
  price: {
    fontSize: 24,
    margin: 7,
    color: 'red',
  },
  availabilityContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  availability: {
    flexDirection: 'row',
    marginBottom: 10,
  },
});
