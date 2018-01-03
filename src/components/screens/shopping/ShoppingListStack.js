//import React from 'react';
//import { Text } from 'react-native';
import { StackNavigator } from 'react-navigation';

import ShoppingList from './ShoppingList';
import Init from '../../assets/Init';

const { HeaderBgColor, textHeaderColor, headerTitleSize } = Init;
const ShoppingListStack = StackNavigator({
  Screen_Shoppinglist: {
    screen: ShoppingList,
    navigationOptions: {
      title: 'Shopping List',
      headerStyle: {
        backgroundColor: HeaderBgColor,
      },
      headerTitleStyle: {
        color: textHeaderColor,
        fontSize: headerTitleSize,
        fontFamily: 'impact',
        fontStyle: 'italic'
      }
    }
  },
});

export default ShoppingListStack;
