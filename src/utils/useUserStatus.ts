// hooks/useUserStatus.ts
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/networking/firebase";
import { UserModel } from "@/features/user/models/user.model";
import { firebaseConstants } from "@/constants/Firestore";

export function useUserStatus(currentUser: User | null | undefined) {
  // ✅ undefined bhi accept karega
  const [userData, setUserData] = useState<UserModel | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkUserStatus = async () => {
      // ✅ Handle undefined case properly
      if (currentUser === undefined) {
        // Still loading auth state
        return;
      }

      if (!currentUser) {
        // User is null (not logged in)
        setUserData(null);
        setLoading(false);
        return;
      }

      try {
        // Fetch user data from Firestore
        const userDoc = await getDoc(
          doc(db, firebaseConstants.collections.users, currentUser.uid)
        );

        if (userDoc.exists()) {
          const userData = {
            id: userDoc.id,
            ...userDoc.data(),
          } as UserModel;
          setUserData(userData);

          console.log("User status check:", {
            documentStatus: userData.documentStatus,
            status: userData.status,
          });
        } else {
          console.error("User document not found");
          setUserData(null);
        }
      } catch (error) {
        console.error("Error checking user status:", error);
        setUserData(null);
      } finally {
        setLoading(false);
      }
    };

    checkUserStatus();
  }, [currentUser]);

  return { userData, loading };
}
