'user trict';
import React, {
  Component,
} from 'react';

import {
  View, Text, TouchableOpacity, ListView
} from 'react-native';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import DisplayHTML from 'react-native-display-html';
import GetCurrentUser from '../../assets/api/GetCurrentUser';
import Fetch from '../../assets/api/Fetch';
import Loading from '../Main/Loading';
import StyleFilter from '../../assets/styles/FilterStyles';
import Init from '../../assets/Init';
import Styles from '../../assets/styles/Styles';

const { buttonMenuHome, touchBtnMenu, HomeButtonMain, HomeButtonWrapper, textHeaderHome } = Styles;
const { charArray, HeaderBgColorHome, newHeaherBgColorHome } = Init;
class FilerCategory extends Component {
  static navigationOptions = ({ navigation }) => {
    const { goBack } = navigation;
    return (
      /*{
      headerLeft:
        <TouchableOpacity onPress={() => goBack()} style={touchBtnMenu}>
          <FontAwesome name='chevron-left' style={buttonMenu} />
        </TouchableOpacity>,
      title: 'Substitutes',
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
          <Text style={textHeaderHome}>Substitutes</Text>
          <TouchableOpacity style={HomeButtonWrapper} onPress={() => goBack()}>
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
      dataSource: new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 }),
      data: null,
      textIndex: null
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
      role: state.role,
      Action: 'FilterData'
    };

    Fetch(value)
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(responseJson),
        data: responseJson
      });
    })
    .catch(error => {
      console.log(error);
    });
  }
  filterTextProcess(text) {
    const newData = this.state.data.filter((item) => {
      const itemData = item.post_title.toUpperCase().substr(0, 1);
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    this.setState({
        dataSource: this.state.dataSource.cloneWithRows(newData),
    });
  }
  renderRow(rowData) {
    const { rowContainer, rowTitle } = StyleFilter;
    return (
      <View style={rowContainer}>
        <Text style={rowTitle}>{rowData.post_title}</Text>
        <DisplayHTML
          htmlString={rowData.post_content}
          HTMLStyles={'ul { padding: 10px }'}
          checkSubtite={true}
        />
      </View>
    );
  }
  renderTextFilter() {
    const textData = [];
    const { textBtn, textBtnActive, textfilter } = StyleFilter;
    charArray.map((item, i) => {
      const textBtnStyle = this.state.textIndex === i ? [textBtn, textBtnActive] : textBtn;
      return textData.push(
        <TouchableOpacity
          onPress={() => {
            this.filterTextProcess(item);
            this.setState({
              textIndex: i
            });
          }}
          style={textBtnStyle}
          key={i}
        >
        <Text style={textfilter}>{item}</Text>
        </TouchableOpacity>
      );
    });
    return textData;
  }
  render() {
    const { textFilterContainer, listPostContainer } = StyleFilter;
    return (
      <View>
        <View style={textFilterContainer}>
          {this.renderTextFilter()}
        </View>
        <View style={listPostContainer}>
          { this.state.data !== null ?
            <ListView
              enableEmptySections
              renderRow={this.renderRow.bind(this)}
              dataSource={this.state.dataSource}
            />
            :
            <Loading animating />
          }
        </View>
      </View>
    );
  }
}

export default FilerCategory;
