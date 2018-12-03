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
import { withAuthenticatedUser } from '../../services/AuthService'
import { theme } from '../../theme'
import { LoadingUser } from './LoadingUser'
import { LoadingUsers } from './LoadingUsers'

interface ActivityDetailProps {
  activity: Activity
  creator: User
  style?: ViewStyle
}

@observer
class ActivityDetailComp extends React.Component<
  ActivityDetailProps & { user: firebase.User }
> {
  public render(): React.ReactNode {
    const {
      title,
      description,
      tags,
      privacy,
      publicInteractions,
      privateInteractions,
    } = this.props.activity.value

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
        <View style={styles.buttonsContainer}>{this.renderActionButton()}</View>
        {privacy === 'private'
          ? privateInteractions && (
              <React.Fragment>
                <LoadingUsers
                  title={'Invited'}
                  userIDs={privateInteractions.invitedUserIDs}
                />
                <LoadingUsers
                  title={'Members'}
                  userIDs={privateInteractions.memberIDs}
                />
                <LoadingUsers
                  title={'Requested to join'}
                  userIDs={privateInteractions.requestedUserIDs}
                />
              </React.Fragment>
            )
          : publicInteractions && (
              <React.Fragment>
                <LoadingUsers
                  title={'Going'}
                  userIDs={publicInteractions.goingUserIDs}
                />
                <LoadingUsers
                  title={'Interested'}
                  userIDs={publicInteractions.interestedUserIDs}
                />
              </React.Fragment>
            )}
      </ScrollView>
    )
  }

  private renderActionButton = () => {
    const { error, actions } = this.getReaction()
    return (
      <React.Fragment>
        {error && <Text>{error}</Text>}
        {!actions
          ? null
          : actions.map(({ message, onPress }, idx) => {
              return (
                <Button
                  key={idx}
                  mode="contained"
                  onPress={onPress}
                  icon={this.flightIcon}
                  style={styles.reactionButton}
                >
                  <Text style={styles.acceptButtom}>{message}</Text>
                </Button>
              )
            })}
      </React.Fragment>
    )
  }

  private flightIcon = ({ color, size }: { color: string; size: number }) => {
    return <Ionicons size={size} color="white" name={'md-paper-plane'} />
  }

  private getReaction = () => {
    const {
      user: { uid },
      activity,
      creator: { id: creatorID },
    } = this.props
    const {
      value: { privacy, privateInteractions, publicInteractions },
    } = activity

    let errorMessage: string | undefined
    let actions: Array<{ message: string; onPress: () => void }> | undefined

    if (uid === creatorID) {
      actions = [
        {
          message: 'Edit',
          onPress: () => console.info('Edited'),
        },
      ]
    } else if (privacy === 'private') {
      if (!privateInteractions) {
        errorMessage = 'Something is wrong: no data for private activity'
      } else if (privateInteractions.invitedUserIDs.some(id => id === uid)) {
        actions = [
          {
            message: 'Accept invitation',
            onPress: () =>
              activity.update({
                privateInteractions: {
                  ...privateInteractions,
                  memberIDs: [...privateInteractions.memberIDs, uid],
                  invitedUserIDs: privateInteractions.invitedUserIDs.filter(
                    id => id !== uid,
                  ),
                },
              }),
          },
        ]
      } else if (privateInteractions.requestedUserIDs.some(id => id === uid)) {
        actions = [
          {
            message: 'Cancel request to join',
            onPress: () =>
              activity.update({
                privateInteractions: {
                  ...privateInteractions,
                  requestedUserIDs: privateInteractions.requestedUserIDs.filter(
                    id => id !== uid,
                  ),
                },
              }),
          },
        ]
      } else if (privateInteractions.memberIDs.some(id => id === uid)) {
        actions = [
          {
            message: 'You are a member',
            onPress: console.info,
          },
        ]
      } else {
        actions = [
          {
            message: 'Request to join',
            onPress: () =>
              activity.update({
                privateInteractions: {
                  ...privateInteractions,
                  requestedUserIDs: [...privateInteractions.memberIDs, uid],
                },
              }),
          },
        ]
      }
    } else if (privacy === 'public') {
      if (!publicInteractions) {
        errorMessage = 'Something is wrong: no data for public activity'
      } else if (publicInteractions.goingUserIDs.some(id => id === uid)) {
        actions = [
          {
            message: 'You are going',
            onPress: () =>
              activity.update({
                publicInteractions: {
                  ...publicInteractions,
                  goingUserIDs: publicInteractions.goingUserIDs.filter(
                    id => id !== uid,
                  ),
                },
              }),
          },
        ]
      } else if (publicInteractions.interestedUserIDs.some(id => id === uid)) {
        actions = [
          {
            message: 'You are interested',
            onPress: () =>
              activity.update({
                publicInteractions: {
                  ...publicInteractions,
                  interestedUserIDs: publicInteractions.interestedUserIDs.filter(
                    id => id !== uid,
                  ),
                },
              }),
          },
        ]
      } else {
        actions = [
          {
            message: 'Going',
            onPress: () =>
              activity.update({
                publicInteractions: {
                  ...publicInteractions,
                  goingUserIDs: [...publicInteractions.goingUserIDs, uid],
                },
              }),
          },
          {
            message: 'Interested',
            onPress: () =>
              activity.update({
                publicInteractions: {
                  ...publicInteractions,
                  interestedUserIDs: [
                    ...publicInteractions.interestedUserIDs,
                    uid,
                  ],
                },
              }),
          },
        ]
      }
    } else {
      errorMessage = 'Something is wrong: unknown kind of activity'
    }

    return {
      error: errorMessage,
      actions,
    }
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
        source={
          profilePicture
            ? { uri: profilePicture }
            : require('../../assets/place_holder/user.png')
        }
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

const SECTION_SPACING = theme.spacing.tight
const SUB_SECTION_SPACING = theme.spacing.tiny

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
  buttonsContainer: {
    marginTop: SECTION_SPACING,
    justifyContent: 'center',
    flexDirection: 'row',
    paddingHorizontal: 20,
  },
  peopleImage: {
    height: 60,
    width: 60,
    borderRadius: theme.roundness,
    marginRight: 12,
  },
  reactionButton: {
    marginLeft: 12,
  },
  tagListContainer: {
    marginTop: SECTION_SPACING,
    marginLeft: -4,
    flexDirection: 'row',
  },
  acceptButtom: {
    color: 'white',
  },
})

export const ActivityDetail = withAuthenticatedUser(ActivityDetailComp)
