import { LinearGradient } from 'expo-linear-gradient';
import {SafeAreaView, TextInput, StyleSheet, 
    Text, View, Alert, ScrollView, TouchableOpacity, Image} from "react-native";
import { styles } from '../Screens/Welcomepage';
import { styling } from '../Screens/Homepage';

export default function DashBoard({ navigation }) {

    return (
        <LinearGradient  start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#4356FF', '#3584e4']} locations={[0,0.9]} 
        style={[styling.dashboard, styles.boxShadow]}>

            <View style={{ width: '100%', paddingTop: 50, 
            paddingLeft: 10, flexDirection: 'row', justifyContent: 'space-between'}}>
                
                <TouchableOpacity style={{ alignSelf: 'center', marginLeft: 20,}} onPress={homePressedHandler}>
                    <Image style={BMIstyles.homeButton} source={require('../assets/img/option.png')}/>
                    <Text style={{ color: '#FFF'}}>Menu</Text>
                </TouchableOpacity>

                <Text style={[styling.smallText, BMIstyles.sectionTitle]}>BMI</Text>

                <View style={{flexDirection: 'row', alignSelf: 'flex-start'}}>
                    <Text style={{color: 'white', fontFamily: 'Righteous_400Regular', 
                    alignSelf: 'center', margin: 5, fontSize: 20,}}>Fit<Text style={[styles.blueText]}>Me</Text>
                    </Text>
                    <Image style={styling.logo} source={require('../assets/img/logo.png')}/>
                </View>
            </View>
        </LinearGradient>

    )

}

