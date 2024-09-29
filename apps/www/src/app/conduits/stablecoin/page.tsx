import React from 'react';

import { BuyBox, Statistics } from './_components';

const Stablecoin = () => {
  return (
    <div className='mx-auto flex w-full max-w-screen-xl flex-col gap-12 py-12'>
      <div className='pb-12 text-center font-eastman text-5xl text-[#DDE4FF]'>
        Stablecoin
      </div>
      <div className='flex flex-col gap-4 md:flex-row'>
        <div className='relative flex h-[40rem] w-full basis-3/5 items-center justify-center'>
          <div className='grid-bg absolute z-[-1] h-full w-full' />
          <BuyBox />
        </div>
        <div className='flex w-full basis-2/5'>
          <Statistics />
        </div>
      </div>
    </div>
  );
};

export default Stablecoin;
