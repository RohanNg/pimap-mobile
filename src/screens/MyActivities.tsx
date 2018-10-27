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

interface MyActivitiesProps {
  navigation: NavigationScreenProp<{}, {}>
}

export class MyActivities extends React.Component<MyActivitiesProps> {
  public static navigationOptions: NavigationBottomTabScreenOptions & {
    tabBarColor: string
  } = {
    title: 'Activities',
    tabBarIcon: tabBarIcon('list'),
    tabBarColor: 'orange',
  }

  public render(): React.ReactNode {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>My Activities</Text>
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
