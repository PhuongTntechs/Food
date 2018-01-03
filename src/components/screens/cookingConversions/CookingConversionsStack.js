//import React from 'react';
//import { Text } from 'react-native';
import { StackNavigator } from 'react-navigation';
import CookingConversions from './CookingConversions';
import Init from '../../assets/Init';

const { HeaderBgColor, textHeaderColor, headerTitleSize } = Init;
const CookingConversionsStack = StackNavigator({
  Screen_CookingConversions: {
    screen: CookingConversions,
    navigationOptions: {
      title: 'Cooking Conversions'
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

export default CookingConversionsStack;
