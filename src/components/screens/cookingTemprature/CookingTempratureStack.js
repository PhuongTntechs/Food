//import React from 'react';
//import { Text } from 'react-native';
import { StackNavigator } from 'react-navigation';
import CookingTemperature from './CookingTemperature';
import Init from '../../assets/Init';

const { HeaderBgColor, textHeaderColor, headerTitleSize } = Init;
const CookingTemperatureStack = StackNavigator({
  Screen_CookingTemperature: {
    screen: CookingTemperature,
    navigationOptions: {
      title: 'Cooking Temperature Chart'
    }
  }
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

export default CookingTemperatureStack;
