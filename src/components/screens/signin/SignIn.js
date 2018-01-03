'user trict';
import React, {
  Component,
} from 'react';
import {
  View, TouchableOpacity, Image, TextInput, Text, Alert,
  ScrollView, AsyncStorage, Keyboard
} from 'react-native';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
//import { connect } from 'react-redux';

//import Styles from '../../assets/styles/Styles';
import SignInStyle from '../../assets/styles/SignInStyle';
import bgbuttonlogin from '../../../img/bgbuttonlogin.png';
import bgLoginImg from '../../../img/bgSingleFood/singlefoodbg1.jpg';
import Logo2Img from '../../../img/logo.png';
import Fetch from '../../assets/api/Fetch';
import Init from '../../assets/Init';
import FbManager from './FbManager';
import LoginGg from './LoginGg';
import Loading from '../Main/Loading';

let comView = null;
const { viewShowKeyboard } = SignInStyle;

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      loading: false,
      isKeyBoard: false
    };
  }
  componentWillMount() {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
  }
  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }
  _keyboardDidShow() {
    //alert('Keyboard Shown');
    console.log('Keyboard Shown');
    comView = <View style={viewShowKeyboard} />;
  }

  _keyboardDidHide() {
    //alert('Keyboard Hidden');
    console.log('Keyboard Hidden');
    comView = null;
  }
  onPressButton() {
    this.setState({ loading: true });
    const value = {
      USERNAME: this.state.username,
      PASSWORD: this.state.password,
      Action: 'login'
    };
    Fetch(value)
    .then((response) => response.json())
    .then((responseJson) => {
      //console.log(responseJson);
      if (responseJson.status === 'Successful' && responseJson.active === true) {
        Alert.alert(
          responseJson.status,
          responseJson.messenger,
          [
            { text: 'OK', onPress: () => this.setCurrentUser(responseJson) },
          ]
        );
      } else if (responseJson.status === 'Successful' && responseJson.active === false) {
          Alert.alert(
            responseJson.status,
            responseJson.messenger,
            [
              {
                text: 'Verify Account',
                onPress: () => this.verifyUser(responseJson)
              },
              { text: 'Cancle', onPress: () => this.setState({ loading: false }) },
            ]
          );
      } else {
        Alert.alert(
          responseJson.status,
          responseJson.messenger,
          [
            { text: 'OK', onPress: () => this.setState({ loading: false }) },
          ]
        );
      }
    })
    .catch(error => {
      console.log(error);
    });
  }
  setCurrentUser(responseJson) {
    const { navigation } = this.props;
    if (responseJson.status === 'Successful') {
      AsyncStorage.removeItem('current_user');
      AsyncStorage.setItem('current_user', JSON.stringify(responseJson));
      Init.onSignIn(responseJson.id_user);
      Init.role(responseJson.role);
      navigation.navigate('Home');
    } else {
      console.log('save error');
      //onItemSelected('Home'); // goto home
    }
  }
  verifyUser(data) {
    const { navigation } = this.props;
    const value = {
      userID: data.id_user,
      Action: 'sendVerifyEmail'
    };
    Fetch(value)
    .then((response) => response.json())
    .then((responseJson) => {
      //console.log(responseJson);
      this.setState({ loading: false });
      if (responseJson.status) { // ok
        navigation.navigate(
          'Screen_verify',
          {
            data,
            code: responseJson.code,
            email: responseJson.email
          }
        );
      } else {
        Alert.alert(
          'Opps!',
          responseJson.mess,
          [
            { text: 'OK', onPress: () => console.log('OK Pressed!') },
          ]
        );
      }
    })
    .catch(error => {
      console.log(error);
    });
  }
  /*
  click = async() => {
    try {
      let currentUser = await AsyncStorage.getItem('current_user');
      currentUser = JSON.parse(currentUser);
      Alert.alert(
        'current user!',
        currentUser.username,
        [
          { text: 'OK', onPress: () => console.log('OK Pressed!') },
        ]
      );
    } catch (e) {
      Alert.alert('SAVE Not OK');
    }
  }
  */
  render() {
    const {
      rowMenu, bgSingleProduct, contentSignIn, rowLogo, Logo, formLogin, textFieldWrap, faTextField,
      textField, buttonfieldwrap, touchsubmit, buttonimg, buttonText, stepText,
      loginSocical, btnSignUp, titleHeader, wrapTitleHeader, goHomeButton, otherbuttonMenuContent,
      styleForAuth
    } = SignInStyle;
    //const { otherbuttonMenuContent } = Styles;
    const { navigation } = this.props;
    return (
        <Image
          style={bgSingleProduct}
          source={bgLoginImg}
        >
          <View style={contentSignIn}>
            <View style={rowMenu} >
              <TouchableOpacity onPress={() => navigation.navigate('DrawerOpen')}>
                <FontAwesome name='bars' style={otherbuttonMenuContent} />
              </TouchableOpacity>
              <View style={wrapTitleHeader}><Text style={titleHeader}>Sign In</Text></View>
              <TouchableOpacity onPress={() => navigation.navigate('Screen_Home')}>
                <FontAwesome name='home' style={goHomeButton} />
              </TouchableOpacity>
            </View>
          <ScrollView style={styleForAuth} >
            <View style={rowLogo}>
              <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                <Image style={Logo} source={Logo2Img} />
              </TouchableOpacity>
            </View>
            <View style={formLogin}>
              <View style={textFieldWrap}>
                <FontAwesome style={faTextField} name='envelope-o' />
                <TextInput
                  style={textField}
                  placeholder='Email address'
                  placeholderTextColor='#fff'
                  value={this.state.username}
                  onChangeText={
                    (username) => this.setState({ username })
                  }
                />
              </View>
              <View style={textFieldWrap}>
                <FontAwesome style={faTextField} name='lock' />
                <TextInput
                  style={textField}
                  placeholder='Password'
                  placeholderTextColor='#fff'
                  secureTextEntry
                  value={this.state.password}
                  onChangeText={
                    (password) => this.setState({ password })
                  }
                />
              </View>
              <View style={[textFieldWrap, buttonfieldwrap]}>
                {this.state.loading ? <Loading animating /> :
                  <TouchableOpacity style={touchsubmit} onPress={this.onPressButton.bind(this)} >

                    <Image
                      style={buttonimg}
                      source={bgbuttonlogin}
                    >
                      <Text style={buttonText}>LOGIN</Text>
                    </Image>

                  </TouchableOpacity>
                }
              </View>
            </View>
            <View style={formLogin}>
              <Text style={stepText}>or Login with:</Text>
            </View>
            <View style={loginSocical}>
              <FbManager navigation={navigation} />
              <LoginGg navigation={navigation} />
            </View>
            <View style={loginSocical}>
              <TouchableOpacity onPress={() => navigation.navigate('Screen_fogotPass')}>
                <Text style={stepText}>Forgot Password ?</Text>
              </TouchableOpacity>
            </View>
            <View style={formLogin}>
              <View style={[textFieldWrap, buttonfieldwrap, btnSignUp]}>
                  <TouchableOpacity style={touchsubmit} onPress={() => navigation.navigate('screen_SignUp')} >
                    <Image style={buttonimg} source={bgbuttonlogin} >
                      <Text style={buttonText}>SIGN UP</Text>
                    </Image>
                  </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
          {comView}
          </View>
        </Image>
    );
  }
}

export default SignIn;
