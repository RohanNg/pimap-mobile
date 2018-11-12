import { createStackNavigator, createSwitchNavigator } from 'react-navigation'
import { AuthenticatedAppNavigator } from './AuthenticatedAppNavigator'


import DetailedScreen from '../screens/DetailedScreen'

export const RootNavigator = createStackNavigator(
  {
    App: AuthenticatedAppNavigator,
    Details: DetailedScreen,

  },
  {
    initialRouteName: 'App',
  },
)