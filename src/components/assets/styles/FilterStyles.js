import { StyleSheet } from 'react-native';
import { Header } from 'react-navigation';
import {
  width, MainColor, height
} from '../Init';

const Styles = StyleSheet.create({
  textBtn: {
    padding: 5
  },
  textfilter: {
    color: '#F57818',
    fontSize: 20
  },
  textFilterContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: '#EBF3F4',
    paddingTop: 5,
    paddingBottom: 5,
    width
  },
  textBtnActive: {
    backgroundColor: '#fff',
    borderWidth: 0
  },
  rowContainer: {
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 3,
    overflow: 'hidden',
    paddingLeft: 5,
    paddingRight: 5,
    marginBottom: 10,
    marginLeft: 5,
    marginRight: 5,
  },
  rowTitle: {
    color: '#1E90FF',
    fontWeight: 'bold',
    fontSize: 24
  },
  description: {
  },
  listPostContainer: {
    paddingTop: 10,
    height: height - Header.HEIGHT - 80,
    backgroundColor: '#fff'
  },
  listFillter: {
    marginBottom: 20
  },
  styleListView: {
  }
});

module.exports = Styles;
