import * as firebase from 'firebase'
import * as React from 'react'
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import { Button, Chip, TextInput, Title } from 'react-native-paper'
import {
  NavigationScreenProp,
  NavigationStackScreenOptions,
} from 'react-navigation'
import {
  NavigationState,
  Route,
  SceneMap,
  SceneRendererProps,
  TabBar,
  TabView,
} from 'react-native-tab-view'

import * as Immutable from 'immutable'

import { inject, observer } from 'mobx-react'
import { withAuthenticatedUser } from '../services/AuthService'

import { AppStateStore } from '../datastore'
<<<<<<< HEAD
import { userInfo } from 'os'
=======
import { User, UserStore } from '../datastore'
import { withAuthenticatedUser } from '../services/AuthService'
import { theme } from '../theme'
>>>>>>> b1f9f0f91abb7141e3af7c16328f5f160f77cdbb

interface HobbyScreenProps {
  navigation: NavigationScreenProp<{}, { uid: string }>
  userStore: UserStore
<<<<<<< HEAD
  newUser: User
=======
  user: firebase.User
>>>>>>> b1f9f0f91abb7141e3af7c16328f5f160f77cdbb
}

interface HobbyScreenState {
  interests: Immutable.OrderedSet<string>
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

<<<<<<< HEAD
@inject<AppStateStore, HobbyScreenProps>(allStores => ({
  userStore: allStores.userStore,
}))
@observer
class AddHobbyScreen extends React.Component<
  HobbyScreenProps & { user: firebase.User },
  HobbyScreenState
> {
  public state: HobbyScreenState = {
    hobby: [],
  }

  private addInterests = (item: string) => {
    const a = this.state.hobby.concat(item) //creates the clone of the state

    this.setState({ hobby: a })
=======
export class HobbyScreenComp extends React.Component<
  HobbyScreenProps,
  HobbyScreenState
> {
  constructor(props: HobbyScreenProps) {
    super(props)
    this.state = {
      interests: Immutable.OrderedSet(),
    }
  }

  private addInterests = (interest: string) => {
    this.setState(({ interests }) => ({
      interests: interests.add(interest),
    }))
>>>>>>> b1f9f0f91abb7141e3af7c16328f5f160f77cdbb
  }
  

  public render(): React.ReactNode {
<<<<<<< HEAD
    
=======
    const { interests } = this.state
>>>>>>> b1f9f0f91abb7141e3af7c16328f5f160f77cdbb
    return (
      <View style={styles.container}>
        <Title style={styles.title}>Sign Up</Title>
        <Text style={styles.subTitle}>
          Step 2 / 2: Tell us about your interest
        </Text>
        <View style={styles.chipContainer}>
          {hobbyList.map(item => {
            return (
              <Chip
                mode="outlined"
                style={styles.chipitem}
                onPress={() => {
                  this.addInterests(item)
                }}
                key={item}
                selected={interests.has(item)}
              >
                {item}
              </Chip>
            )
          })}
        </View>

        <Button
          mode="contained"
          style={styles.buttonsignup}
          onPress={this.addInterest}
        >
          <Text style={styles.btnText}>Done!</Text>
        </Button>
      </View>
    )
  }

<<<<<<< HEAD
  private addHobby = async () => {
    const hobbies = this.state.hobby
    const uid = this.props.user.uid
    this.props.userStore.updateUserHobby(uid, hobbies)
=======
  private addInterest = async () => {
    const { interests } = this.state
    const { user, userStore } = this.props

    const u = await userStore.getUser(user.uid)
    if (!u) {
      return console.error('User does not exist')
    }

    await u.update({
      interests: interests.toArray(),
    })

>>>>>>> b1f9f0f91abb7141e3af7c16328f5f160f77cdbb
    await this.props.navigation.navigate('Home')
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
  chipContainer: {
    marginTop: theme.spacing.spacious,
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

<<<<<<< HEAD
export const HobbyScreen = withAuthenticatedUser(AddHobbyScreen)
=======
export const HobbyScreen = inject<AppStateStore, HobbyScreenProps>(
  allStores => ({
    userStore: allStores.userStore,
  }),
)(observer(withAuthenticatedUser(HobbyScreenComp)))
>>>>>>> b1f9f0f91abb7141e3af7c16328f5f160f77cdbb
