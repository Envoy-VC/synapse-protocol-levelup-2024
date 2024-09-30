import React, { useState } from 'react';

import { getStabilityMessage } from '~/lib/helpers';
import { useSmartAccount } from '~/lib/hooks';
import { errorHandler } from '~/lib/utils';
import {
  mockPriceFeedConfig,
  neuronFactoryConfig,
  stablecoinConduitConfig,
  wagmiConfig,
} from '~/lib/viem';
import { NEURON_ABI } from '~/lib/viem/abi';

import { readContract, waitForTransactionReceipt } from '@wagmi/core';
import { toast } from 'sonner';
import { formatEther, parseEther, parseUnits } from 'viem';
import { useAccount, useReadContract, useWriteContract } from 'wagmi';

import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import {
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '~/components/ui/sheet';

export const StablecoinActions = () => {
  const [newPrice, setNewPrice] = useState<string>('');
  const [contributeAmt, setContributeAmt] = useState<string>('');

  const { writeContractAsync, isPending } = useWriteContract();
  const { address } = useAccount();
  const { data: smartAccount } = useSmartAccount();

  const { refetch: refetchNeeded } = useReadContract({
    ...stablecoinConduitConfig,
    functionName: 'additionalValueForStability',
    query: { initialData: BigInt(0) },
  });

  const setMax = async () => {
    const needed = (await refetchNeeded()).data ?? BigInt(0);
    const parsed = formatEther(needed);
    setContributeAmt(parsed);
  };

  const updatePrice = async () => {
    const id = toast.loading('Updating Price...');
    try {
      if (!smartAccount) {
        throw new Error('Smart account not found');
      }
      const client = smartAccount.client;
      const account = smartAccount.smartAccount;
      const amount = parseUnits(newPrice, 6);

      const hash = await client.sendUserOperation({
        account,
        calls: [
          {
            ...mockPriceFeedConfig,
            to: mockPriceFeedConfig.address,
            functionName: 'updatePrice',
            args: [amount],
          },
        ],
      });
      await client.waitForUserOperationReceipt({ hash });
      toast.success('Price Updated successfully', { id });
    } catch (error) {
      toast.error(errorHandler(error), { id });
    }
  };

  const contribute = async () => {
    const id = toast.loading('Contributing towards stability...');
    try {
      if (!address) {
        throw new Error('Smart account not found');
      }
      const amount = parseEther(contributeAmt);

      const neuronAddress = await readContract(wagmiConfig, {
        ...neuronFactoryConfig,
        functionName: '_neurons',
        args: [address],
      });

      const args = getStabilityMessage(amount, address);

      console.log({
        amount,
        args,
        neuronAddress,
      });

      const hash = await writeContractAsync({
        abi: NEURON_ABI,
        address: neuronAddress,
        functionName: 'sendMessage',
        args: [args],
        value: amount,
        gas: 300000n,
      });
      await waitForTransactionReceipt(wagmiConfig, { hash });
      toast.success('Contributed successfully', { id });
    } catch (error) {
      toast.error(errorHandler(error), { id });
    }
  };
  return (
    <div>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Stablecoin Actions</SheetTitle>
          <SheetDescription className='flex flex-col gap-4 py-6'>
            <div className='flex flex-col gap-2'>
              <div>Update Price Feed</div>
              <div className='flex flex-row items-center gap-2'>
                <Input
                  className='mx-0'
                  placeholder='2478'
                  value={newPrice}
                  onChange={(e) => setNewPrice(e.target.value)}
                />
                <Button disabled={isPending} onClick={updatePrice}>
                  Update
                </Button>
              </div>
            </div>
            <div className='flex flex-col gap-2'>
              <div>Contribute for Stability</div>
              <div className='flex flex-row items-center gap-2'>
                <Input
                  className='mx-0'
                  placeholder='0.0034'
                  value={contributeAmt}
                  onChange={(e) => setContributeAmt(e.target.value)}
                />
                <Button variant='outline' onClick={setMax}>
                  Max
                </Button>
              </div>
              <Button disabled={isPending} onClick={contribute}>
                Contribute
              </Button>
            </div>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </div>
  );
};
