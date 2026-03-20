'use client'
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "sonner";

interface User {
  id: number;
  name: string;
  email: string;
  lastName?: string;
}
interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  handleLogin: (data: any) => Promise<void>;
  logout: () => void;
}

const UserContext = createContext<UserContextType | null>(null);

function UserContextProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  
    async function handleLogin(data: any) {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      const user = await res.json().then((resData) => resData.user);
      if (user) {
        const userData: User = {
          id: user.id,
          name: user.name,
          email: user.email,
          lastName: user.lastName,
        };
        localStorage.setItem("user", JSON.stringify(userData));
        setUser(userData);
      }
      router.push("/dashboard");
      return;
    }
    const resData = await res.json();
    toast.error(
      resData.message || "Ocurrió un error durante el inicio de sesión",
    );
  }
  useEffect(() => {
    if (typeof window === "undefined") return;
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      const userData: User = {
        id: user.id,
        name: user.name,
        email: user.email,
        lastName: user.lastName
      };
      setUser(userData);
    }
  }, []);

  async function logout() {
    localStorage.removeItem("user");
    setUser(null);
    router.push("/");
  }

  return (
    <UserContext.Provider value={{ user, setUser, handleLogin, logout }}>
      {children}
    </UserContext.Provider>
  );
}

 function useUserContext(){
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUserContext must be used within a UserContextProvider");
    }
    return context;
}
export {useUserContext,UserContextProvider}