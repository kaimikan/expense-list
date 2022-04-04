import uuid from "uuid";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut
} from "firebase/auth";
import "../firebase/firebase";
import { history } from "../routers/AppRouter";

const googleAuthProvider = new GoogleAuthProvider();

const auth = getAuth();

export const login = (uid) => ({
  type: "LOG_IN",
  uid
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

export const logout = () => ({
  type: "LOG_OUT"
});

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
