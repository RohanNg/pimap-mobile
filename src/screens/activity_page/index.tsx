import { inject, observer } from 'mobx-react'
import * as React from 'react'
import {
  ActivityIndicator,
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
import {
  Activity,
  ActivityStore,
  AppStateStore,
  User,
  UserStore,
} from '../../datastore'
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
  userStore: UserStore
}

type RouteProps = Route<{
  key: 'details' | 'chat' | 'images'
  icon: string
}>

type ActivityPageState = NavigationState<RouteProps> & {
  activityInfo: { activity: Activity; creator: User } | 'loading' | Error
}

@inject<AppStateStore, ActivityPageProps>(allStores => ({
  activityStore: allStores.activityStore,
  userStore: allStores.userStore,
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
    activityInfo: 'loading',
  }

  public async componentDidMount(): Promise<void> {
    this.fetchActivity()
  }

  public render(): React.ReactNode {
    const { activityInfo } = this.state

    if (activityInfo === 'loading') {
      return (
        <View style={styles.containerCentering}>
          <ActivityIndicator />
        </View>
      )
    } else if (activityInfo instanceof Error) {
      return (
        <View style={styles.containerCentering}>
          <Text>Something went wrong: {activityInfo.message} </Text>
        </View>
      )
    }

    return (
      <View style={styles.container}>
        <Header
          title={'Activity page'}
          goBack={() => this.props.navigation.goBack()}
        />
        <Image
          source={{ uri: activityInfo.activity.value.coverImage }}
          style={styles.coverImage}
          resizeMode="cover"
        />
        <TabView
          style={styles.container}
          navigationState={this.state}
          renderScene={this.renderScreen(activityInfo)}
          onIndexChange={this.handleIndexChange}
          renderTabBar={this.renderTabBar}
        />
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

  private renderScreen: (
    _: { activity: Activity; creator: User },
  ) => (props: { route: RouteProps }) => React.ReactNode = ({
    activity,
    creator,
  }) => ({ route: { key } }) => {
    if (key === 'chat') {
      return <Chat />
    } else if (key === 'images') {
      return <Albums />
    } else {
      return <ActivityDetail activity={activity} creator={creator} />
    }
  }

  private fetchActivity = async () => {
    try {
      const activity = await this.props.activityStore.getActivity(
        this.props.navigation.getParam('activityID')!,
      )
      if (!activity) {
        return this.setState({
          activityInfo: new Error('Activity does not exist'),
        })
      }
      const creator = await this.props.userStore.getUser(
        activity.value.creatorID,
      )
      if (!creator) {
        return this.setState({
          activityInfo: new Error('Activity creator does not exist'),
        })
      }
      this.setState({ activityInfo: { activity, creator } })
    } catch (err) {
      console.error(err)
      this.setState({ activityInfo: new Error('Data loading failed.') })
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors!.background,
  },
  containerCentering: {
    flex: 1,
    backgroundColor: theme.colors!.background,
    alignContent: 'center',
    justifyContent: 'center',
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
