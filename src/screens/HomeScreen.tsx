import { Facebook } from 'expo'
import * as React from 'react'
import { Alert, Button, Text, View } from 'react-native'
import {
  createStackNavigator,
  NavigationContainer,
  NavigationScreenConfig,
  NavigationScreenProp,
  NavigationStackScreenOptions,
} from 'react-navigation'

import * as firebase from 'firebase'

interface HomeScreenProps {
  navigation: NavigationScreenProp<{}, {}>
}

export class HomeScreen extends React.Component<HomeScreenProps> {
  public static navigationOptions: NavigationStackScreenOptions = {
    title: 'Home',
    headerRight: (
      <Button
        onPress={() => alert('This is a button!')}
        title="Info"
        color="#fff"
      />
    ),
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
