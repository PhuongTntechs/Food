'user trict';
import React, {
  Component,
} from 'react';
import {
  View, TouchableOpacity, Text, Animated, StyleSheet, ScrollView, Image
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Init from '../../assets/Init';
import imageLock from '../../../img/icon_lock.png';

const { width, height } = Init;
class Toggle extends Component {
  constructor(props) {
    super(props);

    this.icons = {
      down: 'plus',
      up: 'minus'
    };

    this.state = {
      title: props.title,
      expanded: false,
      animation: new Animated.Value(),
      positionY: 0,
      currentHeight: null,
      index: props.index
    };
  }
  /*
  componentWillMount() {
    if (this.props.getBgColorPropertyClass) {
      // TODO: Get "weatherData" from somewhere (maybe from this.props.weather ??)
      this.props.getBgColorPropertyClass(this.getPosition(this.state.index));
    }
  }
  getPosition(Y) {
    return Y;
  }
  */
  setMaxHeight(event) {
    if (!this.state.maxHeight) {
      this.setState({
        //maxHeight: event.nativeEvent.layout.height > 300 ? height * 0.75 : 300,
        //currentHeight: event.nativeEvent.layout.height > 300 ? height * 0.75 : event.nativeEvent.layout.height
        maxHeight: height - 220
      });
    }
  }

  setMinHeight(event) {
    if (!this.state.minHeight) {
      this.setState({
        minHeight: event.nativeEvent.layout.height,
        animation: new Animated.Value(event.nativeEvent.layout.height),
        //currentHeight: event.nativeEvent.layout.height
      });
    }
  }

  toggle(evt) {
    // set state positionY when clicked
    /*
    if (this.props.getBgColorPropertyClass) {
      // TODO: Get "weatherData" from somewhere (maybe from this.props.weather ??)
      console.log('current height: ', this.state.index);
      this.props.getBgColorPropertyClass(this.getPosition(this.state.index));
    }*/
    // caculator height view
    if (this.props.lock !== true) {
      const initialValue = this.state.expanded
        ? this.state.maxHeight + this.state.minHeight
        : this.state.minHeight;
  
      const finalValue = this.state.expanded
        ? this.state.minHeight
        : this.state.maxHeight + this.state.minHeight;
  
      // reset expanded state
      this.setState({
        expanded: !this.state.expanded
      });
  
      // set height for animation state
      this.state.animation.setValue(initialValue);
  
      // run
      Animated.spring(
        this.state.animation,
        {
          toValue: finalValue,
          duration: 3000,
        }
      ).start();
    } else {
      alert('You must be signed in');
    }
  }

  render() {
    const {
      container, titleContainer, title, buttonImage, body, activeColor, button, lockFa
    } = styles;

    let icon = this.icons.down;
    let active = '';
    if (this.state.expanded) {
      icon = this.icons.up;
      active = activeColor;
    }
    //console.log('props', this.props);
    return (
      <Animated.View style={[container, { height: this.state.animation }]}>
        <View
          style={titleContainer}
          onLayout={this.setMinHeight.bind(this)}
        >
          <TouchableOpacity
            style={button}
            onPress={evt => {
              if (width > 320) {
                if (this.props.index < this.props.length - 1) {
                  this.props.flatRef.scrollToIndex({ index: this.props.index, animated: true });
                } else {
                  this.props.flatRef.scrollToEnd();
                }
              }
              this.toggle(evt);
            }}
          >
            <FontAwesome style={[buttonImage, active]} name={icon} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={evt => {
              if (width > 320) {
                if (this.props.index < this.props.length - 1) {
                  this.props.flatRef.scrollToIndex({ index: this.props.index, animated: true });
                } else {
                  this.props.flatRef.scrollToEnd();
                }
              }
              this.toggle(evt);
            }}
          >
            <Text style={[title, active]}>{this.state.title}</Text>
          </TouchableOpacity>
          {this.props.lock === true ? <Image source={imageLock} style={{ width: 30, height: 30 }} /> : null}
        </View>
        <View style={body} onLayout={this.setMaxHeight.bind(this)}>
          <View style={{ height: height - 200, backgroundColor: '#fff' }}><ScrollView>{this.props.children}</ScrollView></View>
        </View>
      </Animated.View>
    );
  }
}
const styles = StyleSheet.create({
    container: {
      //backgroundColor: '#fff',
      padding: 5,
      overflow: 'hidden'
    },
    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    title: {
        padding: 10,
        color: '#fff',
        fontWeight: 'bold',
        fontSize: width < 767 ? 16 : 24,
    },
    lockFa: {
      fontSize: 21,
      color: 'red',
      //flex: 1
    },
    button: {
      //flex: 1
    },
    buttonImage: {
      //padding: 10,
      fontSize: 20,
      color: '#fff',
    },
    body: {
      padding: 10,
      backgroundColor: '#fff',
      marginLeft: 5,
      marginRight: 5,
      paddingBottom: 25
    },
    activeColor: {
      color: '#febb05'
    }
});
export default Toggle;
