import './globals.css';
import { ReactNode } from 'react';

export const metadata = {
  title: 'Aaj Kya Khaana Hai?',
  description: 'From "kuch bhi bana lo" to "ye banate hai" - Generate recipes based on what you have'
};

/**
 * The root layout defines the HTML skeleton and includes global styles.
 */
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;600&family=Caveat:wght@400&display=swap"
        />
      </head>
      <body className="font-ibm-plex-mono antialiased bg-background text-text m-0 p-0 overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
