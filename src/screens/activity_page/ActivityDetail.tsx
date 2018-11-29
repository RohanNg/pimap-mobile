import * as React from 'react'
import {
  Alert,
  Image,
  ImageSourcePropType,
  Platform,
  ScrollView,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native'

import { Ionicons } from '@expo/vector-icons'
import { observer } from 'mobx-react'
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

import { NavigationInjectedProps, withNavigation } from 'react-navigation'
import { tabBarIcon } from '../../components/navigation/tabBarIcon'
import { TagList } from '../../components/tags'
import { Activity, User } from '../../datastore'
import { theme } from '../../theme'

interface ActivityDetailProps {
  activity: Activity
  creator: User
  style?: ViewStyle
}

@observer
class ActivityDetailComp extends React.Component<ActivityDetailProps> {
  public render(): React.ReactNode {
    const { title, description, tags } = this.props.activity.value

    return (
      <ScrollView
        style={[styles.container, this.props.style]}
        contentContainerStyle={styles.contentContainerStyle}
      >
        <CreatorInfo creator={this.props.creator} />
        <Title style={styles.headLine}>{title}</Title>
        <Subheading style={styles.placeTimeInfo}>Helsinki • Tonight</Subheading>
        <Paragraph style={styles.activityDescription}>{description}</Paragraph>
        <ScrollView
          style={styles.tagListContainer}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        >
          <TagList values={tags} />
        </ScrollView>
        <View style={styles.buttonContainer}>
          <Button
            mode="contained"
            onPress={() => console.info('cool')}
            icon={flightIcon}
            style={styles.backButton}
          >
            <Text style={styles.acceptButtom}>Accept Invitation</Text>
          </Button>
        </View>
        <PeopleList people={peopleData} caption={'Interested'} />
        <PeopleList people={peopleData} caption={'Going'} />
      </ScrollView>
    )
  }
}

const CreatorInfoWithNav: React.SFC<
  {
    creator: User
  } & NavigationInjectedProps
> = ({
  creator: {
    id,
    value: { firstname, lastname, profilePicture },
  },
  navigation,
}) => {
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('UserScreen', {
          userID: id,
        })
      }
      style={{ flexDirection: 'row', marginTop: 12 }}
    >
      <Image
        source={{ uri: profilePicture }}
        style={{ width: 28, height: 28, borderRadius: 14 }}
      />
      <Subheading style={styles.placeTimeInfo}>
        {'  '}
        {firstname} {lastname}
      </Subheading>
    </TouchableOpacity>
  )
}
const CreatorInfo = withNavigation(CreatorInfoWithNav)

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

const SECTION_SPACING = 16
const SUB_SECTION_SPACING = 8

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
    fontSize: 26,
    fontFamily: 'shrikhand',
    lineHeight: 26 * 1.2,
    letterSpacing: 0.25,
    marginBottom: -6,
  },
  placeTimeInfo: {
    fontStyle: 'italic',
    fontSize: 14,
  },
  activityDescription: {
    marginTop: SECTION_SPACING,
    fontSize: 16,
  },
  buttonContainer: {
    marginTop: SECTION_SPACING,
    alignItems: 'center',
  },
  peopleListContainer: {
    marginTop: SECTION_SPACING,
  },
  peopleList_scrollView: {
    marginTop: SUB_SECTION_SPACING,
  },
  peopleImage: {
    height: 60,
    width: 60,
    borderRadius: theme.roundness,
    marginRight: 12,
  },
  backButton: {},
  tagListContainer: {
    marginTop: SECTION_SPACING,
    marginLeft: -4,
    flexDirection: 'row',
  },
  acceptButtom: {
    color: 'white',
  },
})

export const ActivityDetail: React.ComponentType<
  ActivityDetailProps
> = withNavigation(ActivityDetailComp)
