import React, {Component} from 'react';
import {Platform, StyleSheet} from 'react-native';
import CreateRoom from './component/createRoom'
import GameScreen from './screen/gameScreen'

export default class Example extends Component {
  render() {  
    return (
          <CreateRoom></CreateRoom>
          //<GameScreen></GameScreen>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
