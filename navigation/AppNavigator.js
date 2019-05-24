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
import ChefMenuScreen from '../screens/chef/MenuScreen';
import ChefOrderScreen from '../screens/chef/OrderScreen';


const AuthStack = createStackNavigator({ Login: LoginScreen});

const WaiterStack = createStackNavigator({
  Menu: WaiterMenuScreen, 
  Order: WaiterOrderScreen
},
{
    initialRouteName: 'Order',
});

const ChefStack = createStackNavigator({
  Menu: ChefMenuScreen, 
  Order: ChefOrderScreen
},
{
  initialRouteName: 'Order',
});


export default createAppContainer(createSwitchNavigator({
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  
  AuthLoading: AuthLoadingScreen, 
  Auth:AuthStack,
  waiter : WaiterStack,
  chef : ChefStack
},
{
    initialRouteName: 'AuthLoading',
}
));