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
        <ScrollView style={styles.bodyContainer}>
          <HorizontallyScrollableSection title={'Topics'}>
            {topicTags.map(({ name, image }) => (
              <Topic key={name} title={name} image={image} />
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
          <View style={{ height: 18 }} />
        </ScrollView>
      </View>
    )
  }
}

const HorizontallyScrollableSection: React.SFC<{
  title: string
  style?: {}
}> = ({ title, children, style }) => {
  return (
    <View style={[styles.section, style]}>
      <Headline>{title}</Headline>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
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
    paddingHorizontal: 8,
  },
  section: {
    marginTop: 20,
  },
})
