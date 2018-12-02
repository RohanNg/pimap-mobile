import { inject, observer } from 'mobx-react'
import * as React from 'react'
import { Text, View } from 'react-native'
import { Activity, ActivityStore, AppStateStore } from '../../datastore'
import { ActivityList } from './ActivityList'

import { fromPromise, IPromiseBasedObservable } from 'mobx-utils'
import { NavigationScreenProp } from 'react-navigation'

interface LoadingActivityListProps {
  fetchActivities: () => Promise<Activity[]>
  onActivityPressed?: (activity: Activity) => void
}

interface LoadingActivityListState {
  activities: IPromiseBasedObservable<Activity[]>
}

@observer
export class LoadingActivityList extends React.Component<
  LoadingActivityListProps,
  LoadingActivityListState
> {
  public state: LoadingActivityListState = {
    activities: fromPromise(
      new Promise(() => {
        /** Nothing is done yet: this promise is pending */
      }),
    ),
  }

  public async componentDidMount(): Promise<void> {
    this.setState({ activities: fromPromise(this.props.fetchActivities()) })
  }

  public render(): React.ReactNode {
    const { activities } = this.state

    return activities.case({
      pending: this.renderLoading,
      rejected: this.renderError,
      fulfilled: this.renderActivities,
    })
  }

  // private onActivityPressed = (id: string) => {
  //   this.props.navigation.navigate('ActivityPage', { activityID: id })
  // }

  private renderLoading = () => {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Loading... </Text>
      </View>
    )
  }

  private renderError = (err: Error) => {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Loading failed... </Text>
      </View>
    )
  }

  private renderActivities = (activities: Activity[]) => {
    return (
      <ActivityList
        activitities={activities}
        onActivityPressed={this.props.onActivityPressed}
      />
    )
  }
}
