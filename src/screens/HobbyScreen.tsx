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

import * as Immutable from 'immutable'

import { inject, observer } from 'mobx-react'

import { AppStateStore } from '../datastore'
import { User, UserStore } from '../datastore'
import { withAuthenticatedUser } from '../services/AuthService'
import { theme } from '../theme'

interface HobbyScreenProps {
  navigation: NavigationScreenProp<{}, {}>
  userStore: UserStore
  user: firebase.User
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
  }

  public render(): React.ReactNode {
    const { interests } = this.state
    return (
      <View style={styles.container}>
        <Title style={{ fontSize: 24 }}>Sign Up</Title>
        <Text style={{ marginTop: 10 }}>Step 2 / 2</Text>
        <Text style={styles.textHeader}>Tell us your interest</Text>
        <View style={styles.chip}>
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

    await this.props.navigation.navigate('Home')
  }
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 17,
    marginTop: 30,
    marginBottom: 20,
  },
  textHeader: {
    marginTop: 5,
    color: '#F27979',
    fontWeight: '600',
    fontSize: 18,
  },
  chip: {
    marginTop: 15,
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
