import React, { Component } from 'react';
import { AppRegistry, Text, View } from 'react-native';

class Breed extends Component {
  render() {
    return (
      <View style={{alignItems: 'center'}}>
        <Text>{this.props.name}</Text>
      </View>
    );
  }
}

export default class LotsOfBreeds extends Component {
  render() {
    return (
      <View style={{alignItems: 'center', top: 50}}>
        <Breed name='Pug' />
        <Breed name='Beagle' />
        <Breed name='Bulldog' />
        <Breed name='Corgi' />
        <Breed name='Dachshund' />
        <Breed name='Dalmatian' />
        <Breed name='Irish Setter' />

      </View>
    );
  }
}