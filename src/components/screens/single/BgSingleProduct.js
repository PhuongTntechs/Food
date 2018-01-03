'user trict';
import React, {
  Component,
} from 'react';

import {
  StyleSheet, View, Dimensions, Image
} from 'react-native';
import Carousel from 'react-native-snap-carousel';

import SingleFoodBg1 from '../../../img/bgSingleFood/singlefoodbg1.jpg';
import SingleFoodBg2 from '../../../img/bgSingleFood/singlefoodbg2.jpg';
import SingleFoodBg3 from '../../../img/bgSingleFood/singlefoodbg3.jpg';
import SingleFoodBg4 from '../../../img/bgSingleFood/singlefoodbg4.jpg';
import SingleFoodBg5 from '../../../img/bgSingleFood/singlefoodbg5.jpg';
import SingleFoodBg6 from '../../../img/bgSingleFood/singlefoodbg6.jpg';
import SingleFoodBg7 from '../../../img/bgSingleFood/singlefoodbg7.jpg';
import SingleFoodBg8 from '../../../img/bgSingleFood/singlefoodbg8.jpg';
import SingleFoodBg9 from '../../../img/bgSingleFood/singlefoodbg9.jpg';
import SingleFoodBg10 from '../../../img/bgSingleFood/singlefoodbg10.jpg';
import SingleFoodBg11 from '../../../img/bgSingleFood/singlefoodbg11.jpg';
import SingleFoodBg12 from '../../../img/bgSingleFood/singlefoodbg12.jpg';
import SingleFoodBg13 from '../../../img/bgSingleFood/singlefoodbg13.jpg';
import SingleFoodBg14 from '../../../img/bgSingleFood/singlefoodbg14.jpg';

const { width, height } = Dimensions.get('window');
const arrayImgBg = [
  SingleFoodBg1, SingleFoodBg2, SingleFoodBg3, SingleFoodBg4,
  SingleFoodBg5, SingleFoodBg6, SingleFoodBg7, SingleFoodBg8, SingleFoodBg9,
  SingleFoodBg10, SingleFoodBg11, SingleFoodBg12, SingleFoodBg13, SingleFoodBg14
];

class BgSingleProduct extends Component {
  renderContent() {
    const contentData = [];
    const { slide } = styles;
    if (arrayImgBg !== null) {
      arrayImgBg.map((item, i) =>
      contentData.push(
          <Image
            source={item}
            style={slide}
            key={i}
          />
        )
      );
    }
    return contentData;
  }
  render() {
    const { carouselContainer } = styles;
    return (
      <View style={carouselContainer}>
        <Carousel
          sliderWidth={width}
          itemWidth={width}
          slideStyle={{ width }}
          inactiveSlideOpacity={1}
          inactiveSlideScale={1}
          autoplay
          autoplayDelay={1000}
          autoplayInterval={5000}
        >
          {this.renderContent()}
        </Carousel>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  slide: {
    width,
    height,
    //resizeMode: 'cover',
  },
  carouselContainer: {
    zIndex: -1
  }
});
export default BgSingleProduct;
