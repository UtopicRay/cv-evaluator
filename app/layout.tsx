import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { UserContextProvider } from "@/context/user-context";
import { getUser } from "@/lib/fetching/fetch";

export const metadata: Metadata = {
  title: "Cvscore",
  description: "Evalua tu CV con IA y mejora tus oportunidades laborales",
  generator: "v0.app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
   const userPromise = getUser() // Don't await
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <UserContextProvider userPromise={userPromise}>
          {children}
          <Analytics />
        </UserContextProvider>
      </body>
    </html>
  );
}
