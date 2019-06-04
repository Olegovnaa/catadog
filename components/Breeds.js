import React from 'react';
import { FlatList, ActivityIndicator, Text, View  } from 'react-native';

export default class LotsOfBreeds extends React.Component {

  constructor(props){
    super(props);
    this.state ={ isLoading: true}
  }
  componentDidMount(){
    return fetch('https://api.thedogapi.com/v1/breeds')
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
  render(){

    if(this.state.isLoading){
      return(
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator/>
        </View>
      )
    }
     return(
         <FlatList
           data={this.state.dataSource}
           renderItem={({item}) => <Text>{item.name}</Text>}
           keyExtractor={({id}, index) => id.toString()}
         />
     );
  }
}
