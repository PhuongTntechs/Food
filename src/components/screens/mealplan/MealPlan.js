'user trict';
import React, {
  Component,
} from 'react';

import {
  View, Text, TouchableHighlight, Animated,
  Picker, TouchableOpacity, Alert
} from 'react-native';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Styles from '../../assets/styles/MealPlanStyles';
import GetCurrentUser from '../../assets/api/GetCurrentUser';
import Fetch from '../../assets/api/Fetch';
import Init from '../../assets/Init';
import ContentMealPlan from './ContentMealPlan';
import StylesDefault from '../../assets/styles/Styles';

const { height } = Init;
const PickerItem = Picker.Item;

const getYear = () => {
  let currentYear = new Date().getFullYear();
  const endYear = currentYear + 20;
  const years = [];
  while (currentYear <= endYear) {
    years.push((currentYear++).toString());
  }
  return years;
};

const showMonth = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
const showWeek = ['1', '2', '3', '4', '5'];
const showYear = getYear();

const { touchBtnMenu, buttonMenuHome, HomeButtonWrapper, textHeaderHome, HomeButtonMain } = StylesDefault;
class MealPlan extends Component {
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
          <Text style={textHeaderHome}>Meal Plan</Text>
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
        month: (new Date().getMonth() + 1).toString(),
        week: '1',
        year: new Date().getFullYear().toString(),
        modal: false,
        offSet: new Animated.Value(height),
    };
    //this.changeTime = this.changeTime.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }
  componentDidMount() {
    GetCurrentUser().then(user => {
      const currentUser = JSON.parse(user);
      this.setState(currentUser);
    });

    Animated.timing(this.state.offSet, {
        duration: 300,
        toValue: 100
      }).start();
  }
  closeModal() {
     Animated.timing(this.state.offSet, {
        duration: 300,
        toValue: height
     }).start(this.setState({ modal: false }));
  }
  deleteWeek() {
    Alert.alert(
      'Delete Week',
      `You want delete meal plan in week ${this.state.week}?`,
      [
        { text: 'OK', onPress: () => this.deleteWeekProcess() },
        { text: 'Cancel', onPress: () => console.log('cancel') },
      ],
      { cancelable: false }
    );
  }
  deleteWeekProcess() {
    const value = {
      idUser: this.state.id_user,
      date: `${this.state.year}-${this.state.month}`,
      week: this.state.week,
      Action: 'deleteWeek'
    };
    Fetch(value)
    .then((response) => response.json())
    .then((responseJson) => {
      //console.log(responseJson['post_title']);
      console.log(responseJson);
      this.setState({
        deleteWeek: 'ok'
      });
    })
    .catch(error => {
      console.log(error);
    });
  }
  render() {
    const yearMonth = `${this.state.year}-${this.state.month}`;
    const {
      wrapperScreen, container, formContainer, formGroup, textLabel, textData,
      addButton, textButton, PickerIOS, modalPicker, closeButtonContainer, closeButton,
      closeButtonText, pickerContainer, formGroupButton
    } = Styles;
    return (
      <View style={wrapperScreen}>
        <View style={container}>
          <View style={formContainer}>
            <View style={formGroup}>
              <Text style={[textLabel, { paddingRight: 2 }]}>Month:</Text>
              <Text
                style={textData}
                onPress={() => this.setState({ modal: true })}
              >
                {this.state.year} - {this.state.month}
              </Text>
            </View>
            <View style={formGroup}>
              <Text style={textLabel}>Week:</Text>
              <Text
                style={textData}
                onPress={() => this.setState({ modal: true })}
              >
                {this.state.week}
              </Text>
            </View>
            <View style={formGroup}>
              <TouchableOpacity
                style={addButton}
                onPress={() => this.setState({ modal: true })}
              >
                <Text style={textButton}>SELECT</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={addButton}
                onPress={() => this.setState({
                  deleteWeek: ''
                }, () => this.deleteWeek())}
              >
                <Text style={[textButton, { color: '#333' }]}>DEL</Text>
              </TouchableOpacity>
            </View>
          </View>
          <ContentMealPlan
            deleteWeek={this.state.deleteWeek}
            yearMonth={yearMonth}
            week={this.state.week}
            deleteWeek={this.state.deleteWeek}
          />
         { this.state.modal ?
            <View style={modalPicker}>
               <View style={closeButtonContainer}>
                 <TouchableHighlight
                   onPress={this.closeModal}
                   underlayColor="transparent"
                   style={closeButton}
                 >
                   <Text style={closeButtonText}>Choose</Text>
                 </TouchableHighlight>
               </View>
               <View style={pickerContainer}>
                 <View style={PickerIOS}>
                   <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                     <Text style={{ fontSize: 16, color: '#027afe' }}>Year</Text>
                   </View>
                    <Picker
                       selectedValue={this.state.year}
                       onValueChange={(time) => this.setState({
                         year: time
                       })}
                       style={Picker}
                    >
                     {Object.keys(showYear).map((item) => (
                       <PickerItem
                         key={showYear[item]}
                         value={showYear[item]}
                         label={showYear[item]}
                       />
                     ))}
                    </Picker>
                 </View>
                 <View style={PickerIOS}>
                   <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                     <Text style={{ fontSize: 16, color: '#027afe' }}>Month</Text>
                   </View>
                    <Picker
                       selectedValue={this.state.month}
                       onValueChange={time => this.setState({
                         month: time
                       })}
                       style={Picker}
                    >
                     {Object.keys(showMonth).map((item) => (
                       <PickerItem
                         key={showMonth[item]}
                         value={showMonth[item]}
                         label={showMonth[item]}
                       />
                     ))}
                    </Picker>
                  </View>
                <View style={PickerIOS}>
                  <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: 16, color: '#027afe' }}>Week</Text>
                  </View>
                  <Picker
                    selectedValue={this.state.week}
                    onValueChange={(time) => this.setState({
                      week: time,
                    })}
                    style={Picker}
                  >
                  {Object.keys(showWeek).map(item => (
                    <PickerItem
                      key={showWeek[item]}
                      value={showWeek[item]}
                      label={showWeek[item]}
                    />
                  ))}
                 </Picker>
                </View>
           </View>
           </View> : null
          }
        </View>
      </View>
    );
  }
}

export default MealPlan;
