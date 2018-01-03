'user trict';
import React, {
  Component,
} from 'react';

import {
  View, Text, Image, TextInput, TouchableOpacity,
  Alert, ScrollView, Modal
} from 'react-native';
import CheckBox from 'react-native-check-box';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Styles from '../../assets/styles/Styles';
import StyleShoppingList from '../../assets/styles/StyleShoppingList';
import GetCurrentUser from '../../assets/api/GetCurrentUser';
import Loading from '../Main/Loading';
import Fetch from '../../assets/api/Fetch';
import BGShoppingListImg from '../../../img/shoppinglistBG.png';
import Init from '../../assets/Init';

const { touchBtnMenu, buttonMenuHome, HomeButtonWrapper, HomeButtonMain, textHeaderHome } = Styles;
class ShoppingList extends Component {
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
          <Text style={textHeaderHome}>Shopping List</Text>
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
      nameFood: '',
      nameFoodItem: '',
      data: [],
      modalVisible: false,
      postTypeID: '',
      setModal: '',
      clear: 0,
      clickBtn: true,
      loadingData: false
    };
  }
  componentDidMount() {
    GetCurrentUser().then(user => {
      const currentUser = JSON.parse(user);
      this.setState(currentUser, () => this.getData(this.state));
    });
  }
  // reload component if change state
  /*
  shouldComponentUpdate() {
      // return a boolean value
      this.getData(this.state);
      return true;
  }
  */
  // get data from server
  getData(state) {
    const value = {
      user_id: state.id_user,
      Action: 'getlistpostshoptab'
    };
    Fetch(value)
    .then((response) => response.json())
    .then((responseJson) => {
      console.log('get data', responseJson);
      this.setState({
        data: responseJson
      });
    })
    .catch(error => {
      console.log(error);
    });
  }

  // open and close modal
  setModalVisible(visible, ID, setModal) {
    this.setState({
      modalVisible: visible,
      postTypeID: ID,
      setModal
    });
  }
  addFoodNameItem(bol) {
    let arrayData = [];
    if (bol) {
      if (this.state.modalVisible && this.state.postTypeID !== 0) {
          arrayData = {
            userId: this.state.id_user,
            postTypeID: this.state.postTypeID,
            title: this.state.nameFoodItem,
            Action: 'addFoodNameItem'
          };
      }
    } else {
          arrayData = {
            userId: this.state.id_user,
            title: this.state.nameFood,
            Action: 'addFoodName'
          };
      }

    Fetch(arrayData)
    .then(response => response.json())
    .then(responseJson => {
      //console.log(responseJson['post_title']);
      Alert.alert(
        'Add Food Name',
        responseJson.mess,
        [
          { text: 'OK', onPress: () => this.reRender(bol) },
        ],
        { cancelable: false }
      );
    })
    .catch(error => {
      console.log(error);
    });
  }
  reRender(closeModal) {
    if (closeModal) { this.setModalVisible(!this.state.modalVisible, 0, ''); }
    this.getData(this.state);
  }

  deleteItemShopping(item, idShop) {
    Alert.alert(
      'Delete Item',
      `You want delete ${item.post_title}`,
      [
        { text: 'OK', onPress: () => this.deleteItem(item.ID, idShop) },
        { text: 'Cancel', onPress: () => console.log('cancel delete') },
      ],
      { cancelable: false }
    );
  }

  deleteItem(idPost, idShop) {
    if (idPost !== null && idShop !== null) {
      const value = {
        idPost,
        idShop,
        Action: 'deleteItem'
      };
      Fetch(value)
      .then(response => response.json())
      .then(responseJson => {
        //console.log(responseJson['post_title']);
        //console.log(responseJson);
        Alert.alert(
          'Delete Item',
          responseJson.mess,
          [
            { text: 'OK', onPress: () => console.log('delete') },
          ],
          { cancelable: false }
        );
      })
      .catch(error => {
        console.log(error);
      });
      this.getData(this.state);
    } else {
      Alert.alert(
        'Delete Item',
        'Error Please Try Again',
        [
          { text: 'OK', onPress: () => console.log('delete error') }
        ],
        { cancelable: false }
      );
    }
  }

  //checked / unchecked checkboxText
  HandleCheckBox(item, idShop) {
    const arrayData = {
      idShop,
      idPost: item.ID,
    };
    arrayData.Action = item.checked ? 'unCheckedItemShop' : 'checkedItemShop';
    if (arrayData.idPost !== null && idShop !== null) {
      Fetch(arrayData)
      .then(response => response.json())
      .then(responseJson => {
        //console.log(responseJson['post_title']);
        console.log('handleCheckbox ', responseJson);
      })
      .catch((error) => {
        console.error(error);
      });
    } else {
      console.log('checked error');
    }
  }

  clearcheckedShop(bol) {
    Alert.alert(
      'Clear All Checked',
      'Do you really want to clear all checked?',
      [
        { text: 'OK', onPress: () => this.clearcheckedShopOK(bol) },
        { text: 'Cancel', onPress: () => console.log('Cancel') },
      ],
      { cancelable: false }
    );
  }

  clearcheckedShopOK(bol) {
    this.setState({ loadingData: true });
    let arrayData = [];
    if (bol) {  // clear all checked of shop with shopID
      arrayData = {
        idShop: this.state.currentCtrlShopID,
        Action: 'clearCheckedCurrentShop'
      };
    } else { // clear all checked in all shop
      arrayData = {
        idUser: this.state.id_user,
        Action: 'clearcheckallShop'
      };
    }
    Fetch(arrayData)
    .then(response => response.json())
    .then(responseJson => {
      //console.log(responseJson['post_title']);
      console.log('clear check all shop ', responseJson);
      this.reRender(bol);
      this.setState({
        clear: this.state.clear + 1,
        loadingData: false
      }, this.getData(this.state));
    })
    .catch(error => {
      this.setState({ loadingData: false });
      console.log(error);
    });
  }

  deleteallshop(bol) {
    const name = bol ?
      `Delete shop list ${this.state.currentCtrlShopName}` :
      'Delete All Shopping List';
    Alert.alert(
      name,
      'Do you really want to delete?',
      [
        { text: 'OK', onPress: () => this.deleteallshopOK(bol) },
        { text: 'Cancel', onPress: () => console.log('Cancel') },
      ],
      { cancelable: false }
    );
  }

  deleteallshopOK(bol) {
    this.setState({ loadingData: true });
    let arrayData = [];
    if (bol) {
      arrayData = {
        idPost: this.state.currentCtrlShopID,
        Action: 'deleteCurrentShop'
      };
    } else {
      arrayData = {
        idUser: this.state.id_user,
        Action: 'deleteAllShop'
      };
    }
    Fetch(arrayData)
    .then(response => response.json())
    .then(responseJson => {
      //console.log(responseJson['post_title']);
      //console.log(responseJson);
      this.setState({ loadingData: false });
      this.reRender(bol);
    })
    .catch(error => {
      console.log(error);
    });
  }

  editShop(bol) {
    let arrayData = [];
    //arrayData.Action = 'editShop';
    if (bol) {
      arrayData = {
        idPost: this.state.currentCtrlShopID,
        title_edit: this.state.currentCtrlShopName,
        Action: 'editShop'
      };
    } else {
      arrayData = {
        idPost: this.state.currentCtrlItemID,
        title_edit: this.state.currentCtrlItemName,
        Action: 'editShop'
      };
    }
    Fetch(arrayData)
    .then(response => response.json())
    .then(responseJson => {
      //console.log(responseJson['post_title']);
      console.log(responseJson);
      this.reRender(true);
    })
    .catch(error => {
      console.log(error);
    });
  }

  renderModal() {
    const {
      modalContainer, modalWrap, textInput, inputWrap, addButton, closeModal,
      faDel, modalContainerTest, modalTouch
    } = StyleShoppingList;
    let contentModal = '';
    if (this.state.setModal === '') {
      contentModal = (
        <View style={inputWrap}>
        <TextInput
          style={textInput}
          onChangeText={nameFoodItem => this.setState({ nameFoodItem })}
          value={this.state.nameFoodItem}
          placeholder='Name Food'
          placeholderTextColor='#d1d0d0'
        />
        <TouchableOpacity style={[addButton, { backgroundColor: '#fc7805' }]} onPress={() => this.addFoodNameItem(true)}>
          <Text style={{ fontSize: 18, color: '#fff', fontWeight: 'bold' }}>ADD</Text>
        </TouchableOpacity>
      </View>);
    } else if (this.state.setModal === 'editShop') {
      contentModal = (
        <View style={modalWrap}>
          <View style={inputWrap}>
          <TextInput
            style={textInput}
            onChangeText={(currentCtrlShopName) => this.setState({ currentCtrlShopName })}
            value={this.state.currentCtrlShopName}
            placeholder='editShop'
            placeholderTextColor='#d1d0d0'
          />
          <TouchableOpacity style={[addButton, { backgroundColor: '#fc7805' }]} onPress={() => this.editShop(true)}>
            <Text style={{ fontSize: 18, color: '#fff', fontWeight: 'bold' }}>ADD</Text>
          </TouchableOpacity>
        </View>
        <View style={inputWrap}>
          <TouchableOpacity style={[addButton, { backgroundColor: '#fc7805' }]} onPress={() => this.clearcheckedShop(true)}>
            <Text style={{ fontSize: 18, color: '#fff', fontWeight: 'bold' }}>Clear</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[addButton, { backgroundColor: '#fc7805' }]} onPress={() => this.deleteallshop(true)}>
            <FontAwesome style={faDel} name='trash' />
          </TouchableOpacity>
        </View>

      </View>
    );
    } else if (this.state.setModal === 'editItemShop') {
      contentModal = (
        <View style={inputWrap}>
        <TextInput
          style={textInput}
          onChangeText={(currentCtrlItemName) => this.setState({ currentCtrlItemName })}
          value={this.state.currentCtrlItemName}
          placeholder='editItemShop'
          placeholderTextColor='#d1d0d0'
        />
        <TouchableOpacity style={[addButton, { backgroundColor: '#fc7805' }]} onPress={() => this.editShop(false)}>
          <Text style={{ fontSize: 18, color: '#fff', fontWeight: 'bold' }}>ADD</Text>
        </TouchableOpacity>
      </View>);
    }
    return (
      <Modal
        animationType={'fade'}
        transparent
        visible={this.state.modalVisible}
      >
        <View style={modalContainerTest}>
          <TouchableOpacity 
            style={modalTouch}
            activeOpacity={1}
            onPressOut={() => {
              this.setModalVisible(!this.state.modalVisible, 0, '');
              //console.log('touch');
            }}
          >
            <View />
          </TouchableOpacity>
          <View style={modalWrap}>
            {contentModal}
          </View>
         </View>
        </Modal>
    );
  }
  // main render data
  renderData(data) {
    const { rowItem, titleItem, rowChildOfItem, contentRow } = StyleShoppingList;
    const { color1, color2, color3, color4, color5 } = StyleShoppingList;
    const arrayColor = [color1, color2, color3, color4, color5];
    const arrayRender = [];
    //const data = this.state.data.reverse();
    data.map((item, i) => {
      let styleRow = arrayColor[0];
      if (i > 0 && i <= 5) {
        styleRow = arrayColor[i];
      } else {
        styleRow = arrayColor[i % 5];
      }
      return arrayRender.push(
        <View key={i}>
          <View style={rowItem}>
            <View style={contentRow}>
              <View style={{ paddingBottom: 4, borderBottomWidth: 1, borderBottomColor: 'black' }}>
                <Text
                  onPress={() => {
                    this.setState({
                      currentCtrlShopID: item.ID,
                      currentCtrlShopName: item.post_title
                    });
                    this.setModalVisible(true, item.ID, 'editShop');
                  }}
                  style={[titleItem, styleRow]}
                >{item.post_title}</Text>
              </View>
              <View style={rowChildOfItem}>
                {this.renderListCustom(item.listCustom, item.ID)}
              </View>
            </View>

          </View>
        </View>
      );
    });
    return arrayRender;
  }

  // list child row. passing data array items. idshop (id parent)
  renderListCustom(items, idShop) {
    const {
      checkBoxStyle, rowCheckBox, faEdit, faDel, checkboxText, actionWrap
    } = StyleShoppingList;
    const renderArray = [];
    // render item shop.
    if (items.length > 0) {
      items.map((item, i) =>
        renderArray.push(
          <View key={i} style={rowCheckBox}>
            <CheckBox
              style={checkBoxStyle}
              onClick={() => this.HandleCheckBox(item, idShop)}
              isChecked={item.checked}
            />
            <Text style={checkboxText}>{item.post_title}</Text>
            <View style={actionWrap}>
              <FontAwesome
                style={faEdit}
                name='pencil-square-o'
                onPress={() => {
                  this.setState({
                    currentCtrlItemID: item.ID,
                    currentCtrlItemName: item.post_title
                  });
                  this.setModalVisible(true, idShop, 'editItemShop');
                }}
              />
              <FontAwesome
                style={faDel}
                name='trash'
                onPress={() => this.deleteItemShopping(item, idShop)}
              />
            </View>
          </View>
        )
      );
      if (items.length < 6) {
        for (let i = items.length + 1; i <= 6; i++) {
          renderArray.push(
            <View key={i} style={rowCheckBox}>
              <CheckBox style={checkBoxStyle} onClick={() => console.log('click check box')} />
              <Text
                style={checkboxText}
                onPress={() => {
                  this.setModalVisible(true, idShop, '');
                }}
              >......</Text>
            </View>
          );
        }
      } else {
        renderArray.push(
          <View key={items.length + 1} style={rowCheckBox}>
            <CheckBox style={checkBoxStyle} onClick={() => console.log('click check box')} />
            <Text
              style={checkboxText}
              onPress={() => {
                this.setModalVisible(true, idShop, '');
              }}
            >......</Text>
          </View>
        );
      }
    } else {
      for (let i = 1; i <= 6; i++) {
        renderArray.push(
          <View key={i} style={rowCheckBox}>
            <CheckBox style={checkBoxStyle} onClick={() => console.log('click check box')} />
            <Text
              style={checkboxText}
              onPress={() => {
                this.setModalVisible(true, idShop, '');
              }}
            >......</Text>
          </View>
        );
      }
    }
    return renderArray;
  }

  renderSceneLoading() {
    const { modalContainer } = StyleShoppingList;
    return (
      <Modal
        animationType={'fade'}
        transparent
        visible={this.state.loadingData}
      >
        <View style={modalContainer}>
          <Loading animating />
        </View>
      </Modal>
    );
  }

  render() {
    //const { wrapperScreen, content } = Styles;
    const {
      imgbg, inputWrap, textInput, addButton, buttonWrap,
      wrapScrollView, scorllShopping, contentScrollShopping,
      addButtonDelete, addButtonClear, wraptitle, textTitle
    } = StyleShoppingList;
    return (
        <View>
          <View>
          <Image source={BGShoppingListImg} style={imgbg}>
            {/*<View style={wraptitle}><Text style={textTitle}>Add new food</Text></View>*/}
            <View style={inputWrap}>
              <TextInput
                style={textInput}
                onChangeText={(nameFood) => this.setState({ nameFood })}
                value={this.state.nameFood}
                placeholder='Name food'
                placeholderTextColor='#d1d0d0'
              />
              <TouchableOpacity style={[addButton, { backgroundColor: '#fc7805' }]} onPress={() => this.addFoodNameItem(false)}>
                <Text style={{ fontSize: 18, color: '#fff', fontWeight: 'bold' }}>ADD</Text>
              </TouchableOpacity>
            </View>
            <View style={buttonWrap}>
              <TouchableOpacity style={[addButton, addButtonDelete]} onPress={() => this.deleteallshop(false)}>
                <Text style={{ fontSize: 18, color: '#fff', fontWeight: 'bold' }}>DEL ALL</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[addButton, addButtonClear]} onPress={() => this.clearcheckedShop(false)}>
                <Text style={{ fontSize: 18, color: '#333', fontWeight: 'bold' }}>CLEAR ALL</Text>
              </TouchableOpacity>
            </View>
          </Image>
          </View>
          <View style={wrapScrollView} key={this.state.clear} >
            <Text style={{ backgroundColor: '#fff', fontSize: 0, color: '#fff', height: 0 }}>{this.state.clear}</Text>
            { this.state.data.length > 0 ? 
            <ScrollView style={scorllShopping} contentContainerStyle={contentScrollShopping}>
                {this.renderData(this.state.data.reverse())}
            </ScrollView> :
            <Loading animating />
            }
          </View>
          {this.state.loadingData ? this.renderSceneLoading() : null}
            {this.renderModal()}
        </View>
    );
  }
}

export default ShoppingList;
