import React, {Component} from 'react';
import {createBottomTabNavigator} from 'react-navigation'
import { Provider} from 'react-redux'
import store from './store/index'
import Home from './component/Home'
import Random from './component/Random'

const AppNavigator = createBottomTabNavigator({
  "Home": {screen: Home},
  "Random": {screen: Random}
})

export default class App extends Component { 
  
  render() {
    return (
        <Provider store={store}>
          <AppNavigator/>
        </Provider>
    );
  }
}
