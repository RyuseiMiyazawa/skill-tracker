import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import { AuthProvider } from "@/components/AuthProvider";

export const metadata: Metadata = {
  title: "Skill Tracker",
  description: "Manage your technical skills",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 min-h-screen">
        <AuthProvider>
          <Header />
          <main className="container mx-auto px-4 py-8 max-w-7xl">{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}
