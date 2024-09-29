export const SYNAPSE_ABI = [
  {
    type: 'constructor',
    inputs: [
      { name: '_initialOwner', type: 'address', internalType: 'address' },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: '_conduitCount',
    inputs: [],
    outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: '_conduits',
    inputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
    outputs: [{ name: '', type: 'address', internalType: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: '_whitelistedConduits',
    inputs: [{ name: '', type: 'address', internalType: 'address' }],
    outputs: [{ name: '', type: 'bool', internalType: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'owner',
    inputs: [],
    outputs: [{ name: '', type: 'address', internalType: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'receiveMessage',
    inputs: [
      {
        name: '_message',
        type: 'tuple',
        internalType: 'struct ConduitMessage.Message',
        components: [
          { name: 'sender', type: 'address', internalType: 'address' },
          { name: 'recipient', type: 'address', internalType: 'address' },
          { name: 'data', type: 'bytes', internalType: 'bytes' },
        ],
      },
    ],
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    name: 'registerConduit',
    inputs: [{ name: '_conduit', type: 'address', internalType: 'address' }],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'renounceOwnership',
    inputs: [],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'transferOwnership',
    inputs: [{ name: 'newOwner', type: 'address', internalType: 'address' }],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'event',
    name: 'ExecutionFailed',
    inputs: [
      {
        name: 'message',
        type: 'tuple',
        indexed: false,
        internalType: 'struct ConduitMessage.Message',
        components: [
          { name: 'sender', type: 'address', internalType: 'address' },
          { name: 'recipient', type: 'address', internalType: 'address' },
          { name: 'data', type: 'bytes', internalType: 'bytes' },
        ],
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'ExecutionSuccess',
    inputs: [
      {
        name: 'message',
        type: 'tuple',
        indexed: false,
        internalType: 'struct ConduitMessage.Message',
        components: [
          { name: 'sender', type: 'address', internalType: 'address' },
          { name: 'recipient', type: 'address', internalType: 'address' },
          { name: 'data', type: 'bytes', internalType: 'bytes' },
        ],
      },
      {
        name: 'returnData',
        type: 'bytes',
        indexed: false,
        internalType: 'bytes',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'OwnershipTransferred',
    inputs: [
      {
        name: 'previousOwner',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'newOwner',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
    ],
    anonymous: false,
  },
  {
    type: 'error',
    name: 'AlreadyRegistered',
    inputs: [{ name: 'conduit', type: 'address', internalType: 'address' }],
  },
  {
    type: 'error',
    name: 'NotAWhitelistedConduit',
    inputs: [{ name: 'conduit', type: 'address', internalType: 'address' }],
  },
  {
    type: 'error',
    name: 'OwnableInvalidOwner',
    inputs: [{ name: 'owner', type: 'address', internalType: 'address' }],
  },
  {
    type: 'error',
    name: 'OwnableUnauthorizedAccount',
    inputs: [{ name: 'account', type: 'address', internalType: 'address' }],
  },
] as const;

export const NEURON_FACTORY_ABI = [
  {
    type: 'constructor',
    inputs: [
      { name: '_initialOwner', type: 'address', internalType: 'address' },
      { name: '_synapse', type: 'address', internalType: 'address' },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: '_neurons',
    inputs: [{ name: '', type: 'address', internalType: 'address' }],
    outputs: [{ name: '', type: 'address', internalType: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'createNeuron',
    inputs: [
      { name: 'salt', type: 'bytes32', internalType: 'bytes32' },
      { name: 'owner', type: 'address', internalType: 'address' },
    ],
    outputs: [{ name: '', type: 'address', internalType: 'address' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'getNeuronByteCode',
    inputs: [{ name: 'owner', type: 'address', internalType: 'address' }],
    outputs: [{ name: '', type: 'bytes', internalType: 'bytes' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'owner',
    inputs: [],
    outputs: [{ name: '', type: 'address', internalType: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'renounceOwnership',
    inputs: [],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'synapse',
    inputs: [],
    outputs: [{ name: '', type: 'address', internalType: 'contract ISynapse' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'transferOwnership',
    inputs: [{ name: 'newOwner', type: 'address', internalType: 'address' }],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'event',
    name: 'NeuronCreated',
    inputs: [
      {
        name: 'owner',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'neuron',
        type: 'address',
        indexed: false,
        internalType: 'address',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'OwnershipTransferred',
    inputs: [
      {
        name: 'previousOwner',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'newOwner',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
    ],
    anonymous: false,
  },
  { type: 'error', name: 'Create2EmptyBytecode', inputs: [] },
  { type: 'error', name: 'Create2FailedDeployment', inputs: [] },
  {
    type: 'error',
    name: 'Create2InsufficientBalance',
    inputs: [
      { name: 'balance', type: 'uint256', internalType: 'uint256' },
      { name: 'needed', type: 'uint256', internalType: 'uint256' },
    ],
  },
  {
    type: 'error',
    name: 'NeuronAlreadyCreated',
    inputs: [{ name: 'owner', type: 'address', internalType: 'address' }],
  },
  {
    type: 'error',
    name: 'OwnableInvalidOwner',
    inputs: [{ name: 'owner', type: 'address', internalType: 'address' }],
  },
  {
    type: 'error',
    name: 'OwnableUnauthorizedAccount',
    inputs: [{ name: 'account', type: 'address', internalType: 'address' }],
  },
] as const;

export const NEURON_ABI = [
  {
    type: 'constructor',
    inputs: [
      { name: '_initialOwner', type: 'address', internalType: 'address' },
      { name: '_synapse', type: 'address', internalType: 'address' },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: '_handleMessage',
    inputs: [
      {
        name: '_message',
        type: 'tuple',
        internalType: 'struct NeuronMessage.Message',
        components: [
          { name: 'sender', type: 'address', internalType: 'address' },
          { name: 'recipient', type: 'address', internalType: 'address' },
          {
            name: 'receiver',
            type: 'uint8',
            internalType: 'enum NeuronMessage.Receiver',
          },
          { name: 'data', type: 'bytes', internalType: 'bytes' },
        ],
      },
    ],
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    name: 'owner',
    inputs: [],
    outputs: [{ name: '', type: 'address', internalType: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'receiveMessage',
    inputs: [
      {
        name: '_message',
        type: 'tuple',
        internalType: 'struct NeuronMessage.Message',
        components: [
          { name: 'sender', type: 'address', internalType: 'address' },
          { name: 'recipient', type: 'address', internalType: 'address' },
          {
            name: 'receiver',
            type: 'uint8',
            internalType: 'enum NeuronMessage.Receiver',
          },
          { name: 'data', type: 'bytes', internalType: 'bytes' },
        ],
      },
    ],
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    name: 'renounceOwnership',
    inputs: [],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'sendMessage',
    inputs: [
      {
        name: '_message',
        type: 'tuple',
        internalType: 'struct NeuronMessage.Message',
        components: [
          { name: 'sender', type: 'address', internalType: 'address' },
          { name: 'recipient', type: 'address', internalType: 'address' },
          {
            name: 'receiver',
            type: 'uint8',
            internalType: 'enum NeuronMessage.Receiver',
          },
          { name: 'data', type: 'bytes', internalType: 'bytes' },
        ],
      },
    ],
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    name: 'synapse',
    inputs: [],
    outputs: [{ name: '', type: 'address', internalType: 'contract ISynapse' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'transferOwnership',
    inputs: [{ name: 'newOwner', type: 'address', internalType: 'address' }],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'event',
    name: 'OwnershipTransferred',
    inputs: [
      {
        name: 'previousOwner',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'newOwner',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
    ],
    anonymous: false,
  },
  { type: 'error', name: 'NotAContract', inputs: [] },
  {
    type: 'error',
    name: 'OwnableInvalidOwner',
    inputs: [{ name: 'owner', type: 'address', internalType: 'address' }],
  },
  {
    type: 'error',
    name: 'OwnableUnauthorizedAccount',
    inputs: [{ name: 'account', type: 'address', internalType: 'address' }],
  },
] as const;
