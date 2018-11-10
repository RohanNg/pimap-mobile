import { createStackNavigator, createSwitchNavigator } from 'react-navigation'

import { AuthLoadingScreen } from '../screens/AuthLoadingScreen'
import { LoginScreen } from '../screens/LoginScreen'
import { AuthenticatedAppNavigator } from './AuthenticatedAppNavigator'
import { AuthenticationNavigator } from './AuthenticationNavigator'
<<<<<<< HEAD
=======
import { UserInfo } from '../screens/UserInfo'

>>>>>>> adding new screen for users to enter their hobbies, interests

export const RootNavigator = createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AuthenticatedAppNavigator,
    Auth: AuthenticationNavigator,
<<<<<<< HEAD
=======
    User: UserInfo,
>>>>>>> adding new screen for users to enter their hobbies, interests
  },
  {
    initialRouteName: 'AuthLoading',
  },
)
