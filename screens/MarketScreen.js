import React from 'react';
import { Text, View } from 'react-native';

export default class MarketScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  static navigationOptions = {
    tabBarLabel: 'Market',
  };

  render() {
    return (
      <View>
        <Text>
          Markets
        </Text>
      </View>
    );
  }
}
