import { async } from '@firebase/util';
import {initializeApp, } from 'firebase/app';
import {getAuth,
     signInWithRedirect,
     signInWithPopup,
       GoogleAuthProvider, 
      createUserWithEmailAndPassword,
    signInWithEmailAndPassword, signOut, onAuthStateChanged }
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

  const googleProvider = new GoogleAuthProvider();
  googleProvider.setCustomParameters({
      prompt: "select_account"
  })

  export const auth = getAuth();
  export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
  export const signInWithGoogleRedireact = () => signInWithRedirect(auth, googleProvider)


  export const db = getFirestore()
  
  export const createUserDocumentFromAuth = async (userAuth, additionalInformation ={}) => {
    if (!userAuth) return;
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
      createdAt,
      ...additionalInformation
    })
  } catch (error) {
    console.log('error creating the user', error.message)
  }
}

return userDocRef;

  }

  export const createAuthUserWithEmailAndPassword =  async (email, password) => {
    if (!email || !password ) return;
    return await createUserWithEmailAndPassword(auth, email, password) }

    export const signInAuthUserWithEmailAndPassword =  async (email, password) => {
      if (!email || !password ) return;
      return await signInWithEmailAndPassword(auth, email, password) }

      export const signOutUser = async () => await signOut(auth)

      export const onAuthStateChangedListener = (callback) =>  onAuthStateChanged(auth, callback )