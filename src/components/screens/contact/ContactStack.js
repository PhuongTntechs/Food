//import React from 'react';
//import { Text } from 'react-native';
import { StackNavigator } from 'react-navigation';
import Contact from './Contact';
import Init from '../../assets/Init';

const { HeaderBgColor, textHeaderColor, headerTitleSize } = Init;
const ContactStack = StackNavigator({
  Screen_Favorites: {
    screen: Contact,
    navigationOptions: {
      title: 'Contacts',
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
      fontStyle: 'italic',
    }
  }
}
);

export default ContactStack;
