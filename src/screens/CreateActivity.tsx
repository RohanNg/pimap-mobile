import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Facebook } from 'expo'
import moment from 'moment'
import * as React from 'react'
import {
  Alert,
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
import { ActivityTaggingInput } from './ActivityTaggingInput'

interface CreateActivityState {
  privateActivity: boolean
  recurrningActivity: boolean
  isDateTimePickerVisible: boolean
  date?: Date
  coordinate?: {
    longitude: number
    latitude: number
  }
}

interface CreateActivityProps {
  navigation: NavigationScreenProp<
    {},
    {
      coordinate: {
        latitude: number
        longitude: number
      }
    }
  >
}

export class CreateActivity extends React.Component<
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

  constructor(props: CreateActivityProps) {
    super(props)
    this.state = {
      privateActivity: true,
      recurrningActivity: false,
      isDateTimePickerVisible: false,
    }

    this.togglePrivateActivity = this.togglePrivateActivity.bind(this)
    this.toggleRecurringActivity = this.toggleRecurringActivity.bind(this)
    this.navigateToLocationSelectionView = this.navigateToLocationSelectionView.bind(
      this,
    )

    this.hideDateTimePicker = this.hideDateTimePicker.bind(this)
    this.showDateTimePicker = this.showDateTimePicker.bind(this)
    this.handleDatePicked = this.handleDatePicked.bind(this)
  }

  public render(): React.ReactNode {
    const { date } = this.state
    return (
      <View style={styles.wrapper}>
        <Appbar.Header>
          <Appbar.Content title="Create a new activity" />
        </Appbar.Header>
        <ScrollView
          style={styles.container}
          removeClippedSubviews={false}
          keyboardShouldPersistTaps={'always'}
        >
          <TextInput
            mode="outlined"
            label="Activity Name"
            style={styles.inputContainerStyle}
            placeholder="Short name of your activities"
            value={undefined}
          />
          <TextInput
            mode="outlined"
            label="Description"
            style={styles.inputContainerStyle}
            placeholder="Please describe your activities"
            value={undefined}
            multiline={true}
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
                  ? `${this.state.coordinate.latitude},${
                      this.state.coordinate.longitude
                    }`
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
          <ActivityTaggingInput style={{ marginHorizontal: 8 }} />
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
            <Button mode="contained" style={styles.submitButton}>
              <Text>Create</Text>
            </Button>
          </View>
        </ScrollView>
      </View>
    )
  }

  private navigateToLocationSelectionView(): void {
    this.props.navigation.navigate('LocationSelection')
  }

  private showDateTimePicker(): void {
    this.setState({ isDateTimePickerVisible: true })
  }

  private hideDateTimePicker(): void {
    this.setState({ isDateTimePickerVisible: false })
  }

  private handleDatePicked(date: Date): void {
    this.setState({
      isDateTimePickerVisible: false,
      date,
    })
  }

  private togglePrivateActivity(): void {
    this.setState(({ privateActivity }) => {
      return {
        privateActivity: !privateActivity,
      }
    })
  }

  private toggleRecurringActivity(): void {
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
  submitButton: { backgroundColor: '#F27979', width: 120 },
})
