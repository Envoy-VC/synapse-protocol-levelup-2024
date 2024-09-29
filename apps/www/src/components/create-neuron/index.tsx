import React from 'react';

import Spline from '@splinetool/react-spline/next';

import { CreateNeuronButton } from './create-button';

export const CreateNeuron = () => {
  return (
    <div className='h-screen w-full snap-start'>
      <div className='mx-auto flex h-full w-full max-w-screen-2xl flex-col gap-4 md:flex-row'>
        <div className='flex h-[90dvh] w-full basis-1/2 overflow-hidden'>
          <Spline
            className='h-screen scale-150'
            scene='https://prod.spline.design/JX8za7nB8JKRBnoe/scene.splinecode'
          />
        </div>
        <div className='flex h-full w-full basis-1/2 flex-col py-24'>
          <div className='my-24 flex flex-col gap-4 py-12'>
            <div className='pb-12 font-eastman text-6xl text-[#DDE4FF]'>
              Neurons
            </div>
            <p className='max-w-lg'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo
              quisquam quae quasi corrupti eum, exercitationem, necessitatibus
              id officia saepe neque illum cum dignissimos eius beatae numquam
              iusto quis, velit nobis!
            </p>
            <CreateNeuronButton />
          </div>
        </div>
      </div>
    </div>
  );
};
