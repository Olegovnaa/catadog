import React from 'react';
import { FlatList, ActivityIndicator, Text, View  } from 'react-native';
import { ListItem, SearchBar } from 'react-native-elements'

export default class LotsOfBreeds extends React.Component {
state = {
    search: '',
    };

static navigationOptions = {
  title: 'Breeds',
};

  constructor(props){
    super(props);
    this.state ={ isLoading: true}
  }

  getBreeds(url) {
  fetch(url)
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

  componentDidMount(){
    return this.getBreeds('https://api.thedogapi.com/v1/breeds')
  }

  updateSearch = search => {
    this.setState({ search })
    if (search.length < 2) return;
    this.setState({ isLoading: true});
    return this.getBreeds('https://api.thedogapi.com/v1/breeds/search?q=' + search)
  };

  render(){

    if(this.state.isLoading){
      return(
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator/>
        </View>
      )
    }
     return(
         <View >

         <SearchBar
           platform="android"
           placeholder="Search"
           onChangeText={this.updateSearch}
           value={this.state.search}
         />

         <FlatList
           data={this.state.dataSource}
           renderItem={({item}) => <ListItem topDivider={true} bottomDivider={true} onPress={() => this.props.navigation.navigate('Breed', {id: item.id, name: item.name})} title={item.name} subtitle={item.breed_group} chevron={true} titleStyle={{ fontWeight: 'bold' }} leftAvatar={{ source: require('../images/logo.jpg') }}/>}
           keyExtractor={({id}, index) => id.toString()}
         />
         </View>
     );
  }
}
