import React, {Component} from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,  
    Modal,
    TextInput,
    Alert,
    PermissionsAndroid,
    Platform,
    ScrollView,
} from "react-native";
import { styles } from './Welcomepage';
import { caloriesStyles } from './CalorieCounterPage';
import {Pedometer} from 'expo-sensors';
import ValidationComponent from 'react-native-form-validator';
import { setttingStyles } from './SettingsPage';

export default class StepCounter extends ValidationComponent {

    state = {
        isPedometerAvailable: 'checking',
        pastStepCount: 0,
        currentStepCount: 0,
        modalVisible: false,
        dailyStepCountGoal: 0,
        dailyGoalReached: false,
        dailyGoalSet: false,
        noPedometerModalVisible: false,
        averageWeeklySteps: 0
    };



    displayModal(show) {
        this.setState({modalVisible: show});
    }

    displayErrorModal(show) {
        this.setState({noPedometerModalVisible: show});
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
        if(this.state.dailyStepCountGoal === 0) {
            alert("No daily goal set. Please set a daily goal if you wish to save it.")
            return
        }

        this.state.dailyGoalSet = true
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
            if (this.state.dailyGoalSet === false) return;
            if (this.state.dailyGoalReached === true) return;
            if (this.state.currentStepCount >= this.state.dailyStepCountGoal) {
                this.state.dailyGoalReached = true
                alert("The daily goal has been reached!");
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

        //Get last 7 days of data to display weekly average
        const endAverage = new Date();
        const startAverage = new Date();
        startAverage.setDate(endAverage.getDate() - 7);
        Pedometer.getStepCountAsync(startAverage, endAverage).then(
            result => {
                this.setState({averageWeeklySteps: Math.round(result.steps / 7)})
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
            <SafeAreaView style={[styles.container, stepStyles.container]}>
                       
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Homepage')} style={{ flexDirection: 'row', alignSelf: 'flex-start'}}>
                    <Image style={{ width: 25, height: 25, marginVertical: 30, marginRight: 10,}} 
                    source={require('../assets/img/angle-left.png')}/>

                    <Text style={{ textDecorationLine: 'underline', alignSelf: 'center', 
                    fontFamily: 'Righteous_400Regular', color: '#424242', fontSize: 16.5,}}>
                        Dashboard
                    </Text>
                </TouchableOpacity>

                <Text style={[caloriesStyles.caloriesItemsText, setttingStyles.title]}>Step Counter</Text>  

                <Modal
                    animationType={"slide"}
                    transparent={false}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        Alert.alert('Modal has now been closed.');
                    }}>
                    <TextInput style={stepStyles.input}
                               underlineColorAndroid="transparent"
                               contextMenuHidden={true}
                               keyboardType='numeric'
                               placeholder="Daily Step Count"
                               placeholderTextColor="#9a73ef"
                               autoCapitalize="none"
                               onChangeText={(dailyStepCountGoal) => {
                                   this.setState({dailyStepCountGoal}, () => {
                                       this.validate({
                                           dailyStepCountGoal: { required: true, minlength: 1, maxlength: 5, numbers: true}
                                       })
                                   })
                               }}/>
                               {this.isFieldInError('dailyStepCountGoal') && this.getErrorsInField('dailyStepCountGoal').map(errorMessage => <Text key={errorMessage}>{errorMessage}</Text>)}


                    <TouchableOpacity
                        style={stepStyles.button}
                        onPress={() => {
                            this.displaySetGoalConfirmation(this.state.dailyStepCountGoal);
                        }}>
                        <Text style={stepStyles.buttonText}>Set Daily Step Goal</Text>
                    </TouchableOpacity>

                    <Text
                        style={stepStyles.closeText}
                        onPress={() => {
                            this.displayModal(!this.state.modalVisible);
                        }}>x</Text>
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
                        style={stepStyles.closeText}
                        onPress={() => {
                            this.displayErrorModal(!this.state.noPedometerModalVisible);
                        }}>Return home</Text>
                </Modal>
                
                <ScrollView  alwaysBounceVertical={true} style={{marginVertical: 5, width: '100%'}}>

                    <View style={[stepStyles.section]}>
                        <Text style={[caloriesStyles.caloriesItemsText, stepStyles.text]}>Number of steps in the last 24 hours</Text>
                        <Text style={[caloriesStyles.caloriesItemsText, {fontSize: 20}]}>{this.state.pastStepCount}
                        <Text style={{ fontSize: 14 }}> Steps</Text>
                        </Text>
                    </View>

                    <View style={[stepStyles.section]}>
                        <Text style={[caloriesStyles.caloriesItemsText, stepStyles.text]}>Current step count</Text>
                        <Text style={[caloriesStyles.caloriesItemsText, {fontSize: 27.5}]}>{this.state.currentStepCount}
                        <Text style={{ fontSize: 14 }}> Steps</Text>
                        </Text>
                        <Image style={{ opacity: .25, width: 75, height: 75,
                        position: 'absolute', top: 45, right: -15, transform: [{ scaleX: -1}] }} 
                            source={require('../assets/img/run.png')}/>
                    </View>

                    <View style={[stepStyles.section, {flexDirection: 'row', justifyContent: 'space-between'}]}>
                        <View>
                            <Text style={[caloriesStyles.caloriesItemsText, stepStyles.text]}>Daily Step Goal</Text>
                            <Text style={[caloriesStyles.caloriesItemsText, {fontSize: 27.5}]}>
                                {this.state.currentStepCount} / <Text style={{fontSize: 20}}>{this.state.dailyStepCountGoal}</Text>
                            </Text> 
                        </View>    

                        <TouchableOpacity style={[styles.button, styles.signup, styles.boxShadow, {margin: 12.5, width: '30%', justifyContent: 'center', alignItems: 'center', borderRadius: 30}]} 
                        onPress={() => {this.displayModal(true);}}>
                        <Text style={[caloriesStyles.caloriesItemsText,stepStyles.buttonText, {fontSize: 15}]}>Set Goal</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={[stepStyles.section]}>
                        <Text style={[caloriesStyles.caloriesItemsText, stepStyles.text]}>Average Weekly Step Count</Text>
                        <Text style={[caloriesStyles.caloriesItemsText, {fontSize: 27.5}]}>{this.state.averageWeeklySteps}
                        <Text style={{ fontSize: 14 }}> Steps</Text>
                        </Text>
                        <Image style={{ opacity: .25, width: 75, height: 75,
                        position: 'absolute', top: 45, right: -15, transform: [{ scaleX: -1}] }} 
                            source={require('../assets/img/run.png')}/>
                    </View>

                </ScrollView>

            </SafeAreaView>
        );
    }
}

export const stepStyles = StyleSheet.create({
    container: {
        backgroundColor: '#f9fbfc',
        padding: 22.5,
    },

    text: {
        marginVertical: 15,
        fontSize: 16.5,
        color: '#424242',
    },

    section: {
        alignSelf: 'center', 
        borderRadius: 10, 
        backgroundColor: '#FFF',
        width: '100%',
        margin: 10,
        shadowOffset: {width: 5, height: 5},
        elevation: 5,
        shadowColor: '#000',
        padding: 15,
        borderEndColor: '#3777D9',
        borderStartColor: '#3777D9',
        borderEndWidth: 1,
        borderStartWidth: 1,
    },

    closeButton: {
        display: 'flex',
        height: 60,
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#3777D9',
        shadowColor: '#3777D9',
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



    closeText: {
        fontSize: 24,
        color: '#00479e',
        textAlign: 'center',
    },

    input: {
        margin: 15,
        marginTop: 50,
        height: 40,
        borderWidth: 0,
        borderColor: '#3777D9',
        borderBottomWidth: 3,
    }
});
