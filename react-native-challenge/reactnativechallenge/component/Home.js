/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component, Fragment} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Listrecipes from './Listrecipes'

export default class Home extends Component {

  render () {
    return (
      <Fragment>
        <View style={styles.container}>
          <Text style={styles.welcome}>Resep Mama</Text>
        </View>
        <View style={styles.bodycontainer}>
            <Listrecipes/>
        </View>
      </Fragment>
    )
  } 
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#cddc39',
  },
  bodycontainer: {
    flex: 9,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    fontWeight: "bold",
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
