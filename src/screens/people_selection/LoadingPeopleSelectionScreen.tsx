import { inject, observer } from 'mobx-react'
import * as React from 'react'
import { Text, View } from 'react-native'
import { AppStateStore, User, UserStore } from '../../datastore'

import { NavigationScreenProp } from 'react-navigation'

import { PeopleSelectionScreen, UserInfo } from './PeopleSelectionScreen'

interface LoadingPeopleSelectionProps {
  navigation: NavigationScreenProp<
    {},
    {
      userCollectionQuery: (userStore: UserStore) => Promise<User[]>
      title: string
      goBack: (invitedUsers: User[]) => void
    }
  >
  userStore: UserStore
}

type UserData = UserInfo & { user: User }

interface LoadingPeopleSelectionState {
  users: 'loading' | 'loading-failed' | UserData[]
}

@observer
class LoadingPeopleSelectionScreenComp extends React.Component<
  LoadingPeopleSelectionProps,
  LoadingPeopleSelectionState
> {
  public state: LoadingPeopleSelectionState = {
    users: 'loading',
  }

  public async componentDidMount(): Promise<void> {
    const { userStore, navigation } = this.props
    const userCollectionQuery = navigation.getParam('userCollectionQuery')!

    let users: LoadingPeopleSelectionState['users']
    try {
      const userData = await userCollectionQuery(userStore)
      users = []
      for (const user of userData) {
        const {
          id,
          value: { firstname, lastname, profilePicture },
        } = user

        users.push({
          displayName: `${firstname} ${lastname}`,
          imageURL: profilePicture,
          selected: false,
          uid: id,
          user,
        })
      }
    } catch (error) {
      users = 'loading-failed'
    }

    this.setState({ users })
  }

  public render(): React.ReactNode {
    const { navigation } = this.props
    const { users } = this.state
    if (users === 'loading' || users === 'loading-failed') {
      return (
        <View
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        >
          <Text>
            {users === 'loading' ? 'Loading...' : 'Opps, loading failed!'}
          </Text>
        </View>
      )
    }

    return (
      <PeopleSelectionScreen
        title={navigation.getParam('title')}
        onPersonRemoved={this.onPersonRemoved}
        onPersonSelected={this.onPersonAdded}
        userClicked={console.info}
        users={users}
        goBack={this.goBack}
      />
    )
  }

  private goBack = () => {
    const back = this.props.navigation.getParam('goBack')!
    back(
      (this.state.users as UserData[]).filter(u => u.selected).map(u => u.user),
    )
  }

  private onPersonRemoved = (uid: string) => {
    this.setState(({ users }) => {
      const newUsers: UserData[] = []
      for (const u of users as UserData[]) {
        newUsers.push(u.uid === uid ? { ...u, selected: false } : u)
      }
      return {
        users: newUsers,
      }
    })
  }

  private onPersonAdded = (uid: string) => {
    this.setState(({ users }) => {
      const newUsers: UserData[] = []
      for (const u of users as UserData[]) {
        newUsers.push(u.uid === uid ? { ...u, selected: true } : u)
      }
      return {
        users: newUsers,
      }
    })
  }
}

export const LoadingPeopleSelectionScreen = inject<
  AppStateStore,
  LoadingPeopleSelectionProps
>(allStores => ({
  userStore: allStores.userStore,
}))(LoadingPeopleSelectionScreenComp)
