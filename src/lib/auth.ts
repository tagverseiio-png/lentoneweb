import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "@/lib/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        const inputUsername = credentials?.username?.trim();
        const inputPassword = credentials?.password?.trim();

        try {
          const docRef = doc(db, "admin", "credentials");
          let docSnap = await getDoc(docRef);
          
          if (!docSnap.exists()) {
            const defaultCreds = {
              username: "admin",
              password: "lentone2026",
              updatedAt: new Date().toISOString()
            };
            await setDoc(docRef, defaultCreds);
            docSnap = await getDoc(docRef);
          }

          const adminData = docSnap.data();

          if (
            inputUsername === adminData?.username &&
            inputPassword === adminData?.password
          ) {
            return { id: "1", name: "Admin" };
          }
        } catch (error) {
          console.error("Auth Firestore error:", error);
        }

        // Default fallback credentials check
        if (inputUsername === "admin" && inputPassword === "lentone2026") {
          return { id: "1", name: "Admin" };
        }

        return null;
      }
    })
  ],
  pages: {
    signIn: "/admin/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET || "fallback_secret_for_development_only_123456789",
};
