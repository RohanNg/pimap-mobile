import { inject } from 'mobx-react'
import * as React from 'react'
import { StyleSheet, View } from 'react-native'

import { Activity, ActivityStore, AppStateStore } from '../../datastore'
import { LoadingActivityList } from './LoadingActivityList'

import { NavigationInjectedProps } from 'react-navigation'
import { Header } from '../../components/header'
import { theme } from '../../theme'

interface ActivityListScreenProps
  extends NavigationInjectedProps<{
      activityCollectionQuery: (
        collectionRef: firebase.firestore.CollectionReference,
      ) => firebase.firestore.Query
      title: string
    }> {
  activityStore: ActivityStore
}

interface ActivityListScreenState {
  fetchActivities: () => Promise<Activity[]>
  title: string
}

class ActivityListScreenComp extends React.Component<
  ActivityListScreenProps,
  ActivityListScreenState
> {
  public static getDerivedStateFromProps(
    { activityStore, navigation }: ActivityListScreenProps,
    { title, fetchActivities }: ActivityListScreenState,
  ): ActivityListScreenState | null {
    const newTitle = navigation.getParam('title')
    if (!title || title !== newTitle) {
      return {
        title: newTitle,
        fetchActivities: () =>
          activityStore.query(navigation.getParam('activityCollectionQuery')),
      }
    }

    return null
  }

  public state: ActivityListScreenState = {
    title: '',
    fetchActivities: () =>
      new Promise(() => {
        /** Does not matter */
      }),
  }

  public render(): React.ReactNode {
    const { title, fetchActivities } = this.state
    return (
      <View style={styles.container}>
        <Header title={title} goBack={this.goBack} />
        <LoadingActivityList
          fetchActivities={fetchActivities}
          onActivityPressed={this.onActivityPressed}
          style={styles.contentContainer}
        />
      </View>
    )
  }

  private goBack = () => this.props.navigation.goBack()
  private onActivityPressed = (a: Activity) => {
    this.props.navigation.navigate('ActivityPage', { activityID: a.id })
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingVertical: theme.spacing.spacious,
  },
})

export const ActivityListScreen = inject<
  AppStateStore,
  ActivityListScreenProps
>(allStores => ({
  activityStore: allStores.activityStore,
}))(ActivityListScreenComp)
