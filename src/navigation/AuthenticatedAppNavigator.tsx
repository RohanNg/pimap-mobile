import { Facebook } from 'expo'
import * as React from 'react'
import { createStackNavigator, NavigationContainer } from 'react-navigation'

import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'

import { Home } from '../screens/Home'
import { MyActivities } from '../screens/MyActivities'
import { NearbyActivities } from '../screens/NearbyActivities'
import { withAuthenticatedUser } from '../services/AuthService'

import { Chat } from '../components/chat/Chat'

export const AuthenticatedAppNavigator: NavigationContainer = createMaterialBottomTabNavigator(
  {
    Home,
    NearbyActivities: withAuthenticatedUser(NearbyActivities),
    MyActivities,
    Chat,
  },
  {
    initialRouteName: 'Chat',
    shifting: true,
    barStyle: {
      height: 72,
      paddingBottom: 20,
    },
  },
)
