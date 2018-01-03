'user trict';
import React, {
  Component,
} from 'react';

import {
  View, Text, TouchableOpacity, NativeModules, Alert, AsyncStorage,
  ScrollView
} from 'react-native';

//import PayPal from 'react-native-paypal-wrapper';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Styles from '../../assets/styles/Styles';
import StyleGoPremium from '../../assets/styles/StyleGoPremium';
import GetCurrentUser from '../../assets/api/GetCurrentUser';
import Fetch from '../../assets/api/Fetch';
import Init from '../../assets/Init';
import Loading from '../Main/Loading';

const MFLReactNativePayPal = NativeModules.MFLReactNativePayPal;
const { buttonMenuHome, touchBtnMenu, HomeButtonWrapper, HomeButtonMain, textHeaderHome } = Styles;
class GoPremium extends Component {
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
          <Text style={textHeaderHome}>Go Premium</Text>
          <TouchableOpacity style={HomeButtonWrapper} onPress={() => navigate('Screen_Home')}>
            <FontAwesome name='home' style={HomeButtonMain} />
          </TouchableOpacity>
        </View>
        </View>
    });
  }
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };
  }
  componentDidMount() {
    GetCurrentUser().then(user => {
      const currentUser = JSON.parse(user);
      this.setState(currentUser);
    });
    MFLReactNativePayPal.initializePaypalEnvironment(0,
      'AehTEp-an-Qiw2LjhPsqp7hvWrkuxR0fYMEJFXmRyC6QPXFV9rHBMxTva7LdW3Idok2nFFLUSTm0DDDU');
  }
  UpgradeProcess() {
    //console.log(this.state);
    if (this.state.role !== 'userPremium') {
      this.setState({ loading: true });
      MFLReactNativePayPal.preparePaymentOfAmount('2.00', 'USD', 'Go Premium');
      MFLReactNativePayPal.prepareConfigurationForMerchant('Phuong', true, 'kid.tn01@gmail.com');
      MFLReactNativePayPal.presentPaymentViewControllerForPreparedPurchase((error, payload) => {
        if (error) {
           //Handle Error
           Alert.alert(
             'Payment Failed',
             'Have an issue, please try again!',
             [
               { text: 'Ok' },
             ],
             { cancelable: false }
           );
         } else {
          //console.log('pay success');
          console.log(payload);
          if (payload.status === 1) {
             //console.log(payload.confirmation);
            const value = {
              idUser: this.state.id_user,
              money: '2.00',
              transaction: payload.confirmation.response.id,
              currency: 'USD',
              Action: 'GoPremium'
            };
            Fetch(value)
            .then((response) => response.json())
            .then((responseJson) => {
              //console.log(responseJson);
              if (responseJson) {
                this.repondProcess(responseJson);
              }
            })
            .catch(r => {
              console.log(r);
            });
          } else {
            // console.log('User cancelled payment');
            this.setState({ loading: false });
             Alert.alert(
               'Cancelled payment',
               'You cancelled payment',
               [
                 { text: 'Ok' },
               ],
               { cancelable: false }
             );
          }
         }
      });
    }
  }
  repondProcess(data) {
    if (data.status === 'success') {
      this.setState({
        role: 'userPremium'
      }, () => {
        AsyncStorage.setItem('current_user', JSON.stringify(this.state));
        Init.onSignIn(this.state.id_user);
        Init.role(this.state.role);
      });
      Alert.alert(
        'Upgrade user success',
        //'You are premium user',
        data.mess,
        [
          { text: 'Ok' },
        ],
        { cancelable: false }
      );
    } else if (data.status === 'error') {
      Alert.alert(
        'Upgrade user Error',
        //'You are premium user',
        data.mess,
        [
          { text: 'Ok' },
        ],
        { cancelable: false }
      );
    }
    this.setState({ loading: false });
  }
  render() {
    const { wrapperScreen, content } = Styles;
    const {
      goPremiumContainer, title, textTitle, priceContainer, textPrice,
      textPriceDescription, contentGoPremium, rowText, faGoPremium,
      textDescription, rowButuon, premiumUser, textUserPremium, textTitle2,
      containerGoPremium
    } = StyleGoPremium;

    return (
      <View style={containerGoPremium}>
      <ScrollView style={wrapperScreen}>
        <View style={content}>
          {this.state.role === 'userPremium' ?
            <View style={[premiumUser, title]}>
              <Text style={[textTitle, textUserPremium]}>You are premium member</Text>
            </View> : null
          }
          <View style={goPremiumContainer}>
            <View style={title}>
              <Text style={textTitle}>Upgrade Account</Text>
              <Text style={textTitle2}>Go premium to unlock the full KitchenHero experience!</Text>
            </View>
            <View style={priceContainer}>
              <Text style={textPrice}>$2</Text>
              <Text style={textPriceDescription}>For just $2 a month you get all of this!</Text>
            </View>
            <View style={contentGoPremium}>
              <View style={rowText}>
                <FontAwesome style={faGoPremium} name='check' />
                <Text style={textDescription}>Shopping list - It all starts at the store, have your grocery list on hand at all times</Text>
              </View>
              <View style={rowText}>
                <FontAwesome style={faGoPremium} name='check' />
                <Text style={textDescription}>Meal Plan - Keep on top of your meals so you can feel on top of the world</Text>
              </View>
              <View style={rowText}>
                <FontAwesome style={faGoPremium} name='check' />
                <Text style={textDescription}>Favorites - Save your most-loved articles so you never have to be without them, even when offline!</Text>
              </View>
              <View style={rowText}>
                <FontAwesome style={faGoPremium} name='check' />
                <Text style={textDescription}>Tips & Methods - Baking, Cleaning and Storing.</Text>
              </View>
              <View style={rowText}>
                <FontAwesome style={faGoPremium} name='check' />
                <Text style={textDescription}>Hacks - General Cooking, Rescue Me and Time</Text>
              </View>
              <View style={rowText}>
                <FontAwesome style={faGoPremium} name='check' />
                <Text style={textDescription}>Substitutes - Upgrade to receive double the amount of substitutes, adding up to nearly 500!</Text>
              </View>
              </View>
              {this.state.loading ? <Loading animating /> :
                <TouchableOpacity
                  style={rowButuon}
                  onPress={this.UpgradeProcess.bind(this)}
                >
                  <Text style={{ color: '#fff', fontWeight: 'bold' }}>Upgrade</Text>
                </TouchableOpacity>
              }
            </View>
        </View>
      </ScrollView>
      </View>
    );
  }
}
export default GoPremium;
