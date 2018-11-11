import { Constants, Facebook, Location, Permissions } from 'expo'
import * as React from 'react'
import { Alert, Button, Platform, Text, View } from 'react-native'
import {
  createStackNavigator,
  NavigationBottomTabScreenOptions,
  NavigationContainer,
  NavigationScreenConfig,
  NavigationScreenProp,
} from 'react-navigation'

import { tabBarIcon } from '../components/navigation/tabBarIcon'

interface MeScreenProps {
  navigation: NavigationScreenProp<{}, {}>
}

import { Chat } from '../components/chat/Chat'

export class MeScreen extends React.Component<MeScreenProps> {
  public static navigationOptions: NavigationBottomTabScreenOptions = {
    title: 'Me',
    tabBarIcon: tabBarIcon('person'),
  }

  public render(): React.ReactNode {
    return <Chat />
  }
}
