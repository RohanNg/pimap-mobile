import { Constants, Facebook, Location, Permissions } from 'expo'
import * as React from 'react'
import {
  ActivityIndicator,
  Alert,
  Button,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import {
  NavigationBottomTabScreenOptions,
  NavigationInjectedProps,
} from 'react-navigation'

import { inject, observer } from 'mobx-react'
import MapView, { Marker } from 'react-native-maps'

import { tabBarIcon } from '../components/navigation/tabBarIcon'
import { ActivityStore, AppStateStore } from '../datastore'
import { withAuthenticatedUser } from '../services/AuthService'

interface NearByActivitiesScreenState {
  location?: {
    latitude: number
    longitude: number
  }
  errorMessage?: string
}

interface NearByActivitiesScreenProps extends NavigationInjectedProps {
  activityStore: ActivityStore
  user: firebase.User
}

class NearbyActivitiesScreenComp extends React.Component<
  NearByActivitiesScreenProps,
  NearByActivitiesScreenState
> {
  public static navigationOptions: NavigationBottomTabScreenOptions = {
    title: 'Nearby',
    tabBarIcon: tabBarIcon('near-me'),
  }

  constructor(props: NearByActivitiesScreenProps) {
    super(props)
    this.onMapPress = this.onMapPress.bind(this)

    this.state = {
      location: undefined,
      errorMessage: undefined,
    }
  }

  public componentWillMount(): void {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        errorMessage:
          'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
      })
    } else {
      this.getNearbyActivities()
    }
  }

  public render(): React.ReactNode {
    const { navigation, user } = this.props
    const { errorMessage, location } = this.state
    if (!location) {
      return (
        <View style={[styles.wrapper, styles.centering]}>
          {errorMessage ? <Text>{errorMessage}</Text> : <ActivityIndicator />}
        </View>
      )
    }

    return (
      <View style={styles.wrapper}>
        <MapView
          style={styles.wrapper}
          initialRegion={{
            ...location,
            latitudeDelta: 0.0422,
            longitudeDelta: 0.0221,
          }}
          onPress={this.onMapPress}
        >
          <Marker coordinate={location} />
        </MapView>
      </View>
    )
  }

  private onMapPress = e => {
    this.setState({
      location: {
        latitude: e.nativeEvent.coordinate.latitude,
        longitude: e.nativeEvent.coordinate.longitude,
      },
    })
  }

  private getNearbyActivities = async () => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION)
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      })
    }

    const {
      coords: { latitude, longitude },
    } = await Location.getCurrentPositionAsync({})
    this.setState({ location: { latitude, longitude } })
    // this.props.activityStore.query(c => c.where(''))
  }
}

const styles = StyleSheet.create({
  wrapper: { flex: 1 },
  centering: { alignItems: 'center', justifyContent: 'center' },
})

export const NearbyActivitiesScreen = inject<
  AppStateStore,
  NearByActivitiesScreenProps
>(allStores => ({
  activityStore: allStores.activityStore,
}))(observer(withAuthenticatedUser(NearbyActivitiesScreenComp)))
