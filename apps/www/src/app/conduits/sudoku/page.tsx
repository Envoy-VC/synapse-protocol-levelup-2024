'use client';

import React, { useState } from 'react';

import { Statistics, SudokuBoard } from './_components';

const Sudoku = () => {
  const [activeTile, setActiveTile] = useState<number | null>(null);

  return (
    <div className='mx-auto flex w-full max-w-screen-xl flex-col gap-12 py-12'>
      <div className='pb-12 text-center font-eastman text-5xl text-[#DDE4FF]'>
        Sudoku
      </div>
      <div className='flex flex-col gap-4 md:flex-row'>
        <div className='relative flex h-[40rem] w-full basis-3/5 items-center justify-center'>
          <div className='grid-bg absolute z-[-1] h-full w-full' />
          <SudokuBoard activeTile={activeTile} setActiveTile={setActiveTile} />
        </div>
        <div className='flex w-full basis-2/5'>
          <Statistics activeTile={activeTile} setActiveTile={setActiveTile} />
        </div>
      </div>
    </div>
  );
};

export default Sudoku;
