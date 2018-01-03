//import React from 'react';
//import { Text } from 'react-native';
import { StackNavigator } from 'react-navigation';

import SignUp from './SignUp';
import VerifyUser from './VerifyUser';
//import HomeStack from '../home/HomeStack';

const SignUpStack = StackNavigator({
  Screen_signUp: {
    screen: SignUp
  },
  Screen_verify: {
    screen: VerifyUser
  }
}, {
  headerMode: 'none'
});

export default SignUpStack;
