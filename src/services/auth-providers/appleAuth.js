import { OAuthProvider } from "firebase/auth";
import { useFirebaseAuth } from "../firebase/firebase";

const instance = new OAuthProvider("apple.com");
instance.addScope("email");
instance.addScope("name");

export const appleAuth = useFirebaseAuth(instance, OAuthProvider);
