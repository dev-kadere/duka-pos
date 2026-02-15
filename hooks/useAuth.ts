import { auth } from "@/lib/firebase";
import { onAuthStateChanged, User } from "firebase/auth";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubcribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);

        const idTokenResult = await user.getIdTokenResult();
        console.log("ID Token Result:", idTokenResult);
        const expirationTime = new Date(idTokenResult.expirationTime);
        console.log("Token Expiration Time:", expirationTime);
        const timeOut = expirationTime.getTime() - Date.now();
        console.log("Time until token expires (ms):", timeOut);

        if (timeOut > 0) {
          setTimeout(() => {
            auth.signOut();
            toast.error("Session expired. Please log in again.");
            setUser(null);
          }, timeOut);
        } else {
          auth.signOut();
          toast.error("Session expired. Please log in again.");
        }
      } else {
        setUser(null);
      }

      setLoading(false);
    });
    return () => unsubcribe();
  }, []);

  const handleLogOut = async () => {
    await auth.signOut();
    toast.success("Logged out successfully");
  };

  return { user, loading, handleLogOut };
}
