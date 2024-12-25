import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { GoogleOAuthProvider } from '@react-oauth/google';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  if (!clientId) {
    throw new Error("Missing GOOGLE_CLIENT_ID environment variable");
  }
  return (
    <GoogleOAuthProvider clientId={clientId}>
      <html lang="en" className="bg-white dark:bg-black">
        <body 
          className={`${geistSans.variable} ${geistMono.variable} antialiased `}
        >
          {children}
        </body>
      </html>
    </GoogleOAuthProvider>
  );
}
