import React from 'react';
import { Text, View, StyleSheet, processColor } from 'react-native';
import {CandleStickChart} from 'react-native-charts-wrapper';
import update from 'immutability-helper';

export default class MarketScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      data: {
              dataSets: [{
                values: [],
                label: 'AAPL',
                config: {
                  highlightColor: processColor('darkgray'),

                  shadowColor: processColor('black'),
                  shadowWidth: 1,
                  shadowColorSameAsCandle: true,
                  increasingColor: processColor('#71BD6A'),
                  increasingPaintStyle: 'fill',
                  decreasingColor: processColor('#D14B5A')
                },
                xAxis: {},
                yAxis: {}
              }],
            },
    };
  }

  static navigationOptions = {
    tabBarLabel: 'Market',
  };

  componentDidMount() {
      return fetch('https://api.binance.com/api/v1/klines?symbol=BNBBTC&interval=1m')
        .then((response) => response.json())
        .then((responseJson) => {
          this.setState({
            isLoading: false,
          }, function() {
            var values = [];
            for(var i in responseJson) {
                var value = {
                  shadowH: parseFloat(responseJson[i][2]),
                  shadowL: parseFloat(responseJson[i][3]),
                  open: parseFloat(responseJson[i][1]),
                  close: parseFloat(responseJson[i][4]),
                };
                values.push(value);
            }
            var updatedData = update(this.state.data, {
              dataSets: {0: {values: {$set: values}}},
            });

            this.setState({data: updatedData});
          });
        })
        .catch((error) => {
          console.error(error);
        });
    }

  render() {
    if(!this.state.isLoading) {
      return (
        <View style={styles.chartContainer}>
        <CandleStickChart
            style={styles.chart}
            data={this.state.data}
          />
        </View>
      );
    }
    return (
      <Text>Loading...</Text>
    )
  }
}

const styles = StyleSheet.create({
  chartContainer: {
    flex: 0.5,
    backgroundColor: '#F5FCFF'
  },
  chart: {
    flex: 1
  }
});
