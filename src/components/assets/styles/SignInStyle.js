'user trict';
import { StyleSheet } from 'react-native';
import Init from '../Init';

const { height, width, MainColor } = Init;

const WhiteColor = '#fff';

const Styles = StyleSheet.create({
  bgSingleProduct: {
    height,
    width,
    resizeMode: 'cover',
  },
  /** sign in and sign up **/
  contentSignIn: {
    backgroundColor: 'transparent'
  },
  rowMenu: {
    margin: width / 20,
    marginTop: 25,
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'nowrap'
  },
  wrapTitleHeader: {
  },
  titleHeader: {
    color: WhiteColor,
    fontSize: 24,
    fontFamily: 'HarabaraMaisBdIt-HarabaraMaisBdIt',
    fontStyle: 'italic',
  },
  goHomeButton: {
    color: WhiteColor,
    fontSize: 31
  },
  otherbuttonMenuContent: {
    fontSize: 29,
    color: WhiteColor,
  },
  rowLogo: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  Logo: {
    width: 100,
    height: 100
  },
  formLogin: {
    justifyContent: 'center',
    paddingTop: 30,
    alignItems: 'center',
  },
  textFieldWrap: {
    width: (width / 3) * 2,
    marginBottom: 10,
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: WhiteColor,
    flexDirection: 'row'
  },
  faTextField: {
    color: WhiteColor,
    fontSize: width < 768 ? 24 : 30,
    justifyContent: 'center',
    lineHeight: 50,
    flex: 1,
  },
  textField: {
    color: WhiteColor,
    fontSize: 24,
    flex: width < 768 ? 6 : 10,
  },
  buttonfieldwrap: {
    marginTop: 10,
    borderBottomWidth: 0,
    height: 50,
    backgroundColor: 'transparent',
  },
  buttonimg: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: (width / 3) * 2,
    resizeMode: 'contain'
  },
  buttonText: {
    color: WhiteColor,
    fontSize: 24
  },
  loginSocical: {
    width,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10
  },
  btnFbLoginContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10
  },
  btnFbLogin: {
    fontSize: 30,
    color: '#3b7be2'
  },
  ggLoginContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10
  },
  btnGgLogin: {
    fontSize: 30,
    color: '#d63e24'
  },
  stepTitle: {
    color: MainColor,
    fontSize: 20,
    fontWeight: 'bold'
  },
  stepText: {
    color: WhiteColor,
    fontSize: width < 768 ? 16 : 18,
    textAlign: 'left'
  },
  btnSignUp: {
    marginTop: 0
  },
  styleForAuth: {
    height: height - 70
  },
  viewShowKeyboard: {
    height: height / 2,
    width,
    backgroundColor: 'transparent'
  }
});

module.exports = Styles;
