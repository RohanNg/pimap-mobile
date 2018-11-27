import { inject, observer } from 'mobx-react'
import * as React from 'react'
import { View } from 'react-native'
import { Activity, ActivityStore, AppStateStore } from '../../datastore'
import { ActivityList } from './ActivityList'

import { NavigationScreenProp } from 'react-navigation'

interface LoadingActivityListProps {
  navigation: NavigationScreenProp<
    {},
    {
      activityCollectionQuery: (
        collectionRef: firebase.firestore.CollectionReference,
      ) => firebase.firestore.Query
      title: string
    }
  >
  activityStore: ActivityStore
}

interface LoadingActivityListState {
  activities: 'loading' | 'loading-failed' | Activity[]
}

@inject<AppStateStore, LoadingActivityListProps>(allStores => ({
  activityStore: allStores.activityStore,
}))
@observer
export class LoadingActivityList extends React.Component<
  LoadingActivityListProps,
  LoadingActivityListState
> {
  public state: LoadingActivityListState = {
    activities: 'loading',
  }

  public async componentDidMount(): Promise<void> {
    const { activityStore, navigation } = this.props
    const activityCollectionQuery = navigation.getParam(
      'activityCollectionQuery',
    )!

    let activities: LoadingActivityListState['activities']
    try {
      activities = await this.props.activityStore.query(activityCollectionQuery)
    } catch (error) {
      activities = 'loading-failed'
    }

    this.setState({ activities })
  }

  public render(): React.ReactNode {
    const { navigation } = this.props
    const title = navigation.getParam('title')
    const { activities } = this.state
    if (activities === 'loading' || activities === 'loading-failed') {
      return (
        <View
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        >
          {activities === 'loading' ? 'Loading...' : 'Loading failed!'}
        </View>
      )
    }

    return (
      <ActivityList
        title={title}
        activitities={activities}
        goBack={this.goBack}
        onActivityPressed={this.onActivityPressed}
      />
    )
  }

  private goBack = () => {
    this.props.navigation.goBack()
  }

  private onActivityPressed = (id: string) => {
    this.props.navigation.navigate('ActivityPage', { activityID: id })
  }
}
