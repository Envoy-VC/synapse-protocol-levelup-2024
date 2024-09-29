import React from 'react';

import Spline from '@splinetool/react-spline/next';

export const CreateNeuron = () => {
  return (
    <div className='h-screen w-full'>
      <div className='mx-auto flex h-full w-full max-w-screen-2xl flex-col gap-4 md:flex-row'>
        <div className='flex h-[90dvh] w-full basis-1/2 overflow-hidden'>
          <Spline
            className='h-screen scale-150'
            scene='https://prod.spline.design/JX8za7nB8JKRBnoe/scene.splinecode'
          />
        </div>
        <div className='flex h-full w-full basis-1/2'>button</div>
      </div>
    </div>
  );
};
