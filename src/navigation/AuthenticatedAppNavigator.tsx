import { Facebook } from 'expo'
import * as React from 'react'
import { createStackNavigator, NavigationContainer } from 'react-navigation'

import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'

import { Home } from '../screens/Home'
import { MyActivities } from '../screens/MyActivities'
import { NearbyActivities } from '../screens/NearbyActivities'
import { withAuthenticatedUser } from '../services/AuthService'

import { MeScreen } from '../screens/MeScreen'
import { NotificationScreen } from '../screens/NotificationScreen'

export const AuthenticatedAppNavigator: NavigationContainer = createMaterialBottomTabNavigator(
  {
    Home,
    NearbyActivities: withAuthenticatedUser(NearbyActivities),
    MyActivities,
    NotificationScreen,
    MeScreen,
  },
  {
    initialRouteName: 'NotificationScreen',
    shifting: false,
    barStyle: {
      backgroundColor: 'white',
      borderColor: 'black',
      borderWidth: 1,
      borderRadius: 4,
      marginBottom: 2,
      marginLeft: 2,
      marginRight: 2,
      // TODO: add card style
    },
    activeTintColor: '#F27979',
  },
)
