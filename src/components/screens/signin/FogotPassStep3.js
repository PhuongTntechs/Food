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

class FogotPassStep3 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      rePass: '',
      loading: false
    };
  }
  sendPass() {
    const { navigation } = this.props;
    if (this.state.password !== '' && this.state.password === this.state.rePass) {
      this.setState({ loading: true });
      const value = {
        password: this.state.password,
        email: navigation.state.params.email,
        Action: 'FogotPass3'
      };
      Fetch(value)
      .then((response) => response.json())
      .then((responseJson) => {
        //console.log(responseJson);
        Alert.alert(
          'OK',
          responseJson.mess,
          [
            { text: 'OK', onPress: () => navigation.navigate('Screen_signIn') },
          ]
        );
        this.setState({ loading: false });
      })
      .catch(error => {
        console.log(error);
        this.setState({ loading: false });
      });
    } else {
      if (this.state.password !== this.state.rePass) {
        Alert.alert('password and re-password not correct');
      } else {
        Alert.alert('password is empty');
      }
      this.setState({ loading: false });
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
              <View style={wrapTitleHeader}><Text style={titleHeader}>Enter new password</Text></View>
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
                <Text style={stepTitle}>Step 3: Enter new password</Text>
                <Text style={stepText}>please enter your new password</Text>
              </View>
              <View style={formLogin}>
                <View style={textFieldWrap}>
                  <TextInput
                    style={textField}
                    placeholder='Enter your password'
                    placeholderTextColor='#fff'
                    secureTextEntry
                    value={this.state.password}
                    onChangeText={password => this.setState({ password })}
                  />
                </View>
                <View style={textFieldWrap}>
                  <TextInput
                    style={textField}
                    placeholder='Enter re password'
                    placeholderTextColor='#fff'
                    secureTextEntry
                    value={this.state.rePass}
                    onChangeText={rePass => this.setState({ rePass })}
                  />
                </View>
                <View style={[textFieldWrap, buttonfieldwrap]}>
                  {this.state.loading ? <Loading animating /> :
                    <TouchableOpacity style={touchsubmit} onPress={this.sendPass.bind(this)} >
                      <Image style={buttonimg} source={bgbuttonlogin}>
                        <Text style={buttonText}>Send</Text>
                      </Image>
                    </TouchableOpacity>
                  }
                </View>
              </View>
          </View>
        </Image>
      </ScrollView>
    );
  }
}
export default FogotPassStep3;
