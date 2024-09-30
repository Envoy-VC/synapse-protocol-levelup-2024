'use client';

import React, { useMemo } from 'react';

import { mockPriceFeedConfig, stablecoinConduitConfig } from '~/lib/viem';

import MotionNumber from 'motion-number';
import { zeroAddress } from 'viem';
import { useAccount, useReadContract } from 'wagmi';

import { Button } from '~/components/ui/button';
import { Sheet, SheetTrigger } from '~/components/ui/sheet';

import { StablecoinActions } from './actions';

import { RefreshCcwIcon } from 'lucide-react';

export const Statistics = () => {
  const { address } = useAccount();

  const { data: currentPrice, refetch: refetchCurrentPrice } = useReadContract({
    ...mockPriceFeedConfig,
    functionName: 'getCurrentPrice',
    query: { initialData: BigInt(0) },
  });

  const currentPriceFormatted = useMemo(() => {
    return (Number(currentPrice ?? BigInt(0)) / 10 ** 6).toFixed(2);
  }, [currentPrice]);

  const { data: stabilityFactor, refetch: refetchStabilityFactor } =
    useReadContract({
      ...stablecoinConduitConfig,
      functionName: 'getStabilityFactor',
      query: { initialData: BigInt(0) },
    });

  const stabilityFactorFormatted = useMemo(() => {
    return (Number(stabilityFactor ?? BigInt(0)) / 10 ** 6).toFixed(4);
  }, [stabilityFactor]);

  const { data: totalSupply, refetch: refetchTotalSupply } = useReadContract({
    ...stablecoinConduitConfig,
    functionName: 'totalSupply',
    query: { initialData: BigInt(0) },
  });

  const totalSupplyFormatted = useMemo(() => {
    return (Number(totalSupply ?? BigInt(0)) / 10 ** 18).toFixed(0);
  }, [totalSupply]);

  const { data: userBalance, refetch: refetchUserBalance } = useReadContract({
    ...stablecoinConduitConfig,
    functionName: 'balanceOf',
    args: [address ?? zeroAddress],
    query: { initialData: BigInt(0) },
  });

  const userBalanceFormatted = useMemo(() => {
    return (Number(userBalance ?? BigInt(0)) / 10 ** 18).toFixed(0);
  }, [userBalance]);

  const { data: needed, refetch: refetchNeeded } = useReadContract({
    ...stablecoinConduitConfig,
    functionName: 'additionalValueForStability',
    query: { initialData: BigInt(0) },
  });

  const neededFormatted = useMemo(() => {
    const f = (Number(needed ?? BigInt(0)) / 10 ** 9).toFixed(0);
    console.log(f);
    return f;
  }, [needed]);

  const refreshAll = async () => {
    await Promise.all([
      refetchCurrentPrice(),
      refetchStabilityFactor(),
      refetchTotalSupply(),
      refetchUserBalance(),
      refetchNeeded(),
    ]);
  };

  return (
    <div className='flex w-full flex-col gap-4'>
      <div className='flex justify-end px-4'>
        <Button
          className='h-8 !p-1'
          variant='link'
          onClick={async () => await refreshAll()}
        >
          Refresh All
          <RefreshCcwIcon className='ml-2 h-3 w-3' />
        </Button>
      </div>
      <div className='flex w-full flex-col gap-0 rounded-3xl bg-[#101010] px-4 py-3'>
        <div className='flex flex-row items-center justify-between'>
          <div className='text-xs font-medium'>Stability Factor</div>
          <Button
            className='h-8 w-8 !p-1'
            variant='link'
            onClick={async () => await refetchStabilityFactor()}
          >
            <RefreshCcwIcon className='h-3 w-3' />
          </Button>
        </div>
        <MotionNumber
          className='text-7xl'
          format={{ notation: 'standard' }}
          locales='en-US'
          value={stabilityFactorFormatted}
        />
      </div>
      <div className='flex flex-row gap-4'>
        <div className='flex w-full flex-col gap-0 rounded-3xl bg-[#101010] px-4 py-3'>
          <div className='flex flex-row items-center justify-between'>
            <div className='text-xs font-medium'>Current Price</div>
            <Button
              className='h-8 w-8 !p-1'
              variant='link'
              onClick={async () => await refetchCurrentPrice()}
            >
              <RefreshCcwIcon className='h-3 w-3' />
            </Button>
          </div>
          <MotionNumber
            className='text-7xl'
            format={{ notation: 'standard' }}
            locales='en-US'
            value={currentPriceFormatted}
          />
        </div>
        <div className='flex w-full flex-col gap-0 rounded-3xl bg-[#101010] px-4 py-3'>
          <div className='flex flex-row items-center justify-between'>
            <div className='text-xs font-medium'>Total Supply</div>
            <Button
              className='h-8 w-8 !p-1'
              variant='link'
              onClick={async () => {
                await refetchTotalSupply();
              }}
            >
              <RefreshCcwIcon className='h-3 w-3' />
            </Button>
          </div>
          <MotionNumber
            className='text-7xl'
            format={{ notation: 'compact' }}
            locales='en-US'
            value={totalSupplyFormatted}
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
              onClick={async () => {
                await refetchUserBalance();
              }}
            >
              <RefreshCcwIcon className='h-3 w-3' />
            </Button>
          </div>
          <MotionNumber
            className='text-7xl'
            format={{ notation: 'compact' }}
            locales='en-US'
            value={userBalanceFormatted}
          />
        </div>
        <div className='flex w-full flex-col gap-0 rounded-3xl bg-[#101010] px-4 py-3'>
          <div className='flex flex-row items-center justify-between'>
            <div className='text-xs font-medium'>
              ETH needed for Stability (gwei)
            </div>
            <Button
              className='h-8 w-8 !p-1'
              variant='link'
              onClick={async () => {
                await refetchNeeded();
              }}
            >
              <RefreshCcwIcon className='h-3 w-3' />
            </Button>
          </div>

          <MotionNumber
            className='flex flex-row items-end gap-3 text-7xl'
            format={{ notation: 'compact' }}
            locales='en-US'
            value={neededFormatted}
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
