import { MaterialCommunityIcons } from '@expo/vector-icons'
import { ImagePicker, Permissions } from 'expo'
import * as Immutable from 'immutable'
import { inject, observer } from 'mobx-react'
import moment from 'moment'
import * as React from 'react'
import {
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native'
import DateTimePicker from 'react-native-modal-datetime-picker'
import {
  Appbar,
  Button,
  Headline,
  Paragraph,
  Subheading,
  Switch,
  Text,
  TextInput,
  Title,
} from 'react-native-paper'
import {
  createStackNavigator,
  NavigationBottomTabScreenOptions,
  NavigationContainer,
  NavigationScreenConfig,
  NavigationScreenProp,
} from 'react-navigation'

import { tabBarIcon } from '../components/navigation/tabBarIcon'
import { ActivityTaggingInput } from '../components/tags'

import { Header } from '../components/header'

import { Activity, ActivityStore, ActivityValue } from '../datastore'
import { AppStateStore } from '../datastore'
import { uploadImage } from '../services/FireBase'
import { theme } from '../theme'

interface CreateActivityState {
  title: string
  description: string
  privateActivity: boolean
  recurrningActivity: boolean
  isDateTimePickerVisible: boolean
  tags: Immutable.Set<string>
  date?: Date
  coordinate?: {
    lon: number
    lat: number
  }
  creatingInprogress: boolean
  coverImage: string
}

interface CreateActivityProps {
  navigation: NavigationScreenProp<
    {},
    {
      coordinate: {
        lat: number
        lon: number
      }
    }
  >
  user: firebase.User
  activityStore: ActivityStore
}

class CreateActivityComp extends React.Component<
  CreateActivityProps,
  CreateActivityState
> {
  public static navigationOptions: NavigationBottomTabScreenOptions = {
    title: 'Activities',
    tabBarIcon: tabBarIcon('list'),
  }

  public static getDerivedStateFromProps(
    props: CreateActivityProps,
    state: CreateActivityState,
  ): CreateActivityState | null {
    const propsCoordinate = props.navigation.getParam('coordinate')
    if (propsCoordinate) {
      return {
        ...state,
        coordinate: propsCoordinate,
      }
    }

    return null
  }

  public state: CreateActivityState = {
    privateActivity: true,
    recurrningActivity: false,
    isDateTimePickerVisible: false,
    tags: Immutable.Set(),
    title: '',
    description: '',
    creatingInprogress: false,
    coverImage: '',
  }

  public render(): React.ReactNode {
    const { date, creatingInprogress, coverImage } = this.state

    if (creatingInprogress) {
      return (
        <View style={styles.wrapper}>
          <View
            style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}
          >
            <ActivityIndicator />
          </View>
        </View>
      )
    }

    return (
      <View style={styles.wrapper}>
        <Header title="Create Activity">
          <Appbar.Action icon="add-a-photo" onPress={this.pickImage} />
        </Header>
        <ScrollView
          style={styles.container}
          removeClippedSubviews={false}
          keyboardShouldPersistTaps={'always'}
        >
          {coverImage && (
            <View style={styles.coverImageContainer}>
              <Image
                source={{
                  uri: coverImage,
                }}
                style={styles.coverImage}
                resizeMode={'cover'}
              />
            </View>
          )}

          <TextInput
            mode="outlined"
            label="Activity Name"
            style={styles.inputContainerStyle}
            placeholder="Short name of your activities"
            value={undefined}
            onChangeText={this.activityTitleChanged}
          />
          <TextInput
            mode="outlined"
            label="Description"
            style={styles.inputContainerStyle}
            placeholder="Please describe your activities"
            value={undefined}
            multiline={true}
            onChangeText={this.activityDescChanged}
          />
          <View style={[styles.inputContainerStyle, styles.row]}>
            <Subheading>Location</Subheading>
            <Button
              onPress={this.navigateToLocationSelectionView}
              mode={'outlined'}
              icon={locationIcon}
              style={{ minWidth: 180 }}
            >
              <Text>
                {this.state.coordinate
                  ? `${this.state.coordinate.lat.toFixed(
                      4,
                    )},${this.state.coordinate.lon.toFixed(4)}`
                  : 'Set'}
              </Text>
            </Button>
          </View>

          <View style={[styles.inputContainerStyle, styles.row]}>
            <Subheading>Time</Subheading>
            <Button
              onPress={this.showDateTimePicker}
              mode={'outlined'}
              icon={getIcon}
              style={{ minWidth: 180 }}
            >
              <Text>{date ? this.format(date) : 'Set'}</Text>
            </Button>
            <DateTimePicker
              isVisible={this.state.isDateTimePickerVisible}
              onConfirm={this.handleDatePicked}
              onCancel={this.hideDateTimePicker}
              minimumDate={new Date()}
              minuteInterval={5}
              mode={'datetime'}
            />
          </View>
          <ActivityTaggingInput
            style={{ marginHorizontal: 8 }}
            tagSetChanged={this.tagSetChanged}
          />
          <View style={styles.inputContainerStyle}>
            <View style={styles.row}>
              <Subheading>
                {this.state.privateActivity ? 'Private' : 'Public'}
              </Subheading>
              <Switch
                value={!this.state.privateActivity}
                onValueChange={() =>
                  this.setState(({ privateActivity }) => {
                    return {
                      privateActivity: !privateActivity,
                    }
                  })
                }
              />
            </View>
            <Paragraph>
              {this.state.privateActivity
                ? 'To join private activity, one needs to request or invite.\nSensitive activity information is protected.'
                : 'Anyone can mark theirselve as going or interested in this public activity. All information is public visible.'}
            </Paragraph>
          </View>
          <View style={styles.inputContainerStyle}>
            <View style={styles.row}>
              <Subheading>
                {this.state.recurrningActivity ? 'Recurrning' : 'One time'}
              </Subheading>
              <Switch
                value={!this.state.recurrningActivity}
                onValueChange={this.toggleRecurringActivity}
              />
            </View>
            {this.state.recurrningActivity ? (
              <Paragraph>
                You will be asked to confirm the next occurence.
              </Paragraph>
            ) : (
              <Paragraph>This activity happens once.</Paragraph>
            )}
          </View>
          <View style={styles.submitButtonContainer}>
            <Button
              mode="contained"
              style={styles.submitButton}
              onPress={this.createActivity}
              disabled={!this.isInputValid()}
            >
              <Text>Create</Text>
            </Button>
          </View>
        </ScrollView>
      </View>
    )
  }

  private pickImage = async () => {
    // Example https://github.com/expo/firebase-storage-upload-example/blob/master/App.js
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL)

    if (status !== 'granted') {
      alert(
        'Hey! You might want to enable camera roll access for my app, they are good.',
      )
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    })

    if (!result.cancelled) {
      this.setState({ coverImage: result.uri })
    }
  }

  private tagSetChanged = (newTagSet: Immutable.Set<string>) => {
    this.setState({ tags: newTagSet })
  }

  private activityTitleChanged = (title: string) => {
    this.setState({ title })
  }

  private activityDescChanged = (desc: string) => {
    this.setState({ description: desc })
  }

  private isInputValid = () => {
    const {
      title,
      description,
      coordinate,
      date,
      privateActivity,
      recurrningActivity,
      coverImage,
    } = this.state

    return (
      coordinate &&
      date &&
      coverImage &&
      title.trim().length !== 0 &&
      description.trim().length !== 0
    )
  }

  private createActivity = async () => {
    this.setState({ creatingInprogress: true })
    const { user } = this.props
    const {
      title,
      description,
      coordinate,
      date,
      tags,
      privateActivity,
      recurrningActivity,
      coverImage,
    } = this.state

    try {
      const imageURL = await uploadImage(coverImage)
      console.info(imageURL)
    } catch (err) {
      Alert.alert('Uploading image failed.')
      return
    }

    const activity: ActivityValue = {
      description,
      title,
      time: date!,
      images: [],
      tags: tags.toArray(),
      coordinate: coordinate!,
      mode: recurrningActivity ? 'recurring' : 'onetime',
      privacy: privateActivity ? 'private' : 'public',
      creatorID: user.uid,
      coverImage,
    }

    const { id } = await this.props.activityStore.createActivity(activity)

    this.props.navigation.navigate('ActivityPage', {
      activityID: id,
    })
  }

  private navigateToLocationSelectionView = () => {
    this.props.navigation.navigate('LocationSelection')
  }

  private showDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: true })
  }

  private hideDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: false })
  }

  private handleDatePicked = (date: Date) => {
    this.setState({
      isDateTimePickerVisible: false,
      date,
    })
  }

  private togglePrivateActivity = () => {
    this.setState(({ privateActivity }) => {
      return {
        privateActivity: !privateActivity,
      }
    })
  }

  private toggleRecurringActivity = () => {
    this.setState(({ recurrningActivity }) => {
      return {
        recurrningActivity: !recurrningActivity,
      }
    })
  }

  private format(date: Date): string {
    return moment(date).format('hh:mm ddd DD/MM')
  }
}

const getIcon = ({ color, size }: { color: string; size: number }) => {
  return <MaterialCommunityIcons size={size} color={color} name={'calendar'} />
}

const locationIcon = ({ color, size }: { color: string; size: number }) => {
  return (
    <MaterialCommunityIcons
      size={size}
      color={color}
      name={'map-marker-radius'}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
  },
  wrapper: {
    flex: 1,
  },
  inputContainerStyle: {
    margin: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  submitButtonContainer: {
    marginTop: 24,
    alignItems: 'center',
  },
  submitButton: { width: 120 },
  coverImageContainer: {
    margin: 8,
  },
  coverImage: {
    height: 200,
    borderRadius: theme.roundness,
  },
})

export const CreateActivity = inject<AppStateStore, CreateActivityProps>(
  allStores => ({
    activityStore: allStores.activityStore,
  }),
)(CreateActivityComp)
