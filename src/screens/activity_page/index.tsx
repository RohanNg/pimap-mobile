import { inject, observer } from 'mobx-react'
import * as React from 'react'
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import { Button } from 'react-native-paper'
import {
  NavigationState,
  Route,
  SceneMap,
  SceneRendererProps,
  TabBar,
  TabView,
} from 'react-native-tab-view'
import { NavigationScreenProp } from 'react-navigation'

import { Ionicons } from '@expo/vector-icons'
import { Chat } from '../../components/chat/Chat'
import { Header } from '../../components/header'
import { Activity, ActivityStore, AppStateStore } from '../../datastore'
import { theme } from '../../theme'
import { ActivityDetail } from './ActivityDetail'
import { Albums } from './Album'

interface ActivityPageProps {
  navigation: NavigationScreenProp<
    {},
    {
      activityID: string
    }
  >
  activityStore: ActivityStore
}

type RouteProps = Route<{
  key: 'details' | 'chat' | 'images'
  icon: string
}>

type ActivityPageState = NavigationState<RouteProps> & {
  activity: Activity | 'not-exist' | 'loading' | 'loading-failed'
}

@inject<AppStateStore, ActivityPageProps>(allStores => ({
  activityStore: allStores.activityStore,
}))
@observer
export class ActivityPage extends React.Component<
  ActivityPageProps,
  ActivityPageState
> {
  public state: ActivityPageState = {
    index: 0,
    routes: [
      { key: 'details', icon: 'md-information-circle' },
      { key: 'chat', icon: 'md-chatbubbles' },
      { key: 'images', icon: 'md-photos' },
    ],
    activity: 'loading',
  }

  public async componentDidMount(): Promise<void> {
    try {
      const activity = await this.props.activityStore.getActivity(
        this.props.navigation.getParam('activityID')!,
      )
      if (!activity) {
        this.setState({ activity: 'not-exist' })
      } else {
        this.setState({ activity })
      }
    } catch (err) {
      this.setState({ activity: 'loading-failed' })
    }
  }

  private renderScreen: (
    activity: Activity,
  ) => (props: { route: RouteProps }) => React.ReactNode = activity => ({
    route: { key },
  }) => {
    if (key === 'chat') {
      return <Chat />
    } else if (key === 'images') {
      return <Albums />
    } else {
      return <ActivityDetail activity={activity!} />
    }
  }

  public render(): React.ReactNode {
    const { activity } = this.state

    if (!(activity instanceof Activity)) {
      let message = 'Loading...'
      if (activity === 'loading-failed') {
        message = 'Loading failed!'
      } else if (activity === 'not-exist') {
        message = 'Activity not exist'
      }
      return (
        <View style={styles.container}>
          <Text>{message}</Text>
        </View>
      )
    }

    return (
      <View style={styles.container}>
        <React.Fragment>
          <Header
            title={'Activity page'}
            goBack={() => this.props.navigation.goBack()}
          />
          <Image
            source={{ uri: activity.value.coverImage }}
            style={styles.coverImage}
            resizeMode="cover"
          />
          <TabView
            style={styles.container}
            navigationState={this.state}
            renderScene={this.renderScreen(activity)}
            onIndexChange={this.handleIndexChange}
            renderTabBar={this.renderTabBar}
          />
        </React.Fragment>
      </View>
    )
  }

  private handleIndexChange = (index: number) =>
    this.setState({
      index,
    })

  private renderTabIcon: React.SFC<{ route: RouteProps }> = ({ route }) => {
    return (
      <Ionicons name={route.icon} size={24} color={theme.colors!.primary} />
    )
  }

  private renderTabBar: React.SFC<SceneRendererProps<RouteProps>> = props => {
    return (
      <TabBar
        {...props}
        indicatorStyle={styles.tabbar_activeTabIndicator}
        style={styles.tabbar}
        renderIcon={this.renderTabIcon}
      />
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors!.background,
  },
  tabbar: {
    backgroundColor: 'white',
  },
  tabbar_activeTabIndicator: {
    backgroundColor: theme.colors!.primary,
  },
  backButton: {
    position: 'absolute',
    top: 28,
    left: 4,
    zIndex: 1000,
    backgroundColor: theme.colors!.background,
  },
  coverImage: {
    maxHeight: 220,
    width: Dimensions.get('window').width,
    flex: 1,
  },
})
