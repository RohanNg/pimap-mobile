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

import { ActivityPage } from '../screens/activity_page'
import { LocationSelection } from '../screens/LocationSelection'

const AuthedNearbyActivities = withAuthenticatedUser(NearbyActivities)
const AuthedCreateActivity = withAuthenticatedUser(CreateActivity)
export const MainTabNavigator: NavigationContainer = createMaterialBottomTabNavigator(
  {
    Home,
    NearbyActivities: AuthedNearbyActivities,
    CreateActivity: AuthedCreateActivity,
    NotificationScreen,
    MeScreen,
  },
  {
    initialRouteName: 'CreateActivity',
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
    ActivityPage,
  },
  {
    headerMode: 'none',
  },
)
