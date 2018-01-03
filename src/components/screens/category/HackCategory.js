'user trict';
import React, {
  Component,
} from 'react';

import {
  View, Text, Image, TouchableOpacity, ScrollView, StyleSheet
} from 'react-native';

import HTMLView from 'react-native-htmlview';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Loading from '../Main/Loading';
import Styles from '../../assets/styles/Styles';
import CategoryStyles from '../../assets/styles/CategoryStyles';
import GetCurrentUser from '../../assets/api/GetCurrentUser';
import Fetch from '../../assets/api/Fetch';
import Init from '../../assets/Init';
import ImageLock from '../../../img/icon_lock.png';


const { buttonMenuHome, touchBtnMenu, HomeButtonMain, HomeButtonWrapper, textHeaderHome } = Styles;
class HackCategory extends Component {
  static navigationOptions = ({ navigation }) => {
    const { goBack } = navigation;
    const { newHeaherBgColorHome, HeaderBgColorHome } = Init;
    return (
      /*{
      headerLeft:
        <TouchableOpacity onPress={() => goBack()} style={touchBtnMenu}>
          <FontAwesome name='chevron-left' style={buttonMenu} />
        </TouchableOpacity>,
      title: <Text style={HeaderTitle}>Hacks</Text>,
      headerRight:
        <TouchableOpacity style={HomeButtonWrapper} onPress={() => goBack()}>
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
            height: 50,
            backgroundColor: newHeaherBgColorHome,
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingBottom: 5,
            paddingTop: 5
            //marginTop: Platform.OS === 'ios' ? 20 : 0 // only for IOS to give StatusBar Space
          }}
        >
          <TouchableOpacity onPress={() => goBack()} style={touchBtnMenu}>
            <FontAwesome name='chevron-left' style={buttonMenuHome} />
          </TouchableOpacity>
          <Text style={textHeaderHome}>Hacks</Text>
          <TouchableOpacity style={HomeButtonWrapper} onPress={() => goBack()}>
            <FontAwesome name='home' style={HomeButtonMain} />
          </TouchableOpacity>
        </View>
        </View>
    }
    );
  }
  constructor(props) {
    super(props);
    this.state = {
      data: null
    };
  }
  componentDidMount() {
    GetCurrentUser().then(user => {
      const currentUser = JSON.parse(user);
      this.setState(currentUser);
    });
    this.getData(this.state);
  }
  getData(state) {
    const { navigation } = this.props;
    const value = {
      cat: navigation.state.params.titleCategory,
      role: state.role === 'userPremium' ? state.role : 'userNormal',
      Action: 'getCat'
    };
    Fetch(value)
    .then(response => response.json())
    .then(responseJson => {
      this.setState({
        data: responseJson
      });
    })
    .catch(error => {
      console.log(error);
    });
  }
  clickItemLock() {
    alert('You must be signed in');
  }
  render() {
    const { navigation } = this.props;
    const { wrapperScreen, content } = Styles;
    const {
      productContainer, productImage, favoritesContainer, contentFavorites,
      containerLock
    } = CategoryStyles;
    const { data } = this.state;
    //console.log('data Hacks', data);
    let contentData = [];
    if (data !== null) {
      data.map((item, i) => {
        let lock = null;
        if (item.lock === true) {
          lock = <View style={containerLock}><TouchableOpacity onPress={this.clickItemLock.bind(this)}><Image source={ImageLock} style={{ width: 50, height: 50 }} /></TouchableOpacity></View>;
        }
        console.log('item hacks', item);
        return contentData.push(
          <View key={i} style={productContainer}>
            <TouchableOpacity
              style={{ alignItems: 'center', justifyContent: 'center' }}
              onPress={() => navigation.navigate(
                'Screen_SingleProduct',
                {
                  postID: item.ID,
                  postTitle: item.post_title
                }
              )}
            >
              <Image source={{ uri: item.thumbnail_url }} style={productImage} />
            <HTMLView
              value={'<span>' + item.post_title + '</span>'}
              stylesheet={stylesHtml}
            />
            </TouchableOpacity>
            {item.lock === true ? lock : null}
          </View>
        );
      }
      );
    } else {
      contentData = (
        <View><Loading animating /></View>
      );
    }
    return (
      <View style={wrapperScreen}>
        <View style={[content, favoritesContainer]}>
          <ScrollView>
            <View style={contentFavorites}>
              {contentData}
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }
}

const stylesHtml = StyleSheet.create({
  span: {
    fontWeight: 'bold',
    fontSize: 13,
    color: '#777777',
    textAlign: 'center'
  }
});

export default HackCategory;
