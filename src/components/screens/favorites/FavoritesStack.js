//import React from 'react';
//import { Text } from 'react-native';
import { StackNavigator } from 'react-navigation';
import Favorites from './Favorites';
import SingleProduct from '../single/SingleProduct';
import TipCategoryItem from '../category/TipCategoryItem';
import Init from '../../assets/Init';

const { HeaderBgColor, textHeaderColor, headerTitleSize } = Init;
const FavoritesStack = StackNavigator({
  Screen_Favorites: {
    screen: Favorites,
    navigationOptions: {
      title: 'Favorites'
    }
  },
  Screen_TipCategoryItem: {
    screen: TipCategoryItem
  },
  Screen_Single: {
    screen: SingleProduct
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

export default FavoritesStack;
