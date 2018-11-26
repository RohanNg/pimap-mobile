import * as firebase from 'firebase'
// Required for side-effects
import 'firebase/firestore'

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

export { app, db }
