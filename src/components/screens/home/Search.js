'user trict';
import React, {
  Component,
} from 'react';

import {
  View, Text, TouchableOpacity, Image, WebView, ScrollView
} from 'react-native';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Fetch from '../../assets/api/Fetch';
import Styles from '../../assets/styles/Styles';
import Init from '../../assets/Init';

const { buttonMenu, touchBtnMenu, HomeButton, HomeButtonWrapper, textHeader } = Styles;
const { newHeaherBgColor, MainColor } = Init;
class Search extends Component {
  static navigationOptions = ({ navigation }) => {
    const { goBack } = navigation;
    return (
      /*{
      headerLeft:
        <TouchableOpacity onPress={() => goBack()} style={touchBtnMenu}>
          <FontAwesome name='chevron-left' style={buttonMenu} />
        </TouchableOpacity>,
      title: 'Search Result',
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
            backgroundColor: MainColor
          }} 
        />
        <View
          style={{
            flexDirection: 'row',
            height: 50,
            backgroundColor: newHeaherBgColor,
            justifyContent: 'space-between',
            alignItems: 'center'
            //marginTop: Platform.OS === 'ios' ? 20 : 0 // only for IOS to give StatusBar Space
          }}
        >
          <TouchableOpacity onPress={() => goBack()} style={touchBtnMenu}>
            <FontAwesome name='chevron-left' style={buttonMenu} />
          </TouchableOpacity>
          <Text style={textHeader}> Search Result </Text>
          <TouchableOpacity style={HomeButtonWrapper} onPress={() => goBack()}>
            <FontAwesome name='home' style={HomeButton} />
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
      title: navigation.state.params.textSearch,
      Action: 'searchResult'
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
  renderResult() {
    const { data } = this.state;
    const {
      ContentHomeWrap, btPlusTouch, faPlus, ImgContentWrap, ImgContent,
      TextContent, Title, description
    } = Styles;
    const { navigation } = this.props;
    const content = [];
    data.map((item, i) =>
      content.push(
        <View key={i} style={ContentHomeWrap}>
          <TouchableOpacity style={btPlusTouch}>
            <FontAwesome style={faPlus} name='plus' />
          </TouchableOpacity>
          <View style={ImgContentWrap}>
            <Image
              style={ImgContent}
              source={{ uri: item.thumbnail_url }}
            />
          </View>
          <View style={TextContent}>
            <Text
              style={Title}
              onPress={() => navigation.navigate(
                'Screen_SingleProduct',
                {
                  postID: item.ID,
                  postTitle: item.post_title
                }
              )}
            >
              {item.post_title}
            </Text>
            <WebView
              style={description}
              source={{ html: `${item.post_content.substr(0, 100)}...` }}
              scrollEnabled={false}
              bounces={false}
            />
          </View>
          <TouchableOpacity
            style={this.state.styleShare}
            onPress={() => console.log('click share')}
          >
            <FontAwesome style={faPlus} name='share-alt' />
          </TouchableOpacity>
        </View>
      ));
    return content;
  }
  render() {
    const { navigation } = this.props;
    const {
      wrapperScreen, content, searchTextContainer, txtSeacrStyle, textSearchWrap, searchScroll
    } = Styles;
    return (
      <View style={wrapperScreen}>
        <View style={content}>
          <View style={searchTextContainer}>
            <Text
              style={textSearchWrap}
            >
              Search For: <Text style={txtSeacrStyle}>{navigation.state.params.textSearch}</Text>
            </Text>
          </View>
          <ScrollView style={searchScroll}>
            { this.state.data !== null ?
              this.renderResult()
              :
              <Text>No Results.{navigation.state.params.textSearch}</Text>
            }
          </ScrollView>
        </View>
      </View>
    );
  }
}

export default Search;
