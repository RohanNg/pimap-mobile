import { Facebook } from 'expo'
import * as firebase from 'firebase'
import React, { Component } from 'react'
import {
  Alert,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
} from 'react-native'
import {
  NavigationScreenProp,
  NavigationStackScreenOptions,
} from 'react-navigation'
import { inject, observer } from 'mobx-react'

import { signInWithFacebook, signInWithGoogle } from './LoginScreen'
import { Title, TextInput, Button } from 'react-native-paper'
import { UserValue, User, UserStore } from '../datastore'
import { AppStateStore } from '../datastore'

interface SignUpScreenProps {
  navigation: NavigationScreenProp<{}, {}>
  userStore: UserStore
}

interface SignUpScreenState {
  email: string
  password: string
  firstname: string
  lastname: string
  error?: string
}

@inject<AppStateStore, SignUpScreenProps>(allStores => ({
  userStore: allStores.userStore,
}))
export class SignUpScreen extends React.Component<
  SignUpScreenProps,
  SignUpScreenState
> {
  public static navigationOptions: NavigationStackScreenOptions = {}

  public static readonly EMAIL_REGEX: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  // Spec:
  //   Length > 6
  //   Valid char: "a-z" "0-9" "A-Z" plus special chars in https://www.owasp.org/index.php/Password_special_characters
  public static readonly PASSWORD_REGEX: RegExp = /^[a-z0-9A-Z !"#$%&'()*+,.\/:;<=>?@[\]\\^_`{|}~-]{6,}$/
  public static readonly NAME_REGEX: RegExp = /^[a-zA-Z ]{1,40}$/

  constructor(props: SignUpScreenProps) {
    super(props)
    this.state = {
      email: '',
      password: '',
      firstname: '',
      lastname: '',
    }

    this.signUpWithEmailPassword = this.signUpWithEmailPassword.bind(this)
    this.signUpWithFacebook = this.signUpWithFacebook.bind(this)
    this.signUpWithGoogle = this.signUpWithGoogle.bind(this)
  }

  public render(): React.ReactNode {
    return (
      <ScrollView>
        <View style={styles.container}>
          <Title style={{ fontSize: 24 }}>Sign Up</Title>
          <Text style={{ marginTop: 10 }}>Step 1 / 2</Text>
          <Text style={styles.textLabel}>Basic Information</Text>
          <Text style={styles.texttitle}>Profile Name</Text>
          <View style={styles.inputNameView}>
            <TextInput
              style={styles.nameInput}
              mode="outlined"
              autoCorrect={false}
              onChangeText={firstname => this.setState({ firstname })}
              placeholder="Firstname"
            />
            <TextInput
              style={[styles.nameInput, { marginLeft: 20 }]}
              mode="outlined"
              autoCorrect={false}
              onChangeText={lastname => this.setState({ lastname })}
              placeholder="Lastname"
            />
          </View>

          <Text style={styles.texttitle}>Email Address</Text>

          <TextInput
            autoCapitalize="none"
            mode="outlined"
            autoCorrect={false}
            style={styles.textInput}
            onChangeText={email => this.setState({ email })}
            placeholder="john.doe@gmail.com"
          />
          <Text style={styles.texttitle}>Password</Text>
          <TextInput
            style={styles.textInput}
            mode="outlined"
            secureTextEntry={true}
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={password => this.setState({ password })}
            placeholder="*******"
          />
          <Text style={styles.socialTitle}>Signup using Social Media</Text>
          <View style={styles.socialImageView}>
            <TouchableOpacity onPress={this.signUpWithFacebook}>
              <Image
                source={require('../resources/facebook.png')}
                fadeDuration={0}
                style={styles.fbImage}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={this.signUpWithGoogle}>
              <Image
                source={require('../resources/google.png')}
                fadeDuration={0}
                style={styles.googleImage}
              />
            </TouchableOpacity>
          </View>
          <Text style={styles.error}> {this.state.error}</Text>

          <Button
            disabled={!this.validateInput()}
            onPress={this.signUpWithEmailPassword}
            mode="contained"
            style={styles.buttonsignup}
          >
            <Text style={styles.btnText}>Next</Text>
          </Button>
        </View>
      </ScrollView>
    )
  }

  private validateInput(): boolean {
    return (
      SignUpScreen.EMAIL_REGEX.test(this.state.email.toLowerCase()) &&
      SignUpScreen.PASSWORD_REGEX.test(this.state.password) &&
      SignUpScreen.NAME_REGEX.test(this.state.firstname) &&
      SignUpScreen.NAME_REGEX.test(this.state.lastname)
    )
  }

  private async signUpWithFacebook(): Promise<void> {
    await signInWithFacebook(this.setState, () => {
      this.props.navigation.navigate('Hobby')
    })
  }

  private async signUpWithGoogle(): Promise<void> {
    await signInWithGoogle(this.setState, () =>
      this.props.navigation.navigate('Hobby'),
    )
  }

  private async signUpWithEmailPassword(): Promise<void> {
    const { email, password } = this.state
    // https://firebase.google.com/docs/reference/js/firebase.auth.Auth#createUserWithEmailAndPassword
    try {
      const authCred = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
      const uid = authCred.user!.uid
      this.createUser(uid)
    } catch (error) {
      const errorCode = error.code
      let errorInfo
      if (errorCode === 'auth/weak-password') {
        errorInfo = 'The password is too weak'
      } else if (errorCode === 'auth/email-already-in-use') {
        errorInfo = 'Given email already exists'
      } else if (errorCode === 'auth/invalid-email') {
        errorInfo = 'Given email is invalid'
      } else {
        errorInfo = 'Unknown error! Please contact us'
      }
      this.setState({ error: errorInfo })
    }
  }

  private createUser = async (uid: string) => {
    const { firstname, lastname, password, email } = this.state

    const user: UserValue = {
      firstname,
      lastname,
      password,
      email,
      hobby: [],
    }

    const id = uid
    await this.props.userStore.createUser(user, uid)

    await this.props.navigation.navigate('Hobby', { userId: id })
  }
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 17,
    marginTop: 30,
    marginBottom: 20,
  },
  textLabel: {
    marginTop: 5,
    color: '#F27979',
    fontWeight: '600',
    fontSize: 18,
  },
  texttitle: {
    marginTop: 16,
  },
  textInput: {
    marginTop: 1,
    height: 46,
  },
  error: {
    textAlign: 'center',
  },
  nameInput: {
    height: 46,
    marginTop: 1,
    width: 130,
  },
  nameInputRow: {
    flex: 1,
    flexDirection: 'row',
  },
  buttonsignup: {
    marginTop: 20,
    height: 40,
    width: 140,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  btnText: {
    color: 'white',
    fontSize: 14,
  },
  inputNameView: {
    flexDirection: 'row',
    paddingRight: 17,
  },
  googleImage: {
    width: 30,
    height: 30,
    marginTop: 10,
    marginLeft: 10,
  },
  fbImage: {
    width: 30,
    height: 30,
    marginTop: 10,
  },
  socialTitle: {
    marginTop: 10,
    fontWeight: '600',
  },
  socialImageView: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 5,
  },
})
