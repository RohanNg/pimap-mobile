import { createStackNavigator } from 'react-navigation'

import {
  LoginScreen,
  PasswordRecoveryScreen,
  SignUpScreen,
} from '../screens/login_signup'

export const AuthenticationNavigator = createStackNavigator({
  Login: { screen: LoginScreen },
  SignUp: { screen: SignUpScreen },
  PasswordRecovery: { screen: PasswordRecoveryScreen },
})
