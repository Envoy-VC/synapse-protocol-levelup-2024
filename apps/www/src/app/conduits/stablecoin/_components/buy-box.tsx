'use client';

import Image from 'next/image';

import React, { useMemo, useState } from 'react';

import { errorHandler } from '~/lib/utils';
import {
  mockPriceFeedConfig,
  stablecoinConduitConfig,
  wagmiConfig,
} from '~/lib/viem';

import { waitForTransactionReceipt } from '@wagmi/core';
import ETHLogo from 'public/eth-logo.png';
import { toast } from 'sonner';
import { parseEther } from 'viem';
import { useAccount, useReadContract, useWriteContract } from 'wagmi';

import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';

import { ArrowDownIcon, BrainIcon } from 'lucide-react';

export const BuyBox = () => {
  const { address } = useAccount();
  const [depositAmount, setDepositAmount] = useState<string>('');

  const { data: currentPrice } = useReadContract({
    ...mockPriceFeedConfig,
    functionName: 'getCurrentPrice',
  });

  const { writeContractAsync, isPending } = useWriteContract();

  const mintTokens = async () => {
    const id = toast.loading('Minting tokens...');
    try {
      if (!address) {
        throw new Error('Please connect to a wallet');
      }
      const amount = parseEther(depositAmount);

      const hash = await writeContractAsync({
        ...stablecoinConduitConfig,
        functionName: 'mint',
        value: amount,
      });
      await waitForTransactionReceipt(wagmiConfig, { hash });
      toast.success('Minted tokens successfully', { id });
    } catch (error) {
      toast.error(errorHandler(error), { id });
    }
  };

  const receiveAmount = useMemo(() => {
    const price = Number(currentPrice ?? 0) / 10 ** 6;
    return Number(depositAmount) * price;
  }, [currentPrice, depositAmount]);
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
                value={depositAmount}
                onChange={(e) => {
                  setDepositAmount(e.target.value);
                }}
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
                value={String(receiveAmount)}
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
          disabled={isPending}
          variant='ghost'
          onClick={mintTokens}
        >
          Mint
        </Button>
      </div>
    </div>
  );
};
