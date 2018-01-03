'user trict';
import React, {
  Component
} from 'react';
import { View, FlatList } from 'react-native';

import DisplayHTML from 'react-native-display-html';
import SingleProductStyle from '../../assets/styles/SingleProductStyle';
import Loading from '../Main/Loading';
import Toggle from '../Main/Toggle';
import Fetch from '../../assets/api/Fetch';
import Init from '../../assets/Init';

const { width } = Init;
class ContentTipCategoryItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null
    };
    this.refs = {};
  }
  componentWillMount() {
    this.getData();
  }
  componentDidMount() {
    if (this.state.data === null) {
      this.getData();
    }
  }

  getData() {
    const { postID, cat, role } = this.props;
    console.log('value content tip', this.props);
    const value = {
      idCat: postID,
      cat,
      Action: 'getCatTipItem',
      role
    };

    Fetch(value)
    .then((response) => response.json())
    .then((responseJson) => {
      //console.log(responseJson['post_title']);
      this.setState({
        data: responseJson
      });
    })
    .catch(error => {
      console.log(error);
    });
  }

  renderContent(data) {
    const item = data.item;
    const index = data.index;
    //console.log('refs', this.refs);
    if (width === 320) {
      return (
      <Toggle 
        lock={item.lock} 
        title={item.post_title} 
      >
        <DisplayHTML
            htmlString={item.content}
            HTMLStyles={'ol { padding: 15px }'}
        />
      </Toggle>);
    } 
    return (
      <Toggle 
        length={this.state.data.length} 
        index={index} 
        flatRef={this.refs.refflatlist} 
        lock={item.lock} 
        title={item.post_title} 
      >
        <DisplayHTML
            htmlString={item.content}
            HTMLStyles={'ol { padding: 15px }'}
        />
      </Toggle>);
  }
  render() {
    const { contentSingleProduct, productContent } = SingleProductStyle;
    return (
      <View style={productContent}>
      { this.state.data !== null ?
        <FlatList
          style={[contentSingleProduct, { paddingBottom: 10 }]}
          data={this.state.data}
          //keyExtractor={item => item}
          ref='refflatlist'
          renderItem={(item) => this.renderContent(item)}
        />
        : <Loading animating />
      }
    </View>
    );
  }
}

export default ContentTipCategoryItem;
