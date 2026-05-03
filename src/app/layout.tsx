import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import { Toaster } from "sonner";
import { cn } from "@/lib/utils";
import { QueryProvider } from "@/providers/QueryProvider";
import { ThemeProvider } from "@/providers/ThemeProvider";
import "./globals.css";

const outfit = Outfit({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: {
    default: "M-Plus | Automotive Intelligence Platform",
    template: "%s | M-Plus",
  },
  description:
    "M-Plus is a premium automotive intelligence platform providing real-time vehicle data analytics, manufacturing insights, and global WMI distribution analysis.",
  keywords: [
    "Automotive Intelligence",
    "Vehicle Data",
    "NHTSA vPIC",
    "WMI Analysis",
    "Manufacturing Insights",
    "Vehicle Identification",
  ],
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full",
        "antialiased",
        "font-sans",
        "scroll-smooth",
        outfit.variable,
      )}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <QueryProvider>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
            {children}
            <Toaster />
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
