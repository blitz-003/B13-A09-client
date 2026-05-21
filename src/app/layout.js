import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { DynamicTitleManager } from "@/components/modules/dynamic-title-manager";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: {
    default: "IdeaVault | Crowdsourced Startup Idea Validation",
    template: "%s | IdeaVault",
  },
  description:
    "Share innovative concepts, explore trending options, and validate ideas collectively.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} font-sans min-h-screen flex flex-col antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <DynamicTitleManager />
          <Navbar />
          <main className="flex-1 flex flex-col w-full">{children}</main>
          <Footer />
          <Toaster position="top-center" richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}
