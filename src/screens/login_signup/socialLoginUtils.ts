import { Facebook, Google } from 'expo'
import * as firebase from 'firebase'
import { Alert } from 'react-native'
import { User, UserStore, UserValue } from '../../datastore'

export const validation = {
  EMAIL_REGEX: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  // Spec:
  //   Length > 6
  //   Valid char: "a-z" "0-9" "A-Z" plus special chars in https://www.owasp.org/index.php/Password_special_characters
  PASSWORD_REGEX: /^[a-z0-9A-Z !"#$%&'()*+,.\/:;<=>?@[\]\\^_`{|}~-]{6,}$/,
  NAME_REGEX: /^[a-zA-Z ]{1,40}$/,
}

export interface UserData {
  firstname: string
  lastname: string
  email: string
  profilePicture?: string
}

export interface SignInData {
  userData: UserData
  userCredential: firebase.auth.UserCredential
}

export async function loginWithEmailPassword(
  email: string,
  password: string,
): Promise<firebase.auth.UserCredential> {
  // https://firebase.google.com/docs/reference/js/firebase.auth.Auth.html#signInWithEmailAndPassword
  try {
    const authCred = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
    return authCred
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
    throw new Error(errorMessage)
  }
}
export async function signUpWithEmailPassword(
  userData: UserData,
  password: string,
): Promise<SignInData> {
  const { email } = userData
  // https://firebase.google.com/docs/reference/js/firebase.auth.Auth#createUserWithEmailAndPassword
  try {
    const authCred = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
    const uid = authCred.user!.uid
    return {
      userCredential: authCred,
      userData,
    }
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

    throw new Error(errorInfo)
  }
}

export function signInWithSocialAccount(
  account: 'facebook' | 'google',
): Promise<SignInData> {
  switch (account) {
    case 'facebook':
      return signInWithFacebook()
    case 'google':
      return signInWithGoogle()
    default:
      throw Error('WTF')
  }
}

async function signInWithGoogle(): Promise<SignInData> {
  const res = await Google.logInAsync({
    // IOS client id from GoogleService-Info.plist in Firebase
    iosClientId:
      '322720395519-duuh4hirp37ilde6tqb7a4nmpn6a2v9v.apps.googleusercontent.com',
    scopes: ['profile', 'email'],
    behavior: 'web',
  })

  if (res.type === 'cancel') {
    Alert.alert('Cancelled!', 'Login was cancelled!')
    throw new Error("Plase DON'T cancen the login if you wanna do it")
  }

  const { email, familyName, givenName, photoUrl, id } = res.user

  const credential = firebase.auth.GoogleAuthProvider.credential(
    res.idToken,
    res.accessToken,
  )

  return await signInWithCredential(credential, {
    email: email!,
    firstname: givenName,
    lastname: familyName,
    profilePicture: photoUrl,
  })
}

async function signInWithFacebook(): Promise<SignInData> {
  const { type, token } = await Facebook.logInWithReadPermissionsAsync(
    '1051395471700487',
    {
      permissions: ['public_profile', 'email'],
    },
  )

  if (type !== 'success' || !token) {
    Alert.alert('Cancelled!', 'Login was cancelled!')
    throw new Error('If you wanna login with Facebook, please carry on.')
  }

  const response = await fetch(
    `https://graph.facebook.com/me?access_token=${token}&fields=email,first_name,last_name`,
  )

  const fbProfile: {
    email: string
    first_name: string
    last_name: string
    id: string
    picture: string
  } = await response.json()
  const { email, first_name, last_name, picture } = fbProfile

  console.info(fbProfile)

  return await signInWithCredential(
    firebase.auth.FacebookAuthProvider.credential(token),
    {
      email,
      firstname: first_name,
      lastname: last_name,
      profilePicture: picture,
    },
  )
}

async function signInWithCredential(
  cred: firebase.auth.AuthCredential,
  userData: UserData,
): Promise<SignInData> {
  // https://firebase.google.com/docs/reference/js/firebase.auth.Auth#signInAndRetrieveDataWithCredential
  try {
    const authCredentials = await firebase
      .auth()
      .signInAndRetrieveDataWithCredential(cred)

    return {
      userData,
      userCredential: authCredentials,
    }
  } catch (error) {
    const errorCode = error.code
    const errorMessage = error.message
    let errorInfo
    if (errorCode === 'auth/account-exists-with-different-credential') {
      const otherCredentialProviders = await firebase
        .auth()
        .fetchProvidersForEmail(userData.email)
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

    throw new Error(errorInfo)
  }
}

// Return User if new user was created
export async function createUserIfNeeded(
  signInData: SignInData,
  userStore: UserStore,
): Promise<User | undefined> {
  const {
    userCredential,
    userData: { email, firstname, lastname, profilePicture },
  } = signInData
  const uid = userCredential.user!.uid

  if (
    userCredential.additionalUserInfo &&
    !userCredential.additionalUserInfo.isNewUser
  ) {
    return
  }

  const userInfo: UserValue = {
    email,
    firstname,
    lastname,
    profilePicture,
    interests: [],
  }

  return await userStore.createUser(userInfo, uid)
}
