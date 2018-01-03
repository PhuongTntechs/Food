'user trict';
import { StyleSheet } from 'react-native';
import { Header } from 'react-navigation';
import Init from '../Init';

const { width, MainColor, height } = Init;
const productWidth = (width - 20) / 2;
const productHeight = (productWidth / 285) * 200;

const Styles = StyleSheet.create({
  contentFavorites: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#E4EEEC'
  },
  productContainer: {
    width: productWidth,
    shadowColor: '#2E272B',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 10,
    paddingTop: 5,
    paddingBottom: 5,
    //justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  productImage: {
    width: productWidth,
    height: productHeight,
    marginBottom: 5
  },
  /** Favorites **/
  favoritesContainer: {
    backgroundColor: '#ebf3f4',
    height: height - Header.HEIGHT
    //flex: 1
  },
  productName: {
    color: '#333',
    fontFamily: 'Avenir',
    //marginVertical: 5,
    textAlign: 'center',
  },
  productAuthor: {
    marginBottom: 5,
    color: MainColor,
    fontFamily: 'Avenir',
  },
  faDelete: {
    fontSize: 16,
    color: '#C75B7A'
  },
  txtContainer: {
    flexDirection: 'row',
    paddingLeft: 5,
    paddingRight: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  titleContainer: {
    flex: 3
  },
  textTitleCat: {
    fontSize: width < 767 ? 14 : 18
  },
  containerLock: {
    width: productWidth,
    height: productHeight + 10,
    position: 'absolute',
    zIndex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  lockFA: {
    fontSize: 45,
    backgroundColor: 'transparent',
    color: 'red'
  }
});

module.exports = Styles;
