//import React from 'react';
//import { TouchableOpacity } from 'react-native';
import { StackNavigator } from 'react-navigation';
//import FontAwesome from 'react-native-vector-icons/FontAwesome';

import Home from './Home';
import Search from './Search';
import SingleProduct from '../single/SingleProduct';
import HackCategory from '../category/HackCategory';
import TipCategory from '../category/TipCategory';
import TipCategoryItem from '../category/TipCategoryItem';
import FilerCategory from '../category/FilerCategory';
import Init from '../../assets/Init';

const { HeaderBgColorHome, textHeaderColor, headerTitleSizeHome } = Init;
const HomeStack = StackNavigator({
  Screen_Home: {
    screen: Home,
    navigationOptions: {
      title: 'KitchenHero',
    },
  },
  Screen_SingleProduct: {
    screen: SingleProduct
  },
  Screen_HackCategory: {
    screen: HackCategory
  },
  Screen_TipCategory: {
    screen: TipCategory
  },
  Screen_TipCategoryItem: {
    screen: TipCategoryItem
  },
  Screen_Filter: {
    screen: FilerCategory
  },
  Screen_Search: {
    screen: Search
  }
},
{
  navigationOptions: {
    headerStyle: {
      backgroundColor: HeaderBgColorHome
    },
    headerTitleStyle: {
      color: textHeaderColor,
      fontSize: headerTitleSizeHome,
      fontFamily: 'impact',
      fontStyle: 'italic'
    }
  }
}
);

export default HomeStack;
