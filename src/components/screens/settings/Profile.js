'user trict';
import React, {
  Component,
} from 'react';

import {
  View, Text, TouchableOpacity, TextInput, Modal, Alert
} from 'react-native';

import { NavigationActions } from 'react-navigation';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import StyleSetting from '../../assets/styles/SettingStyle';
import Fetch from '../../assets/api/Fetch';
import LogOut from '../Main/LogOut';
import Init from '../../assets/Init';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      textEdit: '',
      actionEdit: '',
      modalVisible: false,
      dataUser: null,
      //role: this.props.dataUser.roles[0],
      days: null
    };
  }
  componentDidMount() {
    const { dataUser } = this.props;
    console.log(dataUser);
    const value = {
      idUser: dataUser.ID,
      Action: 'checkDaysPremium'
    };

    Fetch(value)
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({
        days: responseJson.days
      });
    })
    .catch(error => {
      console.log(error);
    });
  }
  // open and close modal
  setModalVisible(visible, act) {
    this.setState({
      modalVisible: visible,
      actionEdit: act
    });
  }
  endEditUser(ID) {
    this.setState({
      textEdit: '',
      actionEdit: '',
      modalVisible: false
    });

    const value = {
      idUser: ID,
      Action: 'getDataSettingUser'
    };

    Fetch(value)
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({
        dataUser: responseJson
      });
    })
    .catch(error => {
      console.log(error);
    });
  }
  editInfo() {
    const { dataUser } = this.props;
    const { textEdit, actionEdit } = this.state;
    const value = {
      idUser: dataUser.ID,
      title: textEdit,
      type: actionEdit,
      Action: 'editUser'
    };

    Fetch(value)
    .then((response) => response.json())
    .then((responseJson) => {
      Alert.alert(
        'Edit Your Profile',
        responseJson.mess,
        [
          { text: 'OK', onPress: () => this.endEditUser(dataUser.ID) },
        ],
        { cancelable: false }
      );
    })
    .catch(error => {
      console.log(error);
    });
  }
  logoutProcess() {
    const { navigation } = this.props;
    Alert.alert(
      'LogOut',
      'Do you want to LogOut?',
      [
        { text: 'OK',
        onPress: () => {
          LogOut().then(() => {
            Init.role(null);
            Init.onSignIn(null);
            navigation.navigate('Screen_Home');
          });
        } },
        { text: 'Cancel' },
      ],
      { cancelable: false }
    );
  }
  renderModal() {
    const {
      closeModalContainer, modalContainer, modalWrap, textInput,
      inputWrap, addButton, closeModal,
    } = StyleSetting;
    //console.log(this.state.currentListMeal);
    let contentModal = '';
    contentModal = (
      <View style={inputWrap}>
      <TextInput
        style={textInput}
        onChangeText={(textEdit) => this.setState({ textEdit })}
        value={this.state.textEdit}
        placeholder='Edit'
        placeholderTextColor='#d1d0d0'
      />
      <TouchableOpacity
        style={addButton}
        onPress={() => this.editInfo()}
      >
        <Text style={{ fontSize: 18, color: '#fff', fontWeight: 'bold' }} >
          ADD
        </Text>
      </TouchableOpacity>
    </View>);
    return (
      <Modal
        animationType={'fade'}
        transparent
        visible={this.state.modalVisible}
      >
         <View style={modalContainer}>
            <View style={modalWrap}>
              <TouchableOpacity
                style={closeModalContainer}
                onPress={() => this.setModalVisible(!this.state.modalVisible)}
              >
                <FontAwesome style={closeModal} name='times' />
              </TouchableOpacity>
                {contentModal}
            </View>
         </View>
       </Modal>
    );
  }
  render() {
    const {
      profileContainer, infoContent, labelTitle, wrapperRowInfo, faLeft, infoText,
      editRowInfo, faEdit, rowLabel, btnUpdate, btnUpdateText, btnLogout,
      btnLogoutContainer, faLeftAtive, textPremium, btnUpdateAtive, infoTextMember
    } = StyleSetting;
    const { dataUser, navigation } = this.props;
    const { days } = this.state;
    const convertDataUser = this.state.dataUser === null ? dataUser : this.state.dataUser;
    return (
      <View style={profileContainer}>
        <View style={infoContent}>
          <View style={rowLabel}>
            <Text style={labelTitle}>PROFILE</Text>
          </View>
          <View style={wrapperRowInfo}>
            <FontAwesome style={faLeft} name='user' />
            <Text style={infoText}>{convertDataUser.data.display_name}</Text>
            <TouchableOpacity
              style={editRowInfo}
              onPress={() => this.setModalVisible(true, 'name')}
            >
              <FontAwesome style={faEdit} name='pencil-square-o' />
            </TouchableOpacity>
          </View>
          <View style={wrapperRowInfo}>
            <FontAwesome style={faLeft} name='envelope' />
            <Text style={infoText}>{convertDataUser.data.user_email}</Text>
            <TouchableOpacity
              style={editRowInfo}
              onPress={() => this.setModalVisible(true, 'mail')}
            >
              <FontAwesome style={faEdit} name='pencil-square-o' />
            </TouchableOpacity>
          </View>
          {
            /*
            <View style={wrapperRowInfo}>
              <FontAwesome style={faLeft} name='phone-square' />
              <Text style={infoText}>{convertDataUser.data.phone}</Text>
              <TouchableOpacity
                style={editRowInfo}
                onPress={() => this.setModalVisible(true, 'phone')}
              >
                <FontAwesome style={faEdit} name='pencil-square-o' />
              </TouchableOpacity>
            </View>
            */
          }
        </View>
        <View style={infoContent}>
          <View style={rowLabel}>
            <Text style={labelTitle}>MEMBER PLAN</Text>
          </View>
          <View style={wrapperRowInfo}>
            <FontAwesome
              style={dataUser.roles[0] === 'userPremium' ? faLeftAtive : faLeft}
              name='star'
            />
            {dataUser.roles[0] === 'userPremium' ?
              <View style={textPremium}>
                <Text style={infoTextMember}>Premium Member</Text>
                <Text>Time end: {days} days</Text>
              </View>
              :
              <View style={textPremium}>
              <Text style={infoTextMember}>Standard Member</Text>
              </View>
            }
            {dataUser.roles[0] === 'userPremium' ?
              <TouchableOpacity
                style={[editRowInfo, btnUpdate, btnUpdateAtive]}
                onPress={() => console.log('UserPremium')}
              >
                <Text style={btnUpdateText}>Upgraded</Text>
                <FontAwesome name='check' style={{ color: '#fff', marginLeft: 5 }} />
              </TouchableOpacity>
              :
              <TouchableOpacity
                style={[editRowInfo, btnUpdate]}
                onPress={() => navigation.navigate('Screen_GoPremium')}
              >
                <Text style={btnUpdateText}>Upgrade</Text>
              </TouchableOpacity>
            }
          </View>
        </View>
        <View style={[infoContent, btnLogoutContainer]}>
          <TouchableOpacity
            style={btnLogout}
            onPress={this.logoutProcess.bind(this)}
          >
            <Text style={{ color: '#fff', fontSize: 16 }}>Logout</Text>
          </TouchableOpacity>
        </View>

        {this.renderModal()}
      </View>
    );
  }
}
export default Profile;
