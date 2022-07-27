import { initializeApp } from "firebase/app";
// import { getAnalytics, logEvent, setUserId } from "firebase/analytics";
import { getAuth, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

const _firebase = initializeApp(firebaseConfig);
const _auth = getAuth(_firebase);

// const _analytics = getAnalytics(_firebase);
// export const analytics = {
//   instance: _analytics,
//   setUserId,
//   logEvent,
// };

export const useFirebaseAuth = (providerInstance, providerClass) => ({
  signIn: () =>
    signInWithPopup(_auth, providerInstance)
      .then((result) => {
        const data = {
          user: result.user,
          credential: providerClass.credentialFromResult(result),
        };
        return data;
      })
      .catch((error) => {
        const errorData = {
          errorCode: error.code,
          errorMessage: error.message,
          email: error.email,
          credential: providerClass.credentialFromError(error),
        };
        throw errorData;
      }),
});
