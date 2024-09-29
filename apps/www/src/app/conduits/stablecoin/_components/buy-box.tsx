import Image from 'next/image';

import React from 'react';

import ETHLogo from 'public/eth-logo.png';

import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';

import { ArrowDownIcon, BrainIcon } from 'lucide-react';

export const BuyBox = () => {
  return (
    <div className='flex h-fit w-full max-w-lg flex-col gap-3'>
      <div className='pb-6 font-eastman text-2xl text-[#DDE4FF]'>
        Mint SYNAPSE
      </div>
      <div className='flex flex-col gap-5'>
        <div className='relative flex flex-col gap-1'>
          <div className='absolute right-1/2 top-1/2 -translate-y-1/2'>
            <div className='rounded-xl border-4 border-black bg-[#0f0f0f] p-2'>
              <ArrowDownIcon className='text-[#fff]' size={24} />
            </div>
          </div>
          <div className='flex min-h-[8rem] flex-col gap-6 rounded-2xl bg-[#0f0f0f] px-4 py-6'>
            <div className='text-xs font-semibold'>Deposit</div>
            <div className='flex w-full flex-row items-center'>
              <Input
                className='border-none bg-[#0f0f0f] px-0 text-4xl outline-none placeholder:text-4xl'
                placeholder='0'
              />
              <div className='flex flex-row items-center gap-2 rounded-3xl bg-[#000] px-3 py-1 text-lg text-[#fff]'>
                <div className='h-[1.5rem] w-[1.5rem]'>
                  <Image alt='ETH Logo' height={24} src={ETHLogo} width={24} />
                </div>
                ETH
              </div>
            </div>
          </div>
          <div className='flex min-h-[8rem] flex-col gap-6 rounded-2xl bg-[#0f0f0f] px-4 py-6'>
            <div className='text-xs font-semibold'>Receive</div>
            <div className='flex flex-row items-center'>
              <Input
                className='border-none bg-[#0f0f0f] px-0 text-4xl outline-none placeholder:text-4xl'
                placeholder='0'
              />
              <div className='flex flex-row items-center gap-2 rounded-3xl bg-[#000] px-3 py-1 text-lg text-[#DDE4FF]'>
                <BrainIcon className='text-[#DDE4FF]' size={24} />
                SYP
              </div>
            </div>
          </div>
        </div>
        <Button
          className='h-12 !rounded-3xl bg-[#c4d0ff] text-lg font-medium text-[#5e7eff] hover:bg-[#b8c6fe] hover:text-[#5e7eff]'
          variant='ghost'
        >
          Mint
        </Button>
      </div>
    </div>
  );
};
