import { useFirebaseAuth } from "@/services/firebase/firebase";
import { GoogleAuthProvider } from "firebase/auth";

const instance = new GoogleAuthProvider();
instance.addScope("https://www.googleapis.com/auth/userinfo.email");
instance.addScope("https://www.googleapis.com/auth/userinfo.profile");

export const googleAuth = useFirebaseAuth(instance, GoogleAuthProvider);
