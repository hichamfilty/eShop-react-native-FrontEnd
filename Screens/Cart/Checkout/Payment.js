import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { ListItem, Header, Switch } from '@rneui/themed';
import SelectList from 'react-native-dropdown-select-list';
import { Button } from 'react-native';

const methods = [
  { name: 'Cash on delivery', value: 1 },
  { name: 'Bank Transfer', value: 2 },
  { name: 'Card Payment', value: 3 },
];
const paymentCards = [
  { value: 'Visa', key: 1 },
  { value: 'Master Card', key: 2 },
  { value: 'American Express', key: 3 },
  { value: 'Other', key: 4 },
];

const Payment = (props) => {
  const order = props.route.params;
  const [selected, setSelected] = useState();
  const [card, setCard] = useState();
  return (
    <ScrollView>
      <Header>
        <Text
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            color: 'white',
          }}
        >
          Choose Payment Methods
        </Text>
      </Header>
      <View>
        {methods.map((item, index) => {
          return (
            <ListItem key={index} onPress={() => setSelected(item.value)}>
              <Text>{item.name}</Text>
              <Switch value={selected == item.value} />
            </ListItem>
          );
        })}
        {selected == 3 ? (
          <SelectList
            onSlelect={() => alert(selected)}
            setSelected={setSelected}
            data={paymentCards}
            search={false}
          />
        ) : null}
        <View style={{ marginTop: 60, alignSelf: 'center' }}>
          <Button
            title={'Confirm'}
            onPress={() =>
              props.navigation.navigate('Confirm', { order: order })
            }
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default Payment;

const styles = StyleSheet.create({});
