import React from 'react';

import { Button } from '../ui/button';

export const CreateNeuronButton = () => {
  return (
    <Button
      className='my-4 h-9 w-fit !rounded-3xl bg-[#c4d0ff] text-lg font-medium text-[#5e7eff] hover:bg-[#b8c6fe] hover:text-[#5e7eff]'
      variant='ghost'
    >
      Create Neuron
    </Button>
  );
};
