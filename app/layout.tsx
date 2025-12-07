import "./globals.css";
import type { ReactNode } from "react";

export const metadata = {
  title: "nobulog",
  description: "Nobu's personal site — apps, blog, and thoughts."
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ja">
      <body className="fade min-h-screen bg-gradient-to-b from-neutral-950 via-black to-neutral-900 text-gray-100">
        {children}
      </body>
    </html>
  );
}
