'user trict';
import React, {
  Component,
} from 'react';

import {
  Text, ScrollView, View, TouchableOpacity, Modal, TextInput, Alert, Image
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import styles from '../../assets/styles/ContentMealPlanStyles';
import Fetch from '../../assets/api/Fetch';
import GetCurrentUser from '../../assets/api/GetCurrentUser';
import Loading from '../Main/Loading';
import BgModal from '../../../img/bgSingleFood/singlefoodbg1.jpg';


class ContentMealPlan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      modalVisible: false,
      nameFoodItem: '',
      yearMonth: this.props.yearMonth,
      week: this.props.week,
      currentItem: '',
      currentList: '',
      currentListMeal: [],
    };
  }
  componentDidMount() {
    GetCurrentUser().then(user => {
      const currentUser = JSON.parse(user);
      this.setState(currentUser, () => this.getData(this.state));
    });
  }
  componentWillReceiveProps(nextProps) {
    if (
      nextProps.yearMonth !== this.props.yearMonth
      || nextProps.week !== this.props.week
      || nextProps.deleteWeek !== this.props.deleteWeek
    ) {
      this.setState({
        yearMonth: nextProps.yearMonth,
        week: nextProps.week
      }, () => this.getData(this.state));
    }
  }
  getData(state) {
    const value = {
      idUser: state.id_user,
      date: state.yearMonth,
      week: state.week,
      Action: 'getListPostMealPlan'
    };
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
  // open and close modal
  setModalVisible(visible) {
    if (visible === false) {
      this.getData(this.state);
    }
    this.setState({
      modalVisible: visible,
    }, () => {
      if (visible === true) {
        this.refs.textInput.focus();
      }
    });
  }
  getListPostCustomMeal(item, list) {
    // get list custom mealplan
    let buoi = '';
    if (list === 'listtitleL') {
      buoi = 'l';
    } else if (list === 'listtitleS') {
      buoi = 's';
    } else if (list === 'listtitleD') {
      buoi = 'd';
    } else {
      buoi = 'b';
    }
    const value = {
      idUser: this.state.id_user,
      date: item.date,
      buoi,
      Action: 'getListPostCustomMeal'
    };

    Fetch(value)
    .then((response) => response.json())
    .then((responseJson) => {
      //console.log(responseJson['post_title']);
      this.setState({
        currentListMeal: responseJson
      }, () => {
        this.setModalVisible(true);
      });
    })
    .catch(error => {
      console.log(error);
    });
  }
  handelClickBox(item, list) {
    if (item.kt === 1) {
      let buoi = '';
      if (list === 'listtitleL') {
        buoi = 'l';
      } else if (list === 'listtitleS') {
        buoi = 's';
      } else if (list === 'listtitleD') {
        buoi = 'd';
      } else {
        buoi = 'b';
      }
      this.setState({
        currentItem: item,
        currentList: list,
        buoi
      });
      this.getListPostCustomMeal(item, list);
    } else {
      console.log('disable click!');
    }
  }
  addFoodNameItem(bol) {
    const item = this.state.currentItem;
    const title = this.state.nameFoodItem;

    if (title !== '' && bol) {
      const value = {
        idUser: this.state.id_user,
        date: item.date,
        buoi: this.state.buoi,
        title,
        Action: 'addPostMealCustom'
      };
      Fetch(value)
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.status === 'Y') {
          this.setState({ nameFoodItem: '' });
          this.getListPostCustomMeal(item, this.state.currentList);
        }
      })
      .catch(error => {
        console.log(error);
      });
    }
  }

  deleteItemProcess(id) {
    const item = this.state.currentItem;
    const value = {
      idUser: this.state.id_user,
      date: item.date,
      buoi: this.state.buoi,
      idPost: id,
      Action: 'deleteItemListMeal'
    };
    Fetch(value)
    .then((response) => response.json())
    .then((responseJson) => {
      console.log(responseJson);
      if (responseJson.status === 'Y') {
        this.getListPostCustomMeal(item, this.state.currentList);
      }
    })
    .catch(error => {
      console.log(error);
    });
  }
  deleteItemListMeal(id, title) {
    Alert.alert(
      'Delete Item',
      `You want delete ${title}?`,
      [
        { text: 'OK', onPress: () => this.deleteItemProcess(id) },
        { text: 'Cancel', onPress: () => console.log('cancel') },
      ],
      { cancelable: false }
    );
  }

  renderModal() {
    const {
      modalWrap, textInput, inputWrap, addButton,
      rowListMeal, listMealTitle, rowListMealAction, faDel, listMealContainer,
      modalTouch, modalContainerTest
    } = styles;
    //console.log(this.state.currentListMeal);
    const contentlistItem = [];
    if (this.state.currentListMeal !== null) {
      const dataListMeal = this.state.currentListMeal;
      dataListMeal.map((item, i) => {
        contentlistItem.push(
          <View key={i} style={rowListMeal}>
            <Text style={listMealTitle}>{item.post_title}</Text>
            <View style={rowListMealAction}>
                <FontAwesome
                  style={faDel}
                  name='trash'
                  onPress={() => this.deleteItemListMeal(item.ID, item.post_title)}
                />
            </View>
          </View>
        );
        return contentlistItem;
      });
    }
    let contentModal = '';
    contentModal = (
      <View style={inputWrap}>
        <TextInput
          ref='textInput'
          style={textInput}
          onChangeText={nameFoodItem => this.setState({ nameFoodItem })}
          value={this.state.nameFoodItem}
          placeholder='Name Food'
          placeholderTextColor='#d1d0d0'
        />
        <TouchableOpacity
          style={addButton}
          onPress={() => this.addFoodNameItem(true)}
        >
          <Text style={{ fontSize: 18, color: '#fff', fontWeight: 'bold' }} >
            ADD
          </Text>
        </TouchableOpacity>
      </View>);
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
            this.setModalVisible(!this.state.modalVisible);
            //console.log('touch');
          }}
        >
          <View />
        </TouchableOpacity>
        <View style={modalWrap}>
          <Text style={{ textAlign: 'left' }}>Add new food</Text>
            {contentModal}
            { contentlistItem.length > 0 ?
              <View style={listMealContainer} >
                {contentlistItem}
              </View> : null
            }
        </View>
      </View>
       </Modal>
    );
  }
  render() {
    const {
      mainCotent, textLabel, textLabelContainer, textLabelTitle,
      rowDay, dayLabel, textDay, dayBoxContent, rowSunday, textDayLabel,
      rowMonday, rowTuesday, rowWennesday, rowThusday, rowFriday, RowSaturday,
    } = styles;
    //const { yearMonth, week } = this.props;
    //console.log(this.state.data);
    let data = [];
    const renderContent = [];
    if (this.state.data !== null) {
      data = this.state.data;
      let dayTitle = '';
      let styleRow = '';
      data.map((item, i) => {
        if (item.dayofweek === 0) {
          dayTitle = 'SUNDAY';
          styleRow = rowSunday;
        } else if (item.dayofweek === 1) {
          dayTitle = 'MONDAY';
          styleRow = rowMonday;
        } else if (item.dayofweek === 2) {
          dayTitle = 'TUESDAY';
          styleRow = rowTuesday;
        } else if (item.dayofweek === 3) {
          dayTitle = 'WEDNESDAY';
          styleRow = rowWennesday;
        } else if (item.dayofweek === 4) {
          dayTitle = 'THURSDAY';
          styleRow = rowThusday;
        } else if (item.dayofweek === 5) {
          dayTitle = 'FRIDAY';
          styleRow = rowFriday;
        } else if (item.dayofweek === 6) {
          dayTitle = 'SATURDAY';
          styleRow = RowSaturday;
        } else {
          dayTitle = '-----';
          styleRow = RowSaturday;
        }
        return renderContent.push(
          <View key={i} style={[rowDay, styleRow]}>

            <View style={dayLabel}>
              <Text style={textDayLabel}>{dayTitle}</Text>
            </View>
            <TouchableOpacity
              style={dayBoxContent}
              onPress={() => this.handelClickBox(item, 'listtitleB')}
            >
              <ScrollView>
                <Text style={textDay}>{item.listtitleB}</Text>
              </ScrollView>
            </TouchableOpacity>
            <TouchableOpacity
              style={dayBoxContent}
              onPress={() => this.handelClickBox(item, 'listtitleL')}
            >
              <ScrollView>
                <Text style={textDay}>{item.listtitleL}</Text>
              </ScrollView>
            </TouchableOpacity>
            <TouchableOpacity
              style={dayBoxContent}
              onPress={() => this.handelClickBox(item, 'listtitleD')}
            >
              <ScrollView>
                <Text style={textDay}>{item.listtitleD}</Text>
              </ScrollView>
            </TouchableOpacity>
            <TouchableOpacity
              style={dayBoxContent}
              onPress={() => this.handelClickBox(item, 'listtitleS')}
            >
              <ScrollView>
                <Text style={textDay}>{item.listtitleS}</Text>
              </ScrollView>
            </TouchableOpacity>
          </View>
        );
        //return renderContent;
      });
    }
    return (
      <View>
        <ScrollView style={mainCotent}>
          <View style={textLabelContainer}>
            <Text style={[textLabel, textLabelTitle]}>title</Text>
            <Text style={textLabel}>Breakfast</Text>
            <Text style={textLabel}>lunch</Text>
            <Text style={textLabel}>dinner</Text>
            <Text style={textLabel}>snacks</Text>
          </View>
          {renderContent.length > 0 ? renderContent : <Loading animating />}
        </ScrollView>
        { this.state.modalVisible ?
          this.renderModal() : null
        }
      </View>
    );
  }
}
export default ContentMealPlan;
