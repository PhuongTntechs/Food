'user trict';
import React, {
  Component,
} from 'react';

import {
  View, Text, ScrollView, Image, TouchableOpacity, TextInput,
  Alert
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import SignInStyle from '../../assets/styles/SignInStyle';
import Logo2Img from '../../../img/logo.png';
import bgLoginImg from '../../../img/bgSingleFood/singlefoodbg12.jpg';
import Fetch from '../../assets/api/Fetch';
import bgbuttonlogin from '../../../img/bgbuttonlogin.png';
import Styles from '../../assets/styles/Styles';
import Loading from '../Main/Loading';

class FogotPassStep2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      code: '',
      loading: false,
      loading2: false,
    };
  }
  sendCode() {
    const { navigation } = this.props;
    if (this.state.code !== '') {
      this.setState({ loading: true });
      const value = {
        code: this.state.code,
        email: navigation.state.params.email,
        Action: 'FogotPass2'
      };
      Fetch(value)
      .then((response) => response.json())
      .then((responseJson) => {
        //console.log(responseJson);
        if (responseJson.status === 'Failed') { // error
          Alert.alert(
            'Opps!',
            responseJson.mess,
            [
              { text: 'OK', onPress: () => console.log('OK Pressed!') },
            ]
          );
        } else {
          // next step 3
          console.log(responseJson);
          Alert.alert(
            'OK',
            responseJson.mess,
            [
              { text: 'OK',
              onPress: () =>
                navigation.navigate(
                  'Screen_fogotPassStep3',
                  {
                    email: navigation.state.params.email
                  }
                )
              },
            ]
          );
        }
        this.setState({ loading: false });
      })
      .catch(error => {
        console.log(error);
        this.setState({ loading: false });
      });
    } else {
      Alert.alert('Please enter your code!');
      this.setState({ loading: false });
    }
  }
  reSendCode() {
    const { navigation } = this.props;
    if (navigation.state.params.email !== null) {
      this.setState({ loading2: true });
      const value = {
        Email: navigation.state.params.email,
        Action: 'FogotPass'
      };
      Fetch(value)
      .then((response) => response.json())
      .then((responseJson) => {
        //console.log(responseJson);
        if (responseJson.status === 'Failed') { // error
          Alert.alert(
            'Opps!',
            responseJson.mess,
            [
              { text: 'OK', onPress: () => console.log('OK Pressed!') },
            ]
          );
        } else {
          //console.log(responseJson);
          Alert.alert(
            'Success',
            'Please check inbox and spam in your mail',
            [
              { text: 'OK', onPress: () => console.log('OK Pressed!') },
            ]
          );
        }
        this.setState({ loading2: false });
      })
      .catch(error => {
        console.log(error);
        this.setState({ loading2: false });
      });
    }
  }
  render() {
    const {
      rowMenu, bgSingleProduct, contentSignIn, rowLogo, Logo, formLogin, textFieldWrap,
      textField, buttonfieldwrap, touchsubmit, buttonimg, buttonText, stepTitle, stepText,
      otherbuttonMenuContent, wrapTitleHeader, titleHeader, goHomeButton
    } = SignInStyle;
    const { navigation } = this.props;
    //const { otherbuttonMenuContent } = Styles;
    return (
      <ScrollView >
        <Image style={bgSingleProduct} source={bgLoginImg}>
          <View style={contentSignIn}>
            <View style={rowMenu} >
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <FontAwesome name='chevron-left' style={otherbuttonMenuContent} />
              </TouchableOpacity>
              <View style={wrapTitleHeader}><Text style={titleHeader}>Code Email</Text></View>
              <TouchableOpacity onPress={() => navigation.navigate('Screen_Home')}>
                <FontAwesome name='home' style={goHomeButton} />
              </TouchableOpacity>
            </View>
              <View style={rowLogo}>
                <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                  <Image style={Logo} source={Logo2Img} />
                </TouchableOpacity>
              </View>
              <View style={formLogin}>
                <Text style={stepTitle}>Step 2: Enter code</Text>
                <Text style={stepText}>
                  Please check your email {navigation.state.params.email}.
                </Text>
                <Text style={stepText}>
                  if dont see mail. please click re-send button.
                </Text>
              </View>
              <View style={formLogin}>
                <View style={textFieldWrap}>
                  <TextInput
                    style={textField}
                    placeholder='Enter your code'
                    placeholderTextColor='#fff'
                    value={this.state.code}
                    onChangeText={code => this.setState({ code })}
                  />
                </View>
                <View style={[textFieldWrap, buttonfieldwrap]}>
                  {this.state.loading ? <Loading animating /> :
                    <TouchableOpacity style={touchsubmit} onPress={this.sendCode.bind(this)} >
                      <Image style={buttonimg} source={bgbuttonlogin}>
                        <Text style={buttonText}>Send</Text>
                      </Image>
                    </TouchableOpacity>
                  }
                </View>
                {!this.state.loading2 ?
                  <View style={[textFieldWrap, buttonfieldwrap]}>

                      <TouchableOpacity style={touchsubmit} onPress={this.reSendCode.bind(this)} >
                        <Image style={buttonimg} source={bgbuttonlogin}>
                          <Text style={buttonText}>Re-Send Code</Text>
                        </Image>
                      </TouchableOpacity>
                  </View> : <Loading animating />
                }
              </View>
          </View>
        </Image>
      </ScrollView>
    );
  }
}
export default FogotPassStep2;
