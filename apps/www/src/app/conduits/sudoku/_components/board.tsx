'use client';

import React, { useMemo } from 'react';

import { cn } from '~/lib/utils';
import { sudokuConduitConfig } from '~/lib/viem';

import { useReadContract } from 'wagmi';

import { Button } from '~/components/ui/button';

import { RefreshCcwIcon } from 'lucide-react';

/* eslint-disable @typescript-eslint/no-non-null-assertion -- safe */

const questionTiles = [0, 5, 8, 15];

interface SudokuBoardProps {
  activeTile: number | null;
  setActiveTile: (tile: number | null) => void;
}

export const SudokuBoard = ({
  activeTile,
  setActiveTile,
}: SudokuBoardProps) => {
  const { data: board, refetch } = useReadContract({
    ...sudokuConduitConfig,
    functionName: 'getBoard',
  });

  const tiles = useMemo(() => {
    const b = board ?? Array<number>(16).fill(0);
    return [
      [b[0]!, b[1]!, b[2]!, b[3]!],
      [b[4]!, b[5]!, b[6]!, b[7]!],
      [b[8]!, b[9]!, b[10]!, b[11]!],
      [b[12]!, b[13]!, b[14]!, b[15]!],
    ];
  }, [board]);

  return (
    <div className='flex flex-col'>
      <div className='flex w-full justify-end py-2'>
        <Button
          className='h-8 !p-1'
          variant='link'
          onClick={async () => await refetch()}
        >
          Refetch Board
          <RefreshCcwIcon className='ml-2 h-3 w-3' />
        </Button>
      </div>
      {tiles.map((row, rowIndex) => (
        // eslint-disable-next-line react/no-array-index-key -- safe
        <div key={String(rowIndex)} className='flex'>
          {row.map((tileValue, tileIndex) => (
            <SudokuTile
              key={`${String(rowIndex)}-${String(tileIndex)}`}
              activeTile={activeTile}
              currentTile={rowIndex * 4 + tileIndex}
              setActiveTile={setActiveTile}
              value={tileValue}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

interface SudokuTileProps {
  currentTile: number;
  value: number | null;
  activeTile: number | null;
  setActiveTile: (tile: number | null) => void;
}
const SudokuTile = ({
  value,
  activeTile,
  currentTile,
  setActiveTile,
}: SudokuTileProps) => {
  const isQuestionTile = questionTiles.includes(currentTile);
  return (
    <button
      type='button'
      className={cn(
        'flex h-20 w-20 items-center justify-center border text-xl font-medium text-[#DDE4FF]',
        activeTile === currentTile
          ? 'border-[#bdcbff] bg-[#1b1b1b]'
          : 'bg-black',
        questionTiles.includes(currentTile) && 'border-border bg-[#313131]'
      )}
      onClick={() => {
        if (isQuestionTile) return;
        setActiveTile(currentTile);
      }}
    >
      {isQuestionTile ? '' : value}
    </button>
  );
};
