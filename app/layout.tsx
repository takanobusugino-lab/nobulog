export const metadata = {
  title: "nobulog",
  description: "Nobu's personal site – apps, blog, and thoughts."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body className="fade max-w-3xl mx-auto px-4 py-10">
        {children}
      </body>
    </html>
  );
}
