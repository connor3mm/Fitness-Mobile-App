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
      this._subscription = Pedometer.watchStepCount(result => {
        this.setState({
          currentStepCount: result.steps,
        });
      });
  
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

// export default function StepCounter() {
//     return(
//         <View style = {StyleSheet.container}>
//             <Text>Step Counter Screen</Text>
//         </View>

//     )
// }