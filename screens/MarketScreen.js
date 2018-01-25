import React from 'react';
import { Text, View, StyleSheet, processColor, Picker } from 'react-native';
import {CandleStickChart} from 'react-native-charts-wrapper';
import update from 'immutability-helper';

export default class MarketScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      currency: 'BTCUSDT',
      interval: '1m',
      currencies: ['BTCUSDT', 'ETHUSDT'],
      data: {
              dataSets: [{
                values: [],
                label: 'BTCUSDT',
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
    this.downloadCurrencies();
    this.refreshChart();
  }

  downloadCurrencies() {
    return fetch('https://api.binance.com/api/v1/exchangeInfo')
      .then((response) => response.json())
      .then((responseJson) => {
        let currencies = responseJson.symbols.map(s => {
          return s.symbol;
        });

        this.setState({currencies: currencies});

      })
      .catch((error) => {
        console.error(error);
      });
  }

    refreshChart() {
      return fetch('https://api.binance.com/api/v1/klines?symbol=' + this.state.currency + '&interval=' + this.state.interval)
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
              dataSets: {0: {values: {$set: values}, label: {$set: this.state.currency}}},
            });

            this.setState({data: updatedData});
          });
        })
        .catch((error) => {
          console.error(error);
        });
    }

    applyCurrency(currency) {
      this.setState({currency: currency}, () => this.refreshChart());

    }

    applyInterval(interval) {
      this.setState({interval: interval}, () => this.refreshChart());

    }

  render() {
    if(!this.state.isLoading) {
      let currencies = this.state.currencies.map((s, i) => {
        return <Picker.Item key={s} value={s} label={s} />
      });

      return (
          <View style={styles.chartContainer}>
          <Picker
            style={styles.currencyPicker}
            selectedValue={this.state.currency}
            onValueChange={(itemValue, itemIndex) => this.applyCurrency(itemValue)}>
              {currencies}
          </Picker>
          <Picker
            style={styles.currencyPicker}
            selectedValue={this.state.interval}
            onValueChange={(itemValue, itemIndex) => this.applyInterval(itemValue)}>
              <Picker.Item label="1 minute" value="1m" />
              <Picker.Item label="3 minutes" value="3m" />
              <Picker.Item label="5 minutes" value="5m" />
              <Picker.Item label="15 minutes" value="15m" />
              <Picker.Item label="30 minutes" value="30m" />
              <Picker.Item label="1 hour" value="1h" />
              <Picker.Item label="2 hours" value="2h" />
              <Picker.Item label="4 hours" value="4h" />
              <Picker.Item label="6 hours" value="6h" />
              <Picker.Item label="8 hours" value="8h" />
              <Picker.Item label="12 hours" value="12h" />
              <Picker.Item label="1 day" value="1d" />
              <Picker.Item label="3 days" value="3d" />
              <Picker.Item label="1 week" value="1w" />
              <Picker.Item label="1 month" value="1M" />
          </Picker>
          <CandleStickChart
            style={styles.chart}
            data={this.state.data}
            chartDescription={{text: 'Cryptocurrency Chart'}}
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
    flex: 1,
    backgroundColor: '#F5FCFF'
  },
  chart: {
    flex: 0.5,
  },
  currencyPicker: {
    flex: 0.1,
  },
});
