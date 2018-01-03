import React, { Component } from 'react';
import {
  View, TouchableOpacity, Alert, AsyncStorage
} from 'react-native';

import { LoginManager, AccessToken } from 'react-native-fbsdk';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Init from '../../assets/Init';
import Fetch from '../../assets/api/Fetch';
import Loading from '../Main/Loading';
import SignInStyle from '../../assets/styles/SignInStyle';

class FbManager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };
  }
  onPressButton() {
    this.setState({ loading: true });
    LoginManager.logInWithReadPermissions(['public_profile'])
    .then(
      result => {
        if (result.isCancelled) {
          Alert.alert('Login was cancelled');
          this.setState({ loading: false });
        } else {
          AccessToken.getCurrentAccessToken().then(
            (data) => {
              //alert(data.accessToken.toString());
              this.initUser(data.accessToken);
            }
          );
        }
      },
      error => {
        Alert.alert(`Login failed with error: ' + ${error}`);
        this.setState({ loading: false });
      }
    );
  }
  sendData(data) {
    const { navigation } = this.props;
    const value = {
      ID: data.id,
      name: data.name,
      Action: 'loginFB'
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
          navigation.navigate('Home');
        } else {
          console.log('save error');
          //onItemSelected('Home'); // goto home
        }
        this.setState({ loading: false });
      }
    })
    .catch(error => {
      console.log(error);
    });
  }
  initUser(token) {
    fetch('https://graph.facebook.com/v2.5/me?fields=email,name,friends&access_token=' + token)
    .then((response) => response.json())
    .then(json => {
      // Some user object has been set up somewhere, build that user here
      /*
      user.name = json.name
      user.id = json.id
      user.user_friends = json.friends
      user.email = json.email
      user.username = json.name
      user.loading = false
      user.loggedIn = true
      user.avatar = setAvatar(json.id)
      */
      console.log(json);
      this.sendData(json);
    })
    .catch(err => {
      console.log(err);
    });
  }
  render() {
    const { btnFbLoginContainer, btnFbLogin } = SignInStyle;
    return (
      <View style={btnFbLoginContainer}>
        {this.state.loading ? <Loading animating /> :
        <TouchableOpacity onPress={this.onPressButton.bind(this)}>
          <FontAwesome name='facebook-square' style={btnFbLogin} />
        </TouchableOpacity>
        }
      </View>
    );
  }
}

export default FbManager;
