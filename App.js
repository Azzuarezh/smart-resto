import React from 'react';
import { Platform, StatusBar, StyleSheet, View, AsyncStorage } from 'react-native';
import { AppLoading, Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import * as Icon from '@expo/vector-icons';
import * as Font from 'expo-font';
import { Asset } from 'expo-asset';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import Index from './screens/Index';
import reducer from './components/reducer';

export const store = createStore(reducer);

async function getToken() {
  console.log('getting token ...')
  // Remote notifications do not work in simulators, only on device
  if (!Constants.isDevice) {
    return;
  }
  let { status } = await Permissions.askAsync(
    Permissions.NOTIFICATIONS,
  );
  if (status !== 'granted') {
    return;
  }
  let value = await Notifications.getExpoPushTokenAsync();
  console.log('Our token : ', value);
  /// Send this to a server
}

export default class App extends React.Component {

  componentDidMount() {
    getToken();

    this.listener = Notifications.addListener(this.handleNotification);
  }

  componentWillUnmount() {
    this.listener && this.listener.remove();
  }

  handleNotification = ({ origin, data }) => {
    console.log(
      `Push notification ${origin} with data: ${JSON.stringify(data)}`,
    );
  };

async componentDidMount() {
    await Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
    });  
}



render() { // eslint-disable-line
    return (
      <Provider store={store} >
        <Index />
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});