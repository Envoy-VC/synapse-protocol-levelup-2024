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
  address: '0xFcF42e40E1768871F52D50b408427B508295a0C3',
} as const;

export const neuronFactoryConfig = {
  abi: Abi.NEURON_FACTORY_ABI,
  address: '0xcBD2c5849A456f19D8D0a6B2Ca9fD9d8CEc395c3',
} as const;

export const sudokuConduitConfig = {
  abi: Abi.SUDOKU_CONDUIT_ABI,
  address: '0x348613ce6ABD97eb63066d9C9492Bdd24AeE73D8',
} as const;

export const stablecoinConduitConfig = {
  abi: Abi.STABLECOIN_CONDUIT_ABI,
  address: '0x5418A7Bf966E9026eE5D1b6651340c62a8f536D8',
} as const;

export const mockPriceFeedConfig = {
  abi: Abi.MOCK_PRICE_FEED_ABI,
  address: '0x2b3C906AB66e67a972FB44872bca0B95a55EFF36',
} as const;
