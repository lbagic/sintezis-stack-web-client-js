import { TwitterAuthProvider } from "firebase/auth";
import { useFirebaseAuth } from "./base/firebase";

const instance = new TwitterAuthProvider();

export const twitterAuth = useFirebaseAuth(instance, TwitterAuthProvider);
