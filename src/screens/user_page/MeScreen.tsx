import * as React from 'react'

import { tabBarIcon } from '../../components/navigation/tabBarIcon'
import { withAuthenticatedUser } from '../../services/AuthService'
import { UserScreen } from './UserScreen'

import {
  NavigationBottomTabScreenOptions,
  NavigationScreenProp,
} from 'react-navigation'

interface MeScreenProps {
  navigation: NavigationScreenProp<{}, {}>
  user: firebase.User
}
export class MeScreen extends React.Component<MeScreenProps, {}> {
  public static navigationOptions: NavigationBottomTabScreenOptions = {
    title: 'Me',
    tabBarIcon: tabBarIcon('person'),
  }

  public render(): React.ReactNode {
    const { navigation, user } = this.props
    return <UserScreen navigation={navigation} userID={user.uid} />
  }
}
