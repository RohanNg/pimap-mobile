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
import { theme } from '../../theme'
import { SignUpScreen } from './SignUpScreen'

import {
  loginWithEmailPassword,
  signInWithFacebook,
  signInWithGoogle,
  UserData,
} from './socialLoginUtils'

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
        <Title style={styles.title}>Sign In</Title>
        <Text style={styles.signinSectionMessage}>
          Sign in using Social Media
        </Text>

        <View style={{ flex: 1, flexDirection: 'row', marginTop: 5 }}>
          <TouchableOpacity onPress={this.loginWithFacebook}>
            <Image
              source={require('../../resources/facebook.png')}
              style={styles.socialLoginImage}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={this.loginWithGoogle}>
            <Image
              source={require('../../resources/google.png')}
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
    try {
      const { userCredential, userData } = await signInWithFacebook()
      this.props.navigation.navigate('App')
    } catch (error) {
      this.setState({ error: error.message })
    }
  }

  private async loginWithGoogle(): Promise<void> {
    try {
      await signInWithGoogle()
      this.props.navigation.navigate('App')
    } catch (error) {
      this.setState({ error: error.message })
    }
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
    try {
      await loginWithEmailPassword(email, password)
      navigation.navigate('App')
    } catch (error) {
      this.setState({
        error: error.message,
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
