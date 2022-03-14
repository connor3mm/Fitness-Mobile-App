import React, {Component} from 'react';
import {
    Button,
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    Modal,
    TextInput,
    Alert
} from "react-native";
import styleSheet from "react-native-web/dist/exports/StyleSheet";
import {Pedometer} from 'expo-sensors';
import ValidationComponent from 'react-native-form-validator';

export default class StepCounter extends ValidationComponent {
    state = {
        isPedometerAvailable: 'checking',
        pastStepCount: 0,
        currentStepCount: 0,
        modalVisible: false,
        dailyStepCountGoal: 0,
        dailyGoalReached: false,
        dailyGoalSet: false,
        noPedometerModalVisible: false
    };

    displayModal(show) {
        this.setState({modalVisible: show})
    }

    displayErrorModal(show) {
        this.setState({noPedometerModalVisible: show})
    }

    componentDidMount() {
        this._subscribe();
    }

    componentWillUnmount() {
        this._unsubscribe();
    }

    setDailyStepCount = (text) => {
        this.setState({ dailyStepCountGoal: text})
    }

    displaySetGoalConfirmation(dailyStepCountGoal) {
        alert("Daily step goal set to " + dailyStepCountGoal + " steps a day!")
    }

    _subscribe = () => {
        //Check for pedometer permissions
        Pedometer.getPermissionsAsync().then(
            result => {
                if(!result.granted) {
                    Pedometer.requestPermissionsAsync()
                }
            },
            error => {
                Alert.alert("Something went wrong when getting permissions: " + error)
            }
        )

        //Sets the current number of steps in the state
        this._subscription = Pedometer.watchStepCount(result => {
            this.setState({
                currentStepCount: result.steps,
            });

            //Checks if the daily goal is set and if it is then checks if it has been reached and notifies the user.
            if (this.state.dailyGoalSet === false) return
            if (this.state.dailyGoalReached === true) return
            if (this.state.currentStepCount >= this.state.dailyStepCountGoal) {
                this.state.dailyGoalReached = true
                alert("The daily goal has been reached!")
            }
        });

        //Checks if the current device has a pedometer
        Pedometer.isAvailableAsync().then(
            result => {
                //If the pedometer is not available, show error
                if(!result) {
                    this.displayErrorModal(true);
                }

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
                this.setState({pastStepCount: result.steps});
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
            <SafeAreaView style={styles.container}>
                
                <DashBoard/>

                <Modal
                    animationType={"slide"}
                    transparent={false}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        Alert.alert('Modal has now been closed.');
                    }}>
                    <TextInput style={styles.input}
                               underlineColorAndroid="transparent"
                               keyboardType='numeric'
                               placeholder="Daily Step Count"
                               placeholderTextColor="#9a73ef"
                               autoCapitalize="none"
                               onChangeText={(dailyStepCountGoal) => {
                                   this.setState({dailyStepCountGoal}, () => {
                                       this.validate({
                                           dailyStepCountGoal: { required: true, minlength: 1, maxlength: 5}
                                       })
                                   })
                               }}/>
                               {this.isFieldInError('dailyStepCountGoal') && this.getErrorsInField('dailyStepCountGoal').map(errorMessage => <Text key={errorMessage}>{errorMessage}</Text>)}


                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => {
                            this.displaySetGoalConfirmation(this.state.dailyStepCountGoal);
                        }}>
                        <Text style={styles.buttonText}>Set Daily Step Goal</Text>
                    </TouchableOpacity>

                    <Text
                        style={styles.closeText}
                        onPress={() => {
                            this.displayModal(!this.state.modalVisible);
                        }}>Return home</Text>
                </Modal>

                <Modal
                    animationType={"slide"}
                    transparent={false}
                    visible={this.state.noPedometerModalVisible}
                    onRequestClose={() => {
                        Alert.alert('Modal has now been closed.');
                    }}>

                    <Text>This device does not have a Pedometer. This functionality is unavailable.</Text>

                    <Text
                        style={styles.closeText}
                        onPress={() => {
                            //
                            this.displayErrorModal(!this.state.noPedometerModalVisible);
                        }}>Return home</Text>
                </Modal>

                <Text>Number of steps in the last 24 hours: {this.state.pastStepCount}</Text>
                <Text>Current step count: {this.state.currentStepCount}</Text>
                <Text>Daily Step Goal: {this.state.currentStepCount} / {this.state.dailyStepCountGoal}</Text>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        this.displayModal(true);
                    }}>
                    <Text style={styles.buttonText}>Set Daily Step Goal</Text>
                </TouchableOpacity>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 25,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    button: {
        display: 'flex',
        height: 60,
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        backgroundColor: '#4356FF',
        shadowColor: '#4356FF',
        shadowOpacity: 0.5,
        shadowOffset: {
            height: 10,
            width: 0
        },
        shadowRadius: 25,
    },
    closeButton: {
        display: 'flex',
        height: 60,
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#4356FF',
        shadowColor: '#4356FF',
        shadowOpacity: 0.5,
        shadowOffset: {
            height: 10,
            width: 0
        },
        shadowRadius: 25,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 22,
    },
    image: {
        marginTop: 150,
        marginBottom: 10,
        width: '100%',
        height: 350,
    },
    text: {
        fontSize: 24,
        marginBottom: 30,
        padding: 40,
    },
    closeText: {
        fontSize: 24,
        color: '#00479e',
        textAlign: 'center',
    },
    input: {
        margin: 15,
        height: 40,
        borderColor: '#4356FF',
        borderWidth: 1
    }
});
