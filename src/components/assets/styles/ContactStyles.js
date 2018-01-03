import { StyleSheet } from 'react-native';
import { width, height } from '../Init';

const Styles = StyleSheet.create({
  bgImage: {
    resizeMode: 'cover',
  },
  content: {
    backgroundColor: 'transparent',
    height: height - 70
  },
  bannerContainer: {
    width,
    justifyContent: 'center',
    alignItems: 'center'
  },
  bannerStyle: {
    width,
    height: (width / 640) * 245,
  },
  contentText: {
    width,
    paddingTop: 10,
    paddingBottom: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  contentTextWrap: {
    backgroundColor: '#ff8212',
    width: width - 10,
    marginLeft: 5,
    marginRight: 5,
    padding: 7,
  },
  title: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20
  },
  nameCompany: {
    textAlign: 'center',
    fontSize: 16,
    color: '#fff',
    paddingTop: 5,
    paddingBottom: 5
  },
  description: {
    color: '#fff',
    lineHeight: 20
  },
  infoContainer: {
    width: width - 10,
    marginLeft: 5,
    marginRight: 5,
    backgroundColor: '#00aeef',
  },
  rowInfo: {
    backgroundColor: '#00aeef',
    paddingLeft: 7,
    paddingRight: 7,
    paddingTop: 5,
    paddingBottom: 5,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#6dcff6',
    alignItems: 'center',
    flex: 1
  },
  faLogo: {
    fontSize: 20,
    paddingRight: 10,
    color: '#fff',
    flex: 1
  },
  nameRow: {
    color: '#fff',
    fontSize: width > 320 ? 16 : 14
  },
  textRow: {
    color: '#444444',
    fontSize: width > 320 ? 14 : 12,
    textAlign: 'left'
  },
  rowContent: {
    flex: 12
  }
});
module.exports = Styles;
