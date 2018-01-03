import React from 'react';
import { ScrollView } from 'react-native';
import { DrawerNavigator } from 'react-navigation';

import HomeStack from './screens/home/HomeStack';
import SignInStack from './screens/signin/SignInStack';
import SignUpStack from './screens/signUp/SignUpStack';
import FavoritesStack from './screens/favorites/FavoritesStack';
import ContactStack from './screens/contact/ContactStack';
import MealPlanStack from './screens/mealplan/MealPlanStack';
import SettingStack from './screens/settings/SettingStack';
import GoPremiumStack from './screens/goPremium/GoPremiumStack';
import ShoppingListStack from './screens/shopping/ShoppingListStack';
import CookingTermsStack from './screens/cookingTerms/CookingTermsStack';
import CookingConversionsStack from './screens/cookingConversions/CookingConversionsStack';
import CookingTemperatureStack from './screens/cookingTemprature/CookingTempratureStack';

import Menu from './screens/Main/Menu';
import Init from './assets/Init';

const { width, menuBgColor } = Init;

export const SideMenu = DrawerNavigator({
  Home: {
    screen: HomeStack
  },
  SignIn: {
    screen: SignInStack
  },
  SignUp: {
    screen: SignUpStack
  },
  Favorites: {
    screen: FavoritesStack
  },
  Contact: {
    screen: ContactStack
  },
  MealPlan: {
    screen: MealPlanStack
  },
  Settings: {
    screen: SettingStack
  },
  GoPremium: {
    screen: GoPremiumStack
  },
  Shopping: {
    screen: ShoppingListStack
  },
  CookingTerms: {
    screen: CookingTermsStack
  },
  CookingConversions: {
    screen: CookingConversionsStack
  },
  CookingTemperature: {
    screen: CookingTemperatureStack
  }
},
  {
    drawerWidth: (width / 4) * 3,
    drawerPosition: 'left',
    contentComponent: props =>
      <ScrollView style={{ backgroundColor: menuBgColor }}><Menu {...props} /></ScrollView>
  }
);
