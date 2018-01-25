import React from 'react';
import { Text, View, TextInput, Button, AsyncStorage } from 'react-native';

export class APIKeyManagerScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      API: '',
      APItext: '',
      error: '',
    };
    this.getAPI();
  }

  static navigationOptions = {
    header: null,
  }

  render() {

      return (
        <View>
          <Text>
            Type you API key for Binance:
          </Text>
          <TextInput
            style={{height: 40}}
            placeholder="Type here your API key"
            onChangeText={(text) => this.setState({APItext: text})}
          />
          <Button
            onPress={() => this.saveAPI()}
            title="Save"
            color="#841584"
          />
          <Button
            onPress={() => this.props.navigation.navigate('QRCodeScannerScreen')}
            title="Scan QR code"
            color="#841584"
          />
          <Text>Your current API key: {this.state.API}</Text>
          <Text>{this.state.error}</Text>
        </View>
      );
  }

  async saveAPI() {
    try {
      await AsyncStorage.setItem('@CryptoDroid:APIKEY', this.state.APItext);
      this.setState({API: this.state.APItext});
    } catch (error) {
      this.setState({error: 'Error: ' + error})
    }
  }

  async getAPI() {
    try {
      const value = await AsyncStorage.getItem('@CryptoDroid:APIKEY');
      if (value !== null){
        this.setState({API: value});
      }
    } catch (error) {
    }
  }
}
