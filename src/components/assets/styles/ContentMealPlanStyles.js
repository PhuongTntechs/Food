import { StyleSheet } from 'react-native';
import { width, MainColor, height } from '../Init';


const Styles = StyleSheet.create({
  mainCotent: {
    //backgroundColor: 'red'
  },
  textLabelContainer: {
    height: width < 768 ? 50 : 70,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    //width: ((width - 20) / 5) * 4,
    backgroundColor: '#fff',
    marginRight: 10,
    marginLeft: 20
  },
  textLabelTitle: {
    color: 'transparent',
    borderColor: 'transparent',
    borderWidth: 0,
    borderRadius: 0,
    backgroundColor: 'transparent',
  },
  textLabel: {
    backgroundColor: '#ebebeb',
    borderWidth: 1,
    borderColor: MainColor,
    color: '#222222',
    flex: 1,
    textAlign: 'center',
    borderRadius: 2,
    paddingTop: 8,
    paddingBottom: 8,
    fontSize: width > 320 ? 14 : 12
  },
  rowDay: {
    height: width < 768 ? width / 6 : width / 8,
    //marginBottom: 5,
    borderTopLeftRadius: width / 12,
    borderBottomLeftRadius: width / 12,
    //borderWidth: 1,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    overflow: 'hidden',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: width - 20,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5
  },
  dayLabel: {
    flex: 1,
    paddingLeft: 10,
  },
  textDayLabel: {
    color: '#fff',
    fontSize: width > 450 ? 11 : 10,
    textAlign: 'center',
  },
  dayBoxContent: {
    flex: 1,
    height: width < 768 ? (width / 6) - 4 : (width / 8) - 4,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: MainColor
  },
  textDay: {
    fontSize: 12,
    padding: 5
  },
  rowSunday: {
    backgroundColor: '#f26522',
  },
  rowMonday: {
    backgroundColor: MainColor
  },
  rowTuesday: {
    backgroundColor: '#e23c50'
  },
  rowWennesday: {
    backgroundColor: '#edae45'
  },
  rowThusday: {
    backgroundColor: '#7de1af'
  },
  rowFriday: {
    backgroundColor: '#51bedd'
  },
  RowSaturday: {
    backgroundColor: '#c33acc'
  },

  /** modal styles **/

  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    padding: 20,
    position: 'relative',
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
  modalContainer2: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    padding: 20,
    zIndex: 20
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
    backgroundColor: '#fc7805',
    marginLeft: 5,
    marginRight: 5
  },
  faDel: {
    fontSize: 15.5,
    paddingLeft: 5,
    color: '#ea2e2e'
  },
  faEdit: {
    fontSize: 15.5,
  },
  rowListMeal: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: (width / 3) * 2,
    padding: 3,
    borderBottomWidth: 1,
    borderColor: MainColor,
    marginBottom: 4
  },
  listMealTitle: {
    flex: 5,
    fontSize: 15,
    color: MainColor
  },
  rowListMealAction: {
    flexDirection: 'row',
    flex: 1
  }
});
module.exports = Styles;
