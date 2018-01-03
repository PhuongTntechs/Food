'user trict';
import React, {
  Component,
} from 'react';

import {
  TouchableOpacity, ScrollView, View, Text
} from 'react-native';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import GetCurrentUser from '../../assets/api/GetCurrentUser';
import StyleSetting from '../../assets/styles/SettingStyle';
import Styles from '../../assets/styles/Styles';
import Avatar from './Avatar';
import Profile from './Profile';
import Fetch from '../../assets/api/Fetch';
import Init from '../../assets/Init';

const { touchBtnMenu, buttonMenuHome, HomeButtonWrapper, textHeaderHome, HomeButtonMain } = Styles;
class Settings extends Component {
  static navigationOptions = ({ navigation }) => {
    const { navigate } = navigation;
    const { HeaderBgColorHome, newHeaherBgColorHome } = Init;
    /*
    return {
      headerLeft:
        <TouchableOpacity onPress={() => navigate('DrawerOpen')} style={touchBtnMenu}>
          <FontAwesome name='bars' style={buttonMenu} />
        </TouchableOpacity>,
      headerRight:
        <TouchableOpacity style={HomeButtonWrapper} onPress={() => navigate('Screen_Home')}>
          <FontAwesome name='home' style={HomeButton} />
        </TouchableOpacity>
    };
    */
    return ({
      header: // Your custom header
      <View>
        <View 
          style={{
            height: 20,
            backgroundColor: HeaderBgColorHome
          }} 
        />
        <View
          style={{
            flexDirection: 'row',
            height: 50,
            backgroundColor: newHeaherBgColorHome,
            justifyContent: 'space-between',
            alignItems: 'center',
            fontStyle: 'italic',
            paddingBottom: 5,
            paddingTop: 5
            //marginTop: Platform.OS === 'ios' ? 20 : 0 // only for IOS to give StatusBar Space
          }}
        >
          <TouchableOpacity onPress={() => navigate('DrawerOpen')} style={touchBtnMenu}>
            <FontAwesome name='bars' style={buttonMenuHome} />
          </TouchableOpacity>
          <Text style={textHeaderHome}>Profile</Text>
          <TouchableOpacity style={HomeButtonWrapper} onPress={() => navigate('Screen_Home')}>
            <FontAwesome name='home' style={HomeButtonMain} />
          </TouchableOpacity>
        </View>
        </View>
    });
  };
  constructor(props) {
    super(props);
    this.state = {
      dataUser: null
    };
  }
  componentDidMount() {
    GetCurrentUser().then(user => {
      const currentUser = JSON.parse(user);
      this.setState(currentUser, () => this.getData(this.state));
    });
  }
  getData(state) {
    const value = {
      idUser: state.id_user,
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
  render() {
    const { navigation } = this.props;
    const { contentSettingContainer } = StyleSetting;
    return (
      <ScrollView style={contentSettingContainer}>
        <Avatar />
        { this.state.dataUser !== null ?
          <Profile navigation={navigation} dataUser={this.state.dataUser} /> : null
        }
        <View style={{ height: 20 }} />
      </ScrollView>
    );
  }
}
export default Settings;
