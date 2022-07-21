import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { SignUp } from '../Screens/SignUp';
import { SignIn } from '../Screens/SignIn';


const { Navigator , Screen } = createNativeStackNavigator();


export const AppLogRoutes = () => {
    return(
        <Navigator screenOptions={{ headerShown: false}}>
            <Screen name='signin' component={SignIn} />
            <Screen name='signup' component={SignUp} />
        </Navigator>
    )
}