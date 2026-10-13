import type { Metadata } from "next";
import "./globals.css";
import { fontVariables } from "@/lib/fonts";
import { AuthProvider } from "@/lib/firebase/auth-context";
import { ToastProvider } from "@/components/ui/toast";

export const metadata: Metadata = {
  title: "DecsCV — One form → resume OR portfolio website",
  description:
    "Build a stunning portfolio website with 8 visual engines or an ATS-safe A4 resume from a single guided form. Free public link at cv.decslab.in/{username}.",
  metadataBase: new URL("https://cv.decslab.in"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={fontVariables}>
      <body className="bg-paper text-ink font-sans antialiased min-h-screen">
        <AuthProvider>
          <ToastProvider>
            {children}
          </ToastProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
