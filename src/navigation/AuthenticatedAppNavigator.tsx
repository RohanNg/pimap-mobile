/* tslint:disable:max-classes-per-file */
import { Facebook } from 'expo'
import * as React from 'react'
import { createStackNavigator, NavigationContainer } from 'react-navigation'

import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'

import * as firebase from 'firebase'

import { DetailsScreen } from '../screens/DetailedScreen'
import { HomeScreen } from '../screens/HomeScreen'
import { MyActivities } from '../screens/MyActivities'
import { withAuthenticatedUser } from '../services/AuthService'

export const AuthenticatedAppNavigator: NavigationContainer = createMaterialBottomTabNavigator(
  {
    Home: HomeScreen,
    Details: withAuthenticatedUser(DetailsScreen),
    Activities: MyActivities,
  },
  {
    initialRouteName: 'Home',
    shifting: true,
  },
)
