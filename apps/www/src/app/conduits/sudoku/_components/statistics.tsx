'use client';

import React, { useState } from 'react';

import MotionNumber from 'motion-number';
import { toast } from 'sonner';

import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';

import { RefreshCcwIcon } from 'lucide-react';

interface SudokuStatsProps {
  activeTile: number | null;
  setActiveTile: (tile: number | null) => void;
}

export const Statistics = (_props: SudokuStatsProps) => {
  const [entropy, setEntropy] = useState<number>(556374);

  const [value, setValue] = useState<number>(0);

  return (
    <div className='flex w-full flex-col gap-4'>
      <div className='flex w-full flex-col gap-0 rounded-3xl bg-[#101010] px-4 py-3'>
        <div className='flex flex-row items-center justify-between'>
          <div className='text-xs font-medium'>Entropy</div>
          <Button
            className='h-8 w-8 !p-1'
            variant='link'
            onClick={() => {
              setEntropy(Math.floor(Math.random() * 1000000));
            }}
          >
            <RefreshCcwIcon className='h-3 w-3' />
          </Button>
        </div>
        <MotionNumber
          className='text-7xl'
          format={{ notation: 'compact' }}
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
        >
          Play Move
        </Button>
      </div>
      <Button
        className='my-4 h-10 !rounded-3xl bg-[#c4d0ff] text-lg font-medium text-[#5e7eff] hover:bg-[#b8c6fe] hover:text-[#5e7eff]'
        variant='ghost'
      >
        Prove Puzzle
      </Button>
    </div>
  );
};
