'use client';

import React, { useState } from 'react';

import MotionNumber from 'motion-number';

import { Button } from '~/components/ui/button';
import { Sheet, SheetTrigger } from '~/components/ui/sheet';

import { StablecoinActions } from './actions';

import { RefreshCcwIcon } from 'lucide-react';

export const Statistics = () => {
  const [currentPrice, setCurrentPrice] = useState<number>(2478);
  const [totalSupply, setTotalSupply] = useState<number>(2000000);
  const [stabilityFactor, setStabilityFactor] = useState<number>(1.035);
  const [needed, setNeeded] = useState<number>(0.008);
  const [userBalance, setUserBalance] = useState<number>(2000);

  return (
    <div className='flex w-full flex-col gap-4'>
      <div className='flex w-full flex-col gap-0 rounded-3xl bg-[#101010] px-4 py-3'>
        <div className='flex flex-row items-center justify-between'>
          <div className='text-xs font-medium'>Stability Factor</div>
          <Button
            className='h-8 w-8 !p-1'
            variant='link'
            onClick={() => {
              setStabilityFactor(Math.random() + 0.5);
            }}
          >
            <RefreshCcwIcon className='h-3 w-3' />
          </Button>
        </div>
        <MotionNumber
          className='text-7xl'
          format={{ notation: 'standard' }}
          locales='en-US'
          value={stabilityFactor}
        />
      </div>
      <div className='flex flex-row gap-4'>
        <div className='flex w-full flex-col gap-0 rounded-3xl bg-[#101010] px-4 py-3'>
          <div className='flex flex-row items-center justify-between'>
            <div className='text-xs font-medium'>Current Price</div>
            <Button
              className='h-8 w-8 !p-1'
              variant='link'
              onClick={() => {
                setCurrentPrice(
                  Math.floor(Math.random() * (3000 - 2000 + 1)) + 2000
                );
              }}
            >
              <RefreshCcwIcon className='h-3 w-3' />
            </Button>
          </div>
          <MotionNumber
            className='text-7xl'
            format={{ notation: 'standard' }}
            locales='en-US'
            value={currentPrice}
          />
        </div>
        <div className='flex w-full flex-col gap-0 rounded-3xl bg-[#101010] px-4 py-3'>
          <div className='flex flex-row items-center justify-between'>
            <div className='text-xs font-medium'>Total Supply</div>
            <Button
              className='h-8 w-8 !p-1'
              variant='link'
              onClick={() => {
                setTotalSupply(
                  Math.floor(Math.random() * (3000000 - 1000000 + 1)) + 1000000
                );
              }}
            >
              <RefreshCcwIcon className='h-3 w-3' />
            </Button>
          </div>
          <MotionNumber
            className='text-7xl'
            format={{ notation: 'compact' }}
            locales='en-US'
            value={totalSupply}
          />
        </div>
      </div>
      <div className='flex flex-row gap-4'>
        <div className='flex w-full flex-col gap-0 rounded-3xl bg-[#101010] px-4 py-3'>
          <div className='flex flex-row items-center justify-between'>
            <div className='text-xs font-medium'>User Balance</div>
            <Button
              className='h-8 w-8 !p-1'
              variant='link'
              onClick={() => {
                setUserBalance(
                  Math.floor(Math.random() * (3000 - 1000 + 1)) + 1000
                );
              }}
            >
              <RefreshCcwIcon className='h-3 w-3' />
            </Button>
          </div>
          <MotionNumber
            className='text-7xl'
            format={{ notation: 'compact' }}
            locales='en-US'
            value={userBalance}
          />
        </div>
        <div className='flex w-full flex-col gap-0 rounded-3xl bg-[#101010] px-4 py-3'>
          <div className='flex flex-row items-center justify-between'>
            <div className='text-xs font-medium'>ETH needed for Stability</div>
            <Button
              className='h-8 w-8 !p-1'
              variant='link'
              onClick={() => {
                // get random from 0-0.1
                setNeeded(Math.random() * 0.1);
              }}
            >
              <RefreshCcwIcon className='h-3 w-3' />
            </Button>
          </div>
          <MotionNumber
            className='text-7xl'
            format={{ notation: 'standard' }}
            locales='en-US'
            value={needed}
          />
        </div>
      </div>
      <Sheet>
        <SheetTrigger asChild>
          <Button
            className='my-4 h-12 !rounded-3xl bg-[#c4d0ff] text-lg font-medium text-[#5e7eff] hover:bg-[#b8c6fe] hover:text-[#5e7eff]'
            variant='ghost'
          >
            Synapse Actions
          </Button>
        </SheetTrigger>
        <StablecoinActions />
      </Sheet>
    </div>
  );
};
