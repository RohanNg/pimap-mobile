import { Facebook } from 'expo'
import * as React from 'react'
import { Alert, Button, Text, View } from 'react-native'
import {
  createStackNavigator,
  NavigationBottomTabScreenOptions,
  NavigationContainer,
  NavigationScreenConfig,
  NavigationScreenProp,
} from 'react-navigation'

import { tabBarIcon } from '../components/navigation/tabBarIcon'
import { withAuthenticatedUser } from '../services/AuthService'

export class NearbyActivities extends React.Component<{
  navigation: NavigationScreenProp<{}, {}>
  user: firebase.User
}> {
  public static navigationOptions: NavigationBottomTabScreenOptions = {
    title: 'Near By',
    tabBarIcon: tabBarIcon('near-me'),
  }

  public render(): React.ReactNode {
    const { navigation, user } = this.props
    user.getIdToken().then(console.info)
    console.info(JSON.stringify(user))

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Details Screen</Text>
        <Text>User email: {user.email} </Text>
        <Button
          title="Go to Home"
          onPress={() => navigation.navigate('Home')}
        />
        <Button title="Go back" onPress={() => navigation.goBack()} />
      </View>
    )
  }
}
