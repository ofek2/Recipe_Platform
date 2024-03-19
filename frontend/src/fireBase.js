import { initializeApp } from 'firebase/app';
import config from './config.js';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { signInWithEmailAndPassword, signInWithCustomToken as customToken, getIdToken as getIdTokenFunc, signOut as signOutFunc, getAuth } from 'firebase/auth';
import { toEmailAddress } from './utils.js';

const firebase = initializeApp(config.firebaseConfig);
const auth = getAuth(firebase);
const db = getFirestore(firebase);
const storage = getStorage(firebase);

const signIn = async (email, password) => {
    return signInWithEmailAndPassword(auth, toEmailAddress(email), password );
}

const signOut = async () => {
    return signOutFunc(auth);
}

const signInWithToken = async (token) => {
    return customToken(auth, token);
}

const getIdToken = async () => {
    return getIdTokenFunc(auth.currentUser);
}

export {signIn, signInWithToken, getIdToken, signOut, auth, db, storage};