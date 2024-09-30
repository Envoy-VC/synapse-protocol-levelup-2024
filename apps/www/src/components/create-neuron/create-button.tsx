'use client';

import React from 'react';

import { useSmartAccount } from '~/lib/hooks';
import { errorHandler } from '~/lib/utils';
import { neuronFactoryConfig } from '~/lib/viem';

import { toast } from 'sonner';
import { keccak256 } from 'viem';
import { useAccount } from 'wagmi';

import { Button } from '../ui/button';

export const CreateNeuronButton = () => {
  const { data: smartAccount } = useSmartAccount();
  const { address } = useAccount();
  return (
    <Button
      className='my-4 h-9 w-fit !rounded-3xl bg-[#c4d0ff] text-lg font-medium text-[#5e7eff] hover:bg-[#b8c6fe] hover:text-[#5e7eff]'
      variant='ghost'
      onClick={async () => {
        const id = toast.loading('Creating Neuron...');
        try {
          if (!smartAccount) {
            throw new Error('Smart account not found');
          }
          if (!address) {
            throw new Error('Connect account to create a Neuron');
          }
          const client = smartAccount.client;
          const account = smartAccount.smartAccount;

          const salt = keccak256(address);
          const hash = await client.sendUserOperation({
            account,
            calls: [
              {
                ...neuronFactoryConfig,
                to: neuronFactoryConfig.address,
                functionName: 'createNeuron',
                args: [salt, address],
              },
            ],
          });
          await smartAccount.client.waitForUserOperationReceipt({ hash });
          toast.success(`Neuron created successfully`, { id });
        } catch (error) {
          toast.error(errorHandler(error), { id });
        }
      }}
    >
      Create Neuron
    </Button>
  );
};
