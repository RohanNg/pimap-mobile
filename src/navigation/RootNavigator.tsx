import { createStackNavigator, createSwitchNavigator } from 'react-navigation'

import { AuthLoadingScreen } from '../screens/AuthLoadingScreen'
import { LoginScreen } from '../screens/LoginScreen'
import { AuthenticatedAppNavigator } from './AuthenticatedAppNavigator'
import { AuthenticationNavigator } from './AuthenticationNavigator'
import { HobbyScreen } from '../screens/HobbyScreen'

export const RootNavigator = createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AuthenticatedAppNavigator,
    Auth: AuthenticationNavigator,
    Hobby: HobbyScreen,
  },
  {
    initialRouteName: 'AuthLoading',
  },
)
