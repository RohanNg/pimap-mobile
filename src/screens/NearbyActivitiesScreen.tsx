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
import { ActivityStore, Activity, AppStateStore } from '../datastore'
import { withAuthenticatedUser } from '../services/AuthService'

interface NearByActivitiesScreenState {
  userLoc?: {
    latitude: number
    longitude: number
  }
  nearbyActivities: Activity[]
  errorMessage?: string
}

interface NearByActivitiesScreenProps extends NavigationInjectedProps {
  activityStore: ActivityStore
  user: firebase.User
}

const LatitudeDelta = 0.0422
const LongitudeDelta = 0.0221

class NearbyActivitiesScreenComp extends React.Component<
  NearByActivitiesScreenProps,
  NearByActivitiesScreenState
> {
  public static navigationOptions: NavigationBottomTabScreenOptions = {
    title: 'Nearby',
    tabBarIcon: tabBarIcon('near-me'),
  }

  public state: NearByActivitiesScreenState = {
    nearbyActivities: [],
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
    const { errorMessage, userLoc, nearbyActivities } = this.state
    if (!userLoc) {
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
            ...userLoc,
            latitudeDelta: LatitudeDelta,
            longitudeDelta: LongitudeDelta,
          }}
        >
          {nearbyActivities.map(
            ({
              id,
              value: {
                coordinate: { lat, lon },
              },
            }) => (
              <Marker
                key={id}
                coordinate={{ latitude: lat, longitude: lon }}
                onPress={() =>
                  this.props.navigation.navigate('ActivityPage', {
                    activityID: id,
                  })
                }
              />
            ),
          )}
        </MapView>
      </View>
    )
  }

  private onMapPress = e => {
    this.setState({
      userLoc: {
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

    // Unfortunately, range filter only work for single field
    const activities = await this.props.activityStore.query(c =>
      c
        .where('coordinate.lat', '<=', latitude + LatitudeDelta * 2)
        .where('coordinate.lat', '>=', latitude - LatitudeDelta * 2),
    )

    this.setState({
      userLoc: { latitude, longitude },
      nearbyActivities: activities,
    })
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
