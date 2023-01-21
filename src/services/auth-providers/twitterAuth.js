import { TwitterAuthProvider } from "firebase/auth";
import { useFirebaseAuth } from "../firebase/firebase";

const instance = new TwitterAuthProvider();

export const twitterAuth = useFirebaseAuth(instance, TwitterAuthProvider);
