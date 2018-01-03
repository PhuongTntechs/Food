import { StyleSheet } from 'react-native';
import { width, MainColor } from '../Init';

const widthContent = width < 768 ? width - 60 : width - ((width / 10) * 2);
const Styles = StyleSheet.create({
  goPremiumContainer: {
    marginTop: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginLeft: width < 768 ? 30 : width / 10,
    marginRight: width < 768 ? 30 : width / 10,
    width: widthContent,
    borderWidth: 1,
    borderColor: MainColor,
    borderTopWidth: 0,
    marginBottom: 30
  },
  title: {
    justifyContent: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#fb7c14',
    width: widthContent,
    alignItems: 'center'
  },
  textTitle: {
    color: '#fff',
    fontFamily: 'Avenir',
    fontSize: width < 768 ? 28 : 30,
    //fontWeight: 'bold'
  },
  textTitle2: {
    color: '#fff',
    fontFamily: 'Avenir',
    fontSize: width < 768 ? 18 : 22,
    textAlign: 'center',
    fontWeight: '700',
    lineHeight: 20,
    marginTop: 15
  },
  priceContainer: {
    width: widthContent,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: MainColor,
    //backgroundColor: '#4d4c4b',
  },
  textPrice: {
    color: '#fff',
    fontFamily: 'Avenir',
    fontSize: width < 768 ? 40 : 60,
    fontWeight: 'bold'
  },
  textPriceDescription: {
    color: '#4d4c4b',
    fontFamily: 'Avenir',
    fontSize: width < 768 ? 18 : 24,
    textAlign: 'center'
  },
  contentGoPremium: {
    width: widthContent,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10
  },
  rowText: {
    flexDirection: 'row',
    padding: 10,
  },
  faGoPremium: {
    marginRight: 10,
    marginTop: 2,
    flex: 1
  },
  textDescription: {
    fontWeight: 'bold',
    fontSize: width < 768 ? 14 : 18,
    flex: 9
  },
  rowButuon: {
    paddingBottom: 10,
    paddingTop: 10,
    paddingRight: 17,
    paddingLeft: 17,
    marginTop: 10,
    marginBottom: 20,
    backgroundColor: '#F97C2A',
    borderRadius: 3,
    overflow: 'hidden'
  },
  premiumUser: {
    width: widthContent,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
    marginHorizontal: width < 768 ? 30 : width / 10,
  },
  textUserPremium: {
    //color: '#fb7c14'
    fontSize: 20,
    fontWeight: '900'
  },
  containerGoPremium: {
    flex: 1,
    backgroundColor: '#FFF'
  }
});
module.exports = Styles;
