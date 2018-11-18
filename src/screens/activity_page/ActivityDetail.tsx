import * as React from 'react'
import {
  Alert,
  Image,
  Platform,
  ScrollView,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
  ImageSourcePropType,
} from 'react-native'
import {
  NavigationBottomTabScreenOptions,
  NavigationScreenProp,
  SafeAreaView,
} from 'react-navigation'

import { Ionicons } from '@expo/vector-icons'

import {
  Appbar,
  Button,
  Caption,
  Card,
  Headline,
  Paragraph,
  Subheading,
  Surface,
  Text,
  Title,
  withTheme,
} from 'react-native-paper'

import { tabBarIcon } from '../../components/navigation/tabBarIcon'
import { theme } from '../../theme'

interface ActivityDetailProps {
  navigation: NavigationScreenProp<{}, {}>
  style?: ViewStyle
}

export class ActivityDetail extends React.Component<ActivityDetailProps> {
  public static navigationOptions: NavigationBottomTabScreenOptions = {
    title: 'Home',
    tabBarIcon: tabBarIcon('home'),
  }

  public render(): React.ReactNode {
    return (
      <ScrollView
        style={[styles.container, this.props.style]}
        contentContainerStyle={styles.contentContainerStyle}
      >
        <Title style={styles.headLine}>Aurora watcher</Title>
        <Subheading style={styles.placeTimeInfo}>Helsinki • Tonight</Subheading>
        <Paragraph style={styles.activityDescription}>
          Aurora activity tonight in the Helsinki region.
          {'\n'}
          If you haven’t known, Finland is blessed with Northern light. Because
          we have such long summer its quite hard to see the thing. According to
          the Finnish meteorological institute at Helsinki we can have 1/20
          chance a month to see this spectacular phenomenon, but due to the
          light and the fact that winter is quite cloudy and crappy here, this
          is a golden gem. So don’t miss!
          {'\n'}I can pick you up by car if you happen to be nearby.
        </Paragraph>
        <View style={styles.buttonContainer}>
          <Button
            mode="contained"
            onPress={() => console.info('cool')}
            icon={flightIcon}
          >
            Accept Invitation
          </Button>
        </View>
        <PeopleList people={peopleData} caption={'Interested'} />
        <PeopleList people={peopleData} caption={'Going'} />
      </ScrollView>
    )
  }
}

const flightIcon = ({ color, size }: { color: string; size: number }) => {
  return <Ionicons size={size} color={color} name={'md-paper-plane'} />
}

interface Person {
  name: string
  image: ImageSourcePropType
}
interface PeopleListProps {
  style?: ViewStyle
  caption: string
  people: Person[]
}

const PeopleList: React.SFC<PeopleListProps> = ({ style, caption, people }) => {
  return (
    <View style={styles.peopleListContainer}>
      <Headline>{caption}</Headline>
      <ScrollView horizontal={true} style={styles.peopleList_scrollView}>
        {people.map(({ name, image }) => {
          return (
            <Image
              key={name}
              source={image}
              resizeMethod={'resize'}
              style={styles.peopleImage}
            />
          )
        })}
      </ScrollView>
    </View>
  )
}

const peopleData: Person[] = [
  {
    name: 'Dang Nguyen',
    image: require('../../resources/nooke.jpg'),
  },
  {
    name: 'Thanh Nguyen',
    image: require('../../resources/nooke.jpg'),
  },
  {
    name: 'Nam Anh Nguyen',
    image: require('../../resources/nooke.jpg'),
  },
  {
    name: 'Samuli Holstrom',
    image: require('../../resources/nooke.jpg'),
  },
]

const SECTION_SPACING = 24
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainerStyle: {
    paddingHorizontal: 16,
    paddingBottom: 42,
    backgroundColor: theme.colors!.background,
  },
  headLine: {
    marginTop: SECTION_SPACING,
    fontSize: 34,
    fontFamily: 'shrikhand',
    lineHeight: (34 / 2) * 3,
    letterSpacing: 0.25,
    marginBottom: -6,
  },
  placeTimeInfo: {
    fontStyle: 'italic',
  },
  activityDescription: {
    marginTop: SECTION_SPACING,
    fontSize: 16,
  },
  buttonContainer: {
    marginTop: SECTION_SPACING,
  },
  peopleListContainer: {
    marginTop: SECTION_SPACING,
  },
  peopleList_scrollView: {
    marginTop: 12,
  },
  peopleImage: {
    height: 80,
    width: 80,
    borderRadius: theme.roundness,
    marginRight: 12,
  },
})
