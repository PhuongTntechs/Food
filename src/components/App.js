import React, { Component } from 'react';
import { SideMenu } from './Router';

//import { Provider } from 'react-redux';


//import store from './redux/Store';

console.disableYellowBox = true;
class App extends Component {
  render() {
    return (
      <SideMenu style={{ backgroundColor: 'transparent' }} />
    );
  }
}

export default App;
