import { Unsubscribe, User } from 'firebase'
import hoistNonReactStatics from 'hoist-non-react-statics'
import * as React from 'react'
import { AsyncStorage, Button, Text, View } from 'react-native'
import { NavigationInjectedProps, withNavigation } from 'react-navigation'

import { app } from './FireBase'

const { Consumer, Provider } = React.createContext<null | User>(null)

interface AuthStateState {
  user: User | null
}

export class AuthStateProvider extends React.Component<{}, AuthStateState> {
  private unsubscribed?: Unsubscribe

  public state: AuthStateState = {
    user: null,
  }

  public componentDidMount(): void {
    this.unsubscribed = app
      .auth()
      .onAuthStateChanged(user => this.setState({ user }))
  }

  public componentWillMount(): void {
    if (this.unsubscribed) {
      this.unsubscribed()
    }
  }

  public render(): React.ReactNode {
    return <Provider value={this.state.user}>{this.props.children}</Provider>
  }
}

export function withAuthenticatedUser<P>(
  Component: React.ComponentType<P & { user: User }>,
): React.ComponentType<P> {
  const Inner: React.SFC<NavigationInjectedProps & P> = props => {
    return (
      <Consumer>
        {user => {
          if (!user) {
            return (
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Text>You need to sign in!</Text>
                <Button
                  title="Go to Log In"
                  onPress={() => {
                    props.navigation.navigate('Login')
                  }}
                />
              </View>
            )
          }

          return <Component {...props} user={user} />
        }}
      </Consumer>
    )
  }

  return hoistNonReactStatics(withNavigation(Inner), Component)
}
