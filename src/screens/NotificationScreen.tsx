import { Constants, Facebook, Location, Permissions } from 'expo'
import * as React from 'react'
import {
  Alert,
  Button,
  Platform,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  StyleSheet,
} from 'react-native'
import {
  createStackNavigator,
  NavigationBottomTabScreenOptions,
  NavigationContainer,
  NavigationScreenConfig,
  NavigationScreenProp,
} from 'react-navigation'

import { tabBarIcon } from '../components/navigation/tabBarIcon'
import RequestItem from '../components/notification/requestItem'
import { Appbar } from 'react-native-paper'
import ReviewItem from '../components/notification/reviewItem'
import ResponeItem from '../components/notification/responeItem'

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
            <View style={styles.importantContent}>
              <View style={{ paddingHorizontal: 17 }}>
                <Text style={styles.importantText}>Important</Text>

                <View
                  style={{ height: 220, marginTop: 5, alignItems: 'center' }}
                >
                  <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                  >
                    <RequestItem />
                  </ScrollView>
                </View>
              </View>
              <View style={{ marginTop: 8, paddingHorizontal: 17 }}>
                <Text style={{ fontSize: 20, fontWeight: '700' }}>
                  Activities
                </Text>

                <View style={{ height: 110, marginTop: 5 }}>
                  <ReviewItem />
                </View>
                <View style={{ height: 120, marginTop: 5, marginBottom: 100 }}>
                  <ResponeItem />
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  importantContent: {
    backgroundColor: 'white',
    paddingTop: 20,
  },
  importantText: {
    fontSize: 20,
    fontWeight: '700',
  },
})
