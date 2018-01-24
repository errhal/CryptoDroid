import React from 'react';
import { StyleSheet, Text, View, FlatList, Button } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { APIKeyManagerScreen } from './screens/APIKeyManagerScreen.js'


class ExchangeChooseScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <FlatList
       data={[{key: 'Binance'}]}
       renderItem={({item}) => <Button title={item.key} onPress={() => this.props.navigation.navigate('APIKeyManagerScreen')}/>}
       />
    );
  }
}

const ModalStack = StackNavigator({
  ExchangeChooseScreen: {
    path: 'ExchangeChooseScreen',
    screen: ExchangeChooseScreen,
  },
  APIKeyManagerScreen: {
    path: 'APIKeyManagerScreen',
    screen: APIKeyManagerScreen,
  }
});

export default ModalStack;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
