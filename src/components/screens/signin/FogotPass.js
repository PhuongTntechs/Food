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
import ValidateEmail from '../../assets/api/ValidateEmail';

class FogotPass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      loading: false
    };
  }
  sendEmail() {
    const { navigation } = this.props;
    if (this.state.email !== '') {
      this.setState({ loading: true });
      if (ValidateEmail(this.state.email)) {
        const value = {
          Email: this.state.email,
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
            console.log(responseJson);
            // next step 2
            navigation.navigate(
              'Screen_fogotPassStep2',
              {
                email: this.state.email
              }
            );
          }
          this.setState({ loading: false });
        })
        .catch(error => {
          console.log(error);
          this.setState({ loading: false });
        });
      } else {
        Alert.alert('Please enter your true email');
        this.setState({ loading: false });
      }
    } else {
      Alert.alert('Please enter email for your acount!');
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
              <View style={wrapTitleHeader}><Text style={titleHeader}>Fogot Password</Text></View>
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
                <Text style={stepTitle}>Step 1: Enter Email</Text>
                <Text style={stepText}>
                  The code for reset password will be emailed to you.
                </Text>
                <Text style={stepText}>
                  The code will last for 5 minutes. More than 5 minutes will be deleted
                </Text>
              </View>
              <View style={formLogin}>
                <View style={textFieldWrap}>
                  <TextInput
                    style={textField}
                    placeholder='Enter your email'
                    placeholderTextColor='#fff'
                    value={this.state.email}
                    onChangeText={email => this.setState({ email })}
                  />
                </View>
                <View style={[textFieldWrap, buttonfieldwrap]}>
                  {this.state.loading ? <Loading animating /> :
                    <TouchableOpacity style={touchsubmit} onPress={this.sendEmail.bind(this)} >
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
export default FogotPass;
