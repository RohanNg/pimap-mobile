import { Facebook, Google } from 'expo'
import * as firebase from 'firebase'
import { inject } from 'mobx-react'
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
import { Appbar, Button, TextInput, Title } from 'react-native-paper'
import {
  NavigationScreenProp,
  NavigationStackScreenOptions,
} from 'react-navigation'

import { theme } from '../../theme'
import { SignUpScreen } from './SignUpScreen'

import { AppStateStore, UserStore } from '../../datastore'
import {
  createUserIfNeeded,
  loginWithEmailPassword,
  signInWithSocialAccount,
  UserData,
  validation,
} from './socialLoginUtils'

interface LoginScreenProps {
  navigation: NavigationScreenProp<{}, {}>
  userStore: UserStore
}

interface LoginScreenState {
  email: string
  password: string
  error?: string
}

class LoginScreenComp extends Component<LoginScreenProps, LoginScreenState> {
  public static navigationOptions: NavigationStackScreenOptions = {
    header: null,
  }

  public state: LoginScreenState = {
    email: '',
    password: '',
  }

  public render(): React.ReactNode {
    return (
      <ScrollView scrollEventThrottle={16} style={styles.container}>
        <Title style={styles.title}>Sign In</Title>
        <SocialLoginSection loginWithSocialAcc={this.loginWithSocialAcc} />
        <EmailPasswordLoginSecion
          onEmailChange={this.onEmailChange}
          onPasswordChange={this.onPasswordChange}
        />
        <View style={styles.section}>
          {this.state.error && (
            <Text style={styles.error}>{this.state.error}</Text>
          )}
          <Button
            disabled={!this.validateInput()}
            onPress={this.loginWithEmailPassword}
            mode="contained"
            style={styles.loginButton}
          >
            <Text style={{ color: 'white', fontSize: 14 }}>Log In</Text>
          </Button>
        </View>
        <View style={styles.section}>
          <Text
            style={styles.signUpText}
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

  private onEmailChange = (email: string) => this.setState({ email })
  private onPasswordChange = (password: string) => this.setState({ password })

  private loginWithSocialAcc = async (acc: 'facebook' | 'google') => {
    try {
      const signInData = await signInWithSocialAccount(acc)
      const user = await createUserIfNeeded(signInData, this.props.userStore)
      if (user) {
        this.props.navigation.navigate('HobbyScreen')
      } else {
        this.props.navigation.navigate('Home')
      }
    } catch (error) {
      this.setState({ error: error.message })
    }
  }

  private validateInput(): boolean {
    return (
      validation.EMAIL_REGEX.test(this.state.email.toLowerCase()) &&
      validation.PASSWORD_REGEX.test(this.state.password)
    )
  }

  private loginWithEmailPassword = async () => {
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

const SocialLoginSection: React.SFC<{
  loginWithSocialAcc: (s: 'facebook' | 'google') => void
}> = ({ loginWithSocialAcc }) => {
  return (
    <View style={styles.section}>
      <Text style={styles.signinSectionMessage}>
        Sign in using Social Media
      </Text>

      <View style={{ flex: 1, flexDirection: 'row', marginTop: 5 }}>
        <TouchableOpacity onPress={() => loginWithSocialAcc('facebook')}>
          <Image
            source={require('../../resources/facebook.png')}
            style={styles.socialLoginImage}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => loginWithSocialAcc('google')}>
          <Image
            source={require('../../resources/google.png')}
            style={styles.socialLoginImage}
          />
        </TouchableOpacity>
      </View>
    </View>
  )
}

const EmailPasswordLoginSecion: React.SFC<{
  onEmailChange: (s: string) => void
  onPasswordChange: (s: string) => void
}> = ({ onEmailChange, onPasswordChange }) => {
  return (
    <View style={styles.section}>
      <Text style={styles.signinSectionMessage}>
        Or using your Actify account
      </Text>
      <TextInput
        label="Email"
        mode="outlined"
        autoCapitalize="none"
        autoCorrect={false}
        style={styles.inputField}
        onChangeText={onEmailChange}
        placeholder={'Please enter your email address'}
      />
      <TextInput
        label="Password"
        mode="outlined"
        secureTextEntry={true}
        autoCapitalize="none"
        autoCorrect={false}
        style={styles.inputField}
        onChangeText={onPasswordChange}
        placeholder="Please enter your password"
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 90,
    paddingHorizontal: 16,
    backgroundColor: theme.colors!.background,
  },
  section: {
    marginTop: theme.spacing.spacious,
  },
  signinSectionMessage: {
    fontWeight: '600',
  },
  title: {
    fontSize: 32,
    color: theme.colors!.primary,
  },
  inputField: {
    marginTop: theme.spacing.tight,
  },
  error: {
    textAlign: 'center',
  },
  signUpText: {
    textAlign: 'center',
    fontSize: 16,
  },
  forgotPasswordText: {
    marginTop: theme.spacing.tight,
    textAlign: 'center',
    fontSize: 14,
    marginBottom: 30,
  },
  loginButton: {
    height: 40,
    width: 140,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  socialLoginImage: {
    width: 30,
    height: 30,
    marginTop: theme.spacing.tight,
    marginRight: theme.spacing.tiny,
  },
})

export const LoginScreen = inject<AppStateStore, LoginScreenProps>(
  allStores => ({
    userStore: allStores.userStore,
  }),
)(LoginScreenComp)
