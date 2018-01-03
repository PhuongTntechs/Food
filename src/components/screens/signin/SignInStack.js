//import React from 'react';
//import { Text } from 'react-native';
import { StackNavigator } from 'react-navigation';

import SignIn from './SignIn';
import FogotPass from './FogotPass';
import FogotPassStep2 from './FogotPassStep2';
import FogotPassStep3 from './FogotPassStep3';
import VerifyUser from '../signUp/VerifyUser';
import SignUpStack from '../signUp/SignUpStack';
//import HomeStack from '../home/HomeStack';

const SignInStack = StackNavigator({
  Screen_signIn: {
    screen: SignIn
  },
  Screen_fogotPass: {
    screen: FogotPass
  },
  Screen_fogotPassStep2: {
    screen: FogotPassStep2
  },
  Screen_fogotPassStep3: {
    screen: FogotPassStep3
  },
  Screen_verify: {
    screen: VerifyUser
  },
  screen_SignUp: {
    screen: SignUpStack
  }
}, {
  headerMode: 'none'
});

export default SignInStack;
