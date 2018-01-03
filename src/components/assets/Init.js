'user trict';
import { Dimensions } from 'react-native';

const { height, width } = Dimensions.get('window');
const charArray = [
  'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q',
  'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
];
module.exports = {
  webUri: 'http://kitchenheroonline.com/apps/wp-content/themes/foodApp/Process-Data-IOS.php',
  webUriUpload: 'http://kitchenheroonline.com/apps/wp-content/themes/foodApp/upLoadIOS.php',
  height,
  width,
  MainColor: '#3ec3d5',
  menuBgColor: '#071623',
  HeaderBgColor: '#43c2d4',
  HeaderBgColorHome: '#31429C',
  newHeaherBgColor: '#707070',
  //newHeaherBgColorHome: '#A9A9A9',
  newHeaherBgColorHome: '#fff',
  bgColorSearchInput: '#525151',
  MainFontSize: 18,
  onSignIn: null,
  role: null,
  charArray,
  textHeaderColor: '#184e55',
  headerTitleSize: width > 767 ? 25 : 22,
  headerTitleSizeHome: width > 320 ? 25 : 20

};
