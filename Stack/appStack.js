import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
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
import ChooseMenBodyShape from "../Screens/ChooseMenBodyShape";
import ChooseWomenBodyShape from "../Screens/ChooseWomenBodyShape";
import backPage from "../Screens/backPage";
import legsPage from "../Screens/legsPage";
import tricepsPage from "../Screens/tricepsPage";
import chestPage from "../Screens/chestPage";
import bicepsCorePage from "../Screens/bicepsCorePage";
import FoodDetails from '../Screens/FoodDetails';
import loginPage from "../Screens/loginPage";
import registerFormPage from "../Screens/registerFormPage";
import registerPage from "../Screens/registerPage";
import AboutPage from '../Screens/AboutPage';


const screen = {
    
    Welcome:{
        screen: Welcomepage,
        navigationOptions: {
            headerShown: false,
        }
    },

    AboutPage:{
        screen: AboutPage,
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

    FoodDetails: {
        screen: FoodDetails, 
        navigationOptions: {
            headerShown: false,
        }
    },

    ChooseMenBodyShape: {
        screen: ChooseMenBodyShape,
        navigationOptions: {
            headerShown: false,
        }
    },

    ChooseWomenBodyShape: {
        screen: ChooseWomenBodyShape,
        navigationOptions: {
            headerShown: false,
        }
    },

    loginPage: {
        screen: loginPage,
        navigationOptions: {
            headerShown: false,
        }
    },

    registerPage: {
        screen: registerPage,
        navigationOptions: {
            headerShown: false,
        }
    },

    registerFormPage: {
        screen: registerFormPage,
        navigationOptions: {
            headerShown: false,
        }
    },

};

export const AppStack = createStackNavigator(screen);
export default createAppContainer(AppStack);