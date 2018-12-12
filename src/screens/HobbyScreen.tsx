import * as firebase from 'firebase'
import * as Immutable from 'immutable'
import { inject, observer } from 'mobx-react'
import * as React from 'react'
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native'
import { Button, Chip, TextInput, Title } from 'react-native-paper'
import {
  NavigationScreenProp,
  NavigationStackScreenOptions,
} from 'react-navigation'

import { AppStateStore } from '../datastore'
import { User, UserStore } from '../datastore'
import { withAuthenticatedUser } from '../services/AuthService'
import { theme } from '../theme'
import { pickImage } from '../utils'
import { uploadImage } from '../services/FireBase'

interface HobbyScreenProps {
  navigation: NavigationScreenProp<{}, {}>
  userStore: UserStore
  user: firebase.User
}

interface HobbyScreenState {
  user: User | 'loading' | 'error'
  interests: Immutable.OrderedSet<string>
  profileImageURL?: string
}

const hobbyList = [
  'Gaming',
  'Art',
  'Music',
  'Political movement',
  'TV Show',
  'Adult',
  'Tech',
  'Science',
  'Sport',
  'Cultural',
  'Pet',
  'Nature',
  'Outdoor',
]

export class HobbyScreenComp extends React.Component<
  HobbyScreenProps,
  HobbyScreenState
> {
  public state: HobbyScreenState = {
    user: 'loading',
    interests: Immutable.OrderedSet(),
  }

  public async componentDidMount(): Promise<void> {
    const { user, userStore } = this.props
    const u = await userStore.getUser(user.uid)
    if (!u) {
      return this.setState({ user: 'error' })
    }

    this.setState({
      user: u,
      interests: Immutable.OrderedSet(u.value.interests),
      profileImageURL: u.value.profilePicture,
    })
  }

  public render(): React.ReactNode {
    const { interests, profileImageURL } = this.state
    return (
      <View style={styles.container}>
        <Title style={styles.title}>Sign Up</Title>
        <Text style={styles.subTitle}>
          Step 2 / 2: Tell us about your interest and image upload
        </Text>
        <View style={styles.section}>
          <Title>Interest</Title>
          <View style={styles.chipContainer}>
            {hobbyList.map(item => {
              const selected = interests.has(item)
              return (
                <Chip
                  mode="outlined"
                  style={styles.chipitem}
                  onPress={() => this.updateInterests(item, !selected)}
                  key={item}
                  selected={selected}
                >
                  {item}
                </Chip>
              )
            })}
          </View>
        </View>
        <View style={styles.section}>
          <Title>Profile Image</Title>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <Button
              style={{ marginRight: 40 }}
              mode="outlined"
              onPress={this.pickProfileImage}
            >
              Upload
            </Button>
            <TouchableOpacity
              style={{
                borderRadius: theme.roundness,
                borderColor: theme.colors!.primary,
                borderWidth: 1,
                flexDirection: 'row',
              }}
              onPress={this.pickProfileImage}
            >
              <Image
                source={
                  profileImageURL
                    ? { uri: profileImageURL }
                    : require('../assets/place_holder/user.png')
                }
                style={{ resizeMode: 'cover', width: 90, height: 90 }}
              />
            </TouchableOpacity>
          </View>
        </View>
        <Button
          mode="contained"
          style={styles.buttonsignup}
          onPress={this.updateUserProfile}
          disabled={!profileImageURL}
        >
          <Text style={styles.btnText}>Done!</Text>
        </Button>
      </View>
    )
  }

  private updateInterests = (interest: string, add: boolean) => {
    this.setState(({ interests }) => ({
      interests: add ? interests.add(interest) : interests.remove(interest),
    }))
  }

  private updateUserProfile = async () => {
    const { interests, profileImageURL, user: u } = this.state
    const user = u as User
    let imageURL = (user as User).value.profilePicture
    const update: {
      interests: string[]
      profilePicture?: string
    } = {
      interests: interests.toArray(),
    }

    if (imageURL !== profileImageURL) {
      try {
        imageURL = await uploadImage(profileImageURL!)
        update.profilePicture = profileImageURL
      } catch (err) {
        Alert.alert('Uploading image failed.')
        return
      }
    }

    await user.update(update)

    await this.props.navigation.navigate('Home')
  }

  private pickProfileImage = async () => {
    const result = await pickImage()
    if (!result.cancelled) {
      this.setState({ profileImageURL: result.uri })
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 90,
    paddingHorizontal: 16,
    backgroundColor: theme.colors!.background,
  },
  title: { fontSize: 32, color: theme.colors!.primary },
  subTitle: {
    marginTop: theme.spacing.tiny,
  },
  section: {
    marginTop: theme.spacing.spacious,
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  texttitle: {
    marginTop: 16,
  },

  error: {
    textAlign: 'center',
  },
  buttonsignup: {
    marginBottom: 30,
    marginTop: 40,
    height: 40,
    width: 140,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  chipitem: {
    margin: 3,
    alignContent: 'center',
  },
  btnText: {
    color: 'white',
    fontSize: 14,
  },
})

export const HobbyScreen = inject<AppStateStore, HobbyScreenProps>(
  allStores => ({
    userStore: allStores.userStore,
  }),
)(observer(withAuthenticatedUser(HobbyScreenComp)))
