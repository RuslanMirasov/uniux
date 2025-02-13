import type { Metadata } from 'next';
import { PopupProvider } from '@/context/PopupContext';
import AuthProvider from '@/context/SessionContext';
import { Popup } from './components';
import localFont from 'next/font/local';
import './styles/globals.scss';
import './styles/popup.scss';

const involveMedium = localFont({
  src: './fonts/subset-involve-medium.woff',
  variable: '--medium',
  weight: '500',
});

const involveSemiBold = localFont({
  src: './fonts/subset-involve-semibold.woff',
  variable: '--semibold',
  weight: '600',
});

const involveBold = localFont({
  src: './fonts/subset-involve-bold.woff',
  variable: '--bold',
  weight: '700',
});

export const metadata: Metadata = {
  title: 'Uniux',
  description: 'Figma temlate tester',
  icons: {
    icon: '/favicon.ico?v=2',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head />
      <body className={`body ${involveBold.variable} ${involveSemiBold.variable} ${involveMedium.variable}`}>
        <PopupProvider>
          <AuthProvider>
            <main className="main">{children}</main>
            <Popup />
          </AuthProvider>
        </PopupProvider>
      </body>
    </html>
  );
}
