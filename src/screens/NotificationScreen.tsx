import { Constants, Facebook, Location, Permissions } from 'expo'
import * as React from 'react'
import {
  Alert,
  Button,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import {
  NavigationBottomTabScreenOptions,
  NavigationInjectedProps,
} from 'react-navigation'

import { Title } from 'react-native-paper'

import { inject, observer } from 'mobx-react'
import { Appbar } from 'react-native-paper'
import { tabBarIcon } from '../components/navigation/tabBarIcon'

import { LoadingActivityList } from './activity_list'

interface NotificationScreenProps extends NavigationInjectedProps {
  user: firebase.User
  activityStore: ActivityStore
}

import { Header } from '../components/header'
import { Activity, ActivityStore, AppStateStore } from '../datastore'
import { withAuthenticatedUser } from '../services/AuthService'
import { theme } from '../theme'

class NotificationScreenComp extends React.Component<NotificationScreenProps> {
  public static navigationOptions: NavigationBottomTabScreenOptions = {
    title: 'Noti',
    tabBarIcon: tabBarIcon('message'),
  }

  public render(): React.ReactNode {
    return (
      <View style={styles.container}>
        <Header title={'Notifications'} />
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
        >
          <LoadingActivityList
            horizontallyScrollable={true}
            fetchActivities={this.fetchCreatedActivities}
            ParentComp={this.parentComponent('You have created')}
            onActivityPressed={this.onActivityPressed}
          />
          <LoadingActivityList
            horizontallyScrollable={true}
            fetchActivities={this.fetchInvitedActivities}
            ParentComp={this.parentComponent('You are invited to')}
            onActivityPressed={this.onActivityPressed}
          />
          <LoadingActivityList
            horizontallyScrollable={true}
            fetchActivities={this.fetchMemberOfActivities}
            ParentComp={this.parentComponent('You are member of')}
            onActivityPressed={this.onActivityPressed}
          />
          <LoadingActivityList
            horizontallyScrollable={true}
            fetchActivities={this.fetchGoingToActivities}
            ParentComp={this.parentComponent('You are  going to')}
            onActivityPressed={this.onActivityPressed}
          />

          <LoadingActivityList
            fetchActivities={this.fetchInterestedInActivities}
            ParentComp={this.parentComponent('You are interested in')}
            onActivityPressed={this.onActivityPressed}
          />
        </ScrollView>
      </View>
    )
  }

  private parentComponent: (title: string) => React.SFC<{}> = (
    title: string,
  ) => ({ children }) => {
    return (
      <View style={{ flex: 1 }}>
        <Title>{title}</Title>
        {children}
      </View>
    )
  }

  private fetchCreatedActivities = () => {
    const { user, activityStore } = this.props
    return activityStore.query(c => c.where('creatorID', '==', user.uid))
  }

  private fetchInvitedActivities = () => {
    const { user, activityStore } = this.props
    return activityStore.query(c =>
      c.where('privateInteractions.invitedUserIDs', 'array-contains', user.uid),
    )
  }

  private fetchMemberOfActivities = () => {
    const { user, activityStore } = this.props
    return activityStore.query(c =>
      c.where('privateInteractions.memberIDs', 'array-contains', user.uid),
    )
  }

  private fetchRequestedToJoinActivities = () => {
    const { user, activityStore } = this.props
    return activityStore.query(c =>
      c.where(
        'privateInteractions.requestedUserIDs',
        'array-contains',
        user.uid,
      ),
    )
  }

  private fetchGoingToActivities = () => {
    const { user, activityStore } = this.props
    return activityStore.query(c =>
      c.where('publicInteractions.goingUserIDs', 'array-contains', user.uid),
    )
  }

  private fetchInterestedInActivities = () => {
    const { user, activityStore } = this.props
    return activityStore.query(c =>
      c.where(
        'privateInteractions.interestedUserIDs',
        'array-contains',
        user.uid,
      ),
    )
  }

  private onActivityPressed = (activity: Activity) => {
    this.props.navigation.navigate('ActivityPage', {
      activityID: activity.id,
    })
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingTop: theme.spacing.spacious,
    paddingHorizontal: theme.spacing.tiny,
    paddingBottom: theme.spacing.extravagant,
  },
  importantContent: {
    backgroundColor: 'white',
    paddingTop: 20,
  },
  importantText: {
    fontSize: 20,
    fontWeight: '700',
  },
})

export const NotificationScreen = inject<
  AppStateStore,
  NotificationScreenProps
>(allStores => ({
  activityStore: allStores.activityStore,
}))(observer(withAuthenticatedUser(NotificationScreenComp)))
