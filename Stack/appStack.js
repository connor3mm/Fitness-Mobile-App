import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import Welcomepage from '../Screens/Welcomepage';
import Homepage from '../Screens/Homepage'

const screen = {
    Welcomepage:{
        screen: Welcomepage
    },
    Homepage:{
        screen: Homepage
    }
}


const AppStack = createStackNavigator(screen);

export default createAppContainer(AppStack);