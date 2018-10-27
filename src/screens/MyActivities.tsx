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

import { Appbar, TextInput } from 'react-native-paper'

interface MyActivitiesProps {
  navigation: NavigationScreenProp<{}, {}>
}

export class MyActivities extends React.Component<MyActivitiesProps> {
  public static navigationOptions: NavigationBottomTabScreenOptions = {
    title: 'My Activities',
    tabBarIcon: tabBarIcon('list'),
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
})
