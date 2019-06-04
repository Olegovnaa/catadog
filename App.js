/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { AppRegistry, Text, View } from 'react-native';
import LotsOfBreeds from './components/Breeds';

export default class App extends Component {
  render() {
    return (
      <View style={{alignItems: 'center'}}>
           <LotsOfBreeds />
      </View>
    );
  }
}



