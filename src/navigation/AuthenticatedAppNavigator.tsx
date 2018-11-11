import { Facebook } from 'expo'
import * as React from 'react'
import { createStackNavigator, NavigationContainer } from 'react-navigation'

import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'

import { Home } from '../screens/Home'
import { MeScreen } from '../screens/MeScreen'
import { MyActivities } from '../screens/MyActivities'
import { NearbyActivities } from '../screens/NearbyActivities'
import { NotificationScreen } from '../screens/NotificationScreen'
import { withAuthenticatedUser } from '../services/AuthService'
import { theme } from '../theme'

export const AuthenticatedAppNavigator: NavigationContainer = createMaterialBottomTabNavigator(
  {
    Home,
    NearbyActivities: withAuthenticatedUser(NearbyActivities),
    MyActivities,
    NotificationScreen,
    MeScreen,
  },
  {
    initialRouteName: 'MyActivities',
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
    activeTintColor: theme.colors!.primary,
  },
)
