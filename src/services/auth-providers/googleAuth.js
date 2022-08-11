import { GoogleAuthProvider } from "firebase/auth";
import { useFirebaseAuth } from "../firebase";

const instance = new GoogleAuthProvider();
instance.addScope("https://www.googleapis.com/auth/userinfo.email");
instance.addScope("https://www.googleapis.com/auth/userinfo.profile");

export const googleAuth = useFirebaseAuth(instance, GoogleAuthProvider);
