import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Home } from '../Screens/Home';
import { Register } from '../Screens/Register';
import { Details } from '../Screens/Details';


const { Navigator , Screen } = createNativeStackNavigator();


export const AppRoutes = () => {
    return(
        <Navigator screenOptions={{ headerShown: false}}>
            <Screen name='Home' component={Home} />
            <Screen name='New' component={Register} />
            <Screen name='Details' component={Details} />
        </Navigator>
    )
}