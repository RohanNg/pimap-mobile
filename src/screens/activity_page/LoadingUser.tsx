import * as React from 'react'
import { Image, StyleSheet, TouchableOpacity } from 'react-native'
import { NavigationInjectedProps, withNavigation } from 'react-navigation'

import { inject, observer } from 'mobx-react'
import { fromPromise, IPromiseBasedObservable } from 'mobx-utils'
import { AppStateStore, User, UserStore } from '../../datastore'
import { theme } from '../../theme'

interface LoadingUserProps {
  userID: string
  userStore: UserStore
}

interface LoadingUserState {
  user: IPromiseBasedObservable<User | undefined>
}

@observer
class LoadingUserComp extends React.Component<
  LoadingUserProps & NavigationInjectedProps,
  LoadingUserState
> {
  private static HOLDER_IMAGE = require('../../assets/place_holder/user.png')
  public componentDidMount(): void {
    this.loadData()
  }

  public state: LoadingUserState = {
    user: fromPromise(
      new Promise(() => {
        /** Placeholder image to render loading icon before the next render after componentDidMount is called */
      }),
    ),
  }

  public render(): React.ReactNode {
    return this.state.user.case<React.ReactNode>({
      pending: () => (
        <Image
          source={LoadingUserComp.HOLDER_IMAGE}
          resizeMethod={'resize'}
          style={styles.peopleImage}
        />
      ),
      rejected: () => 'Failed',
      fulfilled: user => {
        if (!user) {
          return `Unknown user with id ${this.props.userID}`
        } else {
          const {
            value: { profilePicture },
          } = user
          return (
            <TouchableOpacity onPress={this.goToPersonPage}>
              <Image
                source={
                  profilePicture
                    ? { uri: profilePicture }
                    : LoadingUserComp.HOLDER_IMAGE
                }
                resizeMethod={'resize'}
                style={
                  profilePicture
                    ? styles.peopleImage
                    : [styles.peopleImage, styles.unknownPeopleImage]
                }
              />
            </TouchableOpacity>
          )
        }
      },
    })
  }

  private loadData = () => {
    const { userID, userStore } = this.props
    this.setState({ user: fromPromise(userStore.getUser(userID)) })
  }

  private goToPersonPage = () => {
    this.props.navigation.navigate('UserScreen', {
      userID: this.props.userID,
    })
  }
}

const styles = StyleSheet.create({
  peopleImage: {
    height: 54,
    width: 54,
    borderRadius: theme.roundness! * 2,
    marginRight: theme.spacing.tiny,
  },
  unknownPeopleImage: {
    borderWidth: 1,
    borderColor: theme.colors!.primary,
  },
})

export const LoadingUser = inject<AppStateStore, LoadingUserProps>(
  allStores => ({
    userStore: allStores.userStore,
  }),
)(withNavigation(LoadingUserComp))
