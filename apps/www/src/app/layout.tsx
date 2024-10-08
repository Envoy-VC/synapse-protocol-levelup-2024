import localFont from 'next/font/local';
import { headers } from 'next/headers';

import { wagmiConfig } from '~/lib/viem';

import { GeistSans } from 'geist/font/sans';
import type { Metadata } from 'next';
import { cookieToInitialState } from 'wagmi';
import { Navbar } from '~/components';
import { ThemeProvider, Web3Provider } from '~/providers';
import '~/styles/globals.css';

import { Toaster } from '~/components/ui/sonner';

const eastMan = localFont({
  src: '../../public/eastman-roman.ttf',
  variable: '--font-eastman',
});

export const metadata: Metadata = {
  title: 'Create T3 App',
  description: 'Generated by create-t3-app',
  icons: [{ rel: 'icon', url: '/favicon.ico' }],
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  const initialState = cookieToInitialState(
    wagmiConfig,
    headers().get('cookie')
  );

  return (
    <html lang='en'>
      <body
        className={`font-sans ${GeistSans.variable} ${eastMan.variable} hide-scrollbar overflow-none`}
      >
        <ThemeProvider>
          <Web3Provider initialState={initialState}>
            <div className='absolute top-0 z-[2] w-full'>
              <Navbar />
            </div>
            {children}
          </Web3Provider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;
