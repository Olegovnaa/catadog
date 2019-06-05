/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import {createStackNavigator, createAppContainer} from 'react-navigation';
import LotsOfBreeds from './components/Breeds';
import Breed from './components/Breed';

const MainNavigator = createStackNavigator({
  Breeds: {screen: LotsOfBreeds},
  Breed: {screen: Breed},

});

const App = createAppContainer(MainNavigator);

export default App;


