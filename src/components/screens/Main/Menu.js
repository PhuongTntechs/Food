import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Alert,
  Image
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { NavigationActions } from 'react-navigation';
import GetCurrentUser from '../../assets/api/GetCurrentUser';
import LogOut from '../Main/LogOut';
import Logo from '../../../img/logo.png';
import Styles from '../../assets/styles/Styles';
import Init from '../../assets/Init';
import termIcon from '../../../img/icon_term.png';
import workingSheetIcon from '../../../img/icon_cookingworksheet.png';
import cookingConversionsIcon from '../../../img/icon_cooking_conversions.png';
import mealIcon from '../../../img/icon_meal_new.png';
import favoriteIcon from '../../../img/icon_favorites_new.png';
import GoPremiumIcon from '../../../img/icon_go_premium_new2.png';
import ContactIcon from '../../../img/icon_contact_new.png';
import SettingIcon from '../../../img/icon_setting_new.png';
import Myprofile from '../../../img/icon_myprofile.png';
import ShoppingIcon from '../../../img/icon_shopping_new.png';
import SignInIcon from '../../../img/icon_signin_new.png';
import LockIcon from '../../../img/icon_lock.png';
import chartIcon from '../../../img/icon_temperature_chart.png';

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id_user: null,
      itemSelected: 'Home',
      openSubmenu: false
    };
    Init.onSignIn = this.onSignIn.bind(this);
    Init.role = this.roleUser.bind(this);
  }
  componentDidMount() {
    GetCurrentUser().then(user => {
      const currentUser = JSON.parse(user);
      this.setState(currentUser);
    });
  }
  onSignIn(idUser) {
    this.setState({ id_user: idUser });
  }
  roleUser(role) {
    this.setState({ role });
  }
  clickMenu(routerName) {
    if (this.state.id_user !== null) {
      if ((
        routerName === 'MealPlan'
        || routerName === 'Shopping')
        && this.state.role !== 'userPremium'
      ) {
        Alert.alert(
          'You Are Not Premium Member',
          'Do you want Upgrade Member',
          [
            { text: 'OK', onPress: () => this.clickMenuProcess('GoPremium') },
            { text: 'Cancel' },
          ],
          { cancelable: false }
        );
      } else {
        this.clickMenuProcess(routerName);
      }
    } else {
      if (routerName === 'GoPremium') {
        this.clickMenuProcess('SignIn');
      } else if (routerName === 'Favorites') {
        Alert.alert(
          'You Are Not Sign In',
          'You must be signed in to perform this action',
          [
            { text: 'OK', onPress: () => this.clickMenuProcess('SignIn') },
            { text: 'Cancel' },
          ],
          { cancelable: false }
        );
      } else {
        Alert.alert(
          'You Are Not Sign In',
          'Do you want to sign in?',
          [
            { text: 'OK', onPress: () => this.clickMenuProcess('SignIn') },
            { text: 'Cancel' },
          ],
          { cancelable: false }
        );
      }
    }
  }
  clickMenuProcess(routerName) {
    const { navigation } = this.props;
    navigation.navigate(routerName);
    this.setState({ itemSelected: routerName });
  }
  logout() {
    const { navigation } = this.props;
    Alert.alert(
      'LogOut',
      'Do you want to LogOut?',
      [
        { text: 'OK',
        onPress: () => {
          LogOut().then(() => {
            this.setState({
              id_user: null,
              role: null,
              itemSelected: 'Home'
            }, () => {
              //navigation.navigate('Home');
              const resetAction = NavigationActions.reset({
                index: 0,
                actions: [
                  NavigationActions.navigate({ routeName: 'Screen_Home' })
                ]
              });
              navigation.dispatch(resetAction);
            });
          });
        } },
        { text: 'Cancel' },
      ],
      { cancelable: false }
    );
  }
  clickSetting() {
    console.log('click setting');
    this.setState({
      openSubmenu: !this.state.openSubmenu
    });
  }
  render() {
    const {
      menuItemWrap, BannerWrap, BannerImage, itemFa, itemWrapAtive,
      mainMenu, textItemMenu, containerMenu, textMenuAtive, itemFaAtive, itemIcon,
      subMenuItem, itemIconFavorites, loginIcon, itemIconChart
    } = Styles;
    const { itemSelected } = this.state;
    return (
      <View style={containerMenu}>
        <View style={BannerWrap}>
          <TouchableOpacity onPress={() => this.clickMenuProcess('Home')}>
            <Image source={Logo} style={BannerImage} />
          </TouchableOpacity>
        </View>
        <View style={mainMenu}>
          <TouchableOpacity onPress={() => this.clickMenu('Favorites')}>
            <View style={[menuItemWrap, itemSelected === 'Favorites' ? itemWrapAtive : null]}>
              <Image source={favoriteIcon} style={itemIconFavorites} />
              <Text style={[textItemMenu, itemSelected === 'Favorites' ? textMenuAtive : null]}>
              {'favorites'.toUpperCase()}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { this.clickMenu('Shopping'); }}>
            <View style={[menuItemWrap, itemSelected === 'Shopping' ? itemWrapAtive : null]}>
              <Image source={ShoppingIcon} style={itemIcon} />
              <Text style={[textItemMenu, itemSelected === 'Shopping' ? textMenuAtive : null]}>
              {'Shopping list'.toUpperCase()}</Text>
              {this.state.role !== 'userPremium' ? <View style={{ justifyContent: 'flex-end' }}><Image source={LockIcon} style={itemIcon} /></View> : null}
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { this.clickMenu('MealPlan'); }}>
            <View style={[menuItemWrap, itemSelected === 'MealPlan' ? itemWrapAtive : null]}>
              <Image source={mealIcon} style={itemIcon} />
              <Text style={[textItemMenu, itemSelected === 'MealPlan' ? textMenuAtive : null]}>
              {'Meal plan'.toUpperCase()}</Text>
              {this.state.role !== 'userPremium' ? <View style={{ justifyContent: 'flex-end' }}><Image source={LockIcon} style={itemIcon} /></View> : null}
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.clickMenu('GoPremium')}>
            <View style={[menuItemWrap, itemSelected === 'GoPremium' ? itemWrapAtive : null]}>
              <Image source={GoPremiumIcon} style={itemIcon} />
              <Text style={[textItemMenu, itemSelected === 'GoPremium' ? textMenuAtive : null]}>
              {'Go Premium'.toUpperCase()}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.clickMenuProcess('CookingTerms')}>
            <View style={[menuItemWrap, itemSelected === 'CookingTerms' ? itemWrapAtive : null]}>
              <Image source={workingSheetIcon} style={itemIcon} />
              <Text style={[textItemMenu, itemSelected === 'CookingTerms' ? textMenuAtive : null]}>
              {'Cooking Terms Worksheet'.toUpperCase()}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.clickMenuProcess('CookingConversions')}>
            <View style={[menuItemWrap, itemSelected === 'CookingConversions' ? itemWrapAtive : null]}>
              <Image source={cookingConversionsIcon} style={itemIcon} />
              <Text style={[textItemMenu, itemSelected === 'CookingConversions' ? textMenuAtive : null]}>
              {'Cooking Conversions'.toUpperCase()}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.clickMenuProcess('CookingTemperature')}>
            <View style={[menuItemWrap, itemSelected === 'CookingTemperature' ? itemWrapAtive : null]}>
              <Image source={chartIcon} style={itemIconChart} />
              <Text style={[textItemMenu, itemSelected === 'CookingTemperature' ? textMenuAtive : null]}>
              {'Cooking Temperature Chart'.toUpperCase()}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.clickMenuProcess('Contact')}>
            <View style={[menuItemWrap, itemSelected === 'Contact' ? itemWrapAtive : null]}>
              <Image source={ContactIcon} style={itemIcon} />
              <Text style={[textItemMenu, itemSelected === 'Contact' ? textMenuAtive : null]}>
              {'About Us'.toUpperCase()}</Text>
            </View>
          </TouchableOpacity>
            <View>
            <TouchableOpacity onPress={this.clickSetting.bind(this)}>
              <View style={menuItemWrap}>
                <Image source={SettingIcon} style={itemIcon} />
                <Text style={textItemMenu}>{'Settings'.toUpperCase()}</Text>
                <View style={{ justifyContent: 'flex-end' }}><FontAwesome name='caret-down' style={{ color: '#6B7177', fontSize: 20 }} /></View>
              </View>
            </TouchableOpacity>
            {this.state.openSubmenu === true ? 
            <View>
            { this.state.id_user !== null ? 
            <TouchableOpacity onPress={() => { this.clickMenu('Screen_Settings'); }}>
              <View style={[menuItemWrap, itemSelected === 'Screen_Settings' ? itemWrapAtive : null, subMenuItem]}>
                <Text style={{ width: 15 }} />
                <Image source={Myprofile} style={itemIcon} />
                <Text style={[textItemMenu, itemSelected === 'Screen_Settings' ? textMenuAtive : null]}>
                {'My Profile'}</Text>
              </View>
            </TouchableOpacity>

              : null }
            <TouchableOpacity onPress={() => { this.clickMenuProcess('Screen_Html'); }}>
              <View style={[menuItemWrap, itemSelected === 'Screen_Html' ? itemWrapAtive : null, subMenuItem]}>
                <Text style={{ width: 15 }} />
                <Image source={termIcon} style={itemIcon} />
                <Text style={[textItemMenu, itemSelected === 'Screen_Html' ? textMenuAtive : null]}>
                {'Privacy Policy'}</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { this.clickMenuProcess('Screen_Terms'); }}>
              <View style={[menuItemWrap, itemSelected === 'Screen_Terms' ? itemWrapAtive : null, subMenuItem]}>
                <Text style={{ width: 15 }} />
                <Image source={termIcon} style={itemIcon} />
                <Text style={[textItemMenu, itemSelected === 'Screen_Terms' ? textMenuAtive : null]}>
                {'Terms and Conditions '}</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { this.clickMenuProcess('Screen_Disclaimer'); }}>
              <View style={[menuItemWrap, itemSelected === 'Screen_Disclaimer' ? itemWrapAtive : null, subMenuItem]}>
                <Text style={{ width: 15 }} />
                <Image source={termIcon} style={itemIcon} />
                <Text style={[textItemMenu, itemSelected === 'Screen_Disclaimer' ? textMenuAtive : null]}>
                {'Disclaimer'}</Text>
              </View>
            </TouchableOpacity>
            </View>
          : null }
            </View>

          { this.state.id_user !== null ?
          <TouchableOpacity onPress={this.logout.bind(this)}>
            <View style={[menuItemWrap, itemSelected === 'LogOut' ? itemWrapAtive : null]}>
              <Image source={SignInIcon} style={loginIcon} />
              <Text style={[textItemMenu, itemSelected === 'LogOut' ? textMenuAtive : null]}>
              {'LogOut'.toUpperCase()}</Text>
            </View>
          </TouchableOpacity> : null
          }
          
          {this.state.id_user === null ?
          <TouchableOpacity onPress={() => this.clickMenuProcess('SignIn')}>
            <View style={[menuItemWrap, itemSelected === 'SignIn' ? itemWrapAtive : null]}>
              <Image source={SignInIcon} style={loginIcon} />
              <Text style={[textItemMenu, itemSelected === 'SignIn' ? textMenuAtive : null]}>
              {'SignIn'.toUpperCase()}</Text>
            </View>
          </TouchableOpacity> : null
          }
        </View>
      </View>
    );
  }
}

export default Menu;
