import React, { Component } from 'react';
import {
  View, TouchableOpacity, Alert, AsyncStorage
} from 'react-native';

import { GoogleSignin } from 'react-native-google-signin';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import SignInStyle from '../../assets/styles/SignInStyle';
import Fetch from '../../assets/api/Fetch';
import Loading from '../Main/Loading';
import Init from '../../assets/Init';

class LoginGg extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };
  }
  componentDidMount() {
    this.setupGoogleSignin();
  }
  async setupGoogleSignin() {
    try {
      await GoogleSignin.hasPlayServices({ autoResolve: true });
      await GoogleSignin.configure({
        iosClientId: '1006555361859-n5ae3mkfqiijvk1b5nnl6812o25rqehv.apps.googleusercontent.com',
        webClientId: '1006555361859-rga07m5cp3oq2c2kpmt90s5q0ov9ckka.apps.googleusercontent.com',
        offlineAccess: false
      });

      const user = await GoogleSignin.currentUserAsync();
      console.log(user);
    } catch (err) {
      console.log(err);
    }
  }

  loginGG() {
    this.setState({ loading: true });
    GoogleSignin.signIn()
    .then((user) => {
      console.log(user);
      this.sendData(user);
    })
    .catch((err) => {
      //console.log('WRONG SIGNIN', err);
      //Alert.alert('WRONG SIGNIN', err);
      console.log(err);
      this.setState({ loading: false });
    })
    .done();
  }
  sendData(data) {
    const { navigation } = this.props;
    const value = {
      idGg: data.id,
      name: data.name,
      email: data.email,
      Action: 'loginGG'
    };
    Fetch(value)
    .then((response) => response.json())
    .then((responseJson) => {
      //console.log(responseJson);
      if (responseJson) {
        if (responseJson.status === 'Successful') {
          AsyncStorage.setItem('current_user', JSON.stringify(responseJson));
          Init.onSignIn(responseJson.id_user);
          Init.role(responseJson.role);
          this.setState({ loading: false });
          navigation.navigate('Home');
        } else {
          console.log('save error');
          //onItemSelected('Home'); // goto home
          Alert.alert(responseJson.messenger);
          this.setState({ loading: false });
        }
        this.setState({ loading: false });
      }
    })
    .catch(error => {
      console.log(error);
    });
  }
  render() {
    const { ggLoginContainer, btnGgLogin } = SignInStyle;
    return (
      <View style={ggLoginContainer}>
        {this.state.loading ? <Loading animating /> :
          <TouchableOpacity onPress={this.loginGG.bind(this)}>
            <FontAwesome name='google-plus-official' style={btnGgLogin} />
          </TouchableOpacity>
        }
      </View>
    );
  }
}
export default LoginGg;
