import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import {
  BarIndicator,
  PacmanIndicator
} from 'react-native-indicators';

export default class Example extends Component {
  render() {
    return (
      <View style={{padding:20,flex:1,alignItems:"center",justifyContent:'center',backgroundColor:'blue',flexDirection:'row'}}>
          <PacmanIndicator color='white' size={150} />
          <BarIndicator color='white' size={100}/>   
      </View>
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
