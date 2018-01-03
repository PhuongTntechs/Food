//import React from 'react';
//import { Text } from 'react-native';
import { StackNavigator } from 'react-navigation';

import Settings from './Settings';
import Html from './Privacy';
import Init from '../../assets/Init';
import Terms from './Terms';
import Disclaimer from './Discalimer';

const { HeaderBgColor, textHeaderColor, headerTitleSize } = Init;
const SettingStack = StackNavigator({
  Screen_Settings: {
    screen: Settings,
    navigationOptions: {
      title: 'Settings',
    }
  },
  Screen_Html: {
    screen: Html,
    navigationOptions: {
      title: 'Privacy',
    }
  },
  Screen_Terms: {
    screen: Terms,
    navigationOptions: {
      title: 'Terms And Conditions',
    }
  },
  Screen_Disclaimer: {
    screen: Disclaimer,
    navigationOptions: {
      title: 'Disclaimer',
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

export default SettingStack;
