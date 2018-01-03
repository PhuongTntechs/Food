'user trict';
import React, {
  Component,
} from 'react';
import {
  View, Image, Text, TextInput, TouchableOpacity, Alert,
  ScrollView
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

//import Styles from '../../assets/styles/Styles';
import SignInStyle from '../../assets/styles/SignInStyle';
import ValidateEmail from '../../assets/api/ValidateEmail';
import Fetch from '../../assets/api/Fetch';
import Loading from '../Main/Loading';

import SignUpImg from '../../../img/bgSingleFood/singlefoodbg11.jpg';
import Logo2Img from '../../../img/logo.png';
import bgbuttonlogin from '../../../img/bgbuttonlogin.png';

//const { webUri } = Init;
class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      email: '',
      rePass: ''
    };
  }
  onPressButton() {
    //console.log('click register');
    if (ValidateEmail(this.state.email)) {
      if (this.state.password === this.state.rePass) {
        this.setState({ loading: true });
        const value = {
          USERNAME: this.state.username,
          PASSWORD: this.state.password,
          EMAIL: this.state.email,
          Action: 'register'
        };
        Fetch(value)
        .then((response) => response.json())
        .then((responseJson) => {
          //console.log(responseJson);
          if (responseJson.status === 'Failed') { // error
            Alert.alert(
              'Opps!',
              responseJson.messenger,
              [
                { text: 'OK', onPress: () => console.log('OK Pressed!') },
              ]
            );
          } else {
            Alert.alert(
              responseJson.messenger,
              `Hi, ${responseJson.username}, please check your email for verify account!`,
              [
                {
                  text: 'Verify Account',
                  onPress: () => this.verifyUser(responseJson)
                },
                { text: 'Cancle', onPress: () => this.setState({ loading: false }) },
              ]
            );
          }
        })
        .catch(error => {
          console.log(error);
        });
      } else {
        Alert.alert(
          'Opps!',
          'Password is not correct!!',
          [
            { text: 'OK', onPress: () => this.setState({ loading: false }) },
          ]
        );
      }
    } else {
      Alert.alert(
        'Opps!',
        'Email is not correct!!',
        [
          { text: 'OK', onPress: () => this.setState({ loading: false }) },
        ]
      );
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
  render() {
    const { navigation } = this.props;
    const {
      contentSignIn, bgSingleProduct, Logo, rowLogo, rowMenu, formLogin, textFieldWrap,
      faTextField, textField, buttonfieldwrap, touchsubmit, buttonimg, buttonText,
      otherbuttonMenuContent, wrapTitleHeader, titleHeader, goHomeButton
    } = SignInStyle;
    //const { otherbuttonMenuContent } = Styles;
    return (
        <Image
          style={bgSingleProduct}
          source={SignUpImg}
        >
          <View style={contentSignIn}>
            <View style={rowMenu} >
              <TouchableOpacity onPress={() => navigation.navigate('Screen_signIn')}>
                <FontAwesome name='chevron-left' style={otherbuttonMenuContent} />
              </TouchableOpacity>
              <View style={wrapTitleHeader}><Text style={titleHeader}>Register</Text></View>
              <TouchableOpacity onPress={() => navigation.navigate('Screen_Home')}>
                <FontAwesome name='home' style={goHomeButton} />
              </TouchableOpacity>
            </View>
          <ScrollView>
            <View style={rowLogo}>
              <TouchableOpacity onPress={() => navigation.navigate('Screen_home')}>
                <Image style={Logo} source={Logo2Img} />
              </TouchableOpacity>
            </View>
            <View style={formLogin} >
              <View style={textFieldWrap}>
                <FontAwesome style={faTextField} name='user' />
                <TextInput
                  style={textField}
                  placeholder='Username'
                  placeholderTextColor='#fff'
                  value={this.state.username}
                  onChangeText={
                    (username) => this.setState({ username })
                  }
                />
              </View>
              <View style={textFieldWrap}>
                <FontAwesome style={faTextField} name='envelope-o' />
                <TextInput
                  style={textField}
                  placeholder='Email address'
                  placeholderTextColor='#fff'
                  ref='EmailInput'
                  value={this.state.email}
                  onChangeText={
                    (email) => this.setState({ email })
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
              <View style={textFieldWrap}>
                <FontAwesome style={faTextField} name='lock' />
                <TextInput
                  style={textField}
                  placeholder='Retype Password'
                  placeholderTextColor='#fff'
                  secureTextEntry
                  value={this.state.rePass}
                  onChangeText={rePass => this.setState({ rePass })}
                />
              </View>
              <View style={[textFieldWrap, buttonfieldwrap]}>
               {this.state.loading ? <Loading animating /> :
                  <TouchableOpacity style={touchsubmit} onPress={this.onPressButton.bind(this)} >
                    <Image style={buttonimg} source={bgbuttonlogin}>
                      <Text style={buttonText}>SIGN UP</Text>
                    </Image>
                  </TouchableOpacity>
                }
              </View>
            </View>
          </ScrollView>
          </View>
        </Image>
    );
  }
}

export default SignUp;
