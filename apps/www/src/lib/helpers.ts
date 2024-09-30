import { encodeAbiParameters } from 'viem';



import { stablecoinConduitConfig } from './viem';


const ConduitMessage = {
  name: 'staticStruct',
  inputs: [
    {
      components: [
        {
          name: 'sender',
          type: 'address',
        },
        {
          name: 'recipient',
          type: 'address',
        },
        {
          name: 'data',
          type: 'bytes',
        },
      ],
      name: 'ConduitMessage',
      type: 'tuple',
    },
  ],
} as const;

const StablecoinMessage = {
  name: 'staticStruct',
  inputs: [
    {
      components: [
        {
          name: 'sender',
          type: 'address',
        },
        {
          name: 'value',
          type: 'uint256',
        },
      ],
      name: 'StableCoinMessage',
      type: 'tuple',
    },
  ],
} as const;

const NeuronMessage = {
  name: 'staticStruct',
  inputs: [
    {
      components: [
        {
          name: 'sender',
          type: 'address',
        },
        {
          name: 'recipient',
          type: 'address',
        },
        {
          name: 'receiver',
          type: 'uint8',
        },
        {
          name: 'data',
          type: 'bytes',
        },
      ],
      name: 'NeuronMessage',
      type: 'tuple',
    },
  ],
} as const;

export const getStabilityMessage = (value: bigint, sender: `0x${string}`) => {
  const encodedStablecoinMsg = encodeAbiParameters(StablecoinMessage.inputs, [
    {
      sender,
      value,
    },
  ]);

  const data = encodeAbiParameters(ConduitMessage.inputs, [
    {
      sender,
      recipient: stablecoinConduitConfig.address,
      data: encodedStablecoinMsg,
    },
  ]);

  return {
    sender,
    recipient: stablecoinConduitConfig.address,
    receiver: 0,
    data,
  };
};