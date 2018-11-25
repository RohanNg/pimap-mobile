import * as firebase from 'firebase'
import React, { Component } from 'react'
import {
  Alert,
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native'
import {
  NavigationScreenProp,
  NavigationStackScreenOptions,
} from 'react-navigation'
import { SignUpScreen } from './SignUpScreen'

interface PasswordRecoveryScreenProps {
  navigation: NavigationScreenProp<{}, {}>
}

interface PasswordRecoveryScreenState {
  email: string
  error?: string
}

export class PasswordRecoveryScreen extends Component<
  PasswordRecoveryScreenProps,
  PasswordRecoveryScreenState
> {
  public static navigationOptions: NavigationStackScreenOptions = {
    title: 'Password Recovery',
  }

  constructor(props: PasswordRecoveryScreenProps) {
    super(props)
    this.state = {
      email: '',
    }

    this.sendResetPasswordEmail = this.sendResetPasswordEmail.bind(this)
  }

  public render(): React.ReactNode {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>User's email</Text>
        <Text style={styles.error}>{this.state.error}</Text>
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          style={styles.textInput}
          onChangeText={email => this.setState({ email })}
          placeholder="Email"
        />
        <Button
          disabled={!this.validateInput()}
          onPress={this.sendResetPasswordEmail}
          title="Submit"
        />
      </View>
    )
  }

  private validateInput(): boolean {
    return SignUpScreen.EMAIL_REGEX.test(this.state.email.toLowerCase())
  }

  private async sendResetPasswordEmail(): Promise<void> {
    const { email } = this.state
    // https://firebase.google.com/docs/reference/js/firebase.auth.Auth#sendPasswordResetEmail
    try {
      await firebase.auth().sendPasswordResetEmail(email)
      this.props.navigation.navigate('LogIn')
    } catch (error) {
      const errorCode = error.code
      let errorMessage = error.errorMessage

      if (errorCode === 'auth/invalid-email') {
        errorMessage = 'Invalid email address'
      } else if (errorCode === 'auth/user-not-found') {
        errorMessage = 'No user corresponding to the email address'
      }

      this.setState({ error: errorMessage })
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  textInput: {
    margin: 10,
    paddingLeft: 20,
  },
  error: {
    textAlign: 'center',
    padding: 20,
    color: 'red',
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
  },
})
