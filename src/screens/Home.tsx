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

import * as firebase from 'firebase'
import { tabBarIcon } from '../components/navigation/tabBarIcon'

interface HomeScreenProps {
  navigation: NavigationScreenProp<{}, {}>
}

export class Home extends React.Component<HomeScreenProps> {
  public static navigationOptions: NavigationBottomTabScreenOptions = {
    title: 'Home',
    tabBarIcon: tabBarIcon('home'),
  }

  public render(): React.ReactNode {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Screen</Text>
        <Button
          title="Log out"
          onPress={async () => {
            await firebase.auth().signOut()
            this.props.navigation.navigate('Login')
          }}
        />
      </View>
    )
  }
}
