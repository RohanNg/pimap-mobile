import * as React from 'react'
import { StyleSheet, View, Text, Image } from 'react-native'

import {
  NavigationState,
  Route,
  SceneMap,
  SceneRendererProps,
  TabBar,
  TabView,
} from 'react-native-tab-view'

import { Chat } from '../../components/chat/Chat'

import { Ionicons } from '@expo/vector-icons'
import { Header } from '../../components/header'
import { ActivityDetail } from './ActivityDetail'
import { theme } from '../../theme'

type RouteProps = Route<{
  key: string
  icon: string
}>
type ActivityPageState = NavigationState<RouteProps>
export class ActivityPage extends React.Component<{}, ActivityPageState> {
  public state: ActivityPageState = {
    index: 0,
    routes: [
      { key: 'details', icon: 'md-information-circle' },
      { key: 'chat', icon: 'md-chatbubbles' },
    ],
  }

  private renderScene = SceneMap({
    details: ActivityDetail,
    chat: Chat,
  })

  public render(): React.ReactNode {
    return (
      <View style={styles.container}>
        <Image
          source={require('../../resources/aurora.jpg')}
          style={{ maxHeight: 200 }}
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
        indicatorStyle={styles.indicator}
        style={styles.tabbar}
        renderIcon={this.renderTabIcon}
      />
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabbar: {
    backgroundColor: 'white',
  },
  indicator: {
    backgroundColor: theme.colors!.primary,
  },
})
