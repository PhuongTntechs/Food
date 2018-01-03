'user trict';
import React, {
  Component,
} from 'react';

import {
  View, Text, TouchableOpacity, Image, Alert
} from 'react-native';

import Share from 'react-native-share';
import { ShareDialog } from 'react-native-fbsdk';
import HTMLView from 'react-native-htmlview';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Styles from '../../assets/styles/Styles';
import Loading from '../Main/Loading';
import Fetch from '../../assets/api/Fetch';
import htmlstyle from '../../assets/styles/HtmlStyles';
import GetCurrentUser from '../../assets/api/GetCurrentUser';
//import Init from '../../assets/Init';

class ContentHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: false,
      //dataSource: new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 }),
      loadingstt: false,
      favorite: false,
      data: null,
      indexShare: null
    };
  }

  componentDidMount() {
    //const { role } = this.props;
    GetCurrentUser().then(user => {
      const currentUser = JSON.parse(user);
      this.setState(currentUser, () => this.getReData());
    });
  }

  getReData() {
    //('id user in content: ', this.state.id_user);
    const value = {
      Action: 'listpost',
      cat: 'categorieshome',
      idUser: this.state.id_user
      //ROLE: role
    };
    Fetch(value)
    .then((response) => response.json())
    .then((responseJson) => {
      // update state
      this.setState({
        data: responseJson,
        loadingstt: true
      });
    })
    .catch(error => {
      console.log(error);
    });
  }
  shareLinkWithShareDialog(content) {
    ShareDialog.canShow(content).then(
      function(canShow) {
        if (canShow) {
          return ShareDialog.show(content);
        }
      }
    ).then( 
      function(result) {
        if (result.isCancelled) {
          alert('Share operation was cancelled');
        } else {
          alert('Share was successful with postId: '
            + result.postId);
        }
      },
      function(error) {
        alert('Share failed with error: ' + error.message);
      }
    );
  }
  /*
  addFav(postID) {
    const { userId } = this.props;
    if (userId !== undefined) {
      const value = {
        product_id: postID,
        user_id: userId.toString(),
        type: 'categorieshome',
        Action: 'addItemFa'
      };
      Fetch(value)
      .then((response) => response.json())
      .then((responseJson) => {
        //console.log(responseJson['post_title']);
        if (responseJson.mess === 'Successful') {
          this.getReData();
          Alert.alert('Item added Favorite');
        } else {
          Alert.alert('Error, please try again.');
        }
      })
      .catch(error => {
        console.log(error);
      });
    } else {
      Alert.alert('You are not sign in!');
    }
  }
  checkFav(postID) {
    const { userId } = this.props;
    const value = {
      product_id: postID,
      user_id: userId.toString(),
      Action: 'checkFav'
    };
    Fetch(value)
    .then((response) => response.json())
    .then((responseJson) => {
      console.log('responseJson check fa', responseJson);
      if (responseJson.mess === 'inFav') {
        this.setState({
          favorite: true,
          iconFA: 'heart'
        }, () => this.clickFavorite(this.state, postID));
      } else {
        this.setState({
          favorite: false,
          iconFA: 'heart-o'
        }, () => this.clickFavorite(this.state, postID));
      }
    })
    .catch(error => {
      console.log(error);
    });
  }
  */
  clickFavorite(checkFav, postID) {
    const { id_user } = this.state;
    if (this.state.id_user !== undefined && this.state.id_user !== null) {
      if (!checkFav) {
        const value = {
          product_id: postID,
          user_id: id_user.toString(),
          type: 'categorieshome',
          Action: 'addItemFa'
        };
        Fetch(value)
        .then(response => response.json())
        .then(responseJson => {
          //console.log(responseJson['post_title']);
          this.getReData();
          if (responseJson.mess === 'Successful') {
            Alert.alert('Item added Favorite');
          } else {
            Alert.alert('Error, please try again.');
          }
        })
        .catch(error => {
          console.log(error);
        });
      } else {
        Alert.alert(
          'Delete Item Favorites',
          'Do you want remove item favorites?',
          [
            { text: 'OK',
            onPress: () => {
              const value = {
                product_id: postID,
                user_id: id_user.toString(),
                type: 'categorieshome',
                Action: 'deleteItemFa'
              };
              Fetch(value)
              .then(response => response.json())
              .then(responseJson => {
                //console.log(responseJson['post_title']);
                this.getReData();
                if (responseJson.mess === 'Removed Item') {
                  Alert.alert('Removed Item Favorite');
                } else {
                  Alert.alert('Error, please try again.');
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
    } else {
      Alert.alert('You are not sign in!');
    }
  }
  /*
  openSocical() {
    return true;
  }
  pressHandler() {
    this.props.social();
  }
  pressHandler() {
    Share.share({
      message: 'BAM: we\'re helping your business with awesome React Native apps',
      url: 'http://bam.tech',
      title: 'Wow, did you see that?'
    }, {
      // Android only:
      dialogTitle: 'Share BAM goodness',
      // iOS only:
      excludedActivityTypes: [
        'com.apple.UIKit.activity.PostToTwitter'
      ]
    });
  }
  */
  renderContent() {
    const { ContentHomeWrap, btPlusTouch, faPlus, ImgContent, ImgContentWrap } = Styles;
    const { TextContent, Title, faShare, containerShare, styleShareFB, styleShareIcon, styleShareGG } = Styles;
    const { navigation, role } = this.props;
    const returnContent = [];
    if (this.state.data !== null) {
      //console.log('data content home: ', this.state.data);
      this.state.data.map((item, i) =>
        returnContent.push(
          <View style={ContentHomeWrap} key={i}>
            <TouchableOpacity
              style={btPlusTouch}
              onPress={() => this.clickFavorite(item.checkFavorite, item.term_id)}
            >
              <FontAwesome style={faPlus} name={item.checkFavorite ? 'heart' : 'heart-o'} />
            </TouchableOpacity>
            <View style={ImgContentWrap}>
              <TouchableOpacity
                onPress={() => navigation.navigate(
                  'Screen_TipCategoryItem',
                  {
                    postID: item.term_id,
                    postTitle: item.name,
                    cat: 'categorieshome',
                    role,
                    id_user: this.state.id_user
                  }
                )}
              >
              <Image
                style={ImgContent}
                source={{ uri: item.thumbnail_url }}
              />
              </TouchableOpacity>
            </View>
            <View style={TextContent}>
              <Text
                style={Title}
                onPress={() => navigation.navigate(
                  'Screen_TipCategoryItem',
                  {
                    postID: item.term_id,
                    postTitle: item.name,
                    cat: 'categorieshome',
                    role,
                    id_user: this.state.id_user
                  }
                )}
              >
                {item.name}
              </Text>
              <View style={{ marginRight: 15 }}>
                <TouchableOpacity
                  onPress={() => navigation.navigate(
                    'Screen_TipCategoryItem',
                    {
                      postID: item.term_id,
                      postTitle: item.name,
                      cat: 'categorieshome',
                      role,
                      id_user: this.state.id_user
                    }
                  )}
                >
                  <HTMLView
                    stylesheet={htmlstyle}
                    value={item.description}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View style={containerShare}>
              {this.state.indexShare === i ? 
                <TouchableOpacity 
                  onPress={() => {
                    this.shareLinkWithShareDialog({
                      contentType: 'link',
                      contentUrl: 'http://tntechs.com.vn',
                      contentDescription: item.name
                    });
                    this.setState({
                      indexShare: null
                    });
                  }}
                  style={[styleShareIcon, styleShareFB]}
                >
                <Text style={{ color: '#fff', textAlign: 'center' }}>Facebook</Text>
                </TouchableOpacity> : null 
              }
              {this.state.indexShare === i ? 
                <TouchableOpacity 
                  style={[styleShareIcon, styleShareGG]}
                  onPress={() => {
                    this.setState({
                      indexShare: null
                    });
                    setTimeout(() => {
                      Share.shareSingle(Object.assign({
                        title: item.name,
                        message: item.description,
                        url: 'http://tntechs.com.vn',
                        subject: 'Share Link' //  for email
                      }, {
                        social: 'googleplus'
                      }));
                    }, 300);
                  }}
                >
                  <Text style={{ color: '#fff', textAlign: 'center' }}>Google+</Text>
                </TouchableOpacity> : null
              }
              <TouchableOpacity
                onPress={() => {
                    if (this.state.indexShare === i) {
                      this.setState({ indexShare: null });
                    } else {
                      this.setState({ indexShare: i });
                    }
                }}
              >
                <FontAwesome style={faShare} name='share-alt' />
              </TouchableOpacity>
            </View>
          </View>)
      );
    }
    return returnContent;
  }
  render() {
    return (
      <View>
        { this.state.loadingstt ?
          this.renderContent()
          :
          <Loading animating />
        }
      </View>
    );
  }
}
export default ContentHome;
