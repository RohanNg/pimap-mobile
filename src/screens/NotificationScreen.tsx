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

interface NotificationScreenProps {
  navigation: NavigationScreenProp<{}, {}>
}

import { Chat } from '../components/chat/Chat'

export class NotificationScreen extends React.Component<
  NotificationScreenProps
> {
  public static navigationOptions: NavigationBottomTabScreenOptions = {
    title: 'Noti',
    tabBarIcon: tabBarIcon('message'),
  }

  public render(): React.ReactNode {
    return <Chat />
  }
}
