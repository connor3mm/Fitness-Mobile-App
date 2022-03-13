import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Welcomepage from '../Screens/Welcomepage';
import Homepage from '../Screens/Homepage';
import BMICalculatorPage from '../Screens/BMICalculatorPage';
import GymsNearMePage from '../Screens/GymsNearMePage';
import GoalsAchievementsPage from '../Screens/GoalsAchievementsPage';
import StepCounterPage from '../Screens/StepCounterPage';
import WorkoutsPage from "../Screens/WorkoutsPage";
import CalorieCounterPage from "../Screens/CalorieCounterPage";
import ProfilePage from "../Screens/ProfilePage";
import SettingsPage from "../Screens/SettingsPage";
import atHomeWorkoutPage from "../Screens/atHomeWorkoutPage";

const screen = {
    
    Welcome:{
        screen: Welcomepage,
        navigationOptions: {
            headerShown: false,
        }
    },

    Homepage:{
        screen: Homepage,
        navigationOptions: {
            headerShown: false,
        }
    },

    BMICalculatorPage:{
        screen: BMICalculatorPage,
        navigationOptions: {
            headerShown: false,
        }
    },

    GymsNearMePage:{
        screen: GymsNearMePage,
        navigationOptions: {
            headerShown: false,
        }
    },

    GoalsAchievementsPage:{
        screen: GoalsAchievementsPage,
        navigationOptions: {
            headerShown: false,
        }
    },

    StepCounterPage:{
        screen: StepCounterPage,
        navigationOptions: {
            headerShown: false,
        }
    },

    WorkoutsPage:{
        screen: WorkoutsPage,
        navigationOptions: {
            headerShown: false,
        }
    },

    CalorieCounterPage:{
        screen: CalorieCounterPage,
        navigationOptions: {
            headerShown: false,
        }
    },

    SettingsPage: {
        screen: SettingsPage, 
        navigationOptions: {
            headerShown: false,
        }

    },

    ProfilePage: {
        screen: ProfilePage, 
        navigationOptions: {
            headerShown: false,
        }

    },

    atHomeWorkoutPage: {
        screen: atHomeWorkoutPage, 
        navigationOptions: {
            headerShown: false,
        }

    },
};

export const AppStack = createStackNavigator(screen);
const nav = createBottomTabNavigator();

// export const Bottomnavbar = function bottomNavBar() {
//     return ( 
//         <NavigationContainer>          
//             <nav.Navigator >
//                 <nav.Screen name="Home" component={Homepage}/>
//                 <nav.Screen name="Yahallo" component={Welcomepage}/>
//             </nav.Navigator>
//         </NavigationContainer>
//     );
// };



export default createAppContainer(AppStack);