import uuid from "uuid";
import {
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
  signOut
} from "firebase/auth";
import "../firebase/firebase";

const googleAuthProvider = new GoogleAuthProvider();

const auth = getAuth();

onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("log in", user.uid);
    const uid = user.uid;
  } else {
    console.log("log out");
  }
});

export const startLogin = () => {
  return () => {
    return signInWithPopup(auth, googleAuthProvider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
      });
  };
};

export const startLogout = () => {
  return () => {
    return signOut(auth)
      .then(() => {
        console.log("singed out");
      })
      .catch((error) => {
        console.log("sign out problem", error);
      });
  };
};
