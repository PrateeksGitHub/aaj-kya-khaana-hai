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
      <body className="font-ibm-plex-mono antialiased bg-background text-text">
        {children}
      </body>
    </html>
  );
}