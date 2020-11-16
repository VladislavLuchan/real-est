import app from 'firebase/app'
import 'firebase/auth'
import 'firebase/firebase-firestore'
import 'firebase/storage'
import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyBw-K0YutJtAAtBnUgaeLmac8XutOa_-5Q",
  authDomain: "real-e-proj.firebaseapp.com",
  databaseURL: "https://real-e-proj.firebaseio.com",
  projectId: "real-e-proj",
  storageBucket: "real-e-proj.appspot.com",
  messagingSenderId: "507556789479",
  appId: "1:507556789479:web:34c7f3407bb6ae3e2bb642"
};

class Firebase {
  constructor() {
    app.initializeApp(firebaseConfig)
    this.auth = app.auth()
    this.db = app.firestore()
    this.storage = app.storage()
  }

  login(email, password) {
    return this.auth.signInWithEmailAndPassword(email, password)
  }

  logout() {
    return this.auth.signOut()
  }

  async register(name, email, password) {
    await this.auth.createUserWithEmailAndPassword(email, password)
    return this.auth.currentUser.updateProfile({
      displayName: name
    });
  }
}

// const API_KEY = 'AIzaSyB1kVnb7GgjYkRR2OBwHqhLe2y8c9-36-8'

export const timestamp = firebase.firestore.FieldValue.serverTimestamp
export default new Firebase()