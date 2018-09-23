import * as React from 'react'
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native'

import * as firebase from 'firebase'

import { NavigationScreenProp } from 'react-navigation'

interface AuthLoadingScreenProps {
  navigation: NavigationScreenProp<{}, {}>
}

export class AuthLoadingScreen extends React.Component<AuthLoadingScreenProps> {
  private unsubscribed?: firebase.Unsubscribe

  constructor(props: AuthLoadingScreenProps) {
    super(props)
  }

  public componentWillMount(): void {
    this.unsubscribed = firebase.auth().onAuthStateChanged(user => {
      this.props.navigation.navigate(user ? 'App' : 'Auth')
    })
  }

  public componentWillUnmount(): void {
    if (this.unsubscribed) {
      this.unsubscribed()
    }
  }

  // Render any loading content that you like here
  public render(): React.ReactNode {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    )
  }
}
