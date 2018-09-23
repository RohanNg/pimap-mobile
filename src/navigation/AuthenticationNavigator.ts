import { createStackNavigator } from 'react-navigation'

import { LoginScreen } from '../screens/LoginScreen'
import { PasswordRecoveryScreen } from '../screens/PasswordRecovery'
import { SignUpScreen } from '../screens/SignUpScreen'

export const AuthenticationNavigator = createStackNavigator({
  Login: { screen: LoginScreen },
  SignUp: { screen: SignUpScreen },
  PasswordRecovery: { screen: PasswordRecoveryScreen },
})
