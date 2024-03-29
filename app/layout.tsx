import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/sidebar";
import { ThemeProvider } from "@/components/theme-provider";
import TopSidebar from "@/components/top-sidebar";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "El Ropero",
  description: "Sistema de gestión de ventas y stock",
};

// TODO: HACER BIEN EL MANEJO DEL DARKMODE PORQUE PONER dark: NO ES SOSTENIBLE
// TODO: TRATAR DE ESTANDARIZAR TODO ASI ES MAS FACIL HACER MAS COSAS CON EL MISMO CODIGO

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`md:flex md:h-[100dvh] ${inter.className}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {/* <TopSidebar /> */}
          <Toaster richColors />
          <Sidebar />
          <div
            className="min-h-[100dvh] bg-gray-100 dark:bg-black w-full px-4 md:px-6 lg:px-8 overflow-y-auto md:[scrollbar-gutter:stable]"
            // style={{ scrollbarGutter: "stable" }}
          >
            <main className="flex flex-col max-w-7xl w-full mx-auto gap-8 pt-8 pb-12">
              {children}
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
