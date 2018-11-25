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
  TouchableOpacity,
  View,
} from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import { Appbar } from 'react-native-paper'
import {
  createStackNavigator,
  NavigationBottomTabScreenOptions,
  NavigationContainer,
  NavigationScreenConfig,
  NavigationScreenProp,
} from 'react-navigation'

import { tabBarIcon } from '../components/navigation/tabBarIcon'
import { withAuthenticatedUser } from '../services/AuthService'
import { theme } from '../theme'

interface LocationSelectionState {
  coordinate?: {
    latitude: number
    longitude: number
  }
  errorMessage?: string
}

interface LocationSelectionProps {
  navigation: NavigationScreenProp<{}, {}>
}

export class LocationSelection extends React.Component<
  LocationSelectionProps,
  LocationSelectionState
> {
  public static navigationOptions: NavigationBottomTabScreenOptions = {
    tabBarVisible: false,
  }

  constructor(props: LocationSelectionProps) {
    super(props)
    this.onMapPress = this.onMapPress.bind(this)

    this.state = {
      coordinate: undefined,
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
    const { navigation } = this.props

    return (
      <View style={styles.container}>
        {!this.state.coordinate ? (
          <View
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
          >
            <ActivityIndicator />
          </View>
        ) : (
          <React.Fragment>
            <MapView
              style={styles.map}
              initialRegion={{
                ...this.state.coordinate,
                latitudeDelta: 0.0422,
                longitudeDelta: 0.0221,
              }}
              onPress={this.onMapPress}
            >
              <Marker coordinate={this.state.coordinate} />
            </MapView>
            {this.state.coordinate && (
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  onPress={() => {
                    const { latitude, longitude } = this.state.coordinate!
                    this.props.navigation.navigate('CreateActivity', {
                      coordinate: { lat: latitude, lon: longitude },
                    })
                  }}
                  style={styles.bubble}
                >
                  <Text>Back</Text>
                </TouchableOpacity>
              </View>
            )}
          </React.Fragment>
        )}
      </View>
    )
  }

  private onMapPress(e: {}): void {
    const event = e as {
      nativeEvent: {
        coordinate: {
          latitude: number
          longitude: number
        }
      }
    }
    this.setState({
      coordinate: event.nativeEvent.coordinate,
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
      coordinate: {
        latitude,
        longitude,
      },
    })
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  button: {
    width: 80,
    paddingHorizontal: 12,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginVertical: 20,
    backgroundColor: 'transparent',
  },
  bubble: {
    backgroundColor: 'rgba(242, 121, 121, 0.7)',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 12,
  },
})
