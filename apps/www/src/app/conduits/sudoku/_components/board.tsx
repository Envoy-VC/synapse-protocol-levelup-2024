'use client';

import React from 'react';

import { cn } from '~/lib/utils';

const questionTiles = [0, 5, 8, 15];

interface SudokuBoardProps {
  activeTile: number | null;
  setActiveTile: (tile: number | null) => void;
}

export const SudokuBoard = ({
  activeTile,
  setActiveTile,
}: SudokuBoardProps) => {
  const tiles = [
    [0, 1, 4, 3],
    [2, 0, 3, 0],
    [0, 3, 0, 1],
    [1, 0, 2, 0],
  ];

  return (
    <div className='flex flex-col'>
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
