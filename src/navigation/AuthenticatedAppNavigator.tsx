import { Facebook } from 'expo'
import * as React from 'react'
import { createStackNavigator, NavigationContainer } from 'react-navigation'
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'

import { LoadingActivityList } from '../screens/activity_list/LoadingActivitiList'
import { ActivityPage } from '../screens/activity_page'
import { CreateActivity } from '../screens/CreateActivity'
import { HobbyScreen } from '../screens/HobbyScreen'
import { Home } from '../screens/Home'
import { LocationSelection } from '../screens/LocationSelection'
import { MeScreen } from '../screens/MeScreen'
import { NearbyActivities } from '../screens/NearbyActivities'
import { NotificationScreen } from '../screens/NotificationScreen'
import { withAuthenticatedUser } from '../services/AuthService'
import { theme } from '../theme'

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
    initialRouteName: 'Home',
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
    LoadingActivityList,
    HobbyScreen,
  },
  {
    headerMode: 'none',
  },
)
