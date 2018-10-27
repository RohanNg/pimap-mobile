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

import * as firebase from 'firebase'
import { tabBarIcon } from '../components/navigation/tabBarIcon'

interface HomeScreenProps {
  navigation: NavigationScreenProp<{}, {}>
}

export class HomeScreen extends React.Component<HomeScreenProps> {
  public static navigationOptions: NavigationBottomTabScreenOptions & {
    tabBarColor: string
  } = {
    title: 'Home',
    tabBarIcon: tabBarIcon('home'),
    tabBarColor: 'blue',
  }

  public render(): React.ReactNode {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Screen</Text>
        <Button
          title="Go to Details"
          onPress={() =>
            this.props.navigation.navigate('Details', {
              itemId: 86,
              otherParam: 'anything you want here',
            })
          }
        />
        <Button
          title="Log out"
          onPress={() => {
            firebase.auth().signOut()
            this.props.navigation.navigate('Login')
          }}
        />
      </View>
    )
  }
}
