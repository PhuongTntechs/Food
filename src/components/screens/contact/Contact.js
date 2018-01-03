'user trict';
import React, {
  Component,
} from 'react';

import {
  View, Text, Image, TouchableOpacity, ScrollView
} from 'react-native';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Styles from '../../assets/styles/Styles';
import StyleContact from '../../assets/styles/ContactStyles';
import Banner from '../../../img/BannerContact.png';
import BGimage from '../../../img/bgSingleFood/singlefoodbg1.jpg';
import Init from '../../assets/Init';

const { buttonMenuHome, touchBtnMenu, HomeButtonWrapper, textHeaderHome, HomeButtonMain } = Styles;
class Contact extends Component {
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
          <Text style={textHeaderHome}>About Us</Text>
          <TouchableOpacity style={HomeButtonWrapper} onPress={() => navigate('Screen_Home')}>
            <FontAwesome name='home' style={HomeButtonMain} />
          </TouchableOpacity>
        </View>
        </View>
    });
  }
  render() {
    const {
      bgImage, bannerStyle, bannerContainer, contentText, title,
      nameCompany, description, infoContainer, rowInfo, faLogo,
      rowContent, nameRow, textRow, contentTextWrap, content
    } = StyleContact;
    const { height } = Init;
    return (
          <Image source={BGimage} style={bgImage}>
          <View style={{ height: height - 70 }}>
          <ScrollView style={content}>
            <View style={bannerContainer}>
              <Image source={Banner} style={bannerStyle} />
            </View>
            <View style={contentText}>
              <View style={contentTextWrap}>
                <Text style={title}>About Us</Text>
                {/*<Text style={nameCompany}>TNTECHS</Text>*/}
                <Text style={description}>
                  The KitchenHero App has been created by a
                  knowledgeable, dedicated and conscientious collaboration
                  with a mission to bring you the ultimate kitchen helper.
                  Arming you with hundereds of step-by-step methods, useful 
                  tips, easy-to-follow hacks, ingredient substitutes and some
                  healthy recipes to get you started. Whether it's a trusted
                  culinary side-kick you need or you want to become your 
                  own KitchenHero, we've got you covered!
                </Text>
              </View>
            </View>
            <View style={infoContainer}>
              <View style={rowInfo}>
                <FontAwesome name='phone' style={faLogo} />
                <View style={rowContent}>
                  <Text style={nameRow}>Phone</Text>
                  <Text style={textRow}>+61410660261</Text>
                </View>
              </View>
              <View style={rowInfo}>
                <FontAwesome name='envelope' style={faLogo} />
                <View style={rowContent}>
                  <Text style={nameRow}>Email</Text>
                  <Text style={textRow}>KitchenHero@mail.com</Text>
                </View>
              </View>
              <View style={rowInfo}>
                <FontAwesome name='globe' style={faLogo} />
                <View style={rowContent}>
                  <Text style={nameRow}>Website</Text>
                  <Text style={textRow}>www.kitchenheroonline.com</Text>
                </View>
              </View>
              <View style={rowInfo}>
                <FontAwesome name='home' style={faLogo} />
                <View style={rowContent}>
                  <Text style={nameRow}>Address</Text>
                  <Text style={textRow}>
                    20 Drumbeat Place, Coomera Waters, Gold Coast, QLD,
                    Australia
                  </Text>
                </View>
              </View>
            </View>
      </ScrollView>
      </View>
          </Image>
    );
  }
}
export default Contact;
