'user trict';
import React, {
  Component,
} from 'react';

import {
  StyleSheet, View, Image, Text, TouchableOpacity
} from 'react-native';

import Carousel, { Pagination } from 'react-native-snap-carousel';
import Loading from '../Main/Loading';
import Init from '../../assets/Init';
import Fetch from '../../assets/api/Fetch';

const { width } = Init;
const sliderWidth = width;
class Slide extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      dotsLength: 0,
      activeSlide: 0,
      slider1Ref: null
    };
  }

  componentDidMount() {
    console.log('slide ', this.state);
    const value = {
      Action: 'getListSlider',
      cat: 'categoriesslider',
      idUser: this.props.userId
    };
    Fetch(value)
    .then((response) => response.json())
    .then((responseJson) => {
      //console.log(responseJson['post_title']);
      this.setState({
        data: responseJson,
        dotsLength: responseJson.length,
      });
    })
    .catch((error) => {
      console.error(error);
    });
  }

  get pagination() {
    const { dotsLength, activeSlide } = this.state;
    const { stylePagination } = styles;
    return (
      <Pagination
        dotsLength={dotsLength}
        activeDotIndex={activeSlide}
        containerStyle={[stylePagination, { left: (width / 2) - ((16 * dotsLength) / 2) }]}
        dotStyle={{
          width: 14,
          height: 14,
          borderRadius: 7,
          marginHorizontal: 3,
          backgroundColor: '#FF2A1A'
        }}
        inactiveDotStyle={{
          //backgroundColor: 'blue'
          //color: 'red'
        }}
        inactiveDotOpacity={0.2}
        inactiveDotScale={0.9}
      />
    );
  }
  renderContent() {
    const returnData = [];
    const { slide, titleSlide } = styles;
    const { navigation } = this.props;
    if (this.state.data !== null) {
      this.state.data.map((item, i) =>
        returnData.push(
          <TouchableOpacity
            key={i}
            onPress={() => navigation.navigate(
              'Screen_TipCategoryItem',
              {
                postID: item.term_id,
                postTitle: item.name,
                cat: 'categoriesslider',
                role: this.props.role,
                id_user: this.props.userId
              }
            )}
          >
            <Image
              source={{ uri: item.thumbnail_url }}
              style={slide}
            >
              <Text style={titleSlide}>{item.name}</Text>
            </Image>
          </TouchableOpacity>
        )
      );
    }
    return returnData;
  }

  render() {
    return (
      <View style={{ position: 'relative' }}>
        <Carousel
          ref={(carousel) => { this._carousel = carousel; }}
          sliderWidth={sliderWidth}
          itemWidth={width}
          autoplay
          autoplayDelay={1000}
          autoplayInterval={7000}
          onSnapToItem={(index) => this.setState({ activeSlide: index })}
        >
        { this.state.data !== null ?
          this.renderContent()
          :
          <Loading animating />
        }
        </Carousel>
        { this.pagination }
      </View>
    );
  }
}
const styles = StyleSheet.create({
  slide: {
    width,
    height: width / 1.8,
    //resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center'
  },
  titleSlide: {
    color: '#ffffff',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: width < 768 ? 27 : 30,
    backgroundColor: 'transparent',
    textShadowColor: '#000000',
    textShadowOffset: {
      width: 3,
      height: 3
    },
    textShadowRadius: 2,
    /*
    shadowRadius: 5,
    shadowOpacity: 1.0
    */
  },
  stylePagination: {
    backgroundColor: 'transparent', 
    paddingVertical: 3,
    position: 'absolute',
    bottom: 0,
    paddingHorizontal: 0,
    marginHorizontal: 0
  }
});

export default Slide;
