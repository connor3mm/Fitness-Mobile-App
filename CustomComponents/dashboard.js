import { LinearGradient } from 'expo-linear-gradient';
import { Text, View, TouchableOpacity, Image} from "react-native";
import { styles } from '../Screens/Welcomepage';
import { styling } from '../Screens/Homepage';
import { BMIstyles} from '../Screens/BMICalculatorPage';
import { Bottomnavbar } from '../Stack/appStack';
import { NavigationContainer } from '@react-navigation/native';
import { TabRouter } from 'react-navigation';


export default function DashBoard({ navigation }) {

    const homePressedHandler = () => navigation.navigate('Homepage');

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

