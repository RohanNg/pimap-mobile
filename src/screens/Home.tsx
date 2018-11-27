import { Constants, Facebook, Location, Permissions } from 'expo'
import * as React from 'react'
import {
  Alert,
  Button,
  Dimensions,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
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
import { ActivityCard } from '../components/card/ActivityCard'
import { Topic } from '../components/card/Topic'
import { Header } from '../components/header'
import { tabBarIcon } from '../components/navigation/tabBarIcon'
import { theme } from '../theme'

import { topicTags } from '../data/topicTags'

interface HomeScreenProps {
  navigation: NavigationScreenProp<{}, {}>
}

export class Home extends React.Component<HomeScreenProps> {
  public static navigationOptions: NavigationBottomTabScreenOptions = {
    title: 'Home',
    tabBarIcon: tabBarIcon('home'),
  }

  public render(): React.ReactNode {
    return (
      <View style={styles.container}>
        <Header
          title="Home"
          goBack={async () => {
            await firebase.auth().signOut()
            this.props.navigation.navigate('Login')
          }}
        />
        <ScrollView contentContainerStyle={styles.bodyContainer}>
          <HorizontallyScrollableSection title={'Topics'}>
            {topicTags.map(({ name, image }) => (
              <Topic
                key={name}
                title={name}
                image={image}
                onPress={this.navigateToActivitiesPageForTopic(name)}
              />
            ))}
          </HorizontallyScrollableSection>

          <HorizontallyScrollableSection title={'Trendings'}>
            <ActivityCard
              activity={{
                organizer: 'Nooke',
                title: 'Aurora Watcher',
                privacy: 'private',
                image: require('../assets/activity_image/aurora.jpg'),
              }}
            />
            <ActivityCard
              activity={{
                organizer: 'Nooke',
                title: 'Aurora Watcher',
                privacy: 'public',
                image: require('../assets/activity_image/aurora.jpg'),
              }}
            />
          </HorizontallyScrollableSection>

          <HorizontallyScrollableSection title={'Popular, right now'}>
            <ActivityCard
              activity={{
                organizer: 'Dang Nguyen',
                title: 'Chaimpion League final',
                privacy: 'private',
                image: require('../assets/activity_image/C1.jpg'),
              }}
            />
            <ActivityCard
              activity={{
                organizer: 'Dang Nguyen',
                title: 'Chaimpion League final',
                privacy: 'public',
                image: require('../assets/activity_image/C1.jpg'),
              }}
            />
            <ActivityCard
              activity={{
                organizer: 'Dang Nguyen',
                title: 'Chaimpion League final',
                privacy: 'public',
                image: require('../assets/activity_image/C1.jpg'),
              }}
            />
          </HorizontallyScrollableSection>
        </ScrollView>
      </View>
    )
  }

  private navigateToActivitiesPageForTopic = (topic: string) => () => {
    const { navigation } = this.props
    const query: (
      c: firebase.firestore.CollectionReference,
    ) => firebase.firestore.Query = c =>
      c.where('tags', 'array-contains', topic.toLocaleLowerCase())
    console.info('navigating to LoadingActivityList')
    navigation.navigate('LoadingActivityList', {
      activityCollectionQuery: query,
      title: `Discover ${topic} activities`,
    })
  }
}

const HorizontallyScrollableSection: React.SFC<{
  title: string
  style?: {}
}> = ({ title, children, style }) => {
  return (
    <View style={[styles.section, style]}>
      <Headline style={styles.sectionTitle}>{title}</Headline>
      <ScrollView
        contentContainerStyle={styles.sectionContainer}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      >
        {children}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bodyContainer: {
    backgroundColor: theme.colors!.background,
    paddingBottom: 24,
  },
  section: {
    marginTop: 20,
  },
  sectionTitle: {
    paddingLeft: 16,
  },
  sectionContainer: {
    paddingHorizontal: 16,
    paddingTop: 8,
  },
})
