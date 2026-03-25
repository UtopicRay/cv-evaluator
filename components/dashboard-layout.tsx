"use client";

import { type ReactNode, useState } from "react";
import {
  BarChart3,
  Bell,
  CircleHelp,
  History,
  LayoutDashboard,
  LifeBuoy,
  LogOut,
  Plus,
  Search,
  Settings,
  Menu,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUserContext } from "@/context/user-context";

interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useUserContext();

  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "CV Analysis", href: "/dashboard/cv", icon: BarChart3 },
    { name: "History", href: "/dashboard/cv", icon: History },
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
  ];

  const userInitials = `${user?.name?.[0] || "A"}${user?.lastName?.[0] || ""}`;

  const isActivePath = (href: string) => {
    if (href === "/dashboard") {
      return pathname === href;
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <div className="min-h-screen bg-[#f7f9fb] text-[#191c1e]">
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-[#191c1e]/30 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <header className="fixed left-0 top-0 z-40 hidden h-20 w-full items-center justify-between border-b border-[#c1c6d7]/30 bg-[#f7f9fb]/95 px-6 backdrop-blur lg:flex">
        <div className="ml-64 flex items-center gap-6">
          <div className="relative w-80">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#515f74]" />
            <Input
              placeholder="Buscar analisis..."
              className="h-10 rounded-full border-0 bg-[#f2f4f6] pl-9 text-sm shadow-none focus-visible:ring-1 focus-visible:ring-[#0059bb]/30"
            />
          </div>
        </div>

        <div className="flex items-center gap-2 pr-4">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full text-[#515f74] hover:bg-[#f2f4f6]"
          >
            <Bell className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full text-[#515f74] hover:bg-[#f2f4f6]"
          >
            <CircleHelp className="h-5 w-5" />
          </Button>
          <div className="ml-2 flex h-9 w-9 items-center justify-center rounded-full bg-[#0070ea] text-xs font-bold text-white">
            {userInitials}
          </div>
        </div>
      </header>

      <aside
        className={cn(
          "fixed left-0 top-0 z-50 h-full w-64 border-r border-[#c1c6d7]/25 bg-[#f2f4f6] transition-transform duration-200 lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-6">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded bg-[#0059bb] text-white">
                <BarChart3 className="h-4 w-4" />
              </div>
              <div>
                <p className="text-lg font-extrabold tracking-tight text-[#0059bb]">CVScore</p>
                <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-[#515f74]">
                  Editorial Intelligence
                </p>
              </div>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              className="text-[#515f74] lg:hidden"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          <nav className="flex-1 space-y-1 px-4 py-4">
            {navigation.map((item) => {
              const isActive = isActivePath(item.href);

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all",
                    isActive
                      ? "bg-white text-[#0059bb] shadow-sm"
                      : "text-[#515f74] hover:bg-white/60 hover:text-[#0059bb]",
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          <div className="px-4 pb-6">
            <Button
              className="w-full bg-[#0059bb] text-sm font-bold text-white shadow-md shadow-[#0059bb]/20 hover:bg-[#0070ea]"
              onClick={() => {
                setSidebarOpen(false);
                router.push("/dashboard/upload");
              }}
            >
              <Plus className="mr-2 h-4 w-4" />
              New Analysis
            </Button>
          </div>

          <div className="space-y-1 border-t border-[#c1c6d7]/30 px-4 py-4">
            <button
              type="button"
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-[#515f74] transition hover:bg-white/60 hover:text-[#0059bb]"
            >
              <LifeBuoy className="h-4 w-4" />
              Support
            </button>
            <button
              type="button"
              onClick={logout}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-[#515f74] transition hover:bg-white/60 hover:text-red-600"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </div>
        </div>
      </aside>

      <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-[#c1c6d7]/30 bg-[#f7f9fb]/95 px-4 backdrop-blur lg:hidden">
        <Button
          variant="ghost"
          size="icon"
          className="text-[#515f74]"
          onClick={() => setSidebarOpen(true)}
        >
          <Menu className="h-5 w-5" />
        </Button>

        <p className="text-lg font-extrabold tracking-tight text-[#0059bb]">CVScore</p>

        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0070ea] text-[10px] font-bold text-white">
          {userInitials}
        </div>
      </header>

      <div className="pb-20 lg:pb-0 lg:pl-64">
        <main className="px-4 pb-8 pt-6 lg:px-8 lg:pb-10 lg:pt-28">
          <div className="mx-auto max-w-7xl">{children}</div>
        </main>
      </div>

      <nav className="fixed bottom-0 left-0 z-40 flex w-full items-center justify-around border-t border-[#c1c6d7]/30 bg-[#f7f9fb]/90 px-3 py-2 backdrop-blur lg:hidden">
        {navigation.map((item) => {
          const isActive = isActivePath(item.href);

          return (
            <Link
              key={`mobile-${item.name}`}
              href={item.href}
              className={cn(
                "flex min-w-16 flex-col items-center gap-1 rounded-lg px-2 py-1 text-[10px] font-medium",
                isActive ? "text-[#0059bb]" : "text-[#515f74]",
              )}
              onClick={() => setSidebarOpen(false)}
            >
              <item.icon className="h-4 w-4" />
              {item.name}
            </Link>
          );
        })}

        <Link
          href="/dashboard/upload"
          className="-mt-8 flex h-12 w-12 items-center justify-center rounded-full bg-[#0059bb] text-white shadow-lg shadow-[#0059bb]/30"
        >
          <Plus className="h-5 w-5" />
        </Link>
      </nav>
    </div>
  );
}
