import * as React from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'

import { RootNavigator } from './navigation/RootNavigator'
import { AuthStateProvider } from './services/AuthService'

interface AppState {
  text: string
}

export class App extends React.Component<{}, AppState> {
  constructor(props: {}) {
    super(props)
  }

  public render(): React.ReactElement<{}> {
    return (
      <AuthStateProvider>
        <RootNavigator />
      </AuthStateProvider>
    )
  }
}
