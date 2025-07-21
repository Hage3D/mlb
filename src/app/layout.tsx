import './globals.css';
import Navigation from '@/components/Navigation';

export const metadata = {
  title: 'MLB Vault',
  description: 'A modern web app for MLB game results and highlights.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Navigation />
        <main className="container mx-auto px-4 py-8">
          {children}
        </main>
      </body>
    </html>
  );
}