import { HttpProvider } from "web3-core";

export interface RequestArguments {
  readonly method: string;
  readonly params?: unknown[] | object;
}

export interface Ethereum extends HttpProvider {
  request: (args: RequestArguments) => Promise<unknown>;
  isMetaMask: boolean;
  chainId: string | undefined;
}

declare global {
  interface Window {
    ethereum?: Ethereum;
  }
}
