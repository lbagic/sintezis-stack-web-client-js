import { useFirebaseAuth } from "@/services/firebase/firebase";
import { FacebookAuthProvider } from "firebase/auth";

const instance = new FacebookAuthProvider();
instance.addScope("email");
instance.addScope("public_profile");

export const facebookAuth = useFirebaseAuth(instance, FacebookAuthProvider);
