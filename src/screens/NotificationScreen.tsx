import { Constants, Facebook, Location, Permissions } from 'expo'
import * as React from 'react'
import {
  Alert,
  Button,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from 'react-native'
import {
  createStackNavigator,
  NavigationBottomTabScreenOptions,
  NavigationContainer,
  NavigationScreenConfig,
  NavigationScreenProp,
} from 'react-navigation'

import { Appbar } from 'react-native-paper'
import { tabBarIcon } from '../components/navigation/tabBarIcon'
import RequestItem from '../components/notification/requestItem'

interface NotificationScreenProps {
  navigation: NavigationScreenProp<{}, {}>
}

import { Chat } from '../components/chat/Chat'

export class NotificationScreen extends React.Component<
  NotificationScreenProps
> {
  public static navigationOptions: NavigationBottomTabScreenOptions = {
    title: 'Noti',
    tabBarIcon: tabBarIcon('message'),
  }

  public render(): React.ReactNode {
    return (
      <SafeAreaView>
        <Appbar.Header>
          <Appbar.Content title="Notifications" />
        </Appbar.Header>
        <View>
          <ScrollView scrollEventThrottle={16}>
            <View style={{ backgroundColor: 'white', paddingTop: 20 }}>
              <View style={{ paddingHorizontal: 17 }}>
                <Text style={{ fontSize: 20, fontWeight: '700' }}>
                  Important
                </Text>

                <View
                  style={{ height: 220, marginTop: 20, alignItems: 'center' }}
                >
                  <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                  >
                    <RequestItem />
                  </ScrollView>
                </View>
              </View>
              <View style={{ marginTop: 20, paddingHorizontal: 17 }}>
                <Text style={{ fontSize: 20, fontWeight: '700' }}>
                  Activities
                </Text>

                <View style={{ height: 200, marginTop: 20 }}>
                  <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                  />
                </View>
              </View>
              <View style={{ marginTop: -10, paddingHorizontal: 17 }}>
                <Text style={{ fontSize: 24, fontWeight: '700' }}>
                  Popular, right now
                </Text>

                <View style={{ height: 200, marginTop: 20 }}>
                  <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                  />
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    )
  }
}
