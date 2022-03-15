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
import backPage from "../Screens/backPage";
import legsPage from "../Screens/legsPage";
import tricepsPage from "../Screens/tricepsPage";
import chestPage from "../Screens/chestPage";
import bicepsCorePage from "../Screens/bicepsCorePage";
import dashboard from "../CustomComponents/dashboard";
import FoodDetails from '../Screens/FoodDetails';


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

    backPage: {
        screen: backPage, 
        navigationOptions: {
            headerShown: false,
        }

    },

    legsPage: {
        screen: legsPage, 
        navigationOptions: {
            headerShown: false,
        }

    },

    tricepsPage: {
        screen: tricepsPage, 
        navigationOptions: {
            headerShown: false,
        }

    },

    chestPage: {
        screen: chestPage, 
        navigationOptions: {
            headerShown: false,
        }

    },

    bicepsCorePage: {
        screen: bicepsCorePage, 
        navigationOptions: {
            headerShown: false,
        }

    },


    dashboard: {
        screen: dashboard, 
        navigationOptions: {
            headerShown: false,
        }
    },


    FoodDetails: {
        screen: FoodDetails, 
        navigationOptions: {
            headerShown: false,
        }
    },

};

export const AppStack = createStackNavigator(screen);
export default createAppContainer(AppStack);