import * as React from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'

import { YellowBox } from 'react-native'
import { Provider as PaperProvider } from 'react-native-paper'
import { RootNavigator } from './navigation/RootNavigator'
import { AuthStateProvider } from './services/AuthService'

import { theme } from './theme'


import { Provider as MobxProvider } from 'mobx-react'
import { ActivityStore, appStateStore, AppStateStore } from './statestore'

init()

export class App extends React.Component<{}, {}> {
  private activityStore = new ActivityStore()
  constructor(props: {}) {
    super(props)
  }

  public render(): React.ReactElement<{}> {
    return (
      <PaperProvider theme={theme}>
        <MobxProvider {...appStateStore}>
          <AuthStateProvider>
            <RootNavigator />
          </AuthStateProvider>
        </MobxProvider>
      </PaperProvider>
    )
  }
}

function init(): void {
  YellowBox.ignoreWarnings([
    // Warning from react-native-paper Card component
    'You are setting the style `{ elevation: ... }` as a prop',
  ])
}
