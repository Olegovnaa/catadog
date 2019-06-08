import React, { Component } from 'react';
import { View, Image, ActivityIndicator, Text } from 'react-native';

export default class Breed extends Component {
 static navigationOptions = ({ navigation }) => {
   return {
     title: navigation.getParam('name'),
   };
 };

  constructor(props){
    super(props);
    this.state ={ isLoading: true}
  }

  componentDidMount(){
   const id = this.props.navigation.getParam('id');
    return fetch('https://api.thedogapi.com/v1/images/search?breed_id=' + id)
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          isLoading: false,
          dataSource: responseJson,
        }, function(){

        });

      })
      .catch((error) =>{
        console.error(error);
      });
  }
  render() {

  if(this.state.isLoading){
        return(
          <View style={{flex: 1, padding: 20}}>
            <ActivityIndicator/>
          </View>
        )
      }
      const breedData = this.state.dataSource['0'];
      const breed = breedData.breeds['0'];
    let pic = {
      uri: breedData.url
    };
    return (

        <View>
          <Image source={pic} style={{height: 300}}/>
          {breed.bred_for && <Text>Breed for: {breed.bred_for}</Text>}
          {breed.breed_group && <Text>Breed group: {breed.breed_group}</Text>}
          {breed.life_span && <Text>Life span: {breed.life_span}</Text>}
          {breed.temperament && <Text>Temperament: {breed.temperament}</Text>}
          {breed.origin && <Text>Origin: {breed.origin}</Text>}
        </View>


    );
  }
}
