import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import Welcomepage from '../Screens/Welcomepage';
import Homepage from '../Screens/Homepage'
import BMICalculatorPage from '../Screens/BMICalculatorPage'
import GymsNearMePage from '../Screens/GymsNearMePage'
import GoalsAchievementsPage from '../Screens/GoalsAchievementsPage'
import StepCounterPage from '../Screens/StepCounterPage'
import WorkoutsPage from "../Screens/WorkoutsPage";
import CalorieCounterPage from "../Screens/CalorieCounterPage";

const screen = {
    Welcome:{
        screen: Welcomepage
    },
    Homepage:{
        screen: Homepage
    },
    BMICalculatorPage:{
        screen: BMICalculatorPage
    },
    GymsNearMePage:{
        screen: GymsNearMePage
    },
    GoalsAchievementsPage:{
        screen: GoalsAchievementsPage
    },
    StepCounterPage:{
        screen: StepCounterPage
    },
    WorkoutsPage:{
        screen: WorkoutsPage
    },
    CalorieCounterPage:{
        screen: CalorieCounterPage
    },

}


const AppStack = createStackNavigator(screen);

export default createAppContainer(AppStack);