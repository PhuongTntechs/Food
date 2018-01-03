'user trict';
import React, {
  Component,
} from 'react';
import {
  View, Image, Text, TextInput, TouchableOpacity, Alert, AsyncStorage,
  ScrollView
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import Styles from '../../assets/styles/Styles';
import Init from '../../assets/Init';
import SignInStyle from '../../assets/styles/SignInStyle';
import Fetch from '../../assets/api/Fetch';
import Loading from '../Main/Loading';

import SignUpImg from '../../../img/Sign-up.png';
import Logo2Img from '../../../img/logo.png';
import bgbuttonlogin from '../../../img/bgbuttonlogin.png';

//const { webUri } = Init;
class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      code: '',
      loading: false,
      loading2: false,
      reCode: null
    };

    console.log(this.props.navigation.state.params);
  }
  onPressButton() {
    const { navigation } = this.props;
    const code = this.state.reCode !== null ? this.state.reCode : navigation.state.params.code;
    if (this.state.code !== '') {
      if (this.state.code === code) {
        this.setState({ loading: true });
        const value = {
          user_id: navigation.state.params.data.id_user,
          Action: 'ActivateUser'
        };
        Fetch(value)
        .then((response) => response.json())
        .then((responseJson) => {
          //console.log(responseJson);
          if (responseJson.status) { // ok
            Alert.alert(
              'Success',
              'User active successful',
              [
                { text: 'OK', onPress: () => this.saveUser(navigation.state.params.data) },
              ]
            );
          } else {
            Alert.alert(
              'Opps!',
              'active user is error',
              [
                { text: 'OK', onPress: () => console.log('OK Pressed!') },
              ]
            );
            this.setState({ loading: false });
          }
        })
        .catch(error => {
          console.log(error);
        });
      } else {
        Alert.alert('Code not correct!, please try again');
        this.setState({ loading: false });
      }
    } else {
      Alert.alert('empty code');
      this.setState({ loading: false });
    }
  }
  onPressReSendButton() {
    this.setState({ loading2: true });
    const { navigation } = this.props;
    console.log(navigation.state.params.data);
    const value = {
      userID: navigation.state.params.data.id_user,
      Action: 'sendVerifyEmail'
    };
    Fetch(value)
    .then((response) => response.json())
    .then((responseJson) => {
      //console.log(responseJson);
      if (responseJson.status) { // ok
        this.setState({
          reCode: responseJson.code
        }, () => {
          Alert.alert(
            'Success',
            'please check inbox or spam in your mail!',
            [
              { text: 'OK', onPress: () => console.log('press OK') },
            ]
          );
        });
      } else {
        Alert.alert(
          'Opps!',
          responseJson.mess,
          [
            { text: 'OK', onPress: () => console.log('OK Pressed!') },
          ]
        );
      }
      this.setState({ loading2: false });
    })
    .catch(error => {
      console.log(error);
    });
  }
  saveUser(responseJson) {
    //const { onItemSelected } = this.props;
    const { navigation } = this.props;
    if (responseJson.status === 'Successful') {
      AsyncStorage.removeItem('current_user');
      AsyncStorage.setItem('current_user', JSON.stringify(responseJson));
      Init.role(responseJson.role);
      Init.onSignIn(responseJson.id_user);
      navigation.navigate('Home');
    } else {
      console.log('save error');
      //onItemSelected('Home'); // goto home
      this.setState({ loading: false });
    }
  }
  render() {
    const { navigation } = this.props;
    const {
      contentSignIn, bgSingleProduct, Logo, rowLogo, rowMenu, formLogin, textFieldWrap,
      textField, buttonfieldwrap, touchsubmit, buttonimg, buttonText, stepText,
      otherbuttonMenuContent, wrapTitleHeader, titleHeader, goHomeButton
    } = SignInStyle;
    //const { otherbuttonMenuContent } = Styles;
    let str = navigation.state.params.email;
    str = str.slice(3, str.length);
    return (
      <ScrollView>
        <Image style={bgSingleProduct} source={SignUpImg} >
          <View style={contentSignIn}>
            <View style={rowMenu} >
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <FontAwesome name='chevron-left' style={otherbuttonMenuContent} />
              </TouchableOpacity>
              <View style={wrapTitleHeader}><Text style={titleHeader}>Register</Text></View>
              <TouchableOpacity onPress={() => navigation.navigate('Screen_Home')}>
                <FontAwesome name='home' style={goHomeButton} />
              </TouchableOpacity>
            </View>
            <View style={rowLogo}>
              <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                <Image style={Logo} source={Logo2Img} />
              </TouchableOpacity>
            </View>
            <View style={formLogin}>
            <Text style={stepText}>
              Please check code in your email: 'xxx{str}'
            </Text>
            </View>
            <View style={formLogin} >
              <View style={textFieldWrap}>
                <TextInput
                  style={textField}
                  placeholder='Enter Your Code:'
                  placeholderTextColor='#fff'
                  value={this.state.code}
                  onChangeText={
                    (code) => this.setState({ code })
                  }
                />
              </View>
              <View style={[textFieldWrap, buttonfieldwrap]}>
                {this.state.loading ? <Loading animating /> :
                  <TouchableOpacity style={touchsubmit} onPress={this.onPressButton.bind(this)} >
                    <Image style={buttonimg} source={bgbuttonlogin}>
                      <Text style={buttonText}>verify code</Text>
                    </Image>
                  </TouchableOpacity>
                }
              </View>
              <View style={[textFieldWrap, buttonfieldwrap]}>
                {this.state.loading2 ? <Loading animating /> :
                  <TouchableOpacity
                    style={touchsubmit}
                    onPress={() => this.onPressReSendButton()}
                  >
                    <Image style={buttonimg} source={bgbuttonlogin}>
                      <Text style={buttonText}>Re-send Code</Text>
                    </Image>
                  </TouchableOpacity>
                }
              </View>
            </View>

          </View>
        </Image>
      </ScrollView>
    );
  }
}

export default SignUp;
