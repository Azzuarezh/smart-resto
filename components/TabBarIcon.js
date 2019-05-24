import React from 'react';
import { Icon } from 'expo';
import { View } from 'react-native';
import {
  Content,
  Text,
  List,
  ListItem,
  Container,
  Left,
  Right,
  Badge
} from "native-base";

import Colors from '../constants/Colors';

export default class TabBarIcon extends React.Component {
  render() {
    const { name, badgeCount, focused, size } = this.props;
    return (
      <View >
        <Icon.Ionicons name={name} size={size} color={focused ? Colors.tabIconSelected : Colors.tabIconDefault} />
        { badgeCount > 0 && (
          <View style={{
            // If you're using react-native < 0.57 overflow outside of the parent
            // will not work on Android, see https://git.io/fhLJ8
            position: 'absolute',
            right: -6,
            top: -3,
            backgroundColor: 'red',
            borderRadius: 6,
            width: 14,
            height: 14,
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <Text style={{ color: 'white', fontSize: 10, fontWeight: 'bold' }}>{badgeCount}</Text>
          </View>
        )}
      </View>
    );
  }
}