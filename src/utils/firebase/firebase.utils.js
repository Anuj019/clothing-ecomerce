import { async } from '@firebase/util';
import {initializeApp, } from 'firebase/app';
import {getAuth,
     signInWithRedirect,
     signInWithPopup,
       GoogleAuthProvider }
        from 'firebase/auth';

import {
   getFirestore,
   doc, 
   getDoc,
   setDoc

} from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBpaoCRFwa5VuwxpIUqTu-7G5qYvGm9PGE",
    authDomain: "crwn-clothing-db-d5c8c.firebaseapp.com",
    projectId: "crwn-clothing-db-d5c8c",
    storageBucket: "crwn-clothing-db-d5c8c.appspot.com",
    messagingSenderId: "134022495353",
    appId: "1:134022495353:web:0af022a50f7c94a9a0e8a8"
  };
  
  // Initialize Firebase
  const firebaseApp = initializeApp(firebaseConfig);

  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({
      prompt: "select_account"
  })

  export const auth = getAuth();
  export const signInWithGooglePopup = () => signInWithPopup(auth, provider)

  export const db = getFirestore()
  
  export const createUserDocumentFromAuth = async (userAuth) => {
const userDocRef = doc(db, 'users', userAuth.uid);
console.log(userDocRef)

const userSnapshot = await getDoc(userDocRef)
if(!userSnapshot.exists()) {
  const { displayName, email } = userAuth;
  const createdAt  = new Date();

  try {
    await setDoc(userDocRef, {
      displayName,
      email,
      createdAt
    })
  } catch (error) {
    console.log('error creating the user', error.message)
  }
}

return userDocRef;

  }