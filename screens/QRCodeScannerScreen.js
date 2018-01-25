'use strict';

import React, { Component } from 'react';

import {
  AppRegistry,
  StyleSheet,
  Text,
  Navigator,
  TouchableOpacity,
  Linking,
  View,
} from 'react-native';

import QRCodeScanner from 'react-native-qrcode-scanner';

export default class QRCodeScannerScreen extends Component {

  static navigationOptions = {
    header: null,
  }

  onSuccess(e) {
    console.log(e);
  }

  render() {
    return (
      <View style={{flex: 1}}>
      <QRCodeScanner
        style={{flex: 1}}
        onRead={this.onSuccess.bind(this)}
        topViewStyle={styles.zeroContainer}
        bottomViewStyle={styles.zeroContainer}
      />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  zeroContainer: {
    height: 0,
    flex: 0,
  },
});
