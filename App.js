import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { NativeBaseProvider } from 'native-base';
import Toast from 'react-native-toast-message';

import { LogBox } from 'react-native';

import Roots from './Navigators/Roots';
import Header from './Shared/Header';
import { Provider } from 'react-redux';
import store from './Redux/store';
import Auth from './Context/store/Auth';

// LogBox.ignoreAllLogs(true);

export default function App() {
  useEffect(() => {
    LogBox.ignoreLogs(['Animated: `useNativeDriver`']);
  }, []);
  return (
    <Auth>
      <Provider store={store}>
        <NativeBaseProvider>
          <Header />
          <Roots />
          {/* <Toast ref={(ref) => Toast.setRef(ref)} /> */}
          <Toast />
        </NativeBaseProvider>
      </Provider>
    </Auth>
  );
}
