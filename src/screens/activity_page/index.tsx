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
import { Chat } from '../../components/chat/Chat'

import { Ionicons } from '@expo/vector-icons'
import { Header } from '../../components/header'
import { ActivityDetail } from './ActivityDetail'
import { Albums } from './Album'

import { theme } from '../../theme'

interface ActivityPageProps {
  navigation: NavigationScreenProp<{}, {}>
}
type RouteProps = Route<{
  key: string
  icon: string
}>

type ActivityPageState = NavigationState<RouteProps>
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
  }

  private renderScene = SceneMap({
    details: ActivityDetail,
    chat: Chat,
    images: Albums,
  })

  public render(): React.ReactNode {
    return (
      <View style={styles.container}>
        <Header
          title={'Activity page'}
          goBack={() => this.props.navigation.goBack()}
        />
        <Image
          source={require('../../resources/aurora.jpg')}
          style={styles.coverImage}
          resizeMode="cover"
        />

        <TabView
          style={styles.container}
          navigationState={this.state}
          renderScene={this.renderScene}
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
