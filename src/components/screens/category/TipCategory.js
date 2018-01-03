'user trict';
import React, {
  Component,
} from 'react';

import {
  View, Text, Image, TouchableOpacity, ScrollView, StyleSheet
} from 'react-native';

import HTMLView from 'react-native-htmlview';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Styles from '../../assets/styles/Styles';
import Loading from '../Main/Loading';
import CategoryStyles from '../../assets/styles/CategoryStyles';
import Fetch from '../../assets/api/Fetch';
import Init from '../../assets/Init';

const { buttonMenuHome, touchBtnMenu, HomeButtonMain, HomeButtonWrapper, textHeaderHome } = Styles;
const { HeaderBgColorHome, newHeaherBgColorHome } = Init;
class TipCategory extends Component {
  static navigationOptions = ({ navigation }) => {
    const { goBack, navigate, state } = navigation;
    let textTitle = state.params.title ? state.params.title : 'Tips & Methods';
    textTitle = textTitle.replace('&amp;', '&');
    return (
      /*{
        headerLeft:
          <TouchableOpacity onPress={() => goBack()} style={touchBtnMenu}>
            <FontAwesome name='chevron-left' style={buttonMenu} />
          </TouchableOpacity>,
        title: state.params.title ? state.params.title : 'Tip & Methods',
        headerRight:
          <TouchableOpacity style={HomeButtonWrapper} onPress={() => navigate('Screen_Home')}>
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
  };
  constructor(props) {
    super(props);
    this.state = {
      data: null
    };
  }
  componentDidMount() {
    const { navigation } = this.props;
    const value = {
      getCatTip: true,
      parentID: navigation.state.params.parentID,
      Action: 'getCat'
    };
    Fetch(value)
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({
        data: responseJson
      });
    })
    .catch(error => {
      console.log(error);
    });
  }
  hanldeClick(item) {
    const { navigation } = this.props;
    if (item.issetChild) {
      navigation.navigate(
        'Screen_TipCategory',
        {
          parentID: item.term_id,
          title: item.name,
          role: navigation.state.params.role,
          userId: navigation.state.params.userId,
          cat: 'categoriestip'
        }
      );
    } else {
      //console.log('navigation params of parent tip method', navigation.state.params);
      navigation.navigate(
        'Screen_TipCategoryItem',
        {
          postID: item.term_id,
          postTitle: item.name,
          role: navigation.state.params.role,
          id_user: navigation.state.params.userId,
          cat: 'categoriestip'
        }
      );
    }
  }
  render() {
    const { data } = this.state;
    const { content } = Styles;
    const {
      productContainer, productImage, favoritesContainer, contentFavorites
    } = CategoryStyles;
    let contentData = [];
    if (data !== null) {
      data.map((item, i) =>
        contentData.push(
          <View key={i} style={productContainer}>
            <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center' }} onPress={() => this.hanldeClick(item)}>
              <Image source={{ uri: item.thumbnail_url }} style={productImage} />
            <HTMLView
              value={'<span>' + item.name + '</span>'}
              stylesheet={stylesHtml}
            />
            </TouchableOpacity>
          </View>
        ));
    } else {
      contentData = (<Loading animating />);
    }
    return (
      <View style={[content, favoritesContainer]}>
        <ScrollView>
          <View style={contentFavorites}>
            {contentData}
          </View>
        </ScrollView>
      </View>
    );
  }
}

const stylesHtml = StyleSheet.create({
  span: {
    fontWeight: 'bold',
    fontSize: 15,
    color: '#777777'
  }
});

export default TipCategory;
