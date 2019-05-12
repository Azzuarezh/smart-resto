import React from 'react';
import { createAppContainer, 
  createSwitchNavigator, 
  createStackNavigator,
  createBottomTabNavigator } from 'react-navigation';
import { Platform } from 'react-native';
import TabBarIcon from '../components/TabBarIcon';
import LoginScreen from '../screens/LoginScreen';
import AuthLoadingScreen from '../screens/AuthLoadingScreen';
import WaiterMenuScreen from '../screens/waiter/MenuScreen';
import WaiterOrderScreen from '../screens/waiter/OrderScreen';

const AuthStack = createStackNavigator({ Login: LoginScreen});
const WaiterStack = createStackNavigator({
  Menu: WaiterMenuScreen, 
  Order: WaiterOrderScreen
});

const WaiterMenuStack= createStackNavigator({Menu: WaiterMenuScreen});
const WaiterOrderStack= createStackNavigator({Order: WaiterOrderScreen});
//order: WaiterOrderScreen

WaiterMenuStack.navigationOptions = {
  tabBarLabel: 'Menu',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};

WaiterOrderStack.navigationOptions = {
  tabBarLabel: 'Order',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};

const WaiterBottomNav = createBottomTabNavigator({
  WaiterMenuStack,WaiterOrderStack
});


export default createAppContainer(createSwitchNavigator({
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  
  AuthLoading: AuthLoadingScreen, 
  Auth:AuthStack,
  Waiter_nav: WaiterBottomNav,
  Waiter : WaiterStack
},
{
    initialRouteName: 'AuthLoading',
}
));