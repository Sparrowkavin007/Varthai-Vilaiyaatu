import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Economics MCQ Arena | Bilingual PG Edition',
  description: 'Advanced Bilingual (English & Tamil) Economics MCQ Trivia Game',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased bg-slate-950 text-slate-100">{children}</body>
    </html>
  );
}
