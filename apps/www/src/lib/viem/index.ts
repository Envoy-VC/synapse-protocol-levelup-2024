import {
  type Config,
  cookieStorage,
  createConfig,
  createStorage,
  http,
} from 'wagmi';
import { scrollSepolia } from 'wagmi/chains';
import { env } from '~/env';

import * as Abi from './abi';

export const wagmiConfig: Config = createConfig({
  chains: [scrollSepolia],
  multiInjectedProviderDiscovery: false,
  ssr: true,
  storage: createStorage({
    storage: cookieStorage,
  }),
  transports: {
    [scrollSepolia.id]: http(env.NEXT_PUBLIC_ALCHEMY_RPC_URL),
  },
});

export const synapseConfig = {
  abi: Abi.SYNAPSE_ABI,
  address: '0xBaa2655881939eEa6eB1Cb0825BFdB9d735E3D5D',
} as const;

export const neuronFactoryConfig = {
  abi: Abi.NEURON_FACTORY_ABI,
  address: '0xD4eDDd367D5eB4a429Af8D104Ebd33D8800E16e0',
} as const;

export const sudokuConduitConfig = {
  abi: Abi.SUDOKU_CONDUIT_ABI,
  address: '0xC795932774bAf5c348c869C093887F6CD430cc04',
} as const;

export const stablecoinConduitConfig = {
  abi: Abi.STABLECOIN_CONDUIT_ABI,
  address: '0x712e0265f6dBaFB4Df20BbAE6d50026E48fbD2F3',
} as const;

export const mockPriceFeedConfig = {
  abi: Abi.MOCK_PRICE_FEED_ABI,
  address: '0x42344bc9a62fEA188370461F8d5a164F32626e91',
} as const;
