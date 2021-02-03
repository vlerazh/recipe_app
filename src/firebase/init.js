import firebase from 'firebase'
import firestore from 'firebase/firestore'

var firebaseConfig = {
    apiKey: "AIzaSyB45N4tGk7FWw-QdLh9jq03KB8ANHMtk70",
    authDomain: "recipes-app-61148.firebaseapp.com",
    projectId: "recipes-app-61148",
    storageBucket: "recipes-app-61148.appspot.com",
    messagingSenderId: "485889481486",
    appId: "1:485889481486:web:331e762401e758919b555f",
    measurementId: "G-DDLF3VRYEM"
  };
  // Initialize Firebase
  const firebaseApp = firebase.initializeApp(firebaseConfig);
  firebase.analytics();
  firebaseApp.firestore().settings({timestampsInSnapshots:true})

  export default firebaseApp.firestore()