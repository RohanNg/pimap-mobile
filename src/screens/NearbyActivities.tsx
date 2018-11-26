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
  createStackNavigator,
  NavigationBottomTabScreenOptions,
  NavigationContainer,
  NavigationScreenConfig,
  NavigationScreenProp,
} from 'react-navigation'

import MapView, { Marker } from 'react-native-maps'

import { tabBarIcon } from '../components/navigation/tabBarIcon'
import { withAuthenticatedUser } from '../services/AuthService'

interface NearByActivitiesState {
  location?: {
    lat: number
    lon: number
  }
  errorMessage?: string
}

interface NearByActivityProps {
  navigation: NavigationScreenProp<{}, {}>
  user: firebase.User
}

export class NearbyActivities extends React.Component<
  NearByActivityProps,
  NearByActivitiesState
> {
  public static navigationOptions: NavigationBottomTabScreenOptions = {
    title: 'Nearby',
    tabBarIcon: tabBarIcon('near-me'),
  }

  constructor(props: NearByActivityProps) {
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
      this.getLocationAsync()
    }
  }

  public render(): React.ReactNode {
    const { navigation, user } = this.props

    return (
      <View style={styles.wrapper}>
        {!this.state.location ? (
          <View
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
          >
            <ActivityIndicator />
          </View>
        ) : (
          <MapView
            style={{ flex: 1 }}
            initialRegion={{
              latitude: this.state.location.lat,
              longitude: this.state.location.lon,
              latitudeDelta: 0.0422,
              longitudeDelta: 0.0221,
            }}
            onPress={this.onMapPress}
          >
            <Marker
              coordinate={{
                latitude: this.state.location.lat,
                longitude: this.state.location.lon,
              }}
            />
          </MapView>
        )}
      </View>
    )
  }

  private onMapPress(e: any): void {
    this.setState({
      location: {
        lat: e.nativeEvent.coordinate.latitude,
        lon: e.nativeEvent.coordinate.longitude,
      },
    })
  }

  private getLocationAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION)
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      })
    }

    const {
      coords: { latitude, longitude },
    } = await Location.getCurrentPositionAsync({})
    this.setState({
      location: {
        lat: latitude,
        lon: longitude,
      },
    })
  }
}

const styles = StyleSheet.create({
  wrapper: { flex: 1 },
})
