/* tslint:disable:max-classes-per-file */
import { Facebook } from 'expo'
import * as React from 'react'
import { createStackNavigator } from 'react-navigation'

import * as firebase from 'firebase'

import { DetailsScreen } from '../screens/DetailedScreen'
import { HomeScreen } from '../screens/HomeScreen'
import { withAuthenticatedUser } from '../services/AuthService'

export const AuthenticatedAppNavigator: NavigationContainer = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    Details: {
      screen: withAuthenticatedUser(DetailsScreen),
    },
  },
  {
    initialRouteName: 'Home',
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#f4511e',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  },
)
