import { Facebook, Google } from 'expo'
import * as firebase from 'firebase'
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

import { Appbar, Button, TextInput, Title } from 'react-native-paper'
import { SignUpScreen } from './SignUpScreen'
import { theme } from '../theme'

interface LoginScreenProps {
  navigation: NavigationScreenProp<{}, {}>
}

interface LoginScreenState {
  email: string
  password: string
  error?: string
}

export class LoginScreen extends Component<LoginScreenProps, LoginScreenState> {
  public static navigationOptions: NavigationStackScreenOptions = {
    header: null,
  }

  constructor(props: LoginScreenProps) {
    super(props)
    this.state = {
      email: '',
      password: '',
    }

    this.loginWithEmailPassword = this.loginWithEmailPassword.bind(this)
    this.loginWithFacebook = this.loginWithFacebook.bind(this)
    this.loginWithGoogle = this.loginWithGoogle.bind(this)
  }

  public render(): React.ReactNode {
    return (
      <ScrollView style={styles.container}>
        <Title style={styles.title}>Sign in</Title>
        <Text style={styles.signinSectionMessage}>
          Sign In using Social Media
        </Text>

        <View style={{ flex: 1, flexDirection: 'row', marginTop: 5 }}>
          <TouchableOpacity onPress={this.loginWithFacebook}>
            <Image
              source={require('../resources/facebook.png')}
              style={styles.socialLoginImage}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={this.loginWithGoogle}>
            <Image
              source={require('../resources/google.png')}
              style={styles.socialLoginImage}
            />
          </TouchableOpacity>
        </View>

        <Text style={styles.signinSectionMessage}>
          Or using your Actify account
        </Text>
        <View style={{ marginTop: 10 }}>
          <TextInput
            label="Email"
            mode="outlined"
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={email => this.setState({ email })}
            placeholder={'Please enter your email address'}
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
          {this.state.error && (
            <Text style={styles.error}>{this.state.error}</Text>
          )}
          <Button
            disabled={!this.validateInput()}
            onPress={this.loginWithEmailPassword}
            mode="contained"
            style={styles.loginButton}
          >
            <Text style={{ color: 'white', fontSize: 14 }}>Log in</Text>
          </Button>
          <Text
            style={[styles.signUpText, styles.signUpMargin]}
            onPress={() => this.props.navigation.navigate('SignUp')}
          >
            Sign up as a new user!
          </Text>
          <Text
            style={styles.forgotPasswordText}
            onPress={() => this.props.navigation.navigate('PasswordRecovery')}
          >
            Forget password
          </Text>
        </View>
      </ScrollView>
    )
  }

  private async loginWithFacebook(): Promise<void> {
    await signInWithFacebook(this.setState, () =>
      this.props.navigation.navigate('App'),
    )
  }

  private async loginWithGoogle(): Promise<void> {
    await signInWithGoogle(this.setState, () =>
      this.props.navigation.navigate('App'),
    )
  }

  private validateInput(): boolean {
    return (
      SignUpScreen.EMAIL_REGEX.test(this.state.email.toLowerCase()) &&
      SignUpScreen.PASSWORD_REGEX.test(this.state.password)
    )
  }

  private async loginWithEmailPassword(): Promise<void> {
    const { email, password } = this.state
    const { navigation } = this.props
    // https://firebase.google.com/docs/reference/js/firebase.auth.Auth.html#signInWithEmailAndPassword
    try {
      const authCred = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
      navigation.navigate('App')
    } catch (error) {
      const errorCode = error.code
      const errorMessage = error.message
      let errorInfo
      if (errorCode === 'auth/invalid-email') {
        errorInfo = 'Invalid email provided'
      } else if (errorCode === 'auth/user-disabled') {
        errorInfo = 'Given email has been disabled. Please contact us!'
      } else {
        errorInfo = 'Non-registered email address or wrong password'
      }
      this.setState({
        error: errorInfo,
      })
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
  signinSectionMessage: {
    marginTop: 32,
    fontWeight: '600',
  },
  title: {
    fontSize: 32,
    color: theme.colors!.primary,
  },
  error: {
    textAlign: 'center',
  },
  signUpMargin: {
    marginTop: 42,
  },
  signUpText: {
    marginTop: 20,
    textAlign: 'center',
    fontSize: 16,
  },
  forgotPasswordText: {
    marginTop: 8,
    textAlign: 'center',
    fontSize: 14,
  },
  loginButton: {
    marginTop: 20,
    height: 40,
    width: 140,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  socialLoginImage: {
    width: 30,
    height: 30,
    marginTop: 10,
    marginRight: 10,
  },
})

export async function signInWithGoogle(
  setState: (_: { error: string }) => void,
  success: (_: firebase.auth.UserCredential) => void,
): Promise<void> {
  const res = await Google.logInAsync({
    // IOS client id from GoogleService-Info.plist in Firebase
    iosClientId:
      '322720395519-duuh4hirp37ilde6tqb7a4nmpn6a2v9v.apps.googleusercontent.com',
    scopes: ['profile', 'email'],
    behavior: 'web',
  })

  if (res.type === 'cancel') {
    return Alert.alert('Cancelled!', 'Login was cancelled!')
  }

  const { email, familyName, givenName, name, photoUrl, id } = res.user

  const credential = firebase.auth.GoogleAuthProvider.credential(
    res.idToken,
    res.accessToken,
  )

  await signInWithCredential(credential, email!, setState, success)
}

export async function signInWithFacebook(
  setState: (_: { error: string }) => void,
  success: (_: firebase.auth.UserCredential) => void,
): Promise<void> {
  const { type, token } = await Facebook.logInWithReadPermissionsAsync(
    '1051395471700487',
    {
      permissions: ['public_profile', 'email'],
    },
  )

  if (type !== 'success' || !token) {
    return Alert.alert('Cancelled!', 'Login was cancelled!')
  }

  const response = await fetch(
    `https://graph.facebook.com/me?access_token=${token}&fields=name,email,first_name,last_name`,
  )

  const fbProfile: {
    email: string
    first_name: string
    last_name: string
    name: string
    id: string
    picture: string
    short_name: string
  } = await response.json()

  console.info(fbProfile)
  Alert.alert('Logged in!', `Hi ${fbProfile.name}!`)

  await signInWithCredential(
    firebase.auth.FacebookAuthProvider.credential(token),
    fbProfile.email,
    setState,
    success,
  )
}

async function signInWithCredential(
  cred: firebase.auth.AuthCredential,
  email: string,
  setState: (_: { error: string }) => void,
  success: (_: firebase.auth.UserCredential) => void,
): Promise<void> {
  // https://firebase.google.com/docs/reference/js/firebase.auth.Auth#signInAndRetrieveDataWithCredential
  try {
    const authCredentials = await firebase
      .auth()
      .signInAndRetrieveDataWithCredential(cred)
    success(authCredentials)
  } catch (error) {
    const errorCode = error.code
    const errorMessage = error.message
    let errorInfo
    if (errorCode === 'auth/account-exists-with-different-credential') {
      const otherCredentialProviders = await firebase
        .auth()
        .fetchProvidersForEmail(email)
      errorInfo = `You could not login with Facebook for now. Please login with ${otherCredentialProviders.join(
        ', or',
      )}.`
    } else if (errorCode === 'auth/invalid-credential') {
      errorInfo = 'Invalid Facebook credentials. Please retry.'
    } else if (errorCode === 'auth/user-disabled') {
      errorInfo = 'This account been disabled. Please contact us.'
    } else {
      console.info(errorCode, errorMessage)
      errorInfo = 'Could not log you in. Please retry.'
    }

    setState({ error: errorInfo })
  }
}
