'user trict';
import { StyleSheet } from 'react-native';
import { Header } from 'react-navigation';
import Init from '../Init';

const {
  MainFontSize, width, MainColor, height,
  menuBgColor, bgColorSearchInput, textHeaderColor, headerTitleSize, headerTitleSizeHome
} = Init;
const HeightInputSearch = width < 768 ? (width / 7) - 24 : (width / 10) - 24;
const WhiteColor = '#fff';
const menuWidth = (width / 4) * 3;

let textCatButtonSize = 16;
let TitleSize = 14;
if (width > 320 && width < 768) {
  textCatButtonSize = 18;
  TitleSize = 17;
} else if (width > 767) {
  textCatButtonSize = 20;
  TitleSize = 21;
}
const Styles = StyleSheet.create({
  /** main style **/
  mainContainer: {
    backgroundColor: '#fff',
  },
  content: {
    backgroundColor: '#E4EEEC',
  },

  /** header **/
  buttonMenu: {
    textAlign: 'center',
    color: MainColor,
    fontSize: 30,
  },
  buttonMenuHome: {
    textAlign: 'center',
    color: '#2993FB',
    fontSize: 33,
  },
  touchBtnMenu: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    flex: 1
  },
  /** search input **/

  /** Home **/
  SearchWrap: {
    height: HeightInputSearch,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
    marginRight: 10,
    marginLeft: 10,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: bgColorSearchInput,
    borderRadius: 3,
    flexDirection: 'row',
    overflow: 'hidden'
  },
  faSearch: {
    flex: 1,
    backgroundColor: bgColorSearchInput,
    color: WhiteColor,
    fontSize: MainFontSize,
    height: HeightInputSearch,
    lineHeight: HeightInputSearch,
    textAlign: 'center'
  },
  SearchInput: {
    flex: 12,
    fontSize: MainFontSize,
    paddingLeft: 10,
    height: HeightInputSearch,
  },
  /** button home category **/
  buttonHomeWrap: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20
  },
  buttonWrap: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15
  },
  bgCatButtonwrap: {
    paddingLeft: 5,
    paddingRight: 5,
    borderRadius: 5,
    overflow: 'hidden'
  },
  bgCatButton: {
    width: (width / 3) - 12,
    height: (width / 10) + 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    overflow: 'hidden',
    paddingBottom: 3,
    paddingTop: 3
  },
  bgCatButton1: {
    backgroundColor: '#1ab62f'
  },
  bgCatButton3: {
    backgroundColor: '#f6554d'
  },
  bgCatButton2: {
    backgroundColor: '#f1af1d',
    flexDirection: 'row',
  },
  bgCatButtonColor: {
    backgroundColor: 'yellow',
    paddingTop: 1,
    paddingBottom: 3
  },
  /*
  bgCatButtonLeft: {
    marginRight: 7.5
  },
  bgCatButtonRight: {
    marginLeft: 7.5
  },
  */
  textCatButton: {
    backgroundColor: 'transparent',
    color: WhiteColor,
    fontSize: textCatButtonSize,
    textAlign: 'center',
    fontWeight: '700'
  },
  /** button Share socical **/
  containerShare: {
    //width: 25,
    //height: 25,
    position: 'absolute',
    right: 5,
    bottom: 1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
    overflow: 'hidden',
    backgroundColor: 'transparent',
    flexDirection: 'row'
  },
  styleShareIcon: {
    padding: 8,
    marginRight: 3
  },
  styleShareFB: {
    backgroundColor: '#3B5998'
  },
  styleShareGG: {
    backgroundColor: '#F6554D'
  },
  ContentShare: {
    width: 80,
    height: 20,
    position: 'absolute',
    right: 22,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
    borderTopLeftRadius: 3,
    overflow: 'hidden',
    backgroundColor: MainColor,
    flexDirection: 'row',
  },
  activeShare: {
    width: 20,
    height: 20,
    position: 'absolute',
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
    borderTopLeftRadius: 0,
    overflow: 'hidden',
    backgroundColor: MainColor
  },
  btShareContent: {
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  /** content product home **/
  ContentHomeWrap: {
    width: width - 20,
    height: width < 767 ? width / 2.8 : width / 4,
    margin: 10,
    marginTop: 0,
    //marginBottom: 20,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 3,
    overflow: 'hidden',
    flexDirection: 'row',
  },
  HeaderTitle: {
    color: textHeaderColor,
    fontSize: headerTitleSize,
    fontFamily: 'impact',
    fontStyle: 'italic'
  },
  btPlusTouch: {
    //width: 25,
    //height: 25,
    position: 'absolute',
    right: 5,
    top: 5,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
    borderBottomLeftRadius: 5,
    overflow: 'hidden',
    backgroundColor: 'transparent'
  },
  faPlus: {
    fontSize: 24,
    color: '#C95A79'
  },
  faShare: {
    fontSize: 24,
    color: '#1E90FF'
  },
  ImgContentWrap: {
    margin: 5,
    width: (width - 20) / 3,
  },
  ImgContent: {
    width: (width - 20 - 5) / 3,
    height: (width / 2.8) - 10,
    borderRadius: 3,
    overflow: 'hidden'
  },
  TextContent: {
    width: ((width - 20) / 3) * 2,
    paddingLeft: 5,
    paddingRight: 10,
    paddingBottom: 5,
    paddingTop: 5,
  },
  Title: {
    color: '#000000',
    fontWeight: 'bold',
    fontSize: TitleSize,
    lineHeight: 20,
    paddingRight: 30,
  },

  otherbuttonMenuContent: {
    fontSize: 25,
    color: WhiteColor,
  },
  /** seacr result **/
  searchTextContainer: {
    padding: 10
  },
  textSearchWrap: {
    fontSize: width > 320 ? 16 : 14,
  },
  txtSeacrStyle: {
    fontWeight: 'bold',
    color: MainColor,
    fontSize: width > 320 ? 17 : 15
  },
  /** style menu **/
  containerMenu: {
    //backgroundColor: menuBgColor,
  },
  BannerWrap: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40
  },
  mainMenu: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
    backgroundColor: menuBgColor,
    flex: 1
  },
  menuItemWrap: {
    flexDirection: 'row',
    width: menuWidth,
    borderBottomWidth: 1,
    borderBottomColor: '#fff',
    padding: 10,
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  itemFa: {
    paddingRight: 10,
    fontSize: 20,
    color: '#6B7177',
    flex: 1
  },
  itemIcon: {
    width: 20,
    height: 20,
    resizeMode: 'cover'
  },
  itemIconChart: {
    width: 18,
    height: 26,
  },
  itemIconFavorites: {
    width: 24,
    height: 20
  },
  loginIcon: {
    width: 22,
    height: 20,
    resizeMode: 'cover'
  },
  textItemMenu: {
    color: '#6B7177',
    fontSize: 16,
    flex: 8,
    paddingLeft: 10,
    fontWeight: '700'
  },
  itemWrapAtive: {
    backgroundColor: '#081f33'
  },
  itemFaAtive: {
    color: MainColor
  },
  textMenuAtive: {
    color: MainColor
  },
  HomeButton: {
    color: MainColor,
    fontSize: width > 320 ? 30 : 20,
  },

  HomeButtonMain: {
    color: '#2993FB',
    fontSize: 35,
    textAlign: 'center'
  },
  HomeButtonWrapper: {
    marginRight: 10,
    //borderWidth: 1,
    //borderRadius: 7,
    //borderColor: textHeaderColor,
    flex: 1
  },
  socialShareContainer: {
    position: 'absolute',
    bottom: -20,
    width,
    paddingBottom: 20,
    backgroundColor: 'transparent'
  },
  searchScroll: {
    height: height - Header.HEIGHT - 40
  },
  textHeader: {
    fontSize: headerTitleSizeHome,
    fontFamily: 'HarabaraMaisBdIt-HarabaraMaisBdIt',
    fontStyle: 'italic',
    color: MainColor
  },
  textHeaderHome: {
    fontSize: headerTitleSizeHome,
    fontFamily: 'HarabaraMaisBdIt-HarabaraMaisBdIt',
    //fontStyle: 'italic',
    color: '#2C93FB',
    fontWeight: '900',
    textAlign: 'center',
    flex: 8,
  },
  BannerImage: {
    width: 100,
    height: 100
  },
  closeSubmenu: {
    overflow: 'hidden'
  }
});


module.exports = Styles;
