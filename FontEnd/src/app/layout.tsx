import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/header/header";
import Footer from "@/components/footer/footer";
import "react-toastify/dist/ReactToastify.css";
import { ScrollArea } from "@/components/ui/scroll-area";
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900"
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900"
});

// Roboto Font

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <link rel="shortcut icon" href="/logo/2.png" type="image/x-icon" className="bg-center object-cover"/>
      <body
        className={`${geistSans.variable} ${geistMono.variable}  antialiased`}
      >
        <ScrollArea className="w-[100vw] h-[100vh]   border-r-[7px] border-r-yellow-600">
          <Header />
          {children}
          <Footer />
        </ScrollArea>
      </body>
    </html>
  );
}