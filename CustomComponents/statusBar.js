import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar} from "react-native";

export default function CustomStatusBar() {

    return (
        <LinearGradient tart={{x: 0, y: 0}} end={{x: 1, y: 0}} 
        colors={['#3777D9', '#649eef']} locations={[0,0.9]}>
                <StatusBar translucent={true} backgroundColor={'transparent'} barStyle='light-content' />
        </LinearGradient >
    )
}




