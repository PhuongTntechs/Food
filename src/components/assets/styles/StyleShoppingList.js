import { StyleSheet } from 'react-native';
import { Header } from 'react-navigation';
import { width, height } from '../Init';

const heightBg = (width / 640) * 250;
const widthRowItem = (width - 40) / 2;
//const arrayColor = ['#e67b96', '#fd7407', '#3dd8b6', '#b3ff50'];
// random array value
//const colorBox = arrayColor[Math.floor(Math.random() * arrayColor.length)];
const Styles = StyleSheet.create({
  imgbg: {
    width,
    height: heightBg,
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode: 'cover',
    backgroundColor: 'transparent'
  },
  wraptitle: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    width,
    paddingVertical: 5
  },
  textTitle: {
    color: '#fff',
    textAlign: 'left',
    marginLeft: 10,
    fontSize: 20
  },
  inputWrap: {
    height: 50,
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: '#ebebeb',
    flexDirection: 'row',
    padding: 8
  },
  textInput: {
    marginRight: 8,
    flex: 3,
    backgroundColor: '#fff',
    paddingLeft: 5
  },
  addButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 5,
    marginRight: 5
  },
  addButtonDelete: {
    backgroundColor: '#0F0F10',
    borderRadius: 5
  },
  addButtonClear: {
    backgroundColor: '#fffcfc',
    borderRadius: 5
  },
  buttonWrap: {
    height: 50,
    //marginLeft: 10,
    //marginRight: 10,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    padding: 8
  },
  titleItem: {
    fontSize: 18,
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#b3ff50',
    fontFamily: 'Pacifico'
  },
  color1: {
    color: '#fd7407',
    borderBottomWidth: 1,
    borderBottomColor: '#fd7407'
  },
  color2: {
    color: '#b3ff50',
    borderBottomWidth: 1,
    borderBottomColor: '#b3ff50'
  },
  color3: {
    color: '#e67b96',
    borderBottomWidth: 1,
    borderBottomColor: '#e67b96'
  },
  color4: {
    color: '#3dd8b6',
    borderBottomWidth: 1,
    borderBottomColor: '#3dd8b6'
  },
  color5: {
    color: 'pink',
    borderBottomWidth: 1,
    borderBottomColor: 'pink'
  },
  renderContainer: {
    flexDirection: 'row',
    //justifyContent: 'space-around',
    flexWrap: 'wrap',
    paddingBottom: 10
  },
  rowItem: {
    //width: widthRowItem,
    /*
    margin: 10,
    flexWrap: 'wrap',
    justifyContent: 'center'
    */
    paddingHorizontal: 10,
    //flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    alignSelf: 'flex-start',
    justifyContent: 'center'

  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    padding: 20
  },
  modalContainerTest: {
    flex: 1,
    //backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    padding: 20,
    position: 'relative',
    alignItems: 'center'
  },
  modalTouch: {
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    top: 0,
    width,
    height,
    zIndex: 10
  },
  modalWrap: {
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: '#ebebeb',
    padding: 10,
    //position: 'relative',
    zIndex: 15,
  },
  closeModal: {
    padding: 10,
    backgroundColor: '#fc7805',
  },
  rowCheckBox: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 2,
    marginBottom: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#bbb'
  },
  checkBoxStyle: {
    flex: 2
  },
  checkboxText: {
    paddingLeft: 5,
    paddingRight: 5,
    color: '#333',
    fontFamily: 'Avenir',
    flex: 6
  },
  actionWrap: {
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    flex: 3
  },
  faEdit: {
    fontSize: 16,
    color: '#333',
    paddingLeft: 5
  },
  faDel: {
    fontSize: 15.5,
    paddingLeft: 5,
    color: '#ea2e2e'
  },
  rowChildOfItem: {
    marginTop: 5
  },
  wrapScrollView: {
    height: height - (((width / 640) * 250) + Header.HEIGHT)
  },
  scorllShopping: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentScrollShopping: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  contentRow: {
    width: widthRowItem
  }
});
module.exports = Styles;
