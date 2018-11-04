import { Facebook } from 'expo'
import * as React from 'react'
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import {
  createStackNavigator,
  NavigationBottomTabScreenOptions,
  NavigationContainer,
  NavigationScreenConfig,
  NavigationScreenProp,
} from 'react-navigation'

import moment from 'moment'

import DateTimePicker from 'react-native-modal-datetime-picker'

import { Button } from 'react-native-paper'

import { MaterialCommunityIcons } from '@expo/vector-icons'

import * as firebase from 'firebase'
import { tabBarIcon } from '../components/navigation/tabBarIcon'

import {
  Appbar,
  Paragraph,
  Subheading,
  Switch,
  TextInput,
} from 'react-native-paper'

import { ActivityTaggingInput } from './ActivityTaggingInput'

interface CreateActivityState {
  privateActivity: boolean
  recurrningActivity: boolean
  isDateTimePickerVisible: boolean
  date?: Date
}

interface MyActivitiesProps {
  navigation: NavigationScreenProp<{}, {}>
}

export class MyActivities extends React.Component<
  MyActivitiesProps,
  CreateActivityState
> {
  public static navigationOptions: NavigationBottomTabScreenOptions = {
    title: 'My Activities',
    tabBarIcon: tabBarIcon('list'),
  }

  constructor(props: MyActivitiesProps) {
    super(props)
    this.state = {
      privateActivity: true,
      recurrningActivity: false,
      isDateTimePickerVisible: false,
    }

    this.togglePrivateActivity = this.togglePrivateActivity.bind(this)
    this.toggleRecurringActivity = this.toggleRecurringActivity.bind(this)

    this.hideDateTimePicker = this.hideDateTimePicker.bind(this)
    this.showDateTimePicker = this.showDateTimePicker.bind(this)
    this.handleDatePicked = this.handleDatePicked.bind(this)
  }

  public render(): React.ReactNode {
    const { date } = this.state
    return (
      <View style={styles.wrapper}>
        <Appbar.Header>
          <Appbar.Content title="Create Activity" />
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
          <TextInput
            mode="outlined"
            label="Location"
            style={styles.inputContainerStyle}
            placeholder="Please type the activity location"
            value={undefined}
          />
          <View style={styles.inputContainerStyle}>
            <Subheading>Time for my activity</Subheading>
            <Button
              onPress={this.showDateTimePicker}
              mode={'outlined'}
              icon={getIcon}
            >
              <Text>{date ? this.format(date) : 'Set time'}</Text>
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
                My activity is{' '}
                {this.state.privateActivity ? 'private' : 'public'}
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
                My activity is{' '}
                {this.state.recurrningActivity ? 'recurrning' : 'one time'}
              </Subheading>
              <Switch
                value={!this.state.recurrningActivity}
                onValueChange={this.toggleRecurringActivity}
              />
            </View>
            {this.state.recurrningActivity && (
              <Paragraph>
                You will be asked to confirm the next occurence.
              </Paragraph>
            )}
          </View>
        </ScrollView>
      </View>
    )
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
    return moment(date).format('ddd DD MMM at hh:mm')
  }
}

const getIcon = ({ color, size }: { color: string; size: number }) => {
  return <MaterialCommunityIcons size={size} color={color} name={'calendar'} />
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
})
