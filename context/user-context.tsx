'use client'
import { User } from "@/type";
import { createContext, useContext } from "react";

const UserContext = createContext<Promise<User | null>>(Promise.resolve(null));

function UserContextProvider({ children,userPromise }: { children: React.ReactNode, userPromise: Promise<User | null> }) {
  return (
    <UserContext.Provider value={userPromise}>
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
