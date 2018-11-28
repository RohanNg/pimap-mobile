import { Facebook } from 'expo'
import * as firebase from 'firebase'
import { inject, observer } from 'mobx-react'
import React, { Component } from 'react'
import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import {
  NavigationScreenProp,
  NavigationStackScreenOptions,
} from 'react-navigation'

import { Button, TextInput, Title } from 'react-native-paper'
import { AppStateStore, User, UserStore, UserValue } from '../../datastore'
import { theme } from '../../theme'

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

import {
  createUserIfNeeded,
  SignInData,
  signInWithSocialAccount,
  signUpWithEmailPassword,
  validation,
} from './socialLoginUtils'

class SignUpScreenComp extends React.Component<
  SignUpScreenProps,
  SignUpScreenState
> {
  public static navigationOptions: NavigationStackScreenOptions = {
    header: null,
  }

  constructor(props: SignUpScreenProps) {
    super(props)
    this.state = {
      email: '',
      password: '',
      firstname: '',
      lastname: '',
    }

    this.signUpWithEmailPassword = this.signUpWithEmailPassword.bind(this)
    this.signUpWithSocialAcc = this.signUpWithSocialAcc.bind(this)
  }

  public render(): React.ReactNode {
    return (
      <ScrollView style={styles.container}>
        <Title style={styles.title}>Sign Up</Title>
        <Text style={{ marginTop: 10 }}>Step 1 / 2: Basic Information</Text>

        <Text style={styles.socialTitle}>
          Sign Up with existing Social Accont
        </Text>
        <View style={styles.socialImageView}>
          <TouchableOpacity
            onPress={() => this.signUpWithSocialAcc('facebook')}
          >
            <Image
              source={require('../../resources/facebook.png')}
              fadeDuration={0}
              style={styles.fbImage}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.signUpWithSocialAcc('google')}>
            <Image
              source={require('../../resources/google.png')}
              fadeDuration={0}
              style={styles.googleImage}
            />
          </TouchableOpacity>
        </View>

        <Text style={styles.socialTitle}>
          Or create new acconnt with your email and password
        </Text>
        <View style={styles.inputNameView}>
          <TextInput
            label="Fist Name"
            style={[styles.nameInput, styles.firstNameInput]}
            mode="outlined"
            autoCorrect={false}
            onChangeText={firstname => this.setState({ firstname })}
            placeholder="Your First Name"
          />
          <TextInput
            label="Last Name"
            style={styles.nameInput}
            mode="outlined"
            autoCorrect={false}
            onChangeText={lastname => this.setState({ lastname })}
            placeholder="Your Last Name"
          />
        </View>

        <TextInput
          label="Email address"
          autoCapitalize="none"
          mode="outlined"
          autoCorrect={false}
          onChangeText={email => this.setState({ email })}
          placeholder="Please enter your email address"
        />
        <TextInput
          label="Password"
          mode="outlined"
          secureTextEntry={true}
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={password => this.setState({ password })}
          placeholder="Please enter your password"
        />
        <Text style={styles.error}> {this.state.error}</Text>
        <Button
          disabled={!this.validateInput()}
          onPress={this.signUpWithEmailPassword}
          mode="contained"
          style={styles.buttonsignup}
        >
          <Text style={styles.btnText}>Next</Text>
        </Button>
      </ScrollView>
    )
  }

  private validateInput(): boolean {
    return (
      validation.EMAIL_REGEX.test(this.state.email.toLowerCase()) &&
      validation.PASSWORD_REGEX.test(this.state.password) &&
      validation.NAME_REGEX.test(this.state.firstname) &&
      validation.NAME_REGEX.test(this.state.lastname)
    )
  }

  private async signUpWithSocialAcc(acc: 'google' | 'facebook'): Promise<void> {
    try {
      const signInData = await signInWithSocialAccount(acc)
      await this.createUserIfNeeded(signInData)
      this.props.navigation.navigate('App')
    } catch (error) {
      this.setState({ error: error.message })
    }
  }

  private async signUpWithEmailPassword(): Promise<void> {
    const { email, password, firstname, lastname } = this.state
    try {
      const signInData = await signUpWithEmailPassword(
        {
          email,
          firstname,
          lastname,
        },
        password,
      )

      this.createUserIfNeeded(signInData)
    } catch (error) {
      this.setState({ error: error.message })
    }
  }

  private createUserIfNeeded = async (signInData: SignInData) => {
    try {
      await createUserIfNeeded(signInData, this.props.userStore)
      const uid = signInData.userCredential.user!.uid
      await this.props.navigation.navigate('HobbyScreen', { userId: uid })
    } catch (error) {
      this.setState({ error: 'Some error occured.' })
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
    flex: 1,
  },
  firstNameInput: {
    marginRight: 12,
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
    marginTop: 32,
    fontWeight: '600',
  },
  socialImageView: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 5,
  },
})

export const SignUpScreen = inject<AppStateStore, SignUpScreenProps>(
  allStores => ({
    userStore: allStores.userStore,
  }),
)(SignUpScreenComp)