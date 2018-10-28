/* tslint:disable:max-classes-per-file */
import { Facebook } from 'expo'
import * as React from 'react'
import { createStackNavigator, NavigationContainer } from 'react-navigation'

import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'

import * as firebase from 'firebase'

import { AutoCompleteTest } from '../screens/AutoCompleteTest'
import { Home } from '../screens/Home'
import { MyActivities } from '../screens/MyActivities'
import { NearbyActivities } from '../screens/NearbyActivities'
import { withAuthenticatedUser } from '../services/AuthService'

export const AuthenticatedAppNavigator: NavigationContainer = createMaterialBottomTabNavigator(
  {
    AutoCompleteTest,
    Home,
    NearbyActivities: withAuthenticatedUser(NearbyActivities),
    MyActivities,
  },
  {
    initialRouteName: 'AutoCompleteTest',
    shifting: true,
    barStyle: {
      height: 72,
      paddingBottom: 20,
    },
  },
)
