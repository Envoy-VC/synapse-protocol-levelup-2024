import {
  type Config,
  cookieStorage,
  createConfig,
  createStorage,
  http,
} from 'wagmi';
import { scrollSepolia } from 'wagmi/chains';
import { env } from '~/env';

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
