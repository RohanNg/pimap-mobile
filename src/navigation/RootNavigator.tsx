import { createStackNavigator, createSwitchNavigator } from 'react-navigation'

import { AuthLoadingScreen } from '../screens/AuthLoadingScreen'
import { LoginScreen } from '../screens/LoginScreen'
import { AuthenticatedAppNavigator } from './AuthenticatedAppNavigator'
import { AuthenticationNavigator } from './AuthenticationNavigator'
import { UserInfo } from '../screens/UserInfo'
import DetailedScreen from '../screens/DetailedScreen'
import { Home } from '../screens/Home'



export const RootNavigator = createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AuthenticatedAppNavigator,
    Auth: AuthenticationNavigator,
    User: UserInfo,
    Details: DetailedScreen,
    Home: Home,
  },
  {
    initialRouteName: 'AuthLoading',
  },
)
