import { Constants, Facebook, Location, Permissions } from 'expo'
import * as React from 'react'
import {
  Alert,
  Button,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import { Card, Colors, IconButton, Paragraph } from 'react-native-paper'

import {
  createStackNavigator,
  NavigationBottomTabScreenOptions,
  NavigationContainer,
  NavigationScreenConfig,
  NavigationScreenProp,
} from 'react-navigation'

import { ProfilePic } from '../components/ProfilePic'

import { tabBarIcon } from '../components/navigation/tabBarIcon'

interface MeScreenProps {
  navigation: NavigationScreenProp<{}, {}>
}

import { ActivityCard } from '../components/card/ActivityCard'
import { Chat } from '../components/chat/Chat'

export class MeScreen extends React.Component<MeScreenProps> {
  public static navigationOptions: NavigationBottomTabScreenOptions = {
    title: 'Me',
    tabBarIcon: tabBarIcon('person'),
  }

  public render(): React.ReactNode {
    return (
      <ScrollView scrollEventThrottle={16}>
        <View style={styles.header}>
          <ProfilePic
            image={require('../resources/namanh.jpg')}
            name="Anh Nguyen Le"
          />
          <Text style={styles.textdetail}>Verified user</Text>
          <Text style={styles.textdetail}>Joined since 08/2018</Text>

          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              marginTop: 10,
              justifyContent: 'center',
            }}
          >
            <IconButton color="#F27979" size={30} icon="email" />
            <IconButton color="#F27979" size={30} icon="person" />
          </View>
          <Card
            style={{
              backgroundColor: '#DCDCDC',
              height: 180,
              width: 300,
              marginTop: 15,
            }}
          >
            <Card.Content style={{ flex: 1, flexDirection: 'row' }}>
              <Image
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 15,
                }}
                source={require('../resources/nooke.jpg')}
              />
              <Paragraph style={styles.reviewer}>Nooke Parviainen</Paragraph>
            </Card.Content>
            <View style={styles.review}>
              <IconButton color="#F27979" size={20} icon="star" />
              <IconButton color="#F27979" size={20} icon="star" />
              <IconButton color="#F27979" size={20} icon="star" />
              <IconButton color="#F27979" size={20} icon="star" />
              <IconButton color="#F27979" size={20} icon="star" />
            </View>
            <Text style={styles.reviewcomment}>
              Nam Anh hosted a variety of really cool cultural event around the
              Kilo region, which really spices my evening up. Thanks bro.
            </Text>
          </Card>
        </View>
        <Text style={styles.fullreview}>See all reviews</Text>
        <View style={{ marginTop: 20, paddingHorizontal: 17 }}>
          <Text style={{ fontSize: 24, fontWeight: '700' }}>
            Event he hosted
          </Text>

          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={{ height: 200, marginTop: 20 }}
          >
            <ActivityCard
              activity={{
                organizer: 'Nooke',
                title: 'Aurora Watcher',
                privacy: 'public',
                image: require('../assets/activity_image/aurora.jpg'),
              }}
            />
          </ScrollView>
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  header: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    marginTop: 60,
  },
  textdetail: {
    fontSize: 14,
    color: 'grey',
    fontWeight: '300',
  },
  review: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 25,
    marginTop: 3,
  },
  reviewcomment: {
    marginBottom: 30,
    paddingHorizontal: 10,
    textAlign: 'center',
  },
  fullreview: {
    textAlign: 'right',
    marginTop: 10,
    marginBottom: 20,
    marginRight: 17,
    color: '#F27979',
    textDecorationLine: 'underline',
  },
  reviewer: {
    marginLeft: 10,
    fontSize: 16,
    color: '#A8A8A8',
    fontWeight: '300',
  },
})
