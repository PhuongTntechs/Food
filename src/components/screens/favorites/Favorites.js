'user trict';
import React, {
  Component,
} from 'react';

import {
  View, Text, Image, ScrollView, Alert, TouchableOpacity
} from 'react-native';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import GetCurrentUser from '../../assets/api/GetCurrentUser';
import CategoryStyles from '../../assets/styles/CategoryStyles';
import Loading from '../Main/Loading';
import Fetch from '../../assets/api/Fetch';
import Styles from '../../assets/styles/Styles';
import Init from '../../assets/Init';

const { buttonMenuHome, touchBtnMenu, HomeButtonWrapper, HomeButtonMain, textHeaderHome } = Styles;
class Favorites extends Component {
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
            paddingBottom: 5,
            paddingTop: 5
            //marginTop: Platform.OS === 'ios' ? 20 : 0 // only for IOS to give StatusBar Space
          }}
        >
          <TouchableOpacity onPress={() => navigate('DrawerOpen')} style={touchBtnMenu}>
            <FontAwesome name='bars' style={buttonMenuHome} />
          </TouchableOpacity>
          <Text style={textHeaderHome}>Favorites</Text>
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
      data: null
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
      USER_ID: state.id_user.toString(),
      Action: 'listPostFavorites'
    };
    Fetch(value)
    .then(response => response.json())
    .then((responseJson) => {
      console.log('responseJson data in getdata', responseJson);
      this.setState({
        data: responseJson
      });
    })
    .catch(error => {
      console.log(error);
    });
  }
  removeFavorites(id, type) {
    if (id !== null) {
      Alert.alert(
        'Remove Item',
        'Do you really want to delete?',
        [
          { text: 'OK', onPress: () => this.handelDeleteItem(id, type) },
          { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
        ],
        { cancelable: false }
      );
    }
  }
  handelDeleteItem(id, type) {
    const value = {
      user_id: this.state.id_user,
      product_id: id,
      type,
      Action: 'deleteItemFa'
    };
    console.log('value handel', value);
    Fetch(value)
    .then(response => response.json())
    .then(responseJson => {
        console.log('responseJson deleta fav', responseJson);
        Alert.alert(
          'Remove Item',
          responseJson.mess,
          [
            { text: 'OK', onPress: () => this.getData(this.state) },
          ],
          { cancelable: false }
        );
    })
    .catch(error => {
      console.log(error);
    });
  }
  render() {
    const { navigation } = this.props;
    const {
      contentFavorites, productContainer, productName, productAuthor, productImage,
      txtContainer, titleContainer, favoritesContainer, faDelete
    } = CategoryStyles;
    const { data } = this.state;
    let contentData = [];
    if (data !== null) {
      let postTitle = null;
      let postID = null;
      //let screen = null;
      data.map((item, i) => {
        if (item.type === 'favorites') {
          postTitle = item.post_title;
          postID = item.ID;
          //screen = 'Screen_TipCategoryItem';
        } else {
          postTitle = item.name;
          postID = item.term_id;
          //screen = 'Screen_Single';
        }
        const thumbnail = item.thumbnail_url !== false ? item.thumbnail_url : '';
        let cat = 'favorites';
        if (item.type === 'favoritesCatSlide') {
          cat = 'categoriesslider';
        } else if (item.type === 'favoritesCatTip') {
          cat = 'categoriestip';
        } else if (item.type === 'favoritesCat') { 
          cat = 'categorieshome';
        }
        return contentData.push(
          <View key={i} style={productContainer}>
            <TouchableOpacity
              onPress={() => navigation.navigate(
                item.type === 'favorites' ? 'Screen_Single' : 'Screen_TipCategoryItem',
                {
                  postTitle: item.type === 'favorites' ? item.post_title : item.name,
                  postID: item.type === 'favorites' ? item.ID : item.term_id,
                  cat,
                  id_user: this.state.id_user,
                }
              )}
            >
              <Image source={{ uri: thumbnail }} style={productImage} />
            </TouchableOpacity>
            <View style={txtContainer}>
              <View style={titleContainer}>
                <Text style={productName}>{postTitle}</Text>
                <Text>By <Text style={productAuthor}>{item.nameAuthor}</Text></Text>
              </View>
              <FontAwesome
                style={faDelete}
                onPress={() => this.removeFavorites(item.type === 'favorites' ? item.ID : item.term_id, item.type)}
                name="heart"
              />
            </View>
          </View>
        );
      }
      );
    } else {
      contentData = <Loading animating />;
    }
    return (
      <View style={favoritesContainer}>
        <ScrollView>
          <View style={contentFavorites}>
            {contentData}
          </View>
        </ScrollView>
      </View>
    );
  }
}
export default Favorites;
