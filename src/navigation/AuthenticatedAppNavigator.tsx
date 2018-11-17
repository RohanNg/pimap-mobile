import { Facebook } from 'expo'
import * as React from 'react'
import { createStackNavigator, NavigationContainer } from 'react-navigation'

import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'

import { CreateActivity } from '../screens/CreateActivity'
import { Home } from '../screens/Home'
import { MeScreen } from '../screens/MeScreen'
import { NearbyActivities } from '../screens/NearbyActivities'
import { NotificationScreen } from '../screens/NotificationScreen'
import { withAuthenticatedUser } from '../services/AuthService'
import { theme } from '../theme'

import { LocationSelection } from '../screens/LocationSelection'

import { ActivityPage } from '../screens/activity_page/'

export const MainTabNavigator: NavigationContainer = createMaterialBottomTabNavigator(
  {
    Home,
    NearbyActivities: withAuthenticatedUser(NearbyActivities),
    CreateActivity,
    NotificationScreen,
    MeScreen,
    ActivityPage,
  },
  {
    initialRouteName: 'ActivityPage',
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
    labeled: false,
    activeTintColor: theme.colors!.primary,
  },
)

export const AuthenticatedAppNavigator = createStackNavigator(
  {
    authenticatedApp: MainTabNavigator,
    LocationSelection,
  },
  {
    headerMode: 'none',
  },
)
