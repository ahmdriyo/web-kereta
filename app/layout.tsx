import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";
import SessionProvider from "./SessionProvider";
const jetbrainMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
  variable: "--font-jetbrainMono",
});

export const metadata = {
  title: "Web Kereta",
  description: "Web Kereta",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={jetbrainMono.variable}>
        <SessionProvider>
        <Header />
        {children}
        </SessionProvider>
      </body>
    </html>
  );
}
