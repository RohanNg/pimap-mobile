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

import { inject, observer } from 'mobx-react'

import { theme } from '../theme'
import { UserValue, User, UserStore } from '../datastore'
import { AppStateStore } from '../datastore'

interface HobbyScreenProps {
  navigation: NavigationScreenProp<{}, {}>
  userStore: UserStore
}

interface HobbyScreenState {
  hobby: string[]
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

@inject<AppStateStore, HobbyScreenProps>(allStores => ({
  userStore: allStores.userStore,
}))
@observer
export class HobbyScreen extends React.Component<
  HobbyScreenProps,
  HobbyScreenState
> {
  constructor(props: HobbyScreenProps) {
    super(props)
    this.state = {
      hobby: [],
    }
  }

  private additem = (item: string) => {
    let a = this.state.hobby.concat(item) //creates the clone of the state

    this.setState({ hobby: a })
  }

  public render(): React.ReactNode {
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
                  this.additem(item)
                  console.log(this.state.hobby)
                }}
                key={item}
              >
                {item}
              </Chip>
            )
          })}
        </View>

        <Button
          mode="contained"
          style={styles.buttonsignup}
          onPress={this.addHobby}
        >
          <Text style={styles.btnText}>I'M DONE!</Text>
        </Button>
      </View>
    )
  }

  private addHobby = async () => {
    const hobbies = this.state.hobby
    const user = firebase.auth().currentUser
    //console.log(hobbies)
    if (user != null) {
      const uid = user.uid
      console.log(uid)

      await this.props.userStore.updateUserHobby(uid, hobbies)
      await this.props.navigation.navigate('Home')
    }
    return undefined
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
