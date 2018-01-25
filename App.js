import React from 'react';
import { StyleSheet, Text, View, FlatList, Button } from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation';
import { APIKeyManagerScreen } from './screens/APIKeyManagerScreen.js';
import MarketScreen from './screens/MarketScreen.js';
import QRCodeScannerScreen from './screens/QRCodeScannerScreen.js';


class ExchangeChooseScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  static navigationOptions = {
    tabBarLabel: 'Account',
    header: null,
  };

  render() {
    return (
      <FlatList
       data={[{key: 'Binance'}]}
       renderItem={({item}) => <Button title={item.key} onPress={() => this.props.navigation.navigate('APIKeyManagerScreen')}/>}
       />
    );
  }
}

const APIKeyManagerStack = StackNavigator({
  ExchangeChooseScreen: {
    path: 'ExchangeChooseScreen',
    screen: ExchangeChooseScreen,
  },
  APIKeyManagerScreen: {
    path: 'APIKeyManagerScreen',
    screen: APIKeyManagerScreen,
  },
  QRCodeScannerScreen: {
    path: 'QRCodeScannerScreen',
    screen: QRCodeScannerScreen,
  }
});

const TabNav = TabNavigator({
  APIKeyManagerStack: {
    screen: APIKeyManagerStack,
    navigationOptions: {
      title: 'Binance API',
    },
  },
  MarketScreen: {
    screen: MarketScreen,
  },
}, {
  tabBarPosition: 'top',
  animationEnabled: true,
  tabBarOptions: {
    activeTintColor: '#e91e63',
  },
});

export default TabNav;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
