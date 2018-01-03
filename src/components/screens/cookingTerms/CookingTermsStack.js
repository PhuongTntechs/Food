//import React from 'react';
//import { Text } from 'react-native';
import { StackNavigator } from 'react-navigation';
import CookingTerms from './CookingTerms';
import Init from '../../assets/Init';

const { HeaderBgColor, textHeaderColor, headerTitleSize } = Init;
const CookingTermsStack = StackNavigator({
  Screen_CookingTerms: {
    screen: CookingTerms,
    navigationOptions: {
      title: 'Favorites'
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

export default CookingTermsStack;
