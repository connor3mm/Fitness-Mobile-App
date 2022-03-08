import React from 'react';
import {Button, SafeAreaView, StyleSheet, Text, View} from "react-native";
import styleSheet from "react-native-web/dist/exports/StyleSheet";
import { Pedometer } from 'expo-sensors';

export default class App extends React.Component {
    state = {
      isPedometerAvailable: 'checking',
      pastStepCount: 0,
      currentStepCount: 0,
    };
  
    componentDidMount() {
      this._subscribe();
    }
  
    componentWillUnmount() {
      this._unsubscribe();
    }
  
    _subscribe = () => {
      //Sets the current number of steps in the state
      this._subscription = Pedometer.watchStepCount(result => {
        this.setState({
          currentStepCount: result.steps,
        });
      });
  
      //Checks if the current device has a pedometer
      Pedometer.isAvailableAsync().then(
        result => {
          this.setState({
            isPedometerAvailable: String(result),
          });
        },
        error => {
          this.setState({
            isPedometerAvailable: 'Could not get isPedometerAvailable: ' + error,
          });
        }
      );
  
      //Gets the total number of steps taken in the last 24 hours
      const end = new Date();
      const start = new Date();
      start.setDate(end.getDate() - 1);
      Pedometer.getStepCountAsync(start, end).then(
        result => {
          this.setState({ pastStepCount: result.steps });
        },
        error => {
          this.setState({
            pastStepCount: 'Could not get stepCount: ' + error,
          });
        }
      );
    };
  
    _unsubscribe = () => {
      this._subscription && this._subscription.remove();
      this._subscription = null;
    };
  
    render() {
      return (
        <View style={styles.container}>
          <Text>Pedometer in current device: {this.state.isPedometerAvailable}</Text>
          <Text>Number of steps in the last 24 hours: {this.state.pastStepCount}</Text>
          <Text>Current step count: {this.state.currentStepCount}</Text>
        </View>
      );
    }
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: 15,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });