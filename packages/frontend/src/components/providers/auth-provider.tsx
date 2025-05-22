"use client";

import { useEffect } from "react";
import { auth } from "@/lib/firebase";
import { useAuthStore } from "@/store/auth";
import { api } from "@/lib/api";
import { AxiosError } from "axios";
import { Loader2 } from "lucide-react";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { isLoading, setUser, setLoading, setNeedsInitialSetup, setAuthenticated } = useAuthStore();

  useEffect(() => {
    let isMounted = true;
    
    const unsubscribe = auth.onAuthStateChanged(async (firebaseUser) => {
      if (!isMounted) return;
      
      try {
        setLoading(true);

        if (!firebaseUser) {
          setUser(null);
          setAuthenticated(false);
          return;
        }

        try {
          const idToken = await firebaseUser.getIdToken();
          
          const loginResponse = await api.post('/auth/login', {
            idToken,
            email: firebaseUser.email,
            displayName: firebaseUser.displayName,
            firebaseUid: firebaseUser.uid
          });

          if (loginResponse.data.isNewUser) {
            setUser(null);
            setNeedsInitialSetup(true);
            setAuthenticated(false);
            return;
          }

          const response = await api.get("/profiles/me");
          const userData = response.data;
          
          if (isMounted) {
            setUser({
              ...userData,
              isAdmin: userData.isAdmin || userData.role === "admin",
            });
            setAuthenticated(true);
            setNeedsInitialSetup(false);
          }
        } catch (error) {
          if (error instanceof AxiosError) {
            console.error('AuthProvider - APIエラー詳細:', {
              status: error.response?.status,
              data: error.response?.data,
              headers: error.response?.headers,
              config: {
                url: error.config?.url,
                method: error.config?.method,
                headers: error.config?.headers
              }
            });
            if (error.response?.status === 401) {
              setUser(null);
              setNeedsInitialSetup(true);
              setAuthenticated(false);
              return;
            }
          }
          setUser(null);
          setAuthenticated(false);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    });

    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, [setUser, setLoading, setNeedsInitialSetup, setAuthenticated]);

  if (isLoading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return children;
} 