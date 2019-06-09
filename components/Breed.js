import React, { Component } from 'react';
import { FlatList, View, Image, ActivityIndicator, Text } from 'react-native';
import { ListItem } from 'react-native-elements'
import { SliderBox } from 'react-native-image-slider-box';

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
    return fetch('https://api.thedogapi.com/v1/images/search?limit=5&breed_id=' + id)
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

      const keys = ['bred_for', 'breed_group', 'life_span', 'temperament', 'origin'];
           let fields = []

           keys.forEach(function(key) {
             if (breed[key]) {
               let title = key.charAt(0).toUpperCase() + key.slice(1);
               fields.push({key: title.replace('_', ' '), value: breed[key]});
             }
           })

    let images = [];
    this.state.dataSource.forEach(function(image) {
       images.push(image.url)
    })
    return (

        <View>
          <SliderBox images={images} sliderBoxHeight={300} />
          <FlatList
            data={fields}
            renderItem={({item}) => <ListItem topDivider={true} bottomDivider={true} subtitle={item.value} title={item.key} titleStyle={{ fontWeight: 'bold' }} />}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>


    );
  }
}
