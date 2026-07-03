import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "@/lib/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        try {
          const docRef = doc(db, "admin", "credentials");
          let docSnap = await getDoc(docRef);
          
          if (!docSnap.exists()) {
            // Seed default credentials on first launch
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
            credentials?.username === adminData?.username &&
            credentials?.password === adminData?.password
          ) {
            return { id: "1", name: "Admin" };
          }
        } catch (error) {
          console.error("Auth Firestore error:", error);
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
});

export { handler as GET, handler as POST };

