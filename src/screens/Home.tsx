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
  Dimensions,
} from 'react-native'
import {
  createStackNavigator,
  NavigationBottomTabScreenOptions,
  NavigationContainer,
  NavigationScreenConfig,
  NavigationScreenProp,
} from 'react-navigation'

import {
  Appbar,
  Headline,
  Paragraph,
  Subheading,
  Switch,
  TextInput,
  Title,
} from 'react-native-paper'

import * as firebase from 'firebase'
import { tabBarIcon } from '../components/navigation/tabBarIcon'
import Item from '../components/card/Item'
import Topic from '../components/card/Topic'
import PopularItem from '../components/card/PopularItem'

interface HomeScreenProps {
  navigation: NavigationScreenProp<{}, {}>
}

const { height, width } = Dimensions.get('window')

export class Home extends React.Component<HomeScreenProps> {
  public static navigationOptions: NavigationBottomTabScreenOptions = {
    title: 'Home',
    tabBarIcon: tabBarIcon('home'),
  }

  public render(): React.ReactNode {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <Appbar.Header>
          <Appbar.BackAction
            onPress={async () => {
              await firebase.auth().signOut()
              this.props.navigation.navigate('Login')
            }}
          />
          <Appbar.Content title="Actify" />
        </Appbar.Header>
        <View style={{ flex: 1 }}>
          <ScrollView scrollEventThrottle={16}>
            <View
              style={{
                flex: 1,
                backgroundColor: 'white',
                paddingTop: 20,
                paddingHorizontal: 17,
              }}
            >
              <View>
                <Text style={{ fontSize: 24, fontWeight: '700' }}>Topics</Text>
                <Text style={{ fontWeight: '100', marginTop: 10 }}>
                  See interesting event grouped by topic
                </Text>
              </View>

              <View style={{ height: 130, marginTop: 20 }}>
                <ScrollView
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                >
                  <Topic children="Football" />
                  <Topic children="Football" />
                  <Topic children="Football" />
                </ScrollView>
              </View>
              <View style={{ marginTop: 20 }}>
                <Text style={{ fontSize: 24, fontWeight: '700' }}>
                  Trending
                </Text>

                <View style={{ height: 200, marginTop: 20 }}>
                  <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                  >
                    <Item />
                    <Item />
                    <Item />
                  </ScrollView>
                </View>
              </View>
              <View style={{}}>
                <Text style={{ fontSize: 24, fontWeight: '700' }}>
                  Popular, right now
                </Text>

                <View style={{ height: 200, marginTop: 20 }}>
                  <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                  >
                    <PopularItem />
                    <PopularItem />
                    <PopularItem />
                  </ScrollView>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    )
  }
}
