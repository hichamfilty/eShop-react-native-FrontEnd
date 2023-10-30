import { StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native';

import React from 'react';
import { Text, ListItem, Button, Badge } from '@rneui/themed';

const CategoryFilter = (props) => {
  return (
    <ScrollView
      bounces={true}
      horizontal={true}
      style={{ backgroundColor: '#f2f2f2' }}
    >
      <ListItem style={{ margin: 0, padding: 0, borderRadius: 0 }}>
        <TouchableOpacity
          key={1}
          onPress={() => {
            props.categoryFilter('all'), props.setActive(-1);
          }}
        >
          <Badge
            value='all'
            status='success'
            style={[
              styles.center,
              { margin: 5 },
              props.active == -1 ? styles.active : styles.inactive,
            ]}
          ></Badge>
        </TouchableOpacity>
        {props.categories.map((item) => (
          <TouchableOpacity
            key={item.id}
            onPress={() => {
              props.categoryFilter(item.id),
                props.setActive(props.categories.indexOf(item));
            }}
          >
            <Badge
              value={item.name}
              status='primary'
              style={[
                styles.center,
                { margin: 5 },
                props.active == props.categories.indexOf(item)
                  ? styles.active
                  : styles.inactive,
              ]}
            ></Badge>
          </TouchableOpacity>
        ))}
      </ListItem>
    </ScrollView>
  );
};

export default CategoryFilter;

const styles = StyleSheet.create({
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  active: {
    backgroundColor: '#03bafc',
  },
  inactive: {
    backgroundColor: '#a0e1eb',
  },
});
