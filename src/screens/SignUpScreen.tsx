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
import { signInWithFacebook, signInWithGoogle } from './LoginScreen'
import { Title, TextInput, Button } from 'react-native-paper'

interface SignUpScreenProps {
  navigation: NavigationScreenProp<{}, {}>
}

interface SignUpScreenState {
  email: string
  password: string
  name: string
  error?: string
}

export class SignUpScreen extends Component<
  SignUpScreenProps,
  SignUpScreenState
> {
  public static navigationOptions: NavigationStackScreenOptions = {
    title: 'Sign Up',
  }

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
      name: '',
    }

    this.signUpWithEmailPassword = this.signUpWithEmailPassword.bind(this)
    this.signUpWithFacebook = this.signUpWithFacebook.bind(this)
    this.signUpWithGoogle = this.signUpWithGoogle.bind(this)
  }

  public render(): React.ReactNode {
    return (
      <SafeAreaView>
        <ScrollView scrollEventThrottle={16}>
          <View style={styles.container}>
            <Title style={{ fontSize: 24 }}>Sign Up</Title>
            <Text style={{ marginTop: 10 }}>Step 1 / 2</Text>
            <Text
              style={{
                marginTop: 5,
                color: '#F27979',
                fontWeight: '600',
                fontSize: 18,
              }}
            >
              Basic Information
            </Text>
            <Text style={styles.texttitle}>Profile Name</Text>

            <TextInput
              style={styles.nameInput}
              mode="outlined"
              autoCorrect={false}
              onChangeText={name => this.setState({ name })}
              placeholder="John Doe"
            />
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
            <Text style={{ marginTop: 10, fontWeight: '600' }}>
              Signup using Social Media
            </Text>
            <View style={{ flex: 1, flexDirection: 'row', marginTop: 5 }}>
              <TouchableOpacity onPress={this.signUpWithFacebook}>
                <Image
                  source={require('../resources/facebook.png')}
                  fadeDuration={0}
                  style={{ width: 30, height: 30, marginTop: 10 }}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={this.signUpWithGoogle}>
                <Image
                  source={require('../resources/google.png')}
                  fadeDuration={0}
                  style={{
                    width: 30,
                    height: 30,
                    marginTop: 10,
                    marginLeft: 10,
                  }}
                />
              </TouchableOpacity>
            </View>
            <Text style={styles.error}> {this.state.error}</Text>
            {/*<Button
              onPress={this.signUpWithGoogle}
              title="Sign up with Google"
            />
            <Button
              onPress={this.signUpWithFacebook}
              title="Sign up with Facebook"
            />

            <Text style={styles.error}> {this.state.error}</Text>*/}

            <Button
              disabled={!this.validateInput()}
              onPress={this.signUpWithEmailPassword}
              mode="contained"
              style={styles.buttonsignup}
            >
              <Text style={{ color: 'white', fontSize: 14 }}>Next</Text>
            </Button>
          </View>
        </ScrollView>
      </SafeAreaView>
    )
  }

  private validateInput(): boolean {
    return (
      SignUpScreen.EMAIL_REGEX.test(this.state.email.toLowerCase()) &&
      SignUpScreen.PASSWORD_REGEX.test(this.state.password) &&
      SignUpScreen.NAME_REGEX.test(this.state.name)
    )
  }

  private async signUpWithFacebook(): Promise<void> {
    await signInWithFacebook(this.setState, () =>
      this.props.navigation.navigate('Hobby'),
    )
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
      this.props.navigation.navigate('Hobby')
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
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 17,
    marginTop: 30,
    marginBottom: 20,
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
})
