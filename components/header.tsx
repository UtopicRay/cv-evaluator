import { FileText } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { getUser } from "@/lib/fetching/fetch";

async function Header() {
  const user = getUser();
  return (
    <header className="border-b border-border">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FileText className="h-6 w-6 text-primary" />
          <span className="text-xl font-semibold">CVScore</span>
        </div>
        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="#features"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Características
          </Link>
          <Link
            href="#process"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Cómo Funciona
          </Link>
          <Link
            href="#pricing"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Precios
          </Link>
        </nav>
        <div className="flex items-center gap-3">
          {!user ? (
            <>
              <Link href="/login">
                <Button variant="ghost" size="sm">
                  Iniciar Sesión
                </Button>
              </Link>
              <Link href="/register">
                <Button size="sm">Comenzar</Button>
              </Link>
            </>
          ) : (
            <Link href="/dashboard">
              <Button size="sm">Ir al Dashboard</Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
