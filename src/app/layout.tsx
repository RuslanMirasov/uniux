import type { Metadata } from 'next';
import { PopupProvider } from '@/context/PopupContext';
import AuthProvider from '@/context/AuthContext';
import { Popup } from './components';
import localFont from 'next/font/local';
import './styles/globals.scss';

const involveMedium = localFont({
  src: './fonts/subset-involve-medium.woff',
  variable: '--medium',
  weight: '500',
  display: 'swap',
  preload: true,
});

const involveSemiBold = localFont({
  src: './fonts/subset-involve-semibold.woff',
  variable: '--semibold',
  weight: '600',
  display: 'swap',
  preload: true,
});

const involveBold = localFont({
  src: './fonts/subset-involve-bold.woff',
  variable: '--bold',
  weight: '700',
  display: 'swap',
  preload: true,
});

export const metadata: Metadata = {
  title: 'Uniux',
  description: 'Figma temlate tester',
  icons: {
    icon: '/favicon.ico?v=2',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head />
      <body className={`body ${involveBold.variable} ${involveSemiBold.variable} ${involveMedium.variable}`}>
        <PopupProvider>
          <AuthProvider>{children}</AuthProvider>
          <Popup />
        </PopupProvider>
      </body>
    </html>
  );
}
