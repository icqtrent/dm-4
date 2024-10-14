import type { Metadata } from "next";
import "./globals.css";
import { cn } from "@/lib/utils";
import SidebarNav from "@/components/SidebarNav";
import localFont from 'next/font/local';
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { AuthContextProvider } from "@/context/AuthContext";



const inter = localFont({
  src: [
    {
      path: '../../public/fonts/Inter-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Inter-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: "DrawingsMachines Platform",
  description: "Tus planos en minutos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head />
      <link rel="icon" href="/images/logos/logo-1.svg" sizes="any" />
      <body className={cn(inter.variable, "min-h-screen w-full flex ")}>


        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          storageKey="dashboard-theme"
        >
          <AuthContextProvider >

            <div className="w-full">{children}</div>
          </AuthContextProvider>
        </ThemeProvider>
      </body>



    </html>
  );
}
