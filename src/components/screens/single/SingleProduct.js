'user trict';
import React, {
  Component,
} from 'react';


import { View, Image, TouchableOpacity, ScrollView, Text } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import DisplayHTML from 'react-native-display-html';

//import Styles from '../../assets/styles/Styles';
import Init from '../../assets/Init';
import SingleProductStyle from '../../assets/styles/SingleProductStyle';
import Loading from '../Main/Loading';
import GetCurrentUser from '../../assets/api/GetCurrentUser';
//import BgSingleProduct from './BgSingleProduct';
//import htmlstyle from '../../assets/styles/HtmlStyles';
import Fetch from '../../assets/api/Fetch';
import Styles from '../../assets/styles/Styles';
import SocialShare from '../Main/SocicalShare';

const { buttonMenuHome, touchBtnMenu, HomeButtonMain, HomeButtonWrapper, textHeaderHome } = Styles;

function renderNode(node, index, siblings, parent, defaultRenderer) {
  if (node.name === 'ol') {
    //console.log('node', node);
    //console.log('parent', parent);
      const start = node.attribs.start;
      return (
        <Text style={{ fontWeight: 'bold', marginBottom: 10 }}>
          {start !== undefined ? start : 1 }. {node.children[1].children[0].children[0].data}
        </Text>
      );
    }
}

class SingleProduct extends Component {
  static navigationOptions = ({ navigation }) => {
    const { goBack, navigate } = navigation;
    const { HeaderBgColorHome, newHeaherBgColorHome } = Init;
    /*
    return {
      title: navigation.state.params.postTitle,
      headerLeft:
        <TouchableOpacity onPress={() => goBack()} style={touchBtnMenu}>
          <FontAwesome name='chevron-left' style={buttonMenu} />
        </TouchableOpacity>,
      headerRight:
        <TouchableOpacity style={HomeButtonWrapper} onPress={() => navigate('Screen_Home')}>
          <FontAwesome name='home' style={HomeButton} />
        </TouchableOpacity>
    };
    */
    let textTitle = navigation.state.params.postTitle;
    if (textTitle.length > 22) {
      textTitle = textTitle.substring(0, 22);
    }
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
          <TouchableOpacity onPress={() => goBack()} style={touchBtnMenu}>
            <FontAwesome name='chevron-left' style={buttonMenuHome} />
          </TouchableOpacity>
          <Text style={textHeaderHome}>
            {navigation.state.params.postTitle}
          </Text>
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
      favorite: false,
      favorite_icon: 'heart-o',
      data: '',
      currentUser: null,
      visible: false
    };
  }
  componentDidMount() {
    const { navigation } = this.props;
    console.log('navigation for single: ', navigation.state.params);
    const value = {
      ID_POST: navigation.state.params.postID,
      Action: 'singleProduct'
    };
    GetCurrentUser().then(user => {
      const currentUser = JSON.parse(user);
      this.setState(currentUser, () => this.checkFav(this.state));
    });
    Fetch(value)
    .then((response) => response.json())
    .then((responseJson) => {
      //console.log(responseJson['post_title']);
      this.setState({
        data: responseJson
      });
    })
    .catch(error => {
      console.log(error);
    });
  }
  checkFav(state) {
    const { navigation } = this.props;
    if (state.id_user === undefined || state.id_user === null) {
      return;
    }
    const value = {
      product_id: navigation.state.params.postID,
      user_id: state.id_user.toString(),
      Action: 'checkFav'
    };
    //console.log('fa check', value);
    Fetch(value)
    .then((response) => response.json())
    .then((responseJson) => {
      console.log('fa check fav', responseJson);
      if (responseJson.mess === 'inFav') {
        this.setState({
          favorite: true,
          favorite_icon: 'heart',
        });
      }
    })
    .catch(error => {
      console.log(error);
    });
  }
  clickFavorite() {
    const { navigation } = this.props;
    const { id_user } = this.state;
    if (id_user === undefined || id_user === null) {
      alert('you are not sign in.');
      return;
    }
    if (!this.state.favorite) {
      const value = {
        product_id: navigation.state.params.postID,
        user_id: id_user.toString(),
        Action: 'addItemFa'
      };
      Fetch(value)
      .then((response) => response.json())
      .then((responseJson) => {
        //console.log(responseJson['post_title']);
        if (responseJson.mess === 'Successful') {
          this.setState({
            favorite: true,
            favorite_icon: 'heart'
          });
        }
      })
      .catch(error => {
        console.log(error);
      });
    } else {
      const value = {
        product_id: navigation.state.params.postID,
        user_id: id_user.toString(),
        Action: 'deleteItemFa'
      };
      console.log('value deleteFA', value);
      Fetch(value)
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
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
    }
  }
  ReplaceAll(Source, stringToFind, stringToReplace) {
    let temp = Source;
    let index = temp.indexOf(stringToFind);

    while (index !== -1) {
        temp = temp.replace(stringToFind, stringToReplace);
        index = temp.indexOf(stringToFind);
    }

    return temp;
  }
  renderGallery() {
    const { imgItemProduct, productContainer } = SingleProductStyle;
    const returnArray = [];
    const galleryArray = this.state.data.gallery;
    if (typeof galleryArray !== 'undefined' && galleryArray.length > 0) {
      galleryArray.map((item, i) =>
        returnArray.push(
          <View key={i} style={productContainer}>
            <Image
              style={imgItemProduct}
              source={{ uri: item }}
            />
          </View>
        )
      );
    }
    return returnArray;
  }
  render() {
    const {
      wrapperScreenSingleFood, contentSingleProduct,
      TabcontentProduct, faFavortie, TouchTabProduct, TouchTabProductRight, faShare,
      productContent, rowGalery, textProduct, TabWrapProduct, scrollProduct
    } = SingleProductStyle;
    const { socialShareContainer } = Styles;
    const { navigation } = this.props;
    let contentData = '';
    if (this.state.data.content !== undefined && this.state.data.content !== null) {
      contentData = this.state.data.content;
      //contentData = this.ReplaceAll(contentData, '&nbsp;', '<br />');
    }
    //console.log('content data', contentData);
    return (
      <View style={wrapperScreenSingleFood}>
        <View style={contentSingleProduct}>
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
        </View>
        <View style={productContent}>
          { this.state.data !== '' ?
            <ScrollView style={scrollProduct}>
              <View style={rowGalery}>
                {this.renderGallery()}
              </View>
              <View style={textProduct}>
                <DisplayHTML
                    htmlString={contentData}
                    bodyClass='singleBody'
                    HTMLStyles={'ol { padding: 20px }'}
                />
              </View>
            </ScrollView>
            :
            <Loading animating />
          }
        </View>
        {
          /*
          <View style={contentContainerSingleProduct}>
            <BgSingleProduct />
          </View>
          */
        }
        <View style={socialShareContainer}>
          <SocialShare title={navigation.state.params.postTitle} visible={false} ref={ref => { this.SocialShare = ref; }} />
        </View>
      </View>
    );
  }
}

export default SingleProduct;
