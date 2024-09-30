'use client';

import React, { useMemo, useState } from 'react';

import { calculateEntropy, getSudokuMessage } from '~/lib/helpers';
import { useSmartAccount } from '~/lib/hooks';
import { proveSudokuBoard } from '~/lib/noir';
import { errorHandler } from '~/lib/utils';
import {
  neuronFactoryConfig,
  sudokuConduitConfig,
  wagmiConfig,
} from '~/lib/viem';
import { NEURON_ABI } from '~/lib/viem/abi';

import { readContract } from '@wagmi/core';
import MotionNumber from 'motion-number';
import { toast } from 'sonner';
import { useAccount, useReadContract } from 'wagmi';

import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';

import { RefreshCcwIcon } from 'lucide-react';

/* eslint-disable @typescript-eslint/no-non-null-assertion -- safe */

const questionTiles = [0, 5, 8, 15];

interface SudokuStatsProps {
  activeTile: number | null;
  setActiveTile: (tile: number | null) => void;
}

export const Statistics = ({ activeTile }: SudokuStatsProps) => {
  const [value, setValue] = useState<number>(0);

  const { address } = useAccount();
  const { data: smartAccount } = useSmartAccount();

  const { data: board, refetch } = useReadContract({
    ...sudokuConduitConfig,
    functionName: 'getBoard',
  });

  const entropy = useMemo(() => {
    const b = board ?? Array<number>(16).fill(0);
    const tiles = [
      [1, b[1]!, b[2]!, b[3]!],
      [b[4]!, 2, b[6]!, b[7]!],
      [4, b[9]!, b[10]!, b[11]!],
      [b[12]!, b[13]!, b[14]!, 1],
    ];
    return calculateEntropy(tiles);
  }, [board]);

  const updateValue = async () => {
    const id = toast.loading('Playing Move...');
    try {
      if (!smartAccount) {
        throw new Error('Smart account not found');
      }
      if (!address) {
        throw new Error('Please connect to a wallet');
      }
      const client = smartAccount.client;
      const account = smartAccount.smartAccount;

      if (questionTiles.includes(activeTile ?? 0)) {
        throw new Error('Cannot Update Question Tile');
      }

      const neuronAddress = await readContract(wagmiConfig, {
        ...neuronFactoryConfig,
        functionName: '_neurons',
        args: [address],
      });

      const args = getSudokuMessage(activeTile ?? 0, value, address);

      const hash = await client.sendUserOperation({
        account,
        calls: [
          {
            abi: NEURON_ABI,
            to: neuronAddress,
            functionName: 'sendMessage',
            args: [args],
          },
        ],
      });
      await client.waitForUserOperationReceipt({ hash });
      toast.success('Move Played successfully', { id });
    } catch (error) {
      toast.error(errorHandler(error), { id });
    }
  };

  return (
    <div className='flex w-full flex-col gap-4'>
      <div className='flex w-full flex-col gap-0 rounded-3xl bg-[#101010] px-4 py-3'>
        <div className='flex flex-row items-center justify-between'>
          <div className='text-xs font-medium'>Entropy</div>
          <Button
            className='h-8 w-8 !p-1'
            variant='link'
            onClick={async () => {
              await refetch();
            }}
          >
            <RefreshCcwIcon className='h-3 w-3' />
          </Button>
        </div>
        <MotionNumber
          className='text-7xl'
          format={{ notation: 'standard' }}
          locales='en-US'
          value={entropy}
        />
      </div>
      <div className='relative flex flex-row items-center'>
        <Input
          className='h-10 rounded-l-3xl border-none bg-[#101010] px-4 text-xl outline-none placeholder:text-xl'
          placeholder='0'
          value={value}
          onChange={(e) => {
            if (e.target.value === '') {
              setValue(0);
              return;
            }
            const value = parseInt(e.target.value);
            if (value >= 5 || value <= 0) {
              toast.error('Value must be between 1 and 4');
              return;
            }
            setValue(value);
          }}
        />
        <Button
          className='absolute right-0 h-10 !rounded-3xl bg-[#c4d0ff] text-base font-medium text-[#5e7eff] hover:bg-[#b8c6fe] hover:text-[#5e7eff]'
          variant='ghost'
          onClick={updateValue}
        >
          Play Move
        </Button>
      </div>
      <Button
        className='my-4 h-10 !rounded-3xl bg-[#c4d0ff] text-lg font-medium text-[#5e7eff] hover:bg-[#b8c6fe] hover:text-[#5e7eff]'
        variant='ghost'
        onClick={async () => {
          const id = toast.loading('Generating Proof...');
          try {
            const verified = await proveSudokuBoard();
            if (!verified) {
              throw new Error('Failed to verify puzzle');
            }
            toast.success('Puzzle Proven Successfully', { id });
          } catch (error) {
            toast.error(errorHandler(error), { id });
          }
        }}
      >
        Prove Puzzle
      </Button>
    </div>
  );
};
