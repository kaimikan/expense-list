import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// this should not be committed since it's like the password to the database
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_API_ID
};

initializeApp(firebaseConfig);

const db = getDatabase();
//const auth = getAuth();
// if i export auth there is an error
// FIXME db._checkNotDeleted is not a function
export { db as default };
