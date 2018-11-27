import * as firebase from 'firebase'
// Required for side-effects
import 'firebase/firestore'
import * as uuid from 'uuid'

const app = firebase.initializeApp({
  apiKey: 'AIzaSyCPnkPbheg7YBhL91hHQzQ74Rhx8ZURhbY',
  authDomain: 'pimap-mobile.firebaseapp.com',
  databaseURL: 'https://pimap-mobile.firebaseio.com',
  projectId: 'pimap-mobile',
  storageBucket: 'pimap-mobile.appspot.com',
  messagingSenderId: '322720395519',
})

const db = app.firestore()
// Disable deprecated features
db.settings({
  timestampsInSnapshots: true,
})

async function uploadImage(uri: string): Promise<string> {
  const response = await fetch(uri)
  const blob = await response.blob()
  const ref = firebase
    .storage()
    .ref()
    .child(uuid.v4())

  const snapshot = await ref.put(blob)
  const downloadURL = await snapshot.ref.getDownloadURL()
  return downloadURL as string
}

export { app, db, uploadImage }
