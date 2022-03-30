import { Text, View, Image } from "react-native";
import { styling } from "../Screens/Homepage";

export default function FooterLogo() {

    return (
        <View style={{flexDirection: 'row', alignSelf: 'center', position: 'absolute', bottom: 15, }}>
            <Text style={{color: '#4356FF', fontFamily: 'Righteous_400Regular', fontSize: 16,}}>
                FitMe
            </Text>
        <Image style={styling.logo} source={require('../assets/img/logo.png')}/>
       </View>
    )
}




