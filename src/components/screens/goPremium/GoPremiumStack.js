//import React from 'react';
//import { Text } from 'react-native';
import { StackNavigator } from 'react-navigation';

import GoPremium from './GoPremium';
import Init from '../../assets/Init';

const { HeaderBgColor, textHeaderColor, headerTitleSize } = Init;
const GoPremiumStack = StackNavigator({
  Screen_GoPremium: {
    screen: GoPremium,
    navigationOptions: {
      title: 'Go Premium',
    }
  },
},
{
  navigationOptions: {
    headerStyle: {
      backgroundColor: HeaderBgColor
    },
    headerTitleStyle: {
      color: textHeaderColor,
      fontSize: headerTitleSize,
      fontFamily: 'impact',
      fontStyle: 'italic'
    }
  }
}
);

export default GoPremiumStack;
