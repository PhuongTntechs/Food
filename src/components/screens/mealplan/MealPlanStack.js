//import React from 'react';
//import { Text } from 'react-native';
import { StackNavigator } from 'react-navigation';

import MealPlan from './MealPlan';
import Init from '../../assets/Init';

const { HeaderBgColor, textHeaderColor, headerTitleSize } = Init;
const MealPlanStack = StackNavigator({
  Screen_MealPlan: {
    screen: MealPlan,
    navigationOptions: {
      title: 'Meal Plan',
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

export default MealPlanStack;
