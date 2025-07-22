import './globals.css';

export const metadata = {
  title: 'MLB Results',
  description: 'MLB game results and highlights in Japanese time zone.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body>
        <main className="container mx-auto px-4 py-8">
          {children}
        </main>
      </body>
    </html>
  );
}