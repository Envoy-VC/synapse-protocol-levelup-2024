import React from 'react';

import { ConduitCards, CreateNeuron, Hero } from '~/components';

const Page = () => {
  return (
    <div className='snap hide-scrollbar max-h-screen snap-y snap-mandatory overflow-y-scroll'>
      <Hero />
      <CreateNeuron />
      <ConduitCards />
    </div>
  );
};

export default Page;
