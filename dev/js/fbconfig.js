import firebase from 'firebase'

const config = {
  apiKey: "AIzaSyDK8diwUEzlow-ABTh1QHS_HkjVdYy4EHw",
  authDomain: "neu-resume.firebaseapp.com",
  databaseURL: "https://neu-resume.firebaseio.com",
  projectId: "neu-resume",
  storageBucket: "neu-resume.appspot.com",
  messagingSenderId: "573778687218"
}

firebase.initializeApp(config)

export const ref = firebase.database().ref()
export const firebaseAuth = firebase.auth