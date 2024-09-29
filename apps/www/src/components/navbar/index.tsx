import React from 'react';

import { ConnectButton } from './connect-button';

import { BrainIcon } from 'lucide-react';

export const Navbar = () => {
  return (
    <div className='h-[7dvh] w-full'>
      <div className='mx-auto flex h-full max-w-screen-xl items-center justify-between px-4 py-3'>
        <BrainIcon className='text-[#DDE4FF]' size={36} />
        <ConnectButton />
      </div>
    </div>
  );
};
