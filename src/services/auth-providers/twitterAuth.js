import { useFirebaseAuth } from "@/services/firebase/firebase";
import { TwitterAuthProvider } from "firebase/auth";

const instance = new TwitterAuthProvider();

export const twitterAuth = useFirebaseAuth(instance, TwitterAuthProvider);
