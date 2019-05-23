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
});

const ChefStack = createStackNavigator({
  Menu: ChefMenuScreen, 
  Order: ChefOrderScreen
});


const WaiterMenuStack= createStackNavigator({Menu: WaiterMenuScreen});
const WaiterOrderStack= createStackNavigator({Order: WaiterOrderScreen});

const ChefMenuStack= createStackNavigator({Menu: ChefMenuScreen});
const ChefOrderStack= createStackNavigator({Order: ChefOrderScreen});


WaiterMenuStack.navigationOptions = {
  tabBarLabel: 'Menu',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-menu`
          : 'md-menu'
      }
      badgeCount='4'
      size={25}
    />
  ),
};

WaiterOrderStack.navigationOptions = {
  tabBarLabel: 'Order',
  tabBarIcon: ({ focused, horizontal, tintColor }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-cart`
          : 'md-cart'
      }
      badgeCount='1'
      size={25}
    />
  ),
};

const WaiterBottomNav = createBottomTabNavigator({
  WaiterMenuStack,WaiterOrderStack
});



ChefMenuStack.navigationOptions = {
  tabBarLabel: 'Menu',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-menu`
          : 'md-menu'
      }
      badgeCount='4'
      size={25}
    />
  ),
};

ChefOrderStack.navigationOptions = {
  tabBarLabel: 'Order',
  tabBarIcon: ({ focused, horizontal, tintColor }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-cart`
          : 'md-cart'
      }
      badgeCount='1'
      size={25}
    />
  ),
};


const ChefBottomNav = createBottomTabNavigator({
  ChefMenuStack,ChefOrderStack
});

export default createAppContainer(createSwitchNavigator({
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  
  AuthLoading: AuthLoadingScreen, 
  Auth:AuthStack,
  waiter_nav: WaiterBottomNav,
  chef_nav: ChefBottomNav,
  Waiter : WaiterStack,
  Chef : ChefStack
},
{
    initialRouteName: 'AuthLoading',
}
));