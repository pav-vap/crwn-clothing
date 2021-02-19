import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyAIh8bPklMIqxsdvKwaueusMbI4mqx9bXE",
    authDomain: "crwn-db-48db0.firebaseapp.com",
    projectId: "crwn-db-48db0",
    storageBucket: "crwn-db-48db0.appspot.com",
    messagingSenderId: "757346436143",
    appId: "1:757346436143:web:3cbae154e33ff3ca9ef2da",
    measurementId: "G-424WFDQMCS"
  };

  export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapshot = await userRef.get();

    // console.log(snapshot);

    if(!snapshot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch(error) {
            console.log('error creating user', error.message);
        }
    }
    return userRef;
  }

  //firebase.initializeApp(config);

  if (!firebase.apps.length) {
    firebase.initializeApp(config);
  }else {
    firebase.app(); // if already initialized, use that one
  }

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' });
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;