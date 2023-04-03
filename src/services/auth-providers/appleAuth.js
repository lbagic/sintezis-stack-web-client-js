import { useFirebaseAuth } from "@/services/firebase/firebase";
import { OAuthProvider } from "firebase/auth";

const instance = new OAuthProvider("apple.com");
instance.addScope("email");
instance.addScope("name");

export const appleAuth = useFirebaseAuth(instance, OAuthProvider);
