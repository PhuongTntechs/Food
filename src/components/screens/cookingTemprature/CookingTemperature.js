'user trict';
import React, {
  Component,
} from 'react';

import {
  TouchableOpacity, View, Text, ScrollView
} from 'react-native';

import DisplayHTML from 'react-native-display-html';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Init from '../../assets/Init';
import Styles from '../../assets/styles/Styles';
import Fetch from '../../assets/api/Fetch';
import Loading from '../Main/Loading';

const { touchBtnMenu, buttonMenuHome, HomeButtonWrapper, textHeaderHome, HomeButtonMain } = Styles;

class CookingTemperature extends Component {
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
          <Text style={textHeaderHome}>Cooking Temperature Chart</Text>
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
    //const { role } = this.props;
    const value = {
      Action: 'getCookingTemperature',
     //ROLE: role
    };
    Fetch(value)
    .then((response) => response.json())
    .then((responseJson) => {
      //console.log('cooking conversions: ', responseJson[0].content);
      // update state
      this.setState({
        data: responseJson
      });
    })
    .catch(error => {
      console.log(error);
    });
  }

  render() {
    const { width } = Init;
    let htmlStyle = 'td { border: 1px solid black }';
    if (width === 320) {
      htmlStyle = 'table { table-layout:fixed;} td { table-layout:fixed; border: 1px solid black; word-wrap: break-word;}';
    }
    return (
      <ScrollView>
        { this.state.data !== null ?
        <DisplayHTML
          htmlString={this.state.data !== null ? this.state.data[0].content : ''}
          //HTMLStyles={'body { background-color:lightblue }'}
          HTMLStyles={htmlStyle}
        />
        : <Loading animating />
        }
      </ScrollView>
    );
  }
}

export default CookingTemperature;
