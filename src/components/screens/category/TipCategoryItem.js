'user trict';
import React, {
  Component
} from 'react';
import { View, Image, TouchableOpacity, Text, Alert } from 'react-native';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Styles from '../../assets/styles/Styles';
import SingleProductStyle from '../../assets/styles/SingleProductStyle';
import imgSingleFood from '../../../img/bgSingleFood/singlefoodbg1.jpg';
import Fetch from '../../assets/api/Fetch';
import Init from '../../assets/Init';
//import htmlstyle from '../../assets/styles/HtmlStyles';
import SocialShare from '../Main/SocicalShare';
import ContentTipCategoryItem from './ContentTipCategoryItem';

//const { height } = Init;
class TipCategoryItem extends Component {
  static navigationOptions = ({ navigation }) => {
    const { goBack, navigate, state } = navigation;
    const { touchBtnMenu, buttonMenuHome, HomeButtonMain, HomeButtonWrapper, textHeaderHome } = Styles;
    const { HeaderBgColorHome, newHeaherBgColorHome } = Init;

    let textTitle = state.params.postTitle;
    textTitle = textTitle.replace('&amp;', '&');
    return (
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
          <Text style={textHeaderHome}>
            {textTitle}
          </Text>
          <TouchableOpacity style={HomeButtonWrapper} onPress={() => navigate('Screen_Home')}>
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
      favorite_icon: 'heart-o',
      favorite: false,
    };
  }
  componentDidMount() {
    this.checkFav();
  }
  
  checkFav() {
    const { navigation } = this.props;
    const { postID, id_user, cat } = navigation.state.params;
    if (id_user !== undefined) {
      const value = {
        product_id: postID,
        user_id: id_user,
        type: cat,
        Action: 'checkFav'
      };
      /*
      if (cat !== '') {
        value.type = 'favoritesCat';
      }
      */
      console.log('value check fav', value);
      //console.log('navigation params', navigation.state.params);
      Fetch(value)
      .then((response) => response.json())
      .then((responseJson) => {
        console.log('check fav', responseJson);
        if (responseJson.mess === 'inFav') {
          this.setState({
            favorite: true,
            favorite_icon: 'heart',
          });
        } else {
          this.setState({
            favorite: false,
            favorite_icon: 'heart-o',
          });
        }
      })
      .catch(error => {
        console.log(error);
      });
    }
  }
  
  clickFavorite() {
    const { navigation } = this.props;
    const { postID, id_user } = navigation.state.params;
    //console.log('params navigation: ', navigation.state.params);
    if (id_user === undefined) {
      alert('You are not sign in');
      return;
    }
    if (!this.state.favorite) {
      const value = {
        product_id: postID,
        user_id: id_user.toString(),
        type: 'favoritesCat',
        Action: 'addItemFa'
      };
      Fetch(value)
      .then(response => response.json())
      .then(responseJson => {
        //console.log(responseJson['post_title']);
        if (responseJson.mess === 'Successful') {
          this.setState({
            favorite: true,
            favorite_icon: 'heart'
          });
          alert('Add item favorites success!');
        }
      })
      .catch(error => {
        console.log(error);
      });
    } else {
      const value = {
        product_id: postID,
        user_id: id_user.toString(),
        type: 'dcm',
        Action: 'deleteItemFa'
      };
      Alert.alert(
        'Remove Item',
        'Do you want remove item favorites?',
        [
          { text: 'OK',
          onPress: () => {
            Fetch(value)
            .then((response) => response.json())
            .then((responseJson) => {
              //console.log(responseJson['post_title']);
              if (responseJson.mess === 'Removed Item') {
                this.setState({
                  favorite: false,
                  favorite_icon: 'heart-o'
                });
              }
            })
            .catch(error => {
              console.log(error);
            });
          } },
          { text: 'Cancel' },
        ],
        { cancelable: false }
      );
    }
  }
  render() {
    const { bgSingleProduct, fixScroll } = SingleProductStyle;
    const { navigation } = this.props;
    const { postID, cat, role } = navigation.state.params;
    const { socialShareContainer } = Styles;
    const {
      TabcontentProduct, faFavortie, TouchTabProduct, 
      TouchTabProductRight, faShare, TabWrapProduct
    } = SingleProductStyle;
    return (
      <View 
        style={fixScroll}
      >
        <View style={TabWrapProduct}>
          <View style={TabcontentProduct}>
            <TouchableOpacity
              onPress={this.clickFavorite.bind(this)}
            >
              <FontAwesome style={faFavortie} name={this.state.favorite_icon} />
            </TouchableOpacity>
          </View>
          <View style={TabcontentProduct}>
            <TouchableOpacity
              style={[TouchTabProduct, TouchTabProductRight]}
              onPress={() => {
                  //console.log('socical share: ', this.SocialShare);
                  if (this.SocialShare.state.visible) {
                    this.SocialShare.onCancel();
                  } else {
                    this.SocialShare.onOpen();
                  }
                }}
            >
              <FontAwesome style={faShare} name="share-alt" />
            </TouchableOpacity>
          </View>
        </View>
        <Image
          style={bgSingleProduct}
          source={imgSingleFood}
        >
          <ContentTipCategoryItem postID={postID} cat={cat} role={role} />
        </Image>
        <View style={socialShareContainer}>
          <SocialShare title={navigation.state.params.postTitle} visible={false} ref={ref => { this.SocialShare = ref; }} />
        </View>
      </View>
    );
  }
}
export default TipCategoryItem;
