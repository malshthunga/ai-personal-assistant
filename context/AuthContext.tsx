import React, { createContext, useState, useEffect } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

interface AuthContextType {
  user: any;
  setUser: (user: any) => void;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null);

  // FIX: Added {} for args
  const convexUser = useQuery(api.user.GetUser, { email: "some@email.com" });

  useEffect(() => {
    if (convexUser) {
      setUser(convexUser);
    }
  }, [convexUser]);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
