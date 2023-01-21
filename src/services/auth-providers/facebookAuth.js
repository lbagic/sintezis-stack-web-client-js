import { FacebookAuthProvider } from "firebase/auth";
import { useFirebaseAuth } from "../firebase/firebase";

const instance = new FacebookAuthProvider();
instance.addScope("email");
instance.addScope("public_profile");

export const facebookAuth = useFirebaseAuth(instance, FacebookAuthProvider);
