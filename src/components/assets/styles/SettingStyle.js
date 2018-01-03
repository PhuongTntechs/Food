import { StyleSheet } from 'react-native';
import { width, height } from '../../assets/Init';

const textColor = '#4d4d4d';
const borderColor = '#3ec3d5';
const btnlogoutBGColor = '#ff8616';

const Styles = StyleSheet.create({
  contentSettingContainer: {
    padding: 10,
    //height: height - 50,
  },
  // avatar
  avatarContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 20
  },
  avatarImg: {
    height: 100,
    width: 100,
    borderRadius: 50
  },
  fullName: {
    color: textColor,
    fontSize: 18
  },
  fullNameContainer: {
    margin: 5
  },
  // info
  profileContainer: {
    borderTopWidth: 1,
    borderTopColor: borderColor,
  },
  infoContent: {
    paddingTop: 20,
  },
  rowLabel: {
    //justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingBottom: 20,
  },
  labelTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: textColor,
    textDecorationLine: 'underline',
    textDecorationColor: borderColor,
    textDecorationStyle: 'solid',
    paddingBottom: 5,
    lineHeight: 30
  },
  wrapperRowInfo: {
    flexDirection: 'row',
    paddingBottom: 20,
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  textPremium: {
    flex: width < 768 ? 6 : 10,
  },
  faLeft: {
    flex: 1,
    color: textColor,
    fontSize: width < 768 ? 16 : 20,
  },
  faLeftAtive: {
    color: 'yellow',
    fontSize: width < 768 ? 16 : 20,
    flex: 1,
  },
  infoText: {
    flex: width < 768 ? 10 : 13,
    color: textColor,
    fontSize: width < 768 ? 16 : 20
  },
  infoTextMember: {
    color: textColor,
    fontSize: width > 320 ? 20 : 16
  },
  editRowInfo: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  faEdit: {
    fontSize: width < 768 ? 20 : 25,
    color: textColor
  },
  btnUpdate: {
    flex: width < 768 ? 4 : 2,
    backgroundColor: btnlogoutBGColor,
    alignItems: 'center',
    padding: 5,
    borderRadius: 3,
    justifyContent: 'center',
    overflow: 'hidden',
    flexDirection: 'row'
  },
  btnUpdateAtive: {
    backgroundColor: borderColor,
  },
  btnUpdateText: {
    color: '#fff',
    fontSize: width < 768 ? 16 : 18,
    textAlign: 'center'
  },
  btnLogoutContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnLogout: {
    backgroundColor: btnlogoutBGColor,
    padding: 5,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 3,
    overflow: 'hidden'
  },

  // modal style

    /** modal styles **/

    modalContainer: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'center',
      padding: 20,
      zIndex: 10
    },
    modalWrap: {
      borderRadius: 10,
      alignItems: 'center',
      backgroundColor: '#ebebeb',
      padding: 10,
      paddingTop: 15,
      zIndex: 20,
      position: 'relative',
    },
    closeModalContainer: {
      justifyContent: 'flex-end',
      alignItems: 'flex-end',
      backgroundColor: 'transparent',
      position: 'absolute',
      top: 5,
      right: 10,
      zIndex: 10
    },
    closeModal: {
      backgroundColor: 'transparent',
      color: 'red',
      fontSize: 23
    },
    inputWrap: {
      height: 50,
      marginLeft: 10,
      marginRight: 10,
      backgroundColor: '#ebebeb',
      flexDirection: 'row',
      padding: 8,
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
    btnUpdateAvatar: {
      padding: 5,
      paddingLeft: 10,
      paddingRight: 10,
      backgroundColor: 'red'
    }
});

module.exports = Styles;
