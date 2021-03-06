import { createStackNavigator, createSwitchNavigator } from 'react-navigation'

import { AuthLoadingScreen } from '../screens/AuthLoadingScreen'
import { AuthenticatedAppNavigator } from './AuthenticatedAppNavigator'
import { AuthenticationNavigator } from './AuthenticationNavigator'

export const RootNavigator = createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AuthenticatedAppNavigator,
    Auth: AuthenticationNavigator,
  },
  {
    initialRouteName: 'AuthLoading',
  },
)
