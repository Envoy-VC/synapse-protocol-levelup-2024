import { useQuery } from '@tanstack/react-query';
import { createSmartAccountClient } from 'permissionless';
import { toSimpleSmartAccount } from 'permissionless/accounts';
import { createPimlicoClient } from 'permissionless/clients/pimlico';
import { createPublicClient, http } from 'viem';
import { entryPoint07Address } from 'viem/account-abstraction';
import { scrollSepolia } from 'viem/chains';
import { useWalletClient } from 'wagmi';
import { env } from '~/env';

export const useSmartAccount = () => {
  const { data: walletClient } = useWalletClient();

  const getSmartAccountClient = async () => {
    if (!walletClient) {
      throw new Error('Connect Account to use Smart Account');
    }
    const publicClient = createPublicClient({
      chain: scrollSepolia,
      transport: http(env.NEXT_PUBLIC_ALCHEMY_RPC_URL),
    });

    const pimlicoUrl = `https://api.pimlico.io/v2/scroll-sepolia-testnet/rpc?apikey=${env.NEXT_PUBLIC_PIMLICO_API_KEY}`;

    const pimlicoClient = createPimlicoClient({
      transport: http(pimlicoUrl),
      entryPoint: {
        address: entryPoint07Address,
        version: '0.7',
      },
    });

    const simpleSmartAccount = await toSimpleSmartAccount({
      owner: walletClient,
      client: publicClient,
      entryPoint: {
        address: entryPoint07Address,
        version: '0.7',
      },
    });

    const smartAccountClient = createSmartAccountClient({
      account: simpleSmartAccount,
      chain: scrollSepolia,
      bundlerTransport: http(pimlicoUrl),
      paymaster: pimlicoClient,
      userOperation: {
        estimateFeesPerGas: async () => {
          return (await pimlicoClient.getUserOperationGasPrice()).fast;
        },
      },
    });

    return smartAccountClient;
  };

  const smartAccount = useQuery({
    queryKey: ['smart-account', walletClient?.account.address],
    queryFn: getSmartAccountClient,
  });

  return smartAccount;
};
