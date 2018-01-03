import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  //TextInput,
  Alert,
  ScrollView,
  AsyncStorage,
  Image,
  TextInput
} from 'react-native';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Styles from '../../assets/styles/Styles';
import Slide from './Slide';
import ContentHome from './ContentHome';
//import cat from '../../../img/cat1Old.png';
//import cat2 from '../../../img/cat2.png';
//import cat3 from '../../../img/cat3.png';
import Init from '../../assets/Init';
import GetCurrentUser from '../../assets/api/GetCurrentUser';
import Fetch from '../../assets/api/Fetch';
//import SocialShare from '../Main/SocicalShare';
//import Init from '../../assets/Init';
import newLogo from '../../../img/logo_new.png';

const { buttonMenuHome, touchBtnMenu, HomeButtonMain, HomeButtonWrapper, textHeaderHome } = Styles;
const { width, HeaderBgColorHome } = Init;
class Home extends Component {
  static navigationOptions = ({ navigation }) => {
    const { navigate } = navigation;
    return (
      /*{
      headerLeft:
        <TouchableOpacity onPress={() => navigate('DrawerOpen')} style={touchBtnMenu} >
          <FontAwesome name='bars' style={buttonMenu} />
        </TouchableOpacity>,
        headerRight:
        <TouchableOpacity style={HomeButtonWrapper}>
          <FontAwesome name='home' style={HomeButton} />
        </TouchableOpacity>
    }*/
    {

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
        //height: 50,
        backgroundColor: '#fff',
        justifyContent: 'space-between',
        alignItems: 'center'
        //marginTop: Platform.OS === 'ios' ? 20 : 0 // only for IOS to give StatusBar Space
      }}
    >
      <TouchableOpacity onPress={() => navigate('DrawerOpen')} style={{ flex: 1, marginLeft: 15 }} >
        <FontAwesome name='bars' style={buttonMenuHome} />
      </TouchableOpacity>
      <View style={{ justifyContent: 'center', flex: width > 320 ? 9 : 7, alignItems: 'center' }}>
        <Image source={newLogo} style={{ width: 150, height: 71 }} />
      </View>
      <TouchableOpacity style={{ flex: 1, marginRight: 15 }}>
        <FontAwesome name='home' style={HomeButtonMain} />
      </TouchableOpacity>
    </View>
    </View>
    }
    );
  };
  constructor(props) {
    super(props);
    this.state = {
      textSearch: '',
      //userID: currentUser !== null ? currentUser : 'null',
      openSocical: false
    };
  }
  componentDidMount() {
    console.log('did monut');
    GetCurrentUser().then(user => {
      const currentUser = JSON.parse(user);
      this.setState(currentUser, () => this.checkRoleUser(this.state));
    });
  }
  onOpenSocical() {
    this.setState({
      openSocical: !this.state.openSocical
    });
  }
  checkRoleUser(state) {
    //console.log('state in check role: ', state);
    const value = {
      idUser: state.id_user,
      Action: 'checkRoleUser'
    };
    Fetch(value)
    .then((response) => response.json())
    .then((responseJson) => {
      //console.log(responseJson);
      if (responseJson) {
        console.log('tra ve');
        console.log(responseJson);
        if (responseJson.roleUser === 'error') {
          //logout
          Init.role(null);
          Init.onSignIn(null);
          AsyncStorage.removeItem('current_user');
        } else {
          //update role
          Init.role(state.role);
          AsyncStorage.setItem('current_user', JSON.stringify(state));
        }
      }
    })
    .catch(error => {
      console.log(error);
    });
  }
  submitSearch() {
    const { navigation } = this.props;
    if (this.state.textSearch !== '') {
      //console.log(this.state.textSearch);
      navigation.navigate(
        'Screen_Search',
        {
          textSearch: this.state.textSearch
        }
      );
    } else {
      Alert.alert(
        'Search',
        'Please enter your search text',
        [
          { text: 'OK', onPress: () => console.log('text search null') },
        ],
        { cancelable: false }
      );
    }
  }
  render() {
    const { navigation } = this.props;
    const {
      //SearchWrap, faSearch, SearchInput, 
      buttonHomeWrap, buttonWrap, bgCatButton,
      textCatButton, mainContainer, bgCatButtonwrap, bgCatButton3, bgCatButton2, bgCatButton1
    } = Styles;
    //console.log('home state: ', this.state);
    return (
      <View>
      <ScrollView style={mainContainer}>
      {
        /*
        <View style={SearchWrap}>
          <FontAwesome
            style={faSearch}
            name='search'
            onPress={this.submitSearch.bind(this)}
          />
          <TextInput
            style={SearchInput}
            value={this.state.textSearch}
            placeholder='search'
            placeholderTextColor="#525151"
            onChangeText={
              (textSearch) => this.setState({ textSearch })
            }
            onEndEditing={this.submitSearch.bind(this)}
          />
        </View>
        */
      }
        <Slide role={this.state.role} userId={this.state.id_user} navigation={navigation} />
        <View style={buttonHomeWrap}>
          <View style={buttonWrap}>
            <View style={bgCatButtonwrap}>
              <TouchableOpacity
                style={[bgCatButton, bgCatButton1]}
                onPress={() => navigation.navigate('Screen_Filter')}
              >
                  <Text style={textCatButton}>{'Substitutes'}</Text>
            </TouchableOpacity>
            </View>
            <View style={bgCatButtonwrap}>
              <TouchableOpacity
                style={[bgCatButton, bgCatButton2]}
                onPress={() => navigation.navigate(
                  'Screen_TipCategory',
                  {
                    parentID: 0,
                    role: this.state.role,
                    userId: this.state.id_user
                  }
                )}
              >
                <View>
                  <Text style={textCatButton}>{'Tips &'}</Text>
                  <Text style={textCatButton}>{'Methods'}</Text>
                </View>
            </TouchableOpacity>
            </View>
            <View style={bgCatButtonwrap}>
              <TouchableOpacity
                style={[bgCatButton, bgCatButton3]}
                onPress={() => navigation.navigate(
                  'Screen_HackCategory',
                  {
                    titleCategory: 'Hacks'
                  }
                )}
              >
                <Text style={textCatButton}>{'Hacks'}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <ContentHome
          social={() => this.onOpenSocical()}
          navigation={navigation}
        />
      </ScrollView>
      </View>
    );
  }
}

export default Home;
