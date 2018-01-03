import { StyleSheet } from 'react-native';
import { width, height, MainColor } from '../Init';


const Styles = StyleSheet.create({
  wrapperScreen: {
    backgroundColor: '#fff',
    height,
    width,
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalPicker: {
    height: height / 2,
    position: 'absolute',
    zIndex: 1,
    bottom: 0,
    width,
    backgroundColor: '#fff'
  },
  closeButtonContainer: {
   flexDirection: 'row',
    justifyContent: 'flex-end',
    borderTopColor: '#e2e2e2',
    borderTopWidth: 1,
    borderBottomColor: '#e2e2e2',
    borderBottomWidth: 1
  },
  closeButton: {
   paddingRight: 10,
    paddingTop: 10,
    paddingBottom: 10
  },
  closeButtonText: {
   color: '#027afe'
  },
  pickerContainer: {
    flexDirection: 'row'
  },
  PickerIOS: {
    flex: 1,
  },
  formContainer: {
    flexDirection: 'row',
    height: width / 9,
    backgroundColor: '#ebebeb'
  },
  formGroup: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  formGroupButton: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  textLabel: {
    paddingRight: 10,
    paddingLeft: 10,
    color: '#9e9e9e',
    fontSize: width > 320 ? 14 : 12
  },
  textData: {
    padding: 3,
    borderWidth: 1,
    color: '#9e9e9e',
    paddingRight: 7,
    paddingLeft: 7,
    borderColor: MainColor,
    borderRadius: 3
  },
  addButton: {
    flex: 1,
    backgroundColor: '#f26522',
    marginLeft: 2,
    marginRight: 2,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 3,
  },
  textButton: {
    color: '#fff',
    fontSize: width > 320 ? 12 : 11
  },
  inputWrap: {
    //flexDirection: 'column',

  }
});
module.exports = Styles;
