import * as React from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'

import { Provider as PaperProvider } from 'react-native-paper'
import { RootNavigator } from './navigation/RootNavigator'
import { AuthStateProvider } from './services/AuthService'

import { YellowBox } from 'react-native'
YellowBox.ignoreWarnings([
  // Warning from react-native-paper Card component
  'You are setting the style `{ elevation: ... }` as a prop',
])

import { theme } from './theme'

interface AppState {
  text: string
}

export class App extends React.Component<{}, AppState> {
  constructor(props: {}) {
    super(props)
  }

  public render(): React.ReactElement<{}> {
    return (
      <PaperProvider theme={theme}>
        <AuthStateProvider>
          <RootNavigator />
        </AuthStateProvider>
      </PaperProvider>
    )
  }
}
