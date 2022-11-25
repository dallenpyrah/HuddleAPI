import { getAuth } from 'firebase/auth'
import * as firebase from 'firebase/app'

const firebaseConfig = {
  apiKey: 'AIzaSyDo9w_q2OjAF5k2BUv1V_0HNw8wjbLmZYQ',
  authDomain: 'huddle-68e55.firebaseapp.com',
  databaseURL: 'https://huddle-68e55-default-rtdb.firebaseio.com',
  projectId: 'huddle-68e55',
  storageBucket: 'huddle-68e55.appspot.com',
  messagingSenderId: '145379649614',
  appId: '1:145379649614:web:7c2cfb6003d7ea2fe03b1f',
  measurementId: 'G-N43LD24ZXY'
}

const app = firebase.initializeApp(firebaseConfig)

const auth = getAuth(app)

export { auth }
