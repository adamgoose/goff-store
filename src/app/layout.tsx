import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import LeftNav from "@/components/left-nav";
import TopNav from "@/components/top-nav";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Goff Store",
  description: "Manage your Features in style!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
      }}
    >
      <html lang="en" suppressHydrationWarning>
        <body className={inter.className}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <TooltipProvider>
              <div className="flex min-h-screen w-full flex-col bg-muted/40">
                <LeftNav />
                <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
                  <TopNav />
                  <main className="p-4 sm:px-6 sm:py-0">{children}</main>
                </div>
              </div>
            </TooltipProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
