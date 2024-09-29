import React from 'react';

import { Hero } from '~/components';

import { CreateNeuron } from '../components/create-neuron/index';

const Page = () => {
  return (
    <div>
      <Hero />
      <CreateNeuron />
    </div>
  );
};

export default Page;
