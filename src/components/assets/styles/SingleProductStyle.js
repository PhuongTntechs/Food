'user trict';
import { StyleSheet } from 'react-native';
import { Header } from 'react-navigation';
import Init from '../Init';

const { width, height } = Init;

const Styles = StyleSheet.create({
  imgItemProduct: {
    width: (width - 40) / 2,
    height: (width - 40) / 2,
  },
  contentContainerSingleProduct: {
    position: 'absolute',
    zIndex: -1
  },
  scrollProduct: {
    position: 'relative'
  },
  TabWrapProduct: {
    flexDirection: 'row',
    backgroundColor: '#ebebeb',
    width
  },
  contentSingleProduct: {
    backgroundColor: 'transparent'
  },
  TabcontentProduct: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    borderWidth: 1,
    borderColor: 'transparent',
    borderRightColor: '#fff'
  },
  faFavortie: {
    color: '#BF3C61',
    fontSize: 24
  },
  faShare: {
    color: '#1E90FF',
    fontSize: 24
  },
  productContent: {
    //flex: 1,
    backgroundColor: 'transparent',
    height: height - Header.HEIGHT - 60
  },
  rowGalery: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    paddingTop: 10,
    paddingBottom: 10,
  },
  textProduct: {
    padding: 5,
  },
  productContainer: {
    width: (width - 20) / 2,
    shadowColor: '#2E272B',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 10,
    padding: 5,
    backgroundColor: '#fff'
  },
  wrapperScreenSingleFood: {
    position: 'relative',
    backgroundColor: '#fff',
    height,
    width
  },
  bgSingleProduct: {
    width,
    height: height - Header.HEIGHT
  },
  fixScroll: {

  }
});

module.exports = Styles;
