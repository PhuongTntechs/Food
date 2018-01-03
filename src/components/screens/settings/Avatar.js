'user trict';
import React, {
  Component
} from 'react';

import {
  View, Text, Image, TouchableOpacity, Alert
} from 'react-native';

import StyleSetting from '../../assets/styles/SettingStyle';
import defaultAvatar from '../../../img/defaultAvatar.png';
import Pick from '../../assets/api/PickImage';
import uploadFile from '../../assets/api/Upload';
import Fetch from '../../assets/api/Fetch';
import GetCurrentUser from '../../assets/api/GetCurrentUser';
import Loading from '../Main/Loading';

class Avatar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      avatarSource: null,
      data: null,
      currentAvatarUrl: null,
      uploadavatar: false,
      loadingstatus: false
    };
  }
  componentDidMount() {
    GetCurrentUser().then(user => {
      const currentUser = JSON.parse(user);
      this.setState(currentUser, () => this.getUrlAvataUser(this.state));
    });
  }
  getUrlAvataUser(state) {
    const value = {
      idUser: state.id_user,
      Action: 'getCurrentAvatar'
    };
    Fetch(value)
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({
        currentAvatarUrl: responseJson
      });
    })
    .catch(error => {
      console.log(error);
    });
  }
  show() {
    Pick(
      (source, data) => this.setState({
        avatarSource: source,
        data,
        uploadavatar: true,
      })
    );
  }
  processOK() {
    this.setState({
      loadingstatus: false,
      uploadavatar: false,
    });
  }
  upload() {
    this.setState({
      loadingstatus: true
    });
    uploadFile([
      { name: 'userId', data: this.state.id_user },
      { name: 'avatar', filename: 'avatar.jpg', data: this.state.data }
    ])
    .then(res => res.json())
    .then(res => {
      Alert.alert(
        'Update Avatar',
        res.mess,
        [
          { text: 'OK', onPress: () => this.processOK() },
        ],
        { cancelable: false }
      );
    });
  }
  render() {
    const { currentAvatarUrl, username } = this.state;
    const {
      avatarContainer, imageContainer, avatarImg, fullNameContainer, fullName,
      btnLogout, btnUpdateText
    } = StyleSetting;
    let image;
    if (this.state.avatarSource !== null) {
      image =
      (<Image
        source={this.state.avatarSource}
        style={avatarImg}
      />);
    } else if (currentAvatarUrl !== null && currentAvatarUrl.urlAvatar !== '') {
      image =
      (<Image
        source={{ uri: currentAvatarUrl.urlAvatar }}
        style={avatarImg}
      />);
    } else {
      image = (<Image
        source={defaultAvatar}
        style={avatarImg}
      />);
    }
    const uploadBtn = this.state.loadingstatus ?
      <Loading animating /> :
      (<TouchableOpacity
        onPress={this.upload.bind(this)}
        style={btnLogout}
      >
        <Text style={btnUpdateText}>upload Avatar</Text>
      </TouchableOpacity>);

    return (
      <View style={avatarContainer}>
        <View style={imageContainer}>
          {image}
        </View>
        <View style={fullNameContainer}>
          <Text style={fullName}>{username}</Text>
        </View>
        { this.state.uploadavatar ? uploadBtn :
          <TouchableOpacity
            onPress={this.show.bind(this)}
            style={btnLogout}
          >
            <Text style={btnUpdateText}>Edit</Text>
          </TouchableOpacity>
        }
      </View>
    );
  }
}
export default Avatar;
