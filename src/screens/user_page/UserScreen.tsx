import { Constants, Facebook, Location, Permissions } from 'expo'
import { inject, observer } from 'mobx-react'
import * as React from 'react'
import {
  ActivityIndicator,
  Alert,
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import { Card, Colors, IconButton, Paragraph } from 'react-native-paper'
import {
  NavigationBottomTabScreenOptions,
  NavigationScreenProp,
} from 'react-navigation'

import { ActivityCard } from '../../components/card/ActivityCard'
import {
  Activity,
  ActivityStore,
  AppStateStore,
  User,
  UserStore,
} from '../../datastore'
import { ProfilePic } from './ProfilePic'

interface UserScreenProps {
  navigation: NavigationScreenProp<
    {},
    {
      userID?: string
    }
  >
  userID?: string
  activityStore: ActivityStore
  userStore: UserStore
}

interface UserScreenState {
  loadedData:
    | {
        user: User
        activities: Activity[]
      }
    | 'loading'
    | Error
}

@observer
class UserScreenComp extends React.Component<UserScreenProps, UserScreenState> {
  public state: UserScreenState = {
    loadedData: 'loading',
  }

  public componentDidMount(): void {
    this.fetchUserData()
  }

  public render(): React.ReactNode {
    const { loadedData } = this.state
    if (loadedData instanceof Error) {
      return (
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <Text>Loading failed because {loadedData.message}!</Text>
        </View>
      )
    } else if (loadedData === 'loading') {
      return (
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <ActivityIndicator />
        </View>
      )
    }

    const { user, activities } = loadedData
    const organizer = `${user.value.firstname} ${user.value.lastname}`

    return (
      <ScrollView>
        <View style={styles.header}>
          <ProfilePic user={user} />
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
                source={require('../../resources/nooke.jpg')}
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
            {activities.map(({ id, value: { title, privacy, coverImage } }) => (
              <ActivityCard
                key={id}
                activity={{
                  organizer,
                  title,
                  privacy,
                  image: { uri: coverImage },
                }}
                onPress={() =>
                  this.props.navigation.navigate('ActivityPage', {
                    activityID: id,
                  })
                }
              />
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    )
  }

  private fetchUserData = async () => {
    const { activityStore, userStore, userID, navigation } = this.props
    const uid = userID || navigation.getParam('userID')
    if (!uid) {
      return this.setState({ loadedData: new Error('No User ID found') })
    }

    try {
      const user = await userStore.getUser(uid)
      if (!user) {
        this.setState({ loadedData: new Error(`Use ${uid} does not exist`) })
        return
      }
      const activities = await activityStore.getActivityForUser(uid)
      this.setState({ loadedData: { activities, user } })
    } catch (error) {
      console.error(error)
      this.setState({
        loadedData: new Error('error loading user and activities'),
      })
    }
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

export const UserScreen = inject<AppStateStore, UserScreenProps>(allStores => ({
  activityStore: allStores.activityStore,
  userStore: allStores.userStore,
}))(UserScreenComp)
