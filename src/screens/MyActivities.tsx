import { Facebook } from 'expo'
import * as React from 'react'
import { Alert, Button, ScrollView, StyleSheet, Text, View } from 'react-native'
import {
  createStackNavigator,
  NavigationBottomTabScreenOptions,
  NavigationContainer,
  NavigationScreenConfig,
  NavigationScreenProp,
} from 'react-navigation'

import * as firebase from 'firebase'
import { tabBarIcon } from '../components/navigation/tabBarIcon'

import {
  Appbar,
  Paragraph,
  Subheading,
  Switch,
  TextInput,
} from 'react-native-paper'

interface CreateActivityState {
  privateActivity: boolean
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
    }
  }

  public render(): React.ReactNode {
    return (
      <View style={styles.wrapper}>
        <Appbar.Header>
          <Appbar.Content title="Create Activity" />
        </Appbar.Header>
        <ScrollView style={styles.container} removeClippedSubviews={false}>
          <TextInput
            mode="outlined"
            style={styles.inputContainerStyle}
            label="Activity Name"
            placeholder="Short name of your activities"
            value={undefined}
          />
          <TextInput
            mode="outlined"
            style={styles.inputContainerStyle}
            label="Description"
            placeholder="Please describe your activities"
            value={undefined}
            multiline={true}
          />
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
                ? 'To join private activity, one need to request or invite.\nSensitive activity information is protected.'
                : 'Public activity can be joined by anyone.\nAll information is public visible.'}
            </Paragraph>
          </View>
        </ScrollView>
      </View>
    )
  }
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
