import { LogOut } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";
import { useUserContext } from "@/context/user-context";
import { signOut } from "next-auth/react";

async function UserInfoDashboard() {
    const userPromise = useUserContext();
    const user = await userPromise;
    const logout = async () => {
        await signOut();
    };
  return (
    <div className="p-4 border-t border-sidebar-border">
      <div className="flex items-center gap-3 mb-3 p-3 rounded-lg bg-sidebar-accent">
        <div className="h-10 w-10 rounded-full bg-sidebar-primary flex items-center justify-center">
          <span className="text-sm font-semibold text-sidebar-primary-foreground">
            {user?.name?.[0] || ""}{user?.lastName?.[0] || ""}
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-sidebar-foreground truncate">
            {user?.name && user?.lastName ? user?.name + " " + user?.lastName : ""}
          </p>
          <p className="text-xs text-sidebar-foreground/60 truncate">
            {user?.email || ""}
          </p>
        </div>
      </div>
      <Button
        variant="ghost"
        className="w-full justify-start text-sidebar-foreground"
        onClick={logout}
      >
        <LogOut className="mr-3 h-5 w-5" />
        Cerrar Sesión
      </Button>
    </div>
  );
}

export default UserInfoDashboard;
