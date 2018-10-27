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

import { withAuthenticatedUser } from '../services/AuthService'

export class DetailsScreen extends React.Component<{
  navigation: NavigationScreenProp<
    {},
    {
      itemId: number
      otherParam: string
    }
  >
  user: firebase.User
}> {
  public static navigationOptions: NavigationScreenConfig<
    NavigationStackScreenOptions
  > = ({ navigation }) => {
    return {
      title: navigation.getParam('otherParam', 'A Nested Details Screen'),
    }
  }

  public render(): React.ReactNode {
    const { navigation, user } = this.props
    user.getIdToken().then(console.info)
    console.info(JSON.stringify(user))
    const itemId = navigation.getParam('itemId', 0)
    const otherParam = navigation.getParam('otherParam', 'some default value')

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Details Screen</Text>
        <Text>itemId: {JSON.stringify(itemId)}</Text>
        <Text>otherParam: {JSON.stringify(otherParam)}</Text>
        <Text>User email: {user.email} </Text>
        <Button
          title="Go to Details... again"
          onPress={() =>
            navigation.push('Details', {
              itemId: Math.floor(Math.random() * 100),
            })
          }
        />
        <Button
          title="Go to Home"
          onPress={() => navigation.navigate('Home')}
        />
        <Button title="Go back" onPress={() => navigation.goBack()} />
        <Button
          title="Update the title"
          onPress={() =>
            this.props.navigation.setParams({ otherParam: 'Titlte Updated!' })
          }
        />
      </View>
    )
  }
}
